import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react'

import { I18nProvider } from '@lingui/react'
import { useAtom } from 'jotai/react'

import { LOCALE } from '@/constants/settings'
import i18n, { importLocale } from '@/lib/i18n'
import { localeAtom } from '@/stores/settings'

export interface I18nLocaleProviderContextProps {
  locale: LOCALE
  changeLocale: (locale: LOCALE) => void
}

export const I18nLocaleProviderContext = createContext<I18nLocaleProviderContextProps>(
  {} as I18nLocaleProviderContextProps
)

export const useI18nLocaleProviderContext = () => useContext(I18nLocaleProviderContext)

const I18nLocaleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useAtom(localeAtom)

  const changeLocale = useCallback(
    async (locale: LOCALE) => {
      await importLocale(locale)
      setLocale(locale)
    },
    [setLocale]
  )

  useEffect(() => {
    importLocale(locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <I18nLocaleProviderContext.Provider value={{ locale, changeLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </I18nLocaleProviderContext.Provider>
  )
}

export default I18nLocaleProvider
