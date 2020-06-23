import React from 'react'
import styled from 'styled-components'
import { clearFix } from 'polished'
import Link from 'gatsby-link'
import { getTagRoute } from '../../static/js/searchUtil'

const Wrapper = styled.div`
  margin-left: -0.3rem;
  ${clearFix()};
`

const Tag = styled.span`
  font-size: ${props => props.fontSizeVal};
  font-weight: 400;
  display: block;
  float: left;
  padding: 0.25em 0.625em;
  margin-bottom: 0.35em;
  margin-left: 0.35em;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.smoke};
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.calm};
  }
`

type TagProps = {
  tags: Array<string>,
  fontSize?: string,
}

/**
 * 태그 목록 컴포넌트. 태그 클릭시 해당 태그를 포함하고 있는 포스트 목록 페이지로 이동한다.
 *
 * @param {{ tags: Array<string> }} { tags }
 * @returns
 */
function Tags({ tags, fontSize = '0.8rem' }: TagProps) {
  return (
    <Wrapper>
      {tags.map((tag: string) => (
        <Tag key={tag} fontSizeVal={fontSize}>
          <Link to={getTagRoute(tag)}>{tag}</Link>
        </Tag>
      ))}
    </Wrapper>
  )
}

export default Tags
