import { ENV_PARAMS } from '@/constants/evnParams'

export enum PreferredExplorer {
  Solscan = 'https://solscan.io',
  SolanaBeach = 'https://solanabeach.io',
  SolanaExplorer = 'https://explorer.solana.com',
  SolanaFm = 'https://solana.fm',
  OKLink = 'https://www.oklink.com'
}

export const SUPPORT_PREFERRED_EXPLORER = [
  {
    name: 'Solscan',
    url: PreferredExplorer.Solscan
  },
  {
    name: 'SolanaBeach',
    url: PreferredExplorer.SolanaBeach
  },
  {
    name: 'SolanaExplorer',
    url: PreferredExplorer.SolanaExplorer
  },
  {
    name: 'SolanaFm',
    url: PreferredExplorer.SolanaFm
  },
  {
    name: 'OKLink',
    url: PreferredExplorer.OKLink
  }
]

export const DEFAULT_PREFERRED_EXPLORER = SUPPORT_PREFERRED_EXPLORER[0]

export enum RPCEndpoint {
  Custom = 'Custom',
  Quiknode = 'Quiknode',
  Helius = 'Helius'
}

export interface RPCParams {
  key: RPCEndpoint
  name: string
  url: string
  ws?: string
  mev?: boolean
}

export const SUPPORT_RPC_ENDPOINT: RPCParams[] = [
  {
    name: 'Helius',
    url: ENV_PARAMS.HELIUS_RPC_URL,
    ws: ENV_PARAMS.HELIUS_RPC_WSS,
    key: RPCEndpoint.Helius,
    mev: false
  },
  {
    name: 'Quicknode',
    url: ENV_PARAMS.QUICKNODE_RPC_URL,
    ws: ENV_PARAMS.QUICKNODE_RPC_WSS,
    key: RPCEndpoint.Quiknode,
    mev: true
  },
  {
    name: 'Custom',
    url: '',
    key: RPCEndpoint.Custom,
    mev: false
  }
]
export const DEFAULT_RPC_ENDPOINT = SUPPORT_RPC_ENDPOINT[0]
