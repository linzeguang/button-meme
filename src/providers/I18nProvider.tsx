import React, { PropsWithChildren } from 'react'

import { I18nProvider as BaseI18nProvider } from '@lingui/react'
import i18n, { initI18n } from '@/lib/i18n'

initI18n()

const I18nProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <BaseI18nProvider i18n={i18n}>{children}</BaseI18nProvider>
}

export default I18nProvider
