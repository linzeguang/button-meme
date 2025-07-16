import { atomWithStorage } from 'jotai/utils'

import { LOCALE } from '@/constants/settings'
import { STORAGE_KEY } from '@/constants/storages'
import { ThemeName } from 'public/charting_library/charting_library'

export const localeAtom = atomWithStorage<LOCALE>(STORAGE_KEY.LOCALE, LOCALE.EN, undefined, { getOnInit: true })

export const themeAtom = atomWithStorage<ThemeName>(STORAGE_KEY.THEME, 'dark', undefined, {
  getOnInit: true
})
