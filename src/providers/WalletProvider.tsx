import React, { useEffect, type PropsWithChildren } from 'react'

import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAtomValue } from 'jotai/react'
import { WagmiProvider } from 'wagmi'

import { features, metadata, networks, projectId, wagmiAdapter } from '@/constants/wallet'
import { themeAtom } from '@/stores/settings'

const queryClient = new QueryClient()

// Create modal
const appkit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features,
  themeVariables: {
    '--w3m-accent': '#8bfe83'
  }
})

const WalletProvider: React.FC<PropsWithChildren> = (props) => {
  const theme = useAtomValue(themeAtom)

  useEffect(() => {
    appkit.setThemeMode(theme)
  }, [theme])

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} {...props}>
      <QueryClientProvider client={queryClient} {...props} />
    </WagmiProvider>
  )
}

export default WalletProvider
