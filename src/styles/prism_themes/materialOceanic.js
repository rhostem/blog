import { css } from 'styled-components'

/**
 * https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-oceanic.css
 */
export default css`
  code[class*='language-'],
  pre[class*='language-'] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: #c3cee3;
    background: #282c35;
    font-size: 0.9em;
    line-height: inherit;
    tab-size: 2;
    hyphens: none;
  }

  :not(pre) > code[class*='language-'] {
    white-space: normal;
    border-radius: 0.2em;
    padding: 0.1em;
  }

  pre[class*='language-'] {
    overflow: auto;
    position: relative;
    margin: 0.5em 0;
    padding: 1.25em 1em;
  }

  code[class='language-text'] {
    color: inherit;
    display: inline-block;
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: #fd9170;
  }

  [class*='language-'] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: #c792ea;
  }

  .token.attr-name {
    color: #ffcb6b;
  }

  .token.attr-value {
    color: #c3e88d;
  }

  .token.attribute {
    color: #c3e88d;
  }

  .token.boolean {
    color: #c792ea;
  }

  .token.builtin {
    color: #ffcb6b;
  }

  .token.cdata {
    color: #80cbc4;
  }

  .token.char {
    color: #80cbc4;
  }

  .token.class {
    color: #ffcb6b;
  }

  .token.class-name {
    color: #f2ff00;
  }

  .token.color {
    color: #f2ff00;
  }

  .token.comment {
    color: #546e7a;
  }

  .token.constant {
    color: #c792ea;
  }

  .token.deleted {
    color: #f07178;
  }

  .token.doctype {
    color: #546e7a;
  }

  .token.entity {
    color: #f07178;
  }

  .token.function {
    color: #c792ea;
  }

  .token.hexcode {
    color: #f2ff00;
  }

  .token.id {
    color: #c792ea;
    font-weight: bold;
  }

  .token.important {
    color: #c792ea;
    font-weight: bold;
  }

  .token.inserted {
    color: #80cbc4;
  }

  .token.keyword {
    color: #c792ea;
    font-style: italic;
  }

  .token.number {
    color: #fd9170;
  }

  .token.operator {
    color: #89ddff;
  }

  .token.prolog {
    color: #546e7a;
  }

  .token.property {
    color: #80cbc4;
  }

  .token.pseudo-class {
    color: #c3e88d;
  }

  .token.pseudo-element {
    color: #c3e88d;
  }

  .token.punctuation {
    color: #89ddff;
  }

  .token.regex {
    color: #f2ff00;
  }

  .token.selector {
    color: #f07178;
  }

  .token.string {
    color: #c3e88d;
  }

  .token.symbol {
    color: #c792ea;
  }

  .token.tag {
    color: #f07178;
  }

  .token.unit {
    color: #f07178;
  }

  .token.url {
    color: #fd9170;
  }

  .token.variable {
    color: #f07178;
  }
`
