import React from 'react'
import _ from 'lodash'
import { connectSearchBox, connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'
import media from 'styles/media'
import mixin from 'styles/mixin'
import * as R from 'ramda'

const Wrap = styled.div`
  width: 38vw;
  padding: 2px 5px;
  border-radius: 4px;
  background: #eee2;

  ${media.UNDER_MOBILE_SMALL} {
    width: 35vw;
  }

  ${media.OVER_MOBILE} {
    width: 250px;
  }
`

const SearchInput = styled.input`
  height: 24px;
  display: inline-flex;
  align-items: center;
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  padding: 0 12px;
  padding-left: 25px;
  outline: none;
  color: #fff;
  font-size: 16px;
`

const SearchIcon = styled('i')`
  ${mixin.centeredY()}
  margin-top: 1px;
  left: 8px;
  color: #fff;
  font-size: 0.8rem;
`

/**
 * Algolia 커스텀 Autocomplete

 * https://www.algolia.com/doc/api-reference/widgets/autocomplete/react/
 */
function SearchBox({
  refine = () => {}, // 검색 실행
  currentRefinement = '',
  isSearchStalled = '',
  onChangeCurrentSearch = v => {},
}) {
  // 검색 실행
  const debouncedRefine = _.debounce(refine, 400)

  const handleChange = e => {
    const { value } = e.target
    debouncedRefine(value)
  }

  return (
    <Wrap>
      <SearchIcon className="fa fa-search" />
      <SearchInput type="search" onChange={handleChange} />
    </Wrap>
  )
}

export default R.compose(
  connectSearchBox,
  connectStateResults
)(SearchBox)
