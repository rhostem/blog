import Link from 'gatsby-link'
import React from 'react'
import PropTypes from 'prop-types'
import { rhythm } from '../styles/typography'
import { wordWrap } from 'polished'
import { media } from '../styles'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { setHeightLimitAndEllipsis } from '../styles/mixins/setHeightLimit'
import { clearFix } from 'polished'
import styledMap from 'styled-map'

const ListWrapper = styled.ul`
  width: 100%;
  margin: ${rhythm(1)} auto;
`

const PostLink = styled(Link)`
  ${clearFix()};
  display: block;
  background-color: #fff;
  border-radius: 2px;
  padding-bottom: ${rhythm(0.5)};
  margin: ${rhythm(1.5)} 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    /* margin-bottom: 0; */
  }
`

const imageWidthDesktop = '182px'
const imageHeigtDesktop = `${parseInt(imageWidthDesktop, 10) * 0.75}px`

const imageWidthMobile = '80px'
const imageHeigtMobile = `${parseInt(imageWidthMobile, 10)}px`

const PostImageWrap = styled.div`
  float: right;
  overflow: hidden;

  & .gatsby-image-outer-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.09);
    position: relative;
    width: ${imageWidthMobile};
    height: ${imageHeigtMobile};
    @media ${media.largerThanTablet} {
      width: ${imageWidthDesktop};
      height: ${imageHeigtDesktop};
    }
    overflow: hidden;
  }

  & .gatsby-image-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const PostInfo = styled.div`
  float: left;
  width: ${styledMap`
    isFullWidth: 100%;
    withImage: calc(100% - ${imageWidthMobile})
  `};

  @media ${media.largerThanTablet} {
    width: ${styledMap`
      isFullWidth: 100%;
      withImage: calc(100% - ${imageWidthDesktop})
    `};
  }

  padding-right: ${styledMap`
    isFullWidth: 0;
    withImage: ${rhythm(1)};
  `};
`

const PostTitle = styled.h2`
  ${wordWrap('default')};
  font-weight: bold;
  line-height: 1.4;
  margin: 0;
  font-size: 1.1rem;
  @media ${media.largerThanTablet} {
    font-size: 1.4rem;
  }
`
const PostSubTitle = styled.h3`
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 400;
  margin: 0.5rem 0 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  ${setHeightLimitAndEllipsis({
    line: 2,
  })};
`

const test = ''
const PostCreatedAt = styled.time`
  display: block;
  font-size: 0.7rem;
  @media (${test}) {
    font-size: 0.85rem;
  }
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0.9rem;
`

/**
 * 포스트 목록
 *
 * @class PostList
 * @extends {Component}
 */
class PostList extends React.Component {
  static propTypes = {
    posts: PropTypes.array,
  }

  render() {
    const posts = this.props.posts

    return (
      <ListWrapper>
        {posts.map(post => (
          <PostLink key={post.node.fields.slug} to={post.node.fields.slug}>
            <PostInfo
              isFullWidth={!post.node.frontmatter.mainImage}
              withImage={!!post.node.frontmatter.mainImage}
            >
              <PostTitle>{post.node.frontmatter.title}</PostTitle>
              {post.node.frontmatter.subTitle && (
                <PostSubTitle>{post.node.frontmatter.subTitle}</PostSubTitle>
              )}
              <PostCreatedAt>{post.node.frontmatter.date}</PostCreatedAt>
            </PostInfo>
            {post.node.frontmatter.mainImage && (
              <PostImageWrap>
                <Img
                  sizes={post.node.frontmatter.mainImage.childImageSharp.sizes}
                />
              </PostImageWrap>
            )}
          </PostLink>
        ))}
      </ListWrapper>
    )
  }
}

export default PostList
