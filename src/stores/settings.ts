import { atomWithStorage } from 'jotai/utils'

import { LOCALE, THEME } from '@/constants/settings'
import { STORAGE_KEY } from '@/constants/storages'

export const localeAtom = atomWithStorage<LOCALE>(STORAGE_KEY.LOCALE, LOCALE.EN, undefined, { getOnInit: true })

export const themeAtom = atomWithStorage<THEME>(STORAGE_KEY.THEME, THEME.Dark, undefined, {
  getOnInit: true
})
