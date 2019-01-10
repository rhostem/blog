import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from 'components/Layout'
import PostList from '../components/PostLIst'
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
        <PageTitle>
          {tag} - {postEdges.length}개의 글
        </PageTitle>

        <PostList postEdges={postEdges} />
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
