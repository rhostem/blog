import { createGlobalStyle } from 'styled-components'
import { fontFace } from 'polished'
import materialOceanic from 'styles/prism_themes/materialOceanic'

export const GlobalStyle = createGlobalStyle`
  ${fontFace({
    fontFamily: 'Menlo Regular',
    fontFilePath: '/fonts/menlo-regular',
  })}

  h1, h2, h3 {
    code {
      word-break: break-all !important;
    }
  }

  .iframe-video-wrapper {
    position: relative;
    display: block;
    padding-bottom: 56.25%;
    margin: 3.2rem 0;
  }

  .iframe-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /**
   * gatsby-remark-images-contentful 플러그인의 오류 때문에 강제 스타일 추가.
   * 이미지 로딩 완료 후 opacity를 1에서 0으로 변경해버리는 오류가 있음.
   */
  .gatsby-resp-image-background-image {
    opacity: 1 !important;
  }

  .gatsby-resp-image-link {
    &::after {
      display: none !important;
    }
  }


  .footnote-ref {
    margin: 0 0.2em;
  }

  ${materialOceanic}
`
