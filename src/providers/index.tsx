import React, { type PropsWithChildren } from 'react'

import HelperProvider from '@/providers/HelperProvider'
import I18nProvider from '@/providers/I18nProvider'
import WalletProvider from '@/providers/WalletProvider'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nProvider>
      <WalletProvider>
        <HelperProvider>{children}</HelperProvider>
      </WalletProvider>
    </I18nProvider>
  )
}

export default RootProvider
