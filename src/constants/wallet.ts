import { mainnet, type AppKitNetwork } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'

import { ENV_PARAMS } from '@/constants/evnParams'

import type { AppKitOptions, CreateAppKit } from '@reown/appkit/react'

export const RPC_URL = ENV_PARAMS.RPC
export const CHAIN_ID = ENV_PARAMS.CHAIN_ID
export const NETWORK = defineChain({
  id: Number(CHAIN_ID),
  name: 'SJATSH',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [RPC_URL]
    }
  }
})

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata: CreateAppKit['metadata'] = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: location.origin, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const features: AppKitOptions['features'] = {
  analytics: true, // Optional - defaults to your Cloud configuration
  email: false,
  socials: false,
  swaps: false,
  send: false,
  receive: false,
  onramp: false
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [NETWORK] as [...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, ...networks]
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
