import React, { type PropsWithChildren } from 'react'

import HelperProvider from '@/providers/HelperProvider'
import WalletProvider from '@/providers/WalletProvider'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WalletProvider>
      <HelperProvider>{children}</HelperProvider>
    </WalletProvider>
  )
}

export default RootProvider
