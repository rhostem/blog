import React, { useEffect, useState, useCallback } from 'react'
import lightTheme from 'styles/theme/light'
import darkTheme from 'styles/theme/dark'

export const themeModes = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const DarkModeContext = React.createContext({
  mode: undefined,
  toggleTheme: () => undefined,
})

export const useDarkMode = () => {
  // 기본은 다크모드
  const [mode, setMode] = useState()
  const [theme, setTheme] = useState({})

  // 로컬스토리지에 저장
  const changeTheme = newTheme => {
    setMode(newTheme)
    setTheme(newTheme === themeModes.LIGHT ? lightTheme : darkTheme)
    window.__setPreferredTheme(newTheme)
  }

  const toggleTheme = useCallback(
    () => {
      if (mode === themeModes.LIGHT) {
        changeTheme(themeModes.DARK)
      } else {
        changeTheme(themeModes.LIGHT)
      }
    },
    [mode]
  )

  useEffect(() => {
    if (typeof window === 'object') {
      setMode(window.__theme)
    }
  }, [])

  return { mode, theme, toggleTheme }
}
