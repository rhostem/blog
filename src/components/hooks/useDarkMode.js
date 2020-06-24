import React, { useEffect, useState, useCallback } from 'react'

export const themeModes = {
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
  // 기본은 다크모드
  const [mode, setMode] = useState(
    typeof window === 'object' ? window.__theme : null
  )

  // 로컬스토리지에 저장
  const changeTheme = newTheme => {
    setMode(newTheme)
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

  return { mode, toggleTheme }
}
