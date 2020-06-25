import React, { useEffect, useState, useCallback } from 'react'

export const themeNames = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const DarkModeContext = React.createContext({
  mode: undefined,
  toggleTheme: () => undefined,
})

/**
 * NOTE: html.js의 스크립트에 다크모드 관련 변수와 함수가 구현되어 있음.
 */
export const useDarkMode = () => {
  const [theme, setTheme] = useState(null)

  const toggleTheme = useCallback(
    () => {
      const nextTheme =
        theme === themeNames.LIGHT ? themeNames.DARK : themeNames.LIGHT

      setTheme(nextTheme)
      window.__setPreferredTheme(nextTheme)
    },
    [theme]
  )

  useEffect(() => {
    if (typeof window === 'object') {
      setTheme(window.__theme)
    }

    window.__onThemeChange = newTheme => {
      setTheme(newTheme)
    }
  }, [])

  return { theme, toggleTheme }
}
