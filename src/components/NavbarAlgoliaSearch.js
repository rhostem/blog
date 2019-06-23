import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { connectAutoComplete } from 'react-instantsearch-dom'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import media from 'styles/media'
import mixin from 'styles/mixin'
import cn from 'classnames'

const { getPostRoute } = require('utils/routeResolver')

const Wrap = styled.div`
  line-height: 1.1;
  position: relative;
  transition: width 0.2s ease-out;
  margin-left: 1.5rem;
  width: 90px;

  ${media.OVER_IPHONE5} {
    width: 150px;
  }

  /* 태블릿 사이즈 이상에서는 밑줄이 늘어나는 트랜지션 적용하기 위해 기본 사이즈 작게 */
  ${media.OVER_TABLET} {
    width: 60px;
  }

  &:hover,
  &.isFocsued {
    ${media.OVER_TABLET} {
      width: 200px;
    }

    /* 밑줄 */
    &::after {
      content: ' ';
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      height: 1px;
      top: 100%;
      background: #fff;
    }
  }

  & > input {
    height: 24px;
    display: inline-flex;
    flex: 1;
    align-items: center;
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    padding: 0 12px;
    padding-left: 25px;
    outline: none;
    color: #fff;
  }
`

const SearchIcon = styled('i')`
  ${mixin.centeredY()}
  margin-top: 1px;
  left: 0;
  color: #fff;
  font-size: 0.8rem;
`

const HitList = styled.ul`
  background: #fff;
  position: fixed;
  top: 48px;
  left: 18px;
  display: inline-block;
  width: calc(100vw - 36px);
  padding: 1.2rem 0 0.6rem;
  margin: 0;
  list-style-type: none;
  font-size: 0.8rem;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

  ${media.OVER_TABLET} {
    position: absolute;
    width: 400px;
    right: initial;
    top: 35px;
    left: -30px;
  }

  &::before {
    display: block;
    position: absolute;
    top: -7px;
    right: 80px;
    background: white;
    content: '';
    background-color: transparent;
    width: 0;
    height: 0;
    border-left: calc(15px / 2) solid transparent;
    border-right: calc(15px / 2) solid transparent;
    border-bottom: 7px solid white;

    ${media.OVER_TABLET} {
      right: initial;
      left: 30px;
    }
  }
`

const HitItem = styled.li`
  line-height: 1.4;
  padding: 0.6rem 1rem;

  &:not(:first-child) {
    margin-top: 0.6rem;
  }

  &:hover {
    background: rgba(29.8%, 40.4%, 83.5%, 0.1);
  }
`

const HitPostTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`

const HitArea = styled.div`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: #797979;
  line-height: 1.5;

  /* 결과 하이라이트 */
  highlight {
    position: relative;

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
`

class NavbarAlgoiaSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      result: [],
      isResultReady: false,
      isFocused: false,
    }

    this.inputRef = React.createRef()
  }

  defaultHits = []

  handleChangeSearch = e => {
    const { value } = e.target
    this.setState({ search: value })
    this.debouncedRefine(value)
  }

  debouncedRefine = debounce(search => {
    this.props.refine(search)
  }, 400)

  componentDidMount() {
    this._isMounted = true
  }

  componentDidUpdate(prevProps, prevState) {
    // when hits updated
    if (!isEqual(this.props.hits, prevProps.hits)) {
      // if search input exists
      if (!!this.state.search) {
        this.setState({
          result: this.props.hits,
          isResultReady: true,
        })
      } else {
        this.setState({ result: [], isResultReady: false })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  get isResultVisible() {
    return (
      this.state.isResultReady &&
      this.state.result.length > 0 &&
      this.state.isFocused === true
    )
  }

  setFocusOnInputEl = () => {
    this.inputRef.current.focus()
  }

  render() {
    return (
      <Wrap
        className={cn({
          isFocsued: this.state.isFocused || !!this.state.search,
        })}>
        <SearchIcon className="fa fa-search" onClick={this.setFocusOnInputEl} />
        <input
          // placeholder="검색"
          ref={this.inputRef}
          type="search"
          value={this.state.search}
          onChange={this.handleChangeSearch}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={
            () =>
              setTimeout(() => {
                if (this._isMounted) {
                  this.setState({ isFocused: false })
                }
              }, 200) // click delay
          }
        />
        {this.isResultVisible && (
          <HitList>
            {this.state.result.map(hit => (
              <HitItem key={hit.objectID}>
                <Link to={getPostRoute(hit.path)}>
                  <HitPostTitle
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.title.value,
                    }}
                  />

                  <HitArea
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        // 하이라이트 단어 있는 곳 시작점에서 바운더리를 주고 잘라낸다
                        const value = hit._highlightResult.body.value
                          .replace(/ais-highlight-0000000000/g, 'highlight')
                          .replace(/\n\\n\r\\r/g, '')

                        const firstHighlightIndex = value.indexOf('<highlight>')

                        const result = value
                          .slice(
                            firstHighlightIndex - 10 < 0
                              ? 0
                              : firstHighlightIndex - 10,
                            firstHighlightIndex + 80
                          )
                          .concat(`<span>...</span>`)

                        return result
                      })(),
                    }}
                  />
                </Link>
              </HitItem>
            ))}
          </HitList>
        )}
      </Wrap>
    )
  }
}

export default connectAutoComplete(NavbarAlgoiaSearch)
