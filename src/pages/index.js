import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Head from '../components/Head'
import { getPostPath } from '../utils/getPostPath'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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
                  tags
                  title
                  subTitle
                  path
                  date
                  mainImage
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
