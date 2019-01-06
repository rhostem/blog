/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

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
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    console.log(`result`, result)

    const blogTemplate = path.resolve(`./src/templates/post.js`)
    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: `/posts/${edge.node.frontmatter.path}`,
        component: blogTemplate,
        context: {
          id: edge.node.id,
        },
      })
    })
  })
}
