import Link from 'gatsby-link'
import React from 'react'
import { rhythm } from '../styles/typography'
import { wordWrap } from 'polished'
import { media } from '../styles'
import styled from 'styled-components'
import { setHeightLimitAndEllipsis } from '../styles/mixins/setHeightLimit'
import format from 'date-fns/format'

export const PostListWrap = styled.div`
  width: 100%;
  margin: ${rhythm(2)} auto;
`

const PostLink = styled(Link)`
  display: block;
  background-color: #fff;
  border-radius: 2px;
  padding-bottom: ${rhythm(0.5)};
  margin: ${rhythm(1.5)} 0;

  &:first-child {
    margin-top: 0;
  }
`

const PostTitle = styled.h2`
  ${wordWrap('default')};
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  font-size: 1.2rem;
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

const Info = styled.time`
  display: block;
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0.9rem;
`

export const PostListItem = ({
  key,
  path,
  title,
  subTitle,
  date,
  timeToRead,
}) => {
  return (
    <PostLink key={key} to={path}>
      <PostTitle>{title}</PostTitle>
      {subTitle && <PostSubTitle>{subTitle}</PostSubTitle>}
      <Info>
        {format(new Date(date), 'YYYY.MM.DD')} &middot; {timeToRead} min read
      </Info>
    </PostLink>
  )
}
