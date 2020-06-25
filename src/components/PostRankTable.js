import React from 'react'
import styled from 'styled-components'
import { setHeightLimitAndEllipsis } from '../styles/mixin/setHeightLimit'
import Link from 'gatsby-link'
import { media } from 'styles/media'

export type PostRankData = {
  route: string,
  pageView: number,
}

const PostTable = styled.table`
  display: block;

  thead,
  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  tr {
    display: flex;
    &:not(:last-child) {
      border-bottom: 1px solid var(--border);
    }
  }

  th,
  td {
    display: inline-flex;
    height: 50px;
    align-items: center;
  }

  th {
    font-weight: bold;
  }

  tr {
    th,
    td {
      /* pageView count */
      &:nth-child(2) {
        margin-left: auto;
        flex-basis: 100px;
        flex-shrink: 0;
        justify-content: center;

        ${media.OVER_MOBILE} {
          flex-basis: 130px;
        }
      }
    }
  }
`

const PostTitle = styled(Link)`
  ${setHeightLimitAndEllipsis({ line: 1 })};
`

export default ({
  postList = [],
  titleMap = {},
}: {
  postList: PostRankData[],
}) => {
  return (
    <PostTable>
      <thead>
        <tr>
          <th>포스트 제목</th>
          <th style={{ minWidth: '6.5rem' }}>페이지뷰</th>
        </tr>
      </thead>
      <tbody>
        {postList.map((post: PostRankData, index) => {
          return (
            titleMap[post.route] && (
              <tr key={index}>
                <td>
                  <PostTitle to={post.route}>{titleMap[post.route]}</PostTitle>
                </td>
                <td>{post.pageView}</td>
              </tr>
            )
          )
        })}
      </tbody>
    </PostTable>
  )
}
