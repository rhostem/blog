import { useEffect, useState } from 'react'
import lightTheme from 'styles/theme/light'
import darkTheme from 'styles/theme/dark'

export const themeNames = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
}

export const useDarkMode = () => {
  // 기본은 다크모드
  const [mode, setMode] = useState(themeNames.DARK)
  const [theme, setTheme] = useState(darkTheme)
  const [isThemeInit, setIsThemeInit] = useState(false)

  // 로컬스토리지에 저장
  const changeMode = mode => {
    window.localStorage.setItem('theme', mode)
    setMode(mode)
    setTheme(mode === themeNames.LIGHT ? lightTheme : darkTheme)
  }

  const toggleTheme = () => {
    if (mode === themeNames.LIGHT) {
      changeMode(themeNames.DARK)
    } else {
      changeMode(themeNames.LIGHT)
    }
  }

  useEffect(() => {
    // 시스템 다크 모드 확인
    const isSystemDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    let localTheme = window.localStorage.getItem('theme')

    if (!localTheme) {
      localTheme = isSystemDarkMode ? themeNames.DARK : themeNames.LIGHT
      window.localStorage.setItem('theme', localTheme)
    }

    changeMode(localTheme)
    setIsThemeInit(true)
  }, [])

  return { mode, theme, toggleTheme, isThemeInit }
}
