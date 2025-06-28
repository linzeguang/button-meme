import { atomWithStorage } from 'jotai/utils'

import { THEME } from '@/constants/settings'
import { STORAGE_KEY } from '@/constants/storages'

export const themeAtom = atomWithStorage<THEME>(STORAGE_KEY.THEME, THEME.Dark, undefined, {
  getOnInit: true
})
