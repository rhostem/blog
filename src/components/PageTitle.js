import styled from 'styled-components'
// import styles from '../styles'
import { rhythm } from '../styles/typography'

export const PageTitle = styled.h1`
  font-weight: 700;
  padding-bottom: 0.2em;
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(1)};
  border-bottom: 1px solid
    ${({ isBordered }) => (isBordered ? '#ededed' : 'transparent')};
`

export default PageTitle
