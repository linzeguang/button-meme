import { importLocale } from '@/lib/i18n'
import { localeAtom } from '@/stores/settings'
import { useAtom } from 'jotai/react'
import { useEffect } from 'react'

const useLocale = () => {
  const [locale, setLocale] = useAtom(localeAtom)

  useEffect(() => {
    importLocale(locale)
  }, [locale])

  return { locale, setLocale }
}

export default useLocale
