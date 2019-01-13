import React from 'react'
import styled from 'styled-components'
// import styles from '../styles'
import { rhythm } from '../styles/typography'

export const PageTitleComp = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(1)};
`

export default ({ children = '페이지 타이틀', style = {} }) => {
  return <PageTitleComp style={style}>{children}</PageTitleComp>
}
