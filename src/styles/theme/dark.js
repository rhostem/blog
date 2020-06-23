import materialOceanic from 'styles/prism_themes/materialOceanic'

const TEXT_RGB_DARK = '215, 215, 215' // #D7D7D7

const darkTheme = {
  name: 'DARK',
  colors: {
    navbarMain: '#4568dc',
    green: '#76b835',
    black: `rgba(${TEXT_RGB_DARK} ,1)`,
    text: `rgba(${TEXT_RGB_DARK} ,0.9)`,
    light: `rgba(${TEXT_RGB_DARK} ,0.5)`,
    calm: `rgba(${TEXT_RGB_DARK} ,0.2)`,
    smoke: `rgba(${TEXT_RGB_DARK} ,0.1)`,
    whiteSmoke: `rgba(${TEXT_RGB_DARK} ,0.02)`,
    white: `#fff`,
    link: `rgba(${TEXT_RGB_DARK}, 1)`,
    linkHover: '#0DBC79',
    body: '#4A4A4D',
    border: `rgba(${TEXT_RGB_DARK}, 0.2)`,
  },
  hrBackgroundImage: `linear-gradient(90deg,rgba(${TEXT_RGB_DARK},.2), rgba(${TEXT_RGB_DARK},.75), rgba(${TEXT_RGB_DARK},.2))`,
  navbarBg: `#282C35`,
  navbarColor: '#fff',
  codeBlockTheme: materialOceanic,
  codeBackground: '#282C35',
  loadingSpinner: '#EFEFEF',
  disqus: {
    background: '#F2F2F2',
  },
}

export default darkTheme
