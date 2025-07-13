/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TARGET_URL: string
  readonly VITE_PHP_BASE_URL: string
  readonly VITE_PHP_TARGET_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
