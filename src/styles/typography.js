import Typography from 'typography'
import { media } from './media'

const MyTypography = {
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      a: {
        textDecoration: `none`,
      },
      h1: {
        fontSize: '2.2rem',
        lineHeight: '1.4',
        marginTop: '5.6rem',
        marginBottom: '2.4rem',
        wordBreak: 'keep-all',
      },
      h2: {
        fontSize: '1.8rem',
        lineHeight: '1.4',
        marginTop: '4.2rem',
        marginBottom: '2.4rem',
        wordBreak: 'keep-all',
      },
      h3: {
        fontSize: '1.4rem',
        lineHeight: '1.4',
        marginTop: '2.8rem',
        marginBottom: '1.4rem',
        wordBreak: 'keep-all',
      },
      h4: {
        fontSize: '1.2rem',
        marginTop: '2.4rem',
        marginBottom: '1.4rem',
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '1.4rem',
        marginBottom: '1.4rem',
      },
      h6: {
        fontSize: '1rem',
        marginTop: '1.4rem',
        marginBottom: '1.4rem',
      },
      blockquote: {
        borderLeft: `3px solid #4568dc`,
        background: `#f5f5f5`,
        marginLeft: '-0.1rem',
        marginRight: '-0.1rem',
        marginTop: '2.8rem',
        marginBottom: '2.8rem',
        padding: `1.75rem 1rem`,
      },
      'blockquote > p:first-child': {
        marginTop: 0,
      },
      hr: {
        margin: `3.5rem auto`,
        width: '50%',
        height: '1px',
      },
      p: {
        margin: `2.4rem 0`,
        lineHeight: '1.4rem',
      },
      li: {
        lineHeight: '1.4rem',
      },
      'p > img': {
        marginBottom: '1.4rem',
      },
      'p > img + em': {
        fontSize: '0.9em',
        lineHeight: 1.4,
        display: `block`,
        textAlign: `center`,
        marginBottom: '2.8rem',
      },
      // Style gatsby-remark-images elements.
      '.gatsby-resp-image-link': {
        boxShadow: `none`,
        marginTop: '2.8rem',
        marginBottom: '2.8rem',
      },
      '.gatsby-resp-image-link:hover': {
        background: `none`,
        boxShadow: `none`,
      },
      '@media only screen and (min-width:38rem)': {
        '.gatsby-resp-image-link': {
          borderRadius: `.15rem`,
          overflow: `hidden`,
        },
      },
      // Pull highlighted code blocks and iframes into the horizontal
      // padding of their container.
      // Note that we only do this for code blocks that are direct children of
      // .post so that code blocks are correctly indented e. g. in lists.
      '.post > .gatsby-highlight, .gatsby-resp-iframe-wrapper': {
        marginLeft: '-0.1rem', // 3/4 rhythm is amount of padding on mobile.
        marginRight: '-0.1rem',
      },
      // Fake image captions.
      '.post .gatsby-resp-image-link + em': {
        display: `block`,
        marginTop: '-1.4rem',
        marginBottom: '2.8rem',
        lineHeight: 1.4,
        textAlign: `center`,
        fontSize: '0.8em',
        fontStyle: 'normal',
      },
      '.post .gatsby-resp-image-link + em > a': {
        backgroundImage: 'none !important',
      },
      // Code highlighting.
      'tt, code': {
        fontFamily: `Menlo,"Space Mono",Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Courier,monospace`,
        fontVariant: `none`,
        WebkitFontFeatureSettings: `"clig" 0, "calt" 0`,
        fontFeatureSettings: `"clig" 0, "calt" 0`,
        paddingTop: `0.1em`,
        paddingBottom: `0.1em`,
        borderRadius: `2px`,
        fontSize: '0.9em',
        wordBreak: 'keep-all',
        display: 'inline-block',
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
      },
      '.gatsby-highlight': {
        marginTop: `0`,
        marginBottom: '1rem',
        padding: '1rem',
        overflow: `auto`,
      },
      ".gatsby-highlight pre[class*='language-']": {
        borderRadius: `.15rem`,
        margin: 0,
        overflow: `initial`,
        float: `left`,
        width: `100%`,
        textShadow: `none`,
        overflowX: 'scroll',
      },
      ".gatsby-highlight pre[class*='language-'] tt,code": {
        background: 'none',
      },
      '.gatsby-highlight-code-line': {
        display: `block`,
      },
      // Fancy underline links in .post.

      '.post a.anchor': {
        textShadow: `0 !important`,
        backgroundImage: `0 !important`,
      },
      // 코드 블럭 내부에서는 링크를 장식하지 않게 한다.
      ".post pre a[href*='//']:after": {
        display: 'none',
      },
      '.post pre a': {
        background: 'none !important',
        textShadow: 'none !important',
        color: 'inherit !important',
      },

      // Fancy external links in posts, borrowed from
      // https://github.com/comfusion/after-dark/
      // @see https://github.com/comfusion/after-dark/blob/8fdbe2f480ac40315cf0e01cece785d2b5c4b0c3/layouts/partials/critical-theme.css#L36-L39
      ".post a[href*='//']:after": {
        content: `" " url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20class='i-external'%20viewBox='0%200%2032%2032'%20width='14'%20height='14'%20fill='none'%20stroke='%23${({
          theme,
        }) =>
          theme.colors
            .link}'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='9.38%'%3E%3Cpath%20d='M14%209%20L3%209%203%2029%2023%2029%2023%2018%20M18%204%20L28%204%2028%2014%20M28%204%20L14%2018'/%3E%3C/svg%3E")`,
        paddingRight: '0.2rem',
      },
      ".post a[href*='//']:hover:after": {
        content: `" " url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20class='i-external'%20viewBox='0%200%2032%2032'%20width='14'%20height='14'%20fill='none'%20stroke='%23${({
          theme,
        }) =>
          theme.colors.linkHover.substr(
            1
          )}'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='9.38%'%3E%3Cpath%20d='M14%209%20L3%209%203%2029%2023%2029%2023%2018%20M18%204%20L28%204%2028%2014%20M28%204%20L14%2018'/%3E%3C/svg%3E")`,
      },
      // Increase base font-size for tablet.
      [`${media.OVER_MOBILE}`]: {
        html: {
          fontSize: `${(17.5 / 16) * 100}%`,
        },
        blockquote: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
      // Increase base font-size for desktop.
      [`${media.OVER_MOBILE}`]: {
        html: {
          fontSize: `${(18 / 16) * 100}%`,
        },
      },
    }
  },
}

const typography = new Typography(MyTypography)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
