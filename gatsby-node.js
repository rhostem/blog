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
const { trimText } = require('./static/js/searchUtil')

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
      // edges: edgesWithMainImage,  // TODO:
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
      R.map(edge => edge.node.frontmatter.tags)
    )(postEdges)

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

    console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      uploadPostToAlgolia(postEdges)
    }
  })
}

/**
 * upload post data to algolia for instant search
 */
function uploadPostToAlgolia(postEdges = []) {
  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )

  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

  // 검색에 필요한 데이터 정리
  const postObjects = postEdges.map(edge => {
    const { node } = edge
    const { id, html, timeToRead, frontmatter } = node
    const { path, title, subTitle, date, tags } = frontmatter

    const body = R.pipe(
      striptags,
      trimText,
      t => t.slice(0, 3500) // community plan 10kb 제한 때문에 본문을 잘라낸다.
    )(html)

    return {
      objectID: id,
      body,
      title,
      subTitle,
      date,
      tags,
      timeToRead,
      path,
    }
  })

  index.addObjects(postObjects, (err, content) => {
    if (err) {
      console.error(err)
    }
  })

  index.setSettings(
    {
      searchableAttributes: ['body', 'title', 'subTitle', 'tags'],
      customRanking: [`desc(date)`],
    },
    (err, content) => {
      if (err) {
        console.error(err)
      }
    }
  )
}
