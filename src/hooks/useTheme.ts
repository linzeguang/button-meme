import { useCallback } from 'react'

import { useAtom } from 'jotai/react'

import { themeAtom } from '@/stores/settings'
import { THEME } from '@/constants/settings'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const changeTheme = useCallback(() => {
    document.documentElement.classList.toggle('light')
  }, [])
}
