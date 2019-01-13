import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { clearFix } from 'polished'
import { rhythm } from 'styles/typography'
import Tags from '../components/Tags'
import qs from 'qs'
import { css } from 'styled-components'
import { getPostRoute } from 'utils/routeResolver'
import { getMainImageFromRemark } from 'utils/getMainImageFromRemark'

const PostTitle = styled.h1`
  text-align: left;
  margin-bottom: ${rhythm(0.5)};
`

const PostSubTitle = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
`

const PostInfo = styled.div`
  ${clearFix()};
  font-size: 0.9rem;
`

const TagsWrapper = styled.div`
  margin-top: ${rhythm(1 / 2)};
`

const Post = styled.article`
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(2)};
`

const ShareButtonStyle = css`
  border: none;
  display: block;
  padding: 0;
  margin: 0 0.75rem;
  transition: color 0.2s linear;
  color: #88939d;
  background: none;

  &:hover {
    color: #725ec1;
    cursor: pointer;
  }
`

const ShareButton = styled.button`
  ${ShareButtonStyle};
`
const ShareLink = styled.a`
  ${ShareButtonStyle};
`

const ShareButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0;
`

class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getScriptSrcInPost() {
    const scripts = []
    const scriptRegex = /<script[^>].*<\/script>/gi
    let match = []

    // get script tags
    while (match) {
      match = scriptRegex.exec(this.props.data.markdownRemark.html)
      if (match) {
        scripts.push(match[0])
      } else {
        break
      }
    }

    // parse src from script tags
    return scripts.map(script => {
      return /(src=)"(.+)"/.exec(script)[2]
    })
  }

  handleShareFB = () => {
    const { siteMetadata } = this.props.data.site
    FB.ui(
      {
        method: 'share',
        href: `${siteMetadata.siteUrl}${this.props.location.pathname}`,
      },
      function(response) {}
    )
  }

  getTwitterWebIntent({ text, url }) {
    return `https://twitter.com/intent/tweet?${qs.stringify({
      text, // 텍스트
      url, // 공유할 URL
    })}`
  }

  render() {
    const { markdownRemark = {}, site = {} } = this.props.data
    const { frontmatter = {}, excerpt } = markdownRemark
    const { siteMetadata = {} } = site
    const tags = frontmatter.tags || []
    const postUrl = getPostRoute(frontmatter.path)
    const title = `${frontmatter.title}`
    const description = `${
      frontmatter.subTitle ? `${frontmatter.subTitle} - ` : ''
    }${excerpt}`
    const mainImage = getMainImageFromRemark(markdownRemark.html)

    console.log(`postUrl`, postUrl)

    return (
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.tags}
          meta={[
            { name: 'author', content: siteMetadata.author },
            { name: 'description', content: description },
            { itemProp: 'name', content: title },
            { itemProp: 'description', content: description },
            { itemProp: 'image', content: mainImage },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: postUrl },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: mainImage },
            { name: 'twitter:card', content: 'summary_large_imag' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: mainImage },
          ]}
        />
        <Head>
          <link rel="canonical" href={postUrl} />
          <script type="text/javascript" async src="/js/facebook-sdk.js" />
          <script type="text/javascript" async src="/js/disqus.js" />
          <noscript>{`
            Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a>
          `}</noscript>
          <script
            type="text/javascript"
            async
            src="https://platform.twitter.com/widgets.js"
          />
          {this.getScriptSrcInPost().map((src, i) => (
            <script async src={src} type="text/javascript" key={i} />
          ))}
        </Head>

        <PostTitle>{frontmatter.title}</PostTitle>

        {frontmatter.subTitle && (
          <PostSubTitle>{frontmatter.subTitle}</PostSubTitle>
        )}

        <PostInfo>
          {frontmatter.date} &middot; 읽기 {markdownRemark.timeToRead}분
        </PostInfo>

        <TagsWrapper>
          <Tags tags={tags} />
        </TagsWrapper>

        <Post
          className="post"
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />
        <ShareButtons>
          <ShareButton onClick={this.handleShareFB}>
            <i className="fab fa-facebook fa-2x" />
          </ShareButton>
          <ShareLink
            href={this.getTwitterWebIntent({
              text: frontmatter.title,
              url: postUrl,
            })}
            target="_blank"
          >
            <i className="fab fa-twitter fa-2x" />
          </ShareLink>
        </ShareButtons>

        <div id="disqus_thread" />
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    site {
      siteMetadata {
        title
        url
        author
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      timeToRead
      html
      excerpt(truncate: true, pruneLength: 150)
      frontmatter {
        path
        title
        subTitle
        date
        layout
        tags
      }
    }
  }
`
