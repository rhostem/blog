/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { getPostRoute, getTagRoute } = require('./src/utils/routeResolver')
const R = require('ramda')
const createPaginatedPages = require('gatsby-paginate')

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

    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/index.js',
      pageLength: 10, // This is optional and defaults to 10 if not used
      pathPrefix: '', // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    })
    /**
     * create pages of each post
     */
    const blogTemplate = path.resolve(`./src/templates/post.js`)
    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: getPostRoute(edge.node.frontmatter.path),
        component: blogTemplate,
        context: {
          id: edge.node.id,
        },
      })
    })

    /**
     * create pages of each tags
     */
    const tags = R.compose(
      R.uniq,
      R.flatten,
      R.map(edge => edge.node.frontmatter.tags)
    )(result.data.allMarkdownRemark.edges)

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
  })
}
