import React from 'react'
import styled from 'styled-components'
// import styles from '../styles'
import { rhythm } from '../styles/typography'

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  line-height: ${rhythm(2)};
  margin-top: ${rhythm(2)};
`

export default ({ children = '페이지 타이틀' }) => {
  return <Title>{children}</Title>
}
