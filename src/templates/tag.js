import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from 'components/layout/DefaultLayout'
import PostList from '../components/PostLIst'
import PageTitle from '../components/PageTitle'
import styled from 'styled-components'

const TagCount = styled.span`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  padding-bottom: 1rem;
  margin-left: 1.5rem;
`

class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges
    const { tag } = this.props.pageContext
    const title = `${tag}`
    return (
      <Layout>
        <SEO title={title} />
        <Head />
        <PageTitle>
          {title}
          <TagCount>{postEdges.length}개의 글</TagCount>
        </PageTitle>

        <PostList isInfiniteScroll={true} postEdges={postEdges} />
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
