import defaultTheme from 'styles/prism_themes/default'

const TEXT_RGB = '46, 46, 46' // #2E2E2E

const lightTheme = {
  name: 'LIGHT',
  colors: {
    navbarMain: '#4568dc',
    green: '#76b835',
    black: `rgba(${TEXT_RGB} ,1)`,
    text: `rgba(${TEXT_RGB} ,0.95)`,
    light: `rgba(${TEXT_RGB} ,0.5)`,
    calm: `rgba(${TEXT_RGB} ,0.2)`,
    smoke: `rgba(${TEXT_RGB} ,0.1)`,
    whiteSmoke: `rgba(${TEXT_RGB} ,0.02)`,
    white: `#fff`,
    link: `#2e2e2e`,
    linkHover: '#4568dc',
    body: '#fff',
    border: '#ebebeb',
  },
  hrBackgroundImage: `linear-gradient(90deg,rgba(${TEXT_RGB},.2), rgba(${TEXT_RGB},.75), rgba(${TEXT_RGB},.2))`,
  navbarBg: `linear-gradient(to right, #4568dc, #b06ab3)`,
  navbarColor: '#fff',
  codeBlockTheme: defaultTheme,
  codeBackground: '#f5f2f0', // 인라인 코드 배경. 코드 테마에 맞춰준다
  disqus: {
    background: 'transparent',
  },
}

export default lightTheme
