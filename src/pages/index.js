import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Head from '../components/Head'
import { getPostRoute } from '../utils/routeResolver'
import PostList, { PostListItem, PostListWrap } from '../components/PostLIst'

const IndexPage = () => (
  <Layout>
    <SEO
      title=""
      keywords={[
        '웹 개발',
        'Front-end',
        '프론트엔드',
        'JavaScript',
        'node.js',
        'React',
        'Vue',
        'Angular',
        '번역',
      ]}
    />
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
        return <PostList postEdges={postEdges} />
      }}
    />
  </Layout>
)

export default IndexPage
