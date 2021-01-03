import React, { Component } from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/Seo'
import Head from 'components/Head'
import Layout from 'components/layout/DefaultLayout'
import styled from 'styled-components'
import { clearFix } from 'polished'
import Tags from '../components/Tags'
import qs from 'qs'
import { css } from 'styled-components'
import { getPostRoute } from 'utils/routeResolver'
import { getMainImageFromRemark } from 'utils/getMainImageFromRemark'
import * as R from 'ramda'
import PageTitle from '../components/PageTitle'
import { format } from 'date-fns'

const PostTitle = styled(PageTitle)`
  text-align: left;
  margin-bottom: 0.7rem;
`

const PostSubTitle = styled.p`
  margin: 0.7rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text);
`

const PostInfo = styled.div`
  ${clearFix()};
  font-size: 0.9rem;
`

const TagsWrapper = styled.div`
  margin-top: 0.7rem;
`

const Post = styled.div`
  margin-top: 2.8rem;
  margin-bottom: 2.8rem;
`

const ShareButtonStyle = css`
  border: none;
  display: block;
  padding: 0;
  margin: 0 0.75rem;
  transition: color 0.2s linear;
  color: var(--link);
  background: none;

  &:hover {
    color: var(--linkHover);
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

const DisqusThread = styled.div`
  padding: 0.5rem 1rem 1rem;
  background: var(--disqusBackground);
  border-radius: 10px;
`

/**
 *
 */
class PostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  get postUrl() {
    return `${this.props.data.site.siteMetadata.url}${getPostRoute(
      R.path(['data', 'markdownRemark', 'frontmatter', 'path'], this.props)
    )}`
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
    FB.ui(
      {
        method: 'share',
        href: this.postUrl,
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
    const postUrl = this.postUrl
    const title = `${frontmatter.title}`
    const description = `${
      frontmatter.subTitle ? `${frontmatter.subTitle} - ` : ''
    }${excerpt}`
    const mainImage = getMainImageFromRemark(markdownRemark.html)

    let metaTags = [
      { name: 'author', content: siteMetadata.author },
      { name: 'description', content: description },
      { itemProp: 'name', content: title },
      { itemProp: 'description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: postUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ]

    // 메인이미지가 있을 때만 이미지 관련 메타태그를 추가한다.
    if (mainImage) {
      metaTags = metaTags.concat([
        { itemProp: 'image', content: mainImage },
        { property: 'og:image', content: mainImage },
        { name: 'twitter:image', content: mainImage },
      ])
    }

    return (
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.tags}
          meta={metaTags}
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
          {format(frontmatter.date, 'YYYY-MM-DD')} &middot;{' '}
          {markdownRemark.timeToRead} min to read
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
            rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </ShareLink>
        </ShareButtons>

        <DisqusThread id="disqus_thread" />
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
