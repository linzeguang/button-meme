import React, { PropsWithChildren } from 'react'

import { i18n } from '@lingui/core'
import { I18nProvider as BaseI18nProvider } from '@lingui/react'

import { LOCALE } from '@/constants/settings'
import { messages as catalogEn } from '@/locales/en/messages'
import store from '@/stores'
import { localeAtom } from '@/stores/settings'

const catalogs = { [LOCALE.EN]: catalogEn }

const getLocale = () => store.get(localeAtom)
const storageLocale = getLocale()

i18n.load(storageLocale, catalogs[storageLocale])
i18n.activate(storageLocale)

const I18nProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <BaseI18nProvider i18n={i18n}>{children}</BaseI18nProvider>
}

export default I18nProvider
