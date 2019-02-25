import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { ellipsis } from 'polished'
import media from '../styles/media'
import { ResultPostRoute, ResultTagRoute } from './NavbarSearch'
const classNames = require('classnames')

const Wrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 2.1rem;
  right: -4.5rem;
  width: 300px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid #2e2e2e;
  box-shadow: 1px 1px 5px rgba(46, 46, 46, 0.3);
  background-color: #fff;

  @media ${media.largetThanMobile} {
    width: 450px;
    right: 0;
  }
`

const NoResult = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  text-align: center;
  font-weight: bold;
`

// 결과 하이라이트 배경색
const resultHighlightedBg: 'inherit' = `rgba(42, 42, 42, 0.1)`

const RouteLink = styled(Link)`
  ${ellipsis('100%')};
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  margin: 0;
  margin: 0;

  &.is-highlighted {
    background-color: ${resultHighlightedBg};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #2e2e2e;
  }

  &:hover {
    background-color: ${resultHighlightedBg};
  }
`

const ResultSectionHeader = styled.div`
  padding: 0.45rem 1rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: #24272e;
`

type Props = {
  resultPostRoutes: ResultPostRoute[],
  resultTagRoutes: ResultTagRoute[],
  isVisible: boolean,
  highlightedResultIdx?: number,
  postStartIndex: number,
  tagStartIndex: number,
}

class SearchResult extends Component<Props> {
  get isNoResultTextVisible() {
    return (
      this.props.resultPostRoutes.length === 0 &&
      this.props.resultTagRoutes.length === 0
    )
  }

  render() {
    return (
      this.props.isVisible && (
        <Wrap>
          {this.isNoResultTextVisible ? (
            <NoResult>검색 결과가 없습니다.</NoResult>
          ) : (
            <div>
              {this.props.resultPostRoutes.length > 0 && (
                <div>
                  <ResultSectionHeader>포스트</ResultSectionHeader>
                  {this.props.resultPostRoutes.map((route, index) => (
                    <RouteLink
                      key={index}
                      to={route.data.route}
                      className={classNames({
                        'is-highlighted':
                          index + this.props.postStartIndex ===
                          this.props.highlightedResultIdx,
                      })}>
                      {route.data.title}
                    </RouteLink>
                  ))}
                </div>
              )}
              {this.props.resultTagRoutes.length > 0 && (
                <div>
                  <ResultSectionHeader>태그</ResultSectionHeader>
                  {this.props.resultTagRoutes.map((tagRoute, index) => (
                    <RouteLink
                      key={tagRoute.name}
                      to={tagRoute.route}
                      className={classNames({
                        'is-highlighted':
                          index + this.props.tagStartIndex ===
                          this.props.highlightedResultIdx,
                      })}>
                      {tagRoute.name}
                    </RouteLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </Wrap>
      )
    )
  }
}

export default SearchResult
