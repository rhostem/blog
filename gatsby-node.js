/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { getPostRoute, getTagRoute } = require('./src/utils/routeResolver')
const R = require('ramda')
const createPaginatedPages = require('gatsby-paginate')
const algoliasearch = require('algoliasearch')
const striptags = require('striptags')
const decodeHTML = require('./src/utils/decodeHtml')
const axios = require('axios')
const { format, subYears } = require('date-fns')
// const siteConfig = require('./site-config')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the local Contentful graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(truncate: true, pruneLength: 150)
            timeToRead
            html
            frontmatter {
              path
              title
              subTitle
              date
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // 포스트 데이터 객체로 구성된 배열.
    const postEdges = result.data.allMarkdownRemark.edges

    /**
     * create pages of each post
     */
    const blogTemplate = path.resolve(`./src/templates/post.js`)
    postEdges.forEach(edge => {
      createPage({
        path: getPostRoute(edge.node.frontmatter.path),
        component: blogTemplate,
        context: {
          id: edge.node.id,
        },
      })
    })

    /**
     * TODO: html에서 첫번째 이미지를 찾고, 있으면 메인이미지로 사용한다
     */
    // const edgesWithMainImage = postEdges.map(edge => {
    //   const $ = cheerio.load(`<div>${edge.node.html}</div>`)
    //   const images = $('span[class="gatsby-resp-image-wrapper"]')
    //   if (images.length > 0) {
    //     return R.mergeDeepRight(edge, {
    //       node: { mainImage: images.first().html() },
    //     })
    //   } else {
    //     return edge
    //   }
    // })

    createPaginatedPages({
      // edges: edgesWithMainImage,
      edges: postEdges,
      createPage: createPage,
      pageTemplate: 'src/templates/index.js',
      pageLength: 10, // This is optional and defaults to 10 if not used
      pathPrefix: '', // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    })

    /**
     * create pages of each tags
     */
    const tags = R.compose(
      R.uniq,
      R.flatten,
      R.filter(v => R.not(R.isNil(v))),
      R.map(edge => edge.node.frontmatter.tags)
    )(postEdges)

    console.log(`tags`, tags)

    const tagTemplate = path.resolve(`./src/templates/tag.js`)
    tags.forEach(tag => {
      createPage({
        path: getTagRoute(tag),
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })

    // 빌드할 때만 algolia에 레코드를 업데이트한다
    if (process.env.NODE_ENV === 'production') {
      addPostIndicesToAlgolia(postEdges)
    }
  })
}

/**
 * upload post data to algolia for instant search
 */
async function addPostIndicesToAlgolia(postEdges = []) {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  )

  const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME)

  const { data: pageViews } = await axios.get(
    `https://blogapi.rhostem.com/api/ga/post_pageviews`,
    {
      params: {
        startDate: format(subYears(new Date(), 1), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
      },
    }
  )

  // 검색에 필요한 데이터 정리
  const postObjects = postEdges.map(edge => {
    const { node } = edge
    const { id, html, timeToRead, frontmatter } = node
    const { path, title, subTitle, date, tags } = frontmatter

    const pageView = R.pipe(
      data => data.find(p => p.page === getPostRoute(path)),
      R.prop('count')
    )(pageViews)

    /**
     * 레코드의 크기 제한이 10kb라서 포스트 전체를 하나의 레코드에 담을 수 없다.
     * html을 </p> 태그로 분리한 후 5개 단락을 합쳐서 1개의 레코드에 저장하도록 한다.
     *
     * 참조) https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/
     */
    const paragraphs = html.split(`</p>`)
    const bodies = []

    while (paragraphs.length > 0) {
      const chunks = paragraphs.splice(0, 5)
      bodies.push(
        chunks
          .filter(c => !!c)
          .map(chunk =>
            R.pipe(
              striptags,
              decodeHTML
            )(chunk)
          )
          .join(' ')
      )
    }

    return bodies.map((body, index) => {
      return {
        objectID: `${id}_${index}`,
        body,
        title,
        subTitle,
        date,
        tags,
        timeToRead,
        path,
        pageView,
      }
    })
  })

  const flattendObjects = R.flatten(postObjects)

  index.addObjects(flattendObjects, (err, content) => {
    if (err) {
      console.error(err)
    }
  })

  index.setSettings(
    {
      searchableAttributes: ['body', 'title', 'subTitle', 'tags'],
      attributeForDistinct: 'title',
      distinct: true,
      customRanking: ['desc(pageView)'],
    },
    (err, content) => {
      if (err) {
        console.error(err)
      }
    }
  )
}
