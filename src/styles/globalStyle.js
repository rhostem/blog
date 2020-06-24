import { createGlobalStyle } from 'styled-components'
import { fontFace } from 'polished'
import media from 'styles/media'
import { sizes } from 'styles/sizes'
import { normalize } from 'polished'
import materialOceanic from 'styles/prism_themes/materialOceanic'

const TEXT_RGB_LIGHT = '46, 46, 46' // #2E2E2E
const TEXT_RGB_DARK = '215, 215, 215' // #D7D7D7

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  ${fontFace({
    fontFamily: 'Menlo Regular',
    fontFilePath: '/fonts/menlo-regular',
  })}

  /* 코드블럭 테마 */
  /* var(--codeBlockTheme) */
  ${materialOceanic}

  * {
    font-size: inherit;
    box-sizing: border-box;
  }

  html {
    font-size: ${sizes.baseFontSize};
    line-height: ${sizes.baseLineHeight};
    font-family:  Nanum Square, Roboto, Spectral, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;

    ${media.OVER_MOBILE} {
      font-size: ${(17 / 16) * 100}%;
    }
    ${media.OVER_TABLET} {
      font-size: ${(18 / 16) * 100}%;
    }
  }

  body {
    &.light {
      --green: #76b835;
      --black: rgba(${TEXT_RGB_LIGHT} ,1);
      --text: rgba(${TEXT_RGB_LIGHT} ,0.95);
      --light: rgba(${TEXT_RGB_LIGHT} ,0.5);
      --calm: rgba(${TEXT_RGB_LIGHT} ,0.2);
      --smoke: rgba(${TEXT_RGB_LIGHT} ,0.1);
      --whiteSmoke: rgba(${TEXT_RGB_LIGHT} ,0.02);
      --white: #fff;
      --link: #2e2e2e;
      --linkHover: #4568dc;
      --body: #fff;
      --border: rgba(${TEXT_RGB_LIGHT}, 0.2);
      --hrBackgroundImage: linear-gradient(90deg,rgba(${TEXT_RGB_LIGHT},.2), rgba($--{TEXT_RGB_LIGHT},.75), rgba(${TEXT_RGB_LIGHT},.2));
      --navbarBg: linear-gradient(to right, #4568dc, #b06ab3);
      --navbarColor: #fff;
      --codeBlock: #f5f2f0;
      --codeInline: #f5f2f0;
      --loadingSpinner: #333;
      --blockquoteBackground: #f5f5f5;
      --disqusBackground: transparent;
    }

    &.dark {
      --green: #76b835;
      --black: rgba(${TEXT_RGB_DARK} ,1);
      --text: rgba(${TEXT_RGB_DARK} ,0.9);
      --light: rgba(${TEXT_RGB_DARK} ,0.5);
      --calm: rgba(${TEXT_RGB_DARK} ,0.2);
      --smoke: rgba(${TEXT_RGB_DARK} ,0.1);
      --whiteSmoke: rgba(${TEXT_RGB_DARK} ,0.02);
      --white: #fff;
      --link: rgba(${TEXT_RGB_DARK}, 1);
      --linkHover: #0DBC79;
      --body: #4A4A4D;
      --border: rgba(${TEXT_RGB_DARK}, 0.2);
      --hrBackgroundImage: linear-gradient(90deg, rgba(${TEXT_RGB_DARK},.2), rgba(${TEXT_RGB_DARK},.75), rgba(${TEXT_RGB_DARK},.2));
      --navbarBg: #282C35;
      --navbarColor: #fff;
      --codeBlock: #282C35;
      --codeInline: rgba(40, 44, 53, 0.3);
      --loadingSpinner: #EFEFEF;
      --blockquoteBackground: rgba(${TEXT_RGB_DARK}, 0.1);
      --disqusBackground: #F2F2F2;
    }

    margin: 0;
    color: var(--black);
  }

  a {
    color: var(--link);
    border-color: var(--link);
    text-decoration: none;
    word-break: break-all;
  }

  button {
    outline: none;
    &:hover {
      cursor: pointer;
    }

  }

  hr {
    margin: 3.5rem auto;
    width: 50%;
    height: 1px;
    color: var(--black);
    background: var(--smoke);
    background-image: var(--hrBackgroundImage);
    border: none;
  }

  p {
    line-height: 1.71rem;

    & > img {
      margin-bottom: 1.4rem;

      & + em {
        font-size: 0.9em;
        line-height: 1.4;  display: block;
        text-align: center;
        margin-bottom: 2.8rem;
        color: var(--light);
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--black);
    font-weight: 700;


    & > code {
      word-break: break-word !important;
    }
  }

  h1 {
    font-size: 2.1rem;
    line-height: 1.4;
    margin-top: 5.6rem;
    margin-bottom: 2.4rem;
  }

  h2 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-top: 4.2rem;
    margin-bottom: 2.4rem;

    ${media.OVER_MOBILE} {
      font-size: 1.8rem;
    }
  }

  h3 {
    font-size: 1.3rem;
    line-height: 1.4;
    margin-top: 2.8rem;
    margin-bottom: 1.4rem;

    ${media.OVER_MOBILE} {
      font-size: 1.6rem;
    }
  }

  h4 {
    font-size: 1.2rem;
    margin-top: 2.4rem;
    margin-bottom: 1.4rem;
  }

  h5 {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
  }

  h6 {
    font-size: 1rem;
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
  }

  blockquote {
    border-left: 3px solid var(--linkHover);
    background: var(--blockquoteBackground);
    margin-left: -0.1rem;
    margin-right: -0.1rem;
    margin-top: 2.8rem;
    margin-bottom: 2.8rem;
    padding: 1.75rem 1rem;

    & > p {
      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

    }

    ${media.OVER_MOBILE} {
      margin-left: 0;
      margin-right: 0;
    }
  }

  ul {
    padding-left: 1.4rem;
  }

  li {
    line-height: 1.71rem;
    margin-bottom: 0.5rem;
  }


  code,
  pre,
  tt,
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: Menlo, Consolas, 'Roboto Mono', 'Droid Sans Mono', 'Liberation Mono', Courier, monospace;
    font-variant: none;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-size: 0.9em;
  }

  /* 코드 블럭이 아닌 곳의 코드 하이라이팅 */
  :not(pre) > code[class*='language-'] {
    display: inline-flex;
    line-height: 1.4em;
    border-radius: 0.3em;
    background: var(--codeInline);
    min-height: 1.4em;
    align-items: center;
    font-size: 0.8em;
    padding: 0 0.3em;
  }

  /* Style gatsby-remark-images elements. */
  .gatsby-resp-image-link {
    box-shadow: none;
    margin-top: 2.8rem;
    margin-bottom: 2.8rem;

    &::after {
      display: none !important;
    }

    @media only screen and (min-width:38rem) {
      border-radius: .15rem;
      overflow: hidden;
    }
  }

  .gatsby-resp-image-link:hover {
    background: none;
    box-shadow: none;
  }

  /**
   * gatsby-remark-images-contentful 플러그인의 오류 때문에 강제 스타일 추가.
   * 이미지 로딩 완료 후 opacity를 1에서 0으로 변경해버리는 오류가 있음.
   */
  .gatsby-resp-image-background-image {
    opacity: 1 !important;
  }

  /* Pull highlighted code blocks and iframes into the horizontal */
  /* padding of their container. */
  /* Note that we only do this for code blocks that are direct children of */
  /* .post so that code blocks are correctly indented e. g. in lists. */
  .post > .gatsby-highlight, .gatsby-resp-iframe-wrapper {
    /* margin-left: -0.1rem; 3/4 rhythm is amount of padding on mobile. */
    margin-right: -0.1rem;
  }

  /* Fake image captions. */
  .post .gatsby-resp-image-link + em {
    display: block;
    margin-top: -1.4rem;
    margin-bottom: 2.8rem;
    line-height: 1.4;
    text-align: center;
    font-size: 0.8em;
    font-style: normal;
  }

  .post .gatsby-resp-image-link + em > a {
    background-image: none !important;
  }

  .gatsby-highlight {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
  }

  .gatsby-highlight pre[class*=language-] {
    border-radius: .15rem;
    margin: 0;
    overflow: initial;
    float: left;
    width: 100%;
    text-shadow: none;
    overflow-x: scroll;
  }

  .gatsby-highlight pre[class*=language-] tt,code {
    background: none;
  }

  .gatsby-highlight-code-line {
    display: block;
  }

  /* Fancy underline links in .post. */
  .post a.anchor {
    text-shadow: 0 !important;
    background-image: 0 !important;

    svg {
      fill: var(--text);
    }
  }

  /* 코드 블럭 내부에서는 링크를 장식하지 않게 한다. */
  .post pre a[href*=//]:after {
    display: none;
  }

  .post pre a {
    background: none !important;
    text-shadow: none !important;
    color: inherit !important;
  }

  /* 본문 내부 텍스트 링크 */
  .post a:not(.gatsby-resp-image-link):not(.anchor),
  .link-underline {
    color: var(--link);
    background-image: linear-gradient(to bottom, transparent, transparent calc(100% - 2px), var(--link) 100%); /* 밑줄 */
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .post a:not(.gatsby-resp-image-link):not(.anchor):hover, .link-underline:hover {
    color: var(--linkHover);
    background-image: linear-gradient(to bottom, transparent, transparent calc(100% - 2px), var(--linkHover) 100%);
  }

  .post .gatsby-resp-image-link {
    & + em {
      color: var(--light);
    }
    & + em  > a {
      color: var(--light);
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

  .footnote-ref {
    margin: 0 0.2em;
  }

`
