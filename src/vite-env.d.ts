/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string
  readonly VITE_MONAD_RPC: string
  readonly VITE_QUICKNODE_RPC_URL: string
  readonly VITE_QUICKNODE_RPC_WSS: string
  readonly VITE_HELIUS_RPC_URL: string
  readonly VITE_HELIUS_RPC_WSS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
