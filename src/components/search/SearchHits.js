import React from 'react'
import { connectHits, Highlight } from 'react-instantsearch-dom'
import styled from 'styled-components'
import cn from 'classnames'
import Link from 'gatsby-link'
import textEllipsis from 'styles/mixin/textEllipsis'

export const indicatorHeight = '7px'

const HitHeader = styled.div`
  background: #37393f;
  color: #fff;
  padding: 5px 10px;

  &.isFirst {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    /* 역삼각형 */
    &::before {
      display: block;
      position: absolute;
      top: -${indicatorHeight};
      right: 30px;
      background: transparent;
      content: '';
      background-color: transparent;
      width: 0;
      height: 0;
      border-left: calc((${indicatorHeight} * 2) / 2) solid transparent;
      border-right: calc((${indicatorHeight} * 2) / 2) solid transparent;
      border-bottom: ${indicatorHeight} solid #37393f;
    }
  }
`

const HitList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0.8rem 0;

  & li {
    margin-bottom: 0;
  }

  & a {
    ${textEllipsis()};
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0;
    padding: 5px 10px;

    /* Highlight 위젯이 강조시키는 텍스트 클래스 */
    .ais-Highlight-highlighted {
      position: relative;
      font-style: initial;
      background: none;

      &::after {
        content: ' ';
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        height: 2px;
        top: 100%;
        background: #4c67d5;
      }
    }
  }
`

const NoResults = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #37393f;
`

function SearchHits({
  hits,
  header,
  attribute,
  getLinkUrl,
  renderHit,
  isFirst = false,
}) {
  return (
    (isFirst || hits.length > 0) && (
      <>
        <HitHeader className={cn({ isFirst: isFirst })}>{header}</HitHeader>
        <HitList>
          {hits.length === 0 && (
            <NoResults>
              <span>No results </span>
              <span role="img" aria-label="emoji">
                😵
              </span>
            </NoResults>
          )}
          {hits.map(hit => (
            <li key={hit.objectID}>
              <Link to={getLinkUrl(hit)}>
                <Highlight hit={hit} attribute={attribute} />
              </Link>
            </li>
          ))}
        </HitList>
      </>
    )
  )
}

export default connectHits(SearchHits)
