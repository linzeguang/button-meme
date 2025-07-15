import React, { type PropsWithChildren } from 'react'

import HelperProvider from '@/providers/HelperProvider'
import I18nLocaleProvider from '@/providers/I18nLocaleProvider'
import WalletProvider from '@/providers/WalletProvider'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nLocaleProvider>
      <WalletProvider>
        <HelperProvider>{children}</HelperProvider>
      </WalletProvider>
    </I18nLocaleProvider>
  )
}

export default RootProvider
