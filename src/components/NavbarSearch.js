import React, { Component } from 'react'
import { debounce } from 'throttle-debounce'
import styled from 'styled-components'
import { centeredY } from '../styles/mixin'
import SearchResult from './SearchResult'
import media from '../styles/media'
import SearchService from '../service/SearchService'
import * as R from 'ramda'
import { navigateTo } from 'gatsby-link'

const Wrap = styled.div`
  position: relative;
  height: 1.8rem;
  min-width: 1.8rem;
`

const SearchInput = styled.input`
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  width: 0;
  padding-left: 1.8rem;

  &:focus {
    padding: 0 1rem 0 1.8rem;
    width: 130px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${media.overMobile} {
    width: 180px;
    &:focus {
      width: 180px;
    }
  }

  transition: all 0.3s linear;
`

const SearchIcon = styled('i')`
  ${centeredY};
  left: 0.4em;
  color: #fff;
`

export type RouteData = {
  title: string,
  route: title,
  tags: string[],
}

export type WordMap = {
  [wordId: string]: {
    r: number[],
  },
}

export type ResultPostRoute = {
  data: RouteData,
  point: number, // 검색 매칭 포인트
}
export type ResultTagRoute = {
  name: string,
  route: string,
}

type Props = {}
type State = {
  search: string, // 검색 입력
  isInputFocused: boolean, // 입력창 포커스 여부
  resultPostRoutes: ResultPostRoute[], // 결과 포스트 목록
  resultTagRoutes: ResultTagRoute[], // 결과 태그 목록
}

class NavbarSearch extends Component<Props, State> {
  MAX_REULST_VISIBLE = 7
  wordList: string[] = []
  wordMap: WordMap = {}

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      highlightedResultIdx: null,
      isInputFocused: false,
      resultPostRoutes: [],
      resultTagRoutes: [],
    }

    this.inputRef = null
  }

  componentDidMount() {
    SearchService.addMessageListener({
      onReceiveSearchResult: this.handleReceiveSearchResult,
    })
  }

  componentDidUpdate(prevProps, prevState) {}

  get resultPostRoutesVisible() {
    return R.take(this.MAX_REULST_VISIBLE, this.state.resultPostRoutes)
  }

  get resultTagRoutesVisible() {
    return R.take(this.MAX_REULST_VISIBLE, this.state.resultTagRoutes)
  }

  get isResultReady() {
    return (
      this.state.resultPostRoutes.length > 0 ||
      this.state.resultTagRoutes.length > 0
    )
  }

  get isSearchResultVisible() {
    return this.isResultReady && this.state.isInputFocused
  }

  get allResultRoutes() {
    return R.concat(
      this.resultPostRoutesVisible.map(({ data }) => data.route),
      this.resultTagRoutesVisible.map(({ route }) => route)
    )
  }

  get allResultLength() {
    return this.allResultRoutes.length
  }

  /**
   * web worker에서 발생하는 onmessage 콜백을 ㅇ등록한다.
   */
  handleReceiveSearchResult = ({
    resultPostRoutes = [],
    resultTagRoutes = [],
  }) => {
    this.setState({
      resultPostRoutes,
      resultTagRoutes,
    })
  }

  handleChangeInput = e => {
    this.setState({ search: e.target.value, highlightedResultIdx: null })
    this.search(e.target.value)
  }

  handleOnFocusInput = () => {
    const el = document.getElementById('searchInput')
    el.focus()

    this.setState({ isInputFocused: true })
  }

  handleOnBlurInput = () => {
    setTimeout(() => {
      this.setState({ isInputFocused: false })
    }, 300)
  }

  search = debounce(400, input => {
    SearchService.find(input)
  })

  isArrowUp = keyCode => keyCode === 38
  isArrowDown = keyCode => keyCode === 40
  isEnter = keyCode => keyCode === 13

  /**
   * 결과 입력 창에서 위아래 버튼 입력
   */
  handleInputKeydown = e => {
    const keyCode = e.which

    const getNextIdx = (idx, isArrowDown) => {
      return (
        ((isArrowDown ? R.inc(idx) : R.dec(idx)) + this.allResultLength) %
        this.allResultLength
      )
    }

    // 결과가 표시된 상태에서 위아래 키를 누르면 하이라이트 항목이 변경된다.
    if (
      this.isResultReady &&
      (this.isArrowUp(e.which) || this.isArrowDown(e.which))
    ) {
      let nextIdx = 0

      if (R.isNil(this.state.highlightedResultIdx)) {
        // 하이라이트된 항목이 없음

        if (this.isArrowDown(keyCode)) {
          nextIdx = 0 // 첫번째
        } else if (this.isArrowUp(keyCode)) {
          nextIdx = getNextIdx(0, false)
        }
      } else {
        // 하이라이트된 항목 있음
        nextIdx = getNextIdx(
          this.state.highlightedResultIdx,
          this.isArrowDown(keyCode)
        )
      }

      this.setState({
        highlightedResultIdx: nextIdx,
      })
    }

    const isResultSelectableWithEnter =
      this.isEnter(keyCode) &&
      R.not(R.isNil(this.state.highlightedResultIdx)) &&
      this.isSearchResultVisible

    if (isResultSelectableWithEnter) {
      navigateTo(this.allResultRoutes[this.state.highlightedResultIdx])
    }
  }

  render() {
    return (
      <Wrap onClick={this.handleOnFocusInput}>
        <SearchIcon className="fa fa-search" />
        <SearchInput
          id="searchInput"
          type="text"
          placeholder="검색"
          value={this.state.search}
          onChange={this.handleChangeInput}
          onFocus={this.handleOnFocusInput}
          onBlur={this.handleOnBlurInput}
          onKeyDown={this.handleInputKeydown}
          ref={input => {
            this.inputRef = input
          }}
        />
        <SearchResult
          resultPostRoutes={this.resultPostRoutesVisible}
          resultTagRoutes={this.resultTagRoutesVisible}
          isVisible={this.isSearchResultVisible}
          highlightedResultIdx={this.state.highlightedResultIdx}
          postStartIndex={0} // 전체 결과 중 포스트 결과 시작 인덱스
          tagStartIndex={this.resultPostRoutesVisible.length}
        />
      </Wrap>
    )
  }
}

export default NavbarSearch
