import React, { useEffect, useState, useCallback } from 'react'
import lightTheme from 'styles/theme/light'
import darkTheme from 'styles/theme/dark'

export const themeModes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
}

export const DarkModeContext = React.createContext({
  mode: undefined,
  toggleTheme: () => undefined,
})

export const useDarkMode = () => {
  // 기본은 다크모드
  const [mode, setMode] = useState(
    typeof window === 'object' ? window.localStorage.getItem('theme') : null
  )
  const [theme, setTheme] = useState(darkTheme)

  // 로컬스토리지에 저장
  const changeMode = mode => {
    window.localStorage.setItem('theme', mode)
    setMode(mode)
    setTheme(mode === themeModes.LIGHT ? lightTheme : darkTheme)
  }

  const toggleTheme = useCallback(
    () => {
      if (mode === themeModes.LIGHT) {
        changeMode(themeModes.DARK)
      } else {
        changeMode(themeModes.LIGHT)
      }
    },
    [mode]
  )

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme')

    if (!localTheme) {
      // 시스템 다크 모드 확인
      const isSystemDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      localTheme = isSystemDarkMode ? themeModes.DARK : themeModes.LIGHT
      window.localStorage.setItem('theme', localTheme)
    }

    changeMode(localTheme)
  }, [])

  return { mode, theme, toggleTheme }
}
