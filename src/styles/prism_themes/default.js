import { css } from 'styled-components'

export default css`
  /* PrismJS 1.20.0
     https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript&plugins=line-highlight */

  /**
  * prism.js default theme for JavaScript, CSS and HTML
  * Based on dabblet (http://dabblet.com)
  * @author Lea Verou
  */

  code[class*='language-'],
  pre[class*='language-'] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #f5f2f0;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }

  .token.punctuation {
    color: #999;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #905;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #690;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #9a6e3a;
    background: hsla(0, 0%, 100%, 0.5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
  }

  .token.function,
  .token.class-name {
    color: #dd4a68;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #e90;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre[data-line] {
    position: relative;
    padding: 1em 0 1em 3em;
  }

  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em; /* Same as .prism’s padding-top */

    background: hsla(24, 20%, 50%, 0.08);
    background: linear-gradient(
      to right,
      hsla(24, 20%, 50%, 0.1) 70%,
      hsla(24, 20%, 50%, 0)
    );

    pointer-events: none;

    line-height: inherit;
    white-space: pre;
  }

  .line-highlight:before,
  .line-highlight[data-end]:after {
    content: attr(data-start);
    position: absolute;
    top: 0.4em;
    left: 0.6em;
    min-width: 1em;
    padding: 0 0.5em;
    background-color: hsla(24, 20%, 50%, 0.4);
    color: hsl(24, 20%, 95%);
    font: bold 65%/1.5 sans-serif;
    text-align: center;
    vertical-align: 0.3em;
    border-radius: 999px;
    text-shadow: none;
    box-shadow: 0 1px white;
  }

  .line-highlight[data-end]:after {
    content: attr(data-end);
    top: auto;
    bottom: 0.4em;
  }

  .line-numbers .line-highlight:before,
  .line-numbers .line-highlight:after {
    content: none;
  }

  pre[id].linkable-line-numbers span.line-numbers-rows {
    pointer-events: all;
  }
  pre[id].linkable-line-numbers span.line-numbers-rows > span:before {
    cursor: pointer;
  }
  pre[id].linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: rgba(128, 128, 128, 0.2);
  }
`
