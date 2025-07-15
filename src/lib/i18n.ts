import { i18n } from '@lingui/core'

import { LOCALE } from '@/constants/settings'

export const importLocale = async (locale: LOCALE) => {
  const res = await fetch(`/locales/${locale}/messages.json`)
  const data = await res.json()

  await i18n.load(locale, data.messages)
  await i18n.activate(locale)
}

export default i18n
