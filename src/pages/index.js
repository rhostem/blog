import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Head from '../components/Head'
import { getPostPath } from '../utils/getPostPath'
import { PostListItem, PostListWrap } from '../components/PostLIst'

const IndexPage = () => (
  <Layout>
    <SEO title="" keywords={[`gatsby`, `application`, `react`]} />
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
              }
            }
          }
        }
      `}
      render={data => {
        const postEdges = data.allMarkdownRemark.edges

        return (
          <PostListWrap>
            {postEdges.map(({ node }) => {
              const { frontmatter, timeToRead } = node
              return (
                <PostListItem
                  key={node.id}
                  path={getPostPath(frontmatter.path)}
                  title={frontmatter.title}
                  subTitle={frontmatter.subTitle}
                  date={frontmatter.date}
                  timeToRead={timeToRead}
                />
              )
            })}
          </PostListWrap>
        )
      }}
    />
  </Layout>
)

export default IndexPage
