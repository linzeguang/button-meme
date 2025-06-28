import React, { type PropsWithChildren } from 'react'

import WalletProvider from '@/providers/WalletProvider'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>
}

export default RootProvider
