import React, { useState } from 'react'
import { connectAutoComplete } from 'react-instantsearch-dom'
import styled from 'styled-components'
import media from 'styles/media'
import mixin from 'styles/mixin'

const Wrap = styled.div`
  width: 45vw;
  padding: 2px 5px;
  border-radius: 4px;
  background: #eee2;

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
  defaultRefinement = '',
  currentRefinement = '',
  isSearchStalled = '',
  onChange = v => {},
  onKeyDown = keycode => {},
}) {
  const [input, setInput] = useState(defaultRefinement)

  const handleChange = e => {
    const { value } = e.target
    setInput(value)
    onChange(value)
    // invokeRefine(value)
    refine(value)
  }

  return (
    <Wrap>
      <SearchIcon className="fa fa-search" />
      <SearchInput
        type="text"
        value={input}
        onChange={handleChange}
        onKeyUp={e => onKeyDown(e.key)}
      />
    </Wrap>
  )
}

export default connectAutoComplete(SearchBox)
