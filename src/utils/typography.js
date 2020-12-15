import Typography from 'typography'
import { sizes } from 'styles/'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.baseFontSize = sizes.baseFontSize
Wordpress2016.baseLineHeight = sizes.baseLineHeight
Wordpress2016.headerFontFamily = [
  'Nanum Square',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'sans-serif',
]
Wordpress2016.bodyFontFamily = [
  'Nanum Square',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'sans-serif',
]

Wordpress2016.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    color: 'var(--textLink)',
    boxShadow: 'none',
  },
  hr: {
    background: 'var(--hr)',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  // These two are for gatsby-remark-autolink-headers:
  'a.anchor': {
    boxShadow: 'none',
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink)',
  },
  'p code': {
    fontSize: '1rem',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: '700',
    letterSpacing: 'inherit',
    textTransform: 'none',
  },
  'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
    fontSize: 'inherit',
  },
  'li code': {
    fontSize: '1rem',
  },
  blockquote: {
    color: 'inherit',
    borderLeftColor: 'inherit',
    opacity: '0.9',
    fontSize: 'inherit',
  },
  'blockquote.translation': {
    fontSize: '1em',
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
