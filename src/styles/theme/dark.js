import { themeNames } from '../../components/hooks/useDarkMode'

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
    linkHover: '#4568dc',
    body: '#4A4A4D',
    border: '#353535',
  },
  hrBackgroundImage:
    'linear-gradient(90deg,rgba(34,34,34,.2), rgba(34,34,34,.75), rgba(34,34,34,.2))',
  navbarBg:
    'linear-gradient(to right, #060606 0%, #2F2F2F 25%, #2F2F2F 75%, #060606 100%)',
  navbarColor: '#fff',
}

export default darkTheme
