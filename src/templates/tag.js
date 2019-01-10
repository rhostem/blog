import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from 'components/Layout'
import { getPostRoute } from 'utils/routeResolver'
import { PostListItem, PostListWrap } from '../components/PostLIst'
import PageTitle from '../components/PageTitle'

class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges
    const { tag } = this.props.pageContext
    return (
      <Layout>
        <SEO title={tag} />
        <Head />
        <PageTitle>{tag}</PageTitle>
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
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    site {
      siteMetadata {
        title
        url
        author
        description
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            path
            title
            date
            tags
          }
        }
      }
    }
  }
`
