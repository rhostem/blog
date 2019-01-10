import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Head from '../components/Head'
import { getPostRoute } from '../utils/routeResolver'
import { PostListItem, PostListWrap } from '../components/PostLIst'

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

        return (
          <PostListWrap>
            {postEdges.map(({ node }) => {
              const { frontmatter, timeToRead } = node
              return (
                <PostListItem
                  key={node.id}
                  path={getPostRoute(frontmatter.path)}
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
