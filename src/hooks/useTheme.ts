import { useCallback } from 'react'

import { useAtom } from 'jotai/react'

import { themeAtom } from '@/stores/settings'
import { ThemeName } from 'public/charting_library/charting_library'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const changeTheme = useCallback(
    (theme: ThemeName) => {
      setTheme(theme)
      const currentTheme: ThemeName = document.documentElement.classList.contains('light') ? 'light' : 'dark'

      if (theme !== currentTheme) document.documentElement.classList.toggle('light')
    },
    [setTheme]
  )

  return {
    theme,
    changeTheme
  }
}
