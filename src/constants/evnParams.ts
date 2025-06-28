export enum ENV_MODE {
  PROD = 'production',
  DEV = 'development'
}

export const ENV_PARAMS = {
  MODE: import.meta.env.VITE_MODE,
  QUICKNODE_RPC_URL: import.meta.env.VITE_QUICKNODE_RPC_URL,
  QUICKNODE_RPC_WSS: import.meta.env.VITE_QUICKNODE_RPC_WSS,
  HELIUS_RPC_URL: import.meta.env.VITE_HELIUS_RPC_URL,
  HELIUS_RPC_WSS: import.meta.env.VITE_HELIUS_RPC_WSS
}
