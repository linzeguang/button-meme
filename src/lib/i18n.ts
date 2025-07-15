import { LOCALE } from '@/constants/settings'
import store from '@/stores'
import { localeAtom } from '@/stores/settings'
import { i18n } from '@lingui/core'

export const importLocale = async (locale: LOCALE) => {
  const res = await fetch(`/locales/${locale}/messages.json`)
  const data = await res.json()

  i18n.load(locale, data.messages)
  i18n.activate(locale)
}

export const initI18n = () => {
  const getLocale = () => store.get(localeAtom)
  const storageLocale = getLocale()

  importLocale(storageLocale)
}

export default i18n
