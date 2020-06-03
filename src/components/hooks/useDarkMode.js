import { useEffect, useState } from 'react'
import lightTheme from 'styles/theme/light'
import darkTheme from 'styles/theme/dark'

const modes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
}

export const useDarkMode = () => {
  // 기본은 다크모드
  const [mode, setMode] = useState(modes.DARK)
  const [theme, setTheme] = useState(darkTheme)
  const [isThemeInit, setIsThemeInit] = useState(false)

  // 로컬스토리지에 저장
  const changeMode = mode => {
    window.localStorage.setItem('theme', mode)
    setMode(mode)
    setTheme(mode === modes.LIGHT ? lightTheme : darkTheme)
  }

  const toggleTheme = () => {
    if (mode === modes.LIGHT) {
      changeMode(modes.DARK)
    } else {
      changeMode(modes.LIGHT)
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && changeMode(localTheme)
    setIsThemeInit(true)
  }, [])

  return { mode, theme, toggleTheme, isThemeInit }
}
