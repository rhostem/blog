import React, { useCallback, useState, useEffect, useRef } from 'react'
import { InstantSearch, Index } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import SearchBox from './SearchBox'
import styled from 'styled-components'
import SearchHits, { indicatorHeight } from './SearchHits'
import media from 'styles/media'

const { getPostRoute, getTagRoute } = require('utils/routeResolver')

const Wrap = styled.div`
  position: relative;
  margin-left: auto;
`

const HitsWrapper = styled.div`
  position: absolute;
  top: calc(100% + ${indicatorHeight});
  width: 70vw;
  right: 0;
  background: var(--body);
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;

  ${media.OVER_MOBILE} {
    font-size: 0.9rem;
    width: 500px;
    right: 0;
  }
`

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

/**
 * custom search client
 */
const searchClient = {
  search(requests) {
    // 입력이 없는 상태에서 검색을 실행하지 않게 한다
    const isEmtpyQuery = requests.every(request => !request.params.query)

    if (!isEmtpyQuery) {
      return algoliaClient.search(requests)
    } else {
      // return empty promise
      return new Promise(res => {}, rej => {})
    }
  },
}

/**
 * custom algolia React instantsearch
 *
 * https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/
 */
function CustomInstantSearch() {
  const [isFocused, setIsFocused] = useState(false)
  const focusTimeoutRef = useRef()

  const handleFocusOut = useCallback(
    () => {
      // 링크 클릭 후 blur 처리할 수 있도록 딜레이
      focusTimeoutRef.current = setTimeout(() => {
        setIsFocused(false)
      }, 200)
    },
    [setIsFocused]
  )

  const handleFocusIn = useCallback(
    () => {
      setIsFocused(true)
    },
    [setIsFocused]
  )

  useEffect(() => {
    return () => {
      // handleFocusOut이 unmount 후에 실행될 수 있다.
      // 그래서 unmount 시점에 clearTimeout을 해준다
      clearTimeout(focusTimeoutRef.current)
    }
  }, [])

  return (
    <Wrap onFocus={handleFocusIn} onBlur={handleFocusOut}>
      <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_POSTS}
        searchClient={searchClient}>
        <SearchBox defaultRefinement={''} />

        <HitsWrapper>
          <Index indexName={process.env.GATSBY_ALGOLIA_INDEX_POSTS}>
            <SearchHits
              isFirst
              isFocusedOnInput={isFocused}
              heading={'Posts'}
              attribute="title"
              getLinkUrl={hit => getPostRoute(hit.path)}
            />
          </Index>
          <Index indexName={process.env.GATSBY_ALGOLIA_INDEX_TAGS}>
            <SearchHits
              heading={'Tags'}
              attribute="tag"
              isFocusedOnInput={isFocused}
              getLinkUrl={hit => getTagRoute(hit.tag)}
            />
          </Index>
        </HitsWrapper>
      </InstantSearch>
    </Wrap>
  )
}

export default CustomInstantSearch
