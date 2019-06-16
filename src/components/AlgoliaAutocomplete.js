import React, { Component, useState, useEffect } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { connectAutoComplete } from 'react-instantsearch-dom'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import algoliasearch from 'algoliasearch/lite'

const { getPostRoute } = require('utils/routeResolver')

const Wrap = styled.div`
  ais-highlight-0000000000 {
    font-weight: bold;
  }
`

class NavbarSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      result: [],
      isResultVisible: false,
    }
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

  get isResultVisible() {
    return !!this.state.search
  }

  componentDidUpdate(prevProps, prevState) {
    // when hits updated
    if (!isEqual(this.props.hits, prevProps.hits)) {
      // if search input exists
      if (!!this.state.search) {
        this.setState({
          result: this.props.hits,
          isResultVisible: true,
        })
      } else {
        this.setState({ result: [], isResultVisible: false })
      }
    }
  }

  render() {
    return (
      <Wrap>
        <input
          type="search"
          value={this.state.search}
          onChange={this.handleChangeSearch}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
        {this.state.isResultVisible && (
          <ul>
            {this.state.result.map(hit => (
              <li key={hit.objectID}>
                <div>
                  <Link
                    to={getPostRoute(hit.path)}
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.title.value,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.body.value.slice(0, 400),
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Wrap>
    )
  }
}

export default connectAutoComplete(NavbarSearch)
