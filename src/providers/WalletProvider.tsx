import React, { type PropsWithChildren } from 'react'

import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { features, metadata, networks, projectId, wagmiAdapter } from '@/constants/wallet'

const queryClient = new QueryClient()

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8bfe83'
  }
})

const WalletProvider: React.FC<PropsWithChildren> = (props) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} {...props}>
      <QueryClientProvider client={queryClient} {...props} />
    </WagmiProvider>
  )
}

export default WalletProvider
