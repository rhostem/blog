import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { clearFix } from 'polished'
import { media, sizes } from '../styles'
import { rhythm } from '../styles/typography'
import Tags from '../components/Tags'
import Img from 'gatsby-image'
import * as R from 'ramda'
import qs from 'qs'
import { css } from 'styled-components'
import { setHeightLimitAndEllipsis } from '../styles/mixins/setHeightLimit'
import { getPostPath } from 'utils/getPostPath'

const PostTitle = styled.h1`
  text-align: left;
  margin-bottom: ${rhythm(0.5)};
`

const PostSubTitle = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  ${setHeightLimitAndEllipsis({
    line: 2,
    lineHeight: '2.4rem',
  })};
`

const PostInfo = styled.div`
  ${clearFix()};
  font-size: 0.9rem;
`

const TagsWrapper = styled.div`
  margin-top: ${rhythm(1 / 2)};
`

const MainImageArea = styled.div`
  width: 100%;
  max-width: ${sizes.postMainImageMax};
  margin: ${rhythm(2)} auto 0;
`

const MainImageAlt = styled.em`
  font-size: 0.8rem;
  line-height: 1.4;
  display: block;
  width: calc(100% - ${rhythm(2)});
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(3)};
  color: hsla(291, 0%, 18%, 0.5);
  & a {
    color: hsla(291, 0%, 18%, 0.5);
  }

  ${media.largerThanTablet} {
    width: 90%;
  }
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

  getScriptSrc() {
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
    const { frontmatter = {} } = markdownRemark
    const { siteMetadata = {} } = site
    const tags = frontmatter.tags || []
    const postUrl = getPostPath(frontmatter)
    const title = `${frontmatter.title}`
    const description = frontmatter.description || frontmatter.subTitle || ''
    const mainImage =
      `${siteMetadata.siteUrl}${R.path(
        ['mainImage', 'childImageSharp', 'sizes', 'src'],
        frontmatter
      )}` || `${siteMetadata.siteUrl}/image/logo-192x192.png`

    return (
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.tags || []}
          meta={[
            { name: 'author', content: siteMetadata.author },
            { name: 'keywords', content: tags.join(`,`) },
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
          <script
            type="text/javascript"
            async
            src="https://platform.twitter.com/widgets.js"
          />
          {this.getScriptSrc().map((src, i) => (
            <script async src={src} type="text/javascript" key={i} />
          ))}
        </Head>

        <PostTitle>{frontmatter.title}</PostTitle>
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
            <i className="fa fa-2x fa-facebook-square" />
          </ShareButton>

          <ShareLink
            href={this.getTwitterWebIntent({
              text: frontmatter.title,
              url: postUrl,
            })}
            target="_blank"
          >
            <i className="fa fa-2x fa-twitter" />
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
      frontmatter {
        tags
        title
        subTitle
        path
        date
        description
      }
    }
  }
`
