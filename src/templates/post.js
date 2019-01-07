import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Head from '../components/Head'

class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { markdownRemark } = this.props.data
    const { frontmatter } = markdownRemark

    return (
      <div>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.tags || []}
        />
        <Head>
          <script type="text/javascript" async src="/js/facebook-sdk.js" />
          <script type="text/javascript" async src="/js/disqus.js" />
        </Head>

        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </div>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        tags
        title
        subTitle
        path
        date
        description
        mainImageAlt
      }
      html
    }
  }
`
