import React from 'react'
import styled from 'styled-components'
import { setHeightLimitAndEllipsis } from '../styles/mixins/setHeightLimit'
import Link from 'gatsby-link'

export type PostRankData = {
  route: string,
  pageView: number,
}

const PostTable = styled.table`
  th {
    font-weight: bold;
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
            <tr key={index}>
              <td>
                <PostTitle to={post.route}>
                  {titleMap[post.route] || post.route}
                </PostTitle>
              </td>
              <td>{post.pageView}</td>
            </tr>
          )
        })}
      </tbody>
    </PostTable>
  )
}
