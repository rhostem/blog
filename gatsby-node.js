/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { getPostRoute, getTagRoute } = require('./src/utils/routeResolver')
const R = require('ramda')
const createPaginatedPages = require('gatsby-paginate')
const addPostsToAlgolia = require('./src/search/addPostsToAlgolia')
const addTagsToAlgolia = require('./src/search/addTagsToAlgolia')

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
    const allTags = R.compose(
      R.uniq,
      R.flatten,
      R.filter(v => R.not(R.isNil(v))),
      R.map(edge => edge.node.frontmatter.tags)
    )(postEdges)

    const tagTemplate = path.resolve(`./src/templates/tag.js`)

    allTags.forEach(tag => {
      createPage({
        path: getTagRoute(tag),
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })

    // 빌드할 때만 algolia에 레코드를 업데이트한다
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.BRANCH === 'master'
    ) {
      console.log('is master branch!')
      addPostsToAlgolia({ postEdges, allTags })
      addTagsToAlgolia(allTags)
    }
  })
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // If production JavaScript and CSS build
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}
