/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { getPostRoute, getTagRoute } = require('./src/utils/routeResolver')
const R = require('ramda')

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
            frontmatter {
              path
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
