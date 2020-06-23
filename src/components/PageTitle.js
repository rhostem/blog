import styled from 'styled-components'
// import styles from '../styles'

export const PageTitle = styled.h1`
  font-weight: 700;
  padding-bottom: 0.2em;
  margin-top: 2.8rem;
  margin-bottom: 1.4rem;
  border-bottom: 1px solid
    ${({ isBordered }) => (isBordered ? '#ededed' : 'transparent')};
`

export default PageTitle
