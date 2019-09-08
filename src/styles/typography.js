import Typography from 'typography'
import { baseHsl, colors } from './colors'
import { media } from './media'

const linkRaw = colors.link.substr(1)
const linkHoverRaw = colors.linkHover.substr(1)

const MyTypography = {
  baseFontSize: `16px`,
  baseLineHeight: 1.417,
  headerColor: `${colors.black}`,
  bodyColor: `${colors.text}`,
  blockMarginBottom: 0.75,
  headerWeight: 700,
  headerFontFamily: [
    'Nanum Square',
    'Roboto',
    `Spectral`,
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `sans-serif`,
  ],
  bodyFontFamily: [
    'Nanum Square',
    'Roboto',
    `Spectral`,
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `sans-serif`,
  ],
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      a: {
        borderColor: `${colors.link}`,
        color: `${colors.link}`,
        textDecoration: `none`,
      },
      h1: {
        marginTop: rhythm(4),
        marginBottom: rhythm(1.5),
        fontSize: '2.2rem',
        lineHeight: '1.4',
      },
      h2: {
        lineHeight: '1.4',
        fontSize: '1.8rem',
        marginTop: rhythm(3),
        marginBottom: rhythm(1.5),
      },
      h3: {
        lineHeight: '1.4',
        fontSize: '1.6rem',
        marginTop: rhythm(2),
        marginBottom: rhythm(1),
      },
      h4: {
        fontSize: '1.4rem',
        marginTop: rhythm(1.5),
        marginBottom: rhythm(1),
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: 500,
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
      },
      h6: {
        fontSize: '1rem',
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
      },
      blockquote: {
        borderLeft: `3px solid hsla(${baseHsl},0.6)`,
        color: `hsla(${baseHsl},0.6)`,
        fontStyle: `italic`,
        marginLeft: rhythm(-3 / 4),
        marginRight: rhythm(-3 / 4),
        marginTop: rhythm(2),
        marginBottom: rhythm(2),
        paddingLeft: rhythm(1),
        paddingRight: rhythm(3 / 4),
        paddingTop: 0,
        paddingBottom: 0,
      },
      hr: {
        background: `${colors.smoke}`,
        margin: `${rhythm(2.5)} auto`,
        width: '50%',
        height: '1px',
        color: colors.black,
        backgroundImage:
          'linear-gradient(90deg,rgba(34,34,34,.2), rgba(34,34,34,.75), rgba(34,34,34,.2))',
      },
      p: {
        margin: `${rhythm(1.5)} 0`,
        lineHeight: rhythm(1.15),
      },
      li: {
        lineHeight: rhythm(1.15),
      },
      'p > img': {
        marginBottom: rhythm(1),
      },
      'p > img + em': {
        ...scale(0 / 5),
        fontSize: '0.85em',
        lineHeight: 1.4,
        display: `block`,
        textAlign: `right`,
        marginBottom: rhythm(2),
        color: `${colors.light}`,
      },
      // Style gatsby-remark-images elements.
      '.gatsby-resp-image-link': {
        boxShadow: `none`,
        marginTop: rhythm(2),
        marginBottom: rhythm(2),
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
        marginLeft: rhythm(-3 / 4), // 3/4 rhythm is amount of padding on mobile.
        marginRight: rhythm(-3 / 4),
      },
      // Fake image captions.
      '.post .gatsby-resp-image-link + em': {
        ...scale(0 / 5),
        display: `block`,
        marginTop: rhythm(-1),
        marginBottom: rhythm(2),
        color: `${colors.light}`,
        lineHeight: 1.4,
        textAlign: `center`,
        fontSize: '0.8em',
        fontStyle: 'normal',
      },
      '.post .gatsby-resp-image-link + em > a': {
        color: `${colors.light}`,
        backgroundImage: 'none !important',
      },
      // Code highlighting.
      'tt, code': {
        fontFamily: `Menlo,"Space Mono",Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Courier,monospace`,
        // Disable ligatures as they look funny w/ Space Mono as code.
        fontVariant: `none`,
        WebkitFontFeatureSettings: `"clig" 0, "calt" 0`,
        fontFeatureSettings: `"clig" 0, "calt" 0`,
        paddingTop: `0.1em`,
        paddingBottom: `0.1em`,
        borderRadius: `2px`,
        fontSize: '0.85em',
      },
      // Add space before and after code/tt elements.
      // @see https://github.com/KyleAMathews/typography.js/blob/66f78f0f4b8d2c5abf0262bcc1118610139c3b5f/packages/typography-plugin-code/src/index.js#L38-L46
      'code:before,code:after,tt:before,tt:after': {
        letterSpacing: `-0.2em`,
        content: `"\u00A0"`,
      },
      // But don't add spaces if the code is inside a pre.
      'pre code:before,pre code:after,pre tt:before,pre tt:after': {
        content: `""`,
      },
      // Highlighted code blocks in Markdown via gatsby-remark-prismjs.
      '.gatsby-highlight': {
        marginTop: `0`,
        marginBottom: rhythm(3 / 4),
        padding: rhythm(3 / 4),
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
        background: `#fff2cc`,
        display: `block`,
        marginRight: rhythm(-3 / 4),
        marginLeft: rhythm(-3 / 4),
        paddingRight: rhythm(3 / 4),
        paddingLeft: rhythm(2 / 4),
        borderLeft: `${rhythm(1 / 4)} solid #ffd9b3`,
      },
      // Fancy underline links in .post.
      '.post a:not(.gatsby-resp-image-link):not(.anchor), .link-underline': {
        position: `relative`,
        backgroundImage: `linear-gradient(${colors.link},${colors.link})`,
        textShadow: `0.03em 0 ${colors.white}, -0.03em 0 ${
          colors.white
        }, 0 0.03em ${colors.white}, 0 -0.03em ${colors.white}, 0.06em 0 ${
          colors.white
        }, -0.06em 0 ${colors.white}, 0.09em 0 ${colors.white}, -0.09em 0 ${
          colors.white
        }, 0.12em 0 ${colors.white}, -0.12em 0 ${colors.white}, 0.15em 0 ${
          colors.white
        }, -0.15em 0 ${colors.white}`,
        transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
        backgroundPosition: `0 98%`,
        backgroundRepeat: `repeat-x`,
        backgroundSize: `1px 1px`,
      },
      '.post a:not(.gatsby-resp-image-link):not(.anchor):hover, .link-underline:hover': {
        color: `${colors.linkHover}`,
        backgroundImage: `linear-gradient(${colors.linkHover},${
          colors.linkHover
        })`,
      },
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
        content: `" " url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20class='i-external'%20viewBox='0%200%2032%2032'%20width='14'%20height='14'%20fill='none'%20stroke='%23${linkRaw}'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='9.38%'%3E%3Cpath%20d='M14%209%20L3%209%203%2029%2023%2029%2023%2018%20M18%204%20L28%204%2028%2014%20M28%204%20L14%2018'/%3E%3C/svg%3E")`,
        paddingRight: '0.2rem',
      },
      ".post a[href*='//']:hover:after": {
        content: `" " url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20class='i-external'%20viewBox='0%200%2032%2032'%20width='14'%20height='14'%20fill='none'%20stroke='%23${linkHoverRaw}'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='9.38%'%3E%3Cpath%20d='M14%209%20L3%209%203%2029%2023%2029%2023%2018%20M18%204%20L28%204%2028%2014%20M28%204%20L14%2018'/%3E%3C/svg%3E")`,
      },
      // Increase base font-size for tablet.
      [`${media.OVER_MOBILE}`]: {
        html: {
          color: 'red',
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
        h1: {
          fontSize: '2.2rem',
        },
        h2: {
          fontSize: '1.8rem',
        },
        h3: {
          fontSize: '1.6rem',
        },
        h4: {
          fontSize: '1.4rem',
        },
        h5: {
          fontSize: '1.2rem',
        },
        h6: {
          fontSize: '1rem',
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
