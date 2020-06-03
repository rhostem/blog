import React from 'react'
import Layout from '../components/layout/DefaultLayout'
import SEO from '../components/Seo'
import Head from '../components/Head'
import PostList from '../components/PostLIst'
import styled, { css } from 'styled-components'
import { mixin } from '../styles'
import { rhythm } from '../styles/typography'
import ReactPaginate from 'react-paginate'
import { navigateTo } from 'gatsby-link'

const activePageColor = '#76b835'
const currentPageStyle = css`
  font-weight: 900;
  a {
    position: relative;
    color: ${activePageColor};
    &::after {
      ${mixin.centeredX()}
      content: ' ';
      width: 50%;
      top: 80%;
      height: 2px;
      background-color: ${activePageColor};
      border-radius: 2px;
    }
  }
`

const PaginationContainer = styled.div`
  margin: ${rhythm(1)} auto;
  position: relative;
  display: block;

  & > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  & > ul > li {
    margin: 0;
    font-size: 0.8rem;
    background-color: #fff;
    line-height: 1;

    &:hover {
      cursor: pointer;
    }

    &.active {
      ${currentPageStyle};
    }

    &.previous,
    &.next {
    }

    & > a {
      display: block;
      padding: 0.7rem;
      outline: none;

      &:hover {
        color: ${activePageColor};
      }
    }
  }
`

const handlePageClick = data => {
  let { selected } = data
  selected = selected === 0 ? '' : selected + 1

  navigateTo(`/${selected}`)
}

const IndexPage = ({ data, pageContext }) => {
  return (
    <Layout>
      <SEO />
      <Head />
      <PostList postEdges={pageContext.group} />
      <PaginationContainer>
        <ReactPaginate
          previousLabel={<i className="fas fa-angle-left" />}
          nextLabel={<i className="fas fa-angle-right" />}
          breakLabel={<i className="fa fa-ellipsis-h" />}
          forcePage={pageContext.index - 1}
          breakClassName={'break-me'}
          pageCount={pageContext.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </PaginationContainer>
    </Layout>
  )
}
export default IndexPage
