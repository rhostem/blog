import defaultTheme from 'styles/prism_themes/defaultTheme'
const TEXT_RGB_LIGHT = '46, 46, 46' // #2E2E2E

const lightTheme = {
  name: 'LIGHT',
  navbarMain: '#4568dc',
  green: '#76b835',
  black: `rgba(${TEXT_RGB_LIGHT} ,1)`,
  text: `rgba(${TEXT_RGB_LIGHT} ,0.95)`,
  light: `rgba(${TEXT_RGB_LIGHT} ,0.5)`,
  calm: `rgba(${TEXT_RGB_LIGHT} ,0.2)`,
  smoke: `rgba(${TEXT_RGB_LIGHT} ,0.1)`,
  whiteSmoke: `rgba(${TEXT_RGB_LIGHT} ,0.02)`,
  white: `#fff`,
  link: `#2e2e2e`,
  linkHover: '#4568dc',
  body: '#fff',
  border: `rgba(${TEXT_RGB_LIGHT}, 0.2)`,
  hrBackgroundImage: `linear-gradient(90deg,rgba(${TEXT_RGB_LIGHT},.2), rgba(${TEXT_RGB_LIGHT},.75), rgba(${TEXT_RGB_LIGHT},.2))`,
  navbarBg: `linear-gradient(to right, #4568dc, #b06ab3)`,
  navbarColor: '#fff',
  codeBlock: '#f5f2f0', // 코드 블럭
  codeInline: '#f5f2f0', // 인라인 코드
  loadingSpinner: '#333',
  blockquoteBackground: '#f5f5f5',
  disqusBackground: 'transparent',
}

export default lightTheme
