import { css } from 'styled-components'

/**
 * https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-oceanic.css
 */
export const materialOceanic = css`
  code[class*='language-'],
  pre[class*='language-'] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: #c3cee3;
    background: #263238;
    font-family: Menlo, Roboto Mono, monospace;
    font-size: 0.85em;
    line-height: 1.4em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  code[class*='language-']::-moz-selection,
  pre[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    background: #363636;
  }

  code[class*='language-']::selection,
  pre[class*='language-']::selection,
  code[class*='language-'] ::selection,
  pre[class*='language-'] ::selection {
    background: #363636;
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

  /* NOTE: 본문 안의 코드 태그 */
  code[class='language-text'] {
    background: rgba(27, 31, 35, 0.05);
    color: inherit;
    display: inline-block;
    padding: 0 0.3em !important;
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

export const prismDefault = css`
  /* PrismJS 1.17.1
  https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
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

  .namespace {
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
`

export const prismGithub = css`
  /**
  * GHColors theme by Avi Aryan (http://aviaryan.in)
  * Inspired by Github syntax coloring
  */

  code[class*='language-'],
  pre[class*='language-'] {
    color: #393a34;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.3em;

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
    background: #b3d4fc;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    background: #b3d4fc;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border: 1px solid #dddddd;
    background-color: white;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #f8f8f8;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.2em;
    padding-top: 1px;
    padding-bottom: 1px;
    background: #f8f8f8;
    border: 1px solid #dddddd;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999988;
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string,
  .token.attr-value {
    color: #e3116c;
  }
  .token.punctuation,
  .token.operator {
    color: #393a34; /* no highlight */
  }

  .token.entity,
  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.property,
  .token.regex,
  .token.inserted {
    color: #36acaa;
  }

  .token.atrule,
  .token.keyword,
  .token.attr-name,
  .language-autohotkey .token.selector {
    color: #00a4db;
  }

  .token.function,
  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.tag,
  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.important,
  .token.function,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }
`

export const prismDracula = css`
  /* PrismJS 1.14.0 http://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+arff+asciidoc+asm6502+aspnet+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+csharp+arduino+coffeescript+clojure+ruby+csp+css-extras+d+dart+diff+django+docker+eiffel+elixir+elm+markup-templating+erlang+fsharp+flow+fortran+gedcom+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+http+hpkp+hsts+ichigojam+icon+inform7+ini+io+j+java+jolie+json+julia+keyman+kotlin+latex+less+liquid+lisp+livescript+lolcode+lua+makefile+markdown+erb+matlab+mel+mizar+monkey+n4js+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php+php-extras+sql+powershell+processing+prolog+properties+protobuf+pug+puppet+pure+python+q+qore+r+jsx+typescript+renpy+reason+rest+rip+roboconf+crystal+rust+sas+sass+scss+scala+scheme+smalltalk+smarty+plsql+soy+stylus+swift+tcl+textile+twig+tsx+vbnet+velocity+verilog+vhdl+vim+visual-basic+wasm+wiki+xeora+xojo+yaml&plugins=line-numbers+toolbar+show-language */

  /**
   * Dracula Theme for Prism.JS
   *
   * @author Gustavo Costa
   * e-mail: gusbemacbe@gmail.com
   *
   * @contributor Jon Leopard
   * e-mail: jonlprd@gmail.com
   *
   * @license MIT 2016-2018
   */

  pre::-webkit-scrollbar {
    width: 14px;
  }

  pre::-webkit-scrollbar-track {
    background-color: #6272a4;
    border-radius: 0px;
  }

  pre::-webkit-scrollbar-thumb {
    background-color: #bd93f9;
    border-radius: 0px;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: #ccc;
    background: rgb(40, 41, 54);
    text-shadow: none;
    font-family: PT Mono, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
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
    background-color: #5a5f80;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background-color: #5a5f80;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    background: rgba(40, 41, 54, 1) !important;
    border-radius: 0.5em;
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    height: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 4px 7px;
    border-radius: 0.3em;
    white-space: normal;

    /* 본문 code 태그에는 dracula theme의 색이 아닌 다른 색 사용함 */
    background: #f8f8f8;
    color: hsla(291, 0%, 18%, 0.95);
  }

  .limit-300 {
    height: 300px !important;
  }

  .limit-400 {
    height: 400px !important;
  }

  .limit-500 {
    height: 500px !important;
  }

  .limit-600 {
    height: 600px !important;
  }

  .limit-700 {
    height: 700px !important;
  }

  .limit-800 {
    height: 800px !important;
  }

  .token.comment {
    color: rgba(98, 114, 164, 1);
  }

  .token.prolog {
    color: rgba(207, 207, 194, 1);
  }

  .token.tag {
    color: rgba(220, 104, 170, 1);
  }

  .token.entity {
    color: rgba(139, 233, 253, 1);
  }

  .token.atrule {
    color: rgba(98, 239, 117, 1);
  }

  .token.url {
    color: rgba(102, 217, 239, 1);
  }

  .token.selector {
    color: rgba(207, 207, 194, 1);
  }

  .token.string {
    color: rgba(241, 250, 140, 1);
  }

  .token.property {
    color: rgba(255, 184, 108, 1);
  }

  .token.important {
    color: rgba(255, 121, 198, 1);
    font-weight: bold;
  }

  .token.punctuation {
    color: rgba(230, 219, 116, 1);
  }

  .token.number {
    color: rgba(189, 147, 249, 1);
  }

  .token.function {
    color: rgba(80, 250, 123, 1);
  }

  .token.class-name {
    color: rgba(255, 184, 108, 1);
  }

  .token.keyword {
    color: rgba(255, 121, 198, 1);
  }

  .token.boolean {
    color: rgba(255, 184, 108, 1);
  }

  .token.operator {
    color: rgba(139, 233, 253, 1);
  }

  .token.char {
    color: rgba(255, 135, 157, 1);
  }

  .token.regex {
    color: rgba(80, 250, 123, 1);
  }

  .token.variable {
    color: rgba(80, 250, 123, 1);
  }

  .token.constant {
    color: rgba(255, 184, 108, 1);
  }

  .token.symbol {
    color: rgba(255, 184, 108, 1);
  }

  .token.builtin {
    color: rgba(255, 121, 198, 1);
  }

  .token.attr-value {
    color: #7ec699;
  }

  .token.deleted {
    color: #e2777a;
  }

  .token.namespace {
    color: #e2777a;
  }

  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token {
    color: #ff79c6;
  }

  .language-cpp .token.string {
    color: #8be9fd;
  }

  .language-c .token.string {
    color: #8be9fd;
  }

  .language-css .token.selector {
    color: rgba(80, 250, 123, 1);
  }

  .language-css .token.property {
    color: rgba(255, 184, 108, 1);
  }

  .language-java span.token.class-name {
    color: #8be9fd;
  }

  .language-java .token.class-name {
    color: #8be9fd;
  }

  .language-markup .token.attr-value {
    color: rgba(102, 217, 239, 1);
  }

  .language-markup .token.tag {
    color: rgba(80, 250, 123, 1);
  }

  .language-objectivec .token.property {
    color: #66d9ef;
  }

  .language-objectivec .token.string {
    color: #50fa7b;
  }

  .language-php .token.boolean {
    color: #8be9fd;
  }

  .language-php .token.function {
    color: #ff79c6;
  }

  .language-php .token.keyword {
    color: #66d9ef;
  }

  .language-ruby .token.symbol {
    color: #8be9fd;
  }

  .language-ruby .token.class-name {
    color: #cfcfc2;
  }

  pre.line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px solid #999;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  div.code-toolbar {
    position: relative;
  }

  div.code-toolbar > .toolbar {
    position: absolute;
    top: 0.3em;
    right: 0.2em;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }

  div.code-toolbar:hover > .toolbar {
    opacity: 1;
  }

  div.code-toolbar > .toolbar .toolbar-item {
    display: inline-block;
    padding-right: 20px;
  }

  div.code-toolbar > .toolbar a {
    cursor: pointer;
  }

  div.code-toolbar > .toolbar button {
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
    -webkit-user-select: none; /* for button */
    -moz-user-select: none;
    -ms-user-select: none;
  }

  div.code-toolbar > .toolbar a,
  div.code-toolbar > .toolbar button,
  div.code-toolbar > .toolbar span {
    color: #ccc;
    font-size: 0.8em;
    padding: 0.5em;
    background: rgba(98, 114, 164, 1);
    border-radius: 0.5em;
  }

  div.code-toolbar > .toolbar a:hover,
  div.code-toolbar > .toolbar a:focus,
  div.code-toolbar > .toolbar button:hover,
  div.code-toolbar > .toolbar button:focus,
  div.code-toolbar > .toolbar span:hover,
  div.code-toolbar > .toolbar span:focus {
    color: inherit;
    text-decoration: none;
    background-color: var(--verde);
  }
`
