import styled from 'styled-components'
import { media, sizes } from 'styles'
import { rhythm } from 'styles/typography'

/**
 * 페이지 컨텐츠
 */
export const ContentWrapper = styled.div`
  position: relative;
  padding-left: ${rhythm(3 / 4)};
  padding-right: ${rhythm(3 / 4)};
  margin: 0 auto;

  @media ${media.largerThanTablet} {
    width: ${sizes.mainWidthDesktop};
    padding-left: ${rhythm(1)};
    padding-right: ${rhythm(1)};
  }
`
