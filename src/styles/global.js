import { createGlobalStyle } from 'styled-components'
import { fontFace } from 'polished'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Nanum Square, Roboto, Spectral, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
  }

  ${fontFace({
    fontFamily: 'Menlo Regular',
    fontFilePath: '/fonts/menlo-regular',
  })}

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

  /**
   * Github-like theme for Prism.js
   * @author Luke Askew http://github.com/lukeaskew
   */
  code,
  code[class*='language-'],
  pre[class*='language-'] {
    color: #333;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    tab-size: 4;
    hyphens: none;
    font-family: Menlo, 'Liberation Mono', Consolas, Courier, monospace;
    line-height: 1.4;
    direction: ltr;
    cursor: text;
    border: none;
  }

  code,
  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: rgba(0, 0, 0, 0.04);
  }

  pre[class*='language-'] {
    overflow: auto;
    margin: 1em 0;
    padding: 1.2em;
    border-radius: 3px;
    font-size: 85%;
  }

  pre code {
    background: none;
  }

  p code,
  li code,
  table code {
    margin: 0;
    border-radius: 3px;
    padding: 0.2em 0;
    font-size: 85%;
  }
  p code:before,
  p code:after,
  li code:before,
  li code:after,
  table code:before,
  table code:after {
    letter-spacing: -0.2em;
    content: '\00a0';
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  button {
    background: none;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #969896;
  }
  .token.punctuation,
  .token.string,
  .token.atrule,
  .token.attr-value {
    color: #183691;
  }
  .token.property,
  .token.tag {
    color: #63a35c;
  }
  .token.boolean,
  .token.number {
    color: #0086b3;
  }
  .token.selector,
  .token.attr-name,
  .token.attr-value .punctuation:first-child,
  .token.keyword,
  .token.regex,
  .token.important {
    color: #795da3;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string {
    color: #a71d5d;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }

`
