import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Head from '../components/Head'
import { getPostPath } from '../utils/getPostPath'

const IndexPage = () => (
  <Layout>
    <SEO title="Post" keywords={[`gatsby`, `application`, `react`]} />
    <Head />
    <StaticQuery
      query={graphql`
        query postList {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
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
                html
              }
            }
          }
        }
      `}
      render={data => {
        const postEdges = data.allMarkdownRemark.edges

        return (
          <div>
            {postEdges.map(({ node }) => (
              <Link key={node.id} to={getPostPath(node.frontmatter.path)}>
                <h2>{node.frontmatter.title}</h2>
                <p>{node.excerpt}</p>
              </Link>
            ))}
          </div>
        )
      }}
    />
  </Layout>
)

export default IndexPage
