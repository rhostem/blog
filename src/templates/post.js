import React, { Component } from 'react'

class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { markdownRemark } = this.props.data
    console.log(`this.props.data`, this.props.data)

    return <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
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
