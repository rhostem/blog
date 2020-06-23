import styled from 'styled-components'
import { media, sizes } from 'styles'

/**
 * 페이지 컨텐츠
 */
export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-left: 1.05rem;
  padding-right: 1.05rem;
  margin: 0 auto;

  ${media.OVER_MOBILE} {
    width: ${sizes.mainWidthDesktop};
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }
`
