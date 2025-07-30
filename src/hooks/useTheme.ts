import { useCallback } from 'react'

import { useAtom } from 'jotai/react'

import { themeAtom } from '@/stores/settings'
import { ThemeName } from 'public/charting_library/charting_library'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const changeTheme = useCallback(
    (theme: ThemeName) => {
      setTheme(theme)
      const currentTheme: ThemeName = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

      if (theme !== currentTheme) document.documentElement.classList.toggle('dark')
    },
    [setTheme]
  )

  return {
    theme,
    changeTheme
  }
}
