import path from 'path'

import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import cdn from 'vite-plugin-cdn-import'
import svgr from 'vite-plugin-svgr'

import { external, globals, modules } from './cdn.modules'

// https://vite.dev/config/
export default defineConfig((env) => {
  const processEnv = loadEnv(env.mode, process.cwd())
  const isVisualizer = process.argv.includes('--visualizer')
  const isProd = env.mode === 'production'
  const timestamp = Date.now()

  return {
    plugins: [
      react({
        babel: {
          plugins: ['@lingui/babel-plugin-lingui-macro']
        }
      }),
      lingui(),
      svgr(),
      isVisualizer && visualizer({ open: true }),
      isProd &&
        cdn({
          modules
        })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      __BUILD_TIME__: JSON.stringify(timestamp)
    },
    server: {
      port: 4888,
      proxy: {
        [processEnv.VITE_API_BASE_URL]: {
          target: processEnv.VITE_API_TARGET_URL,
          changeOrigin: true
        },
        [processEnv.VITE_PHP_BASE_URL]: {
          target: processEnv.VITE_PHP_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${processEnv.VITE_PHP_BASE_URL}`), '')
        },
        [processEnv.VITE_RPC_BASE_URL]: {
          target: processEnv.VITE_RPC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${processEnv.VITE_RPC_BASE_URL}`), '')
        }
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: isProd
        ? {
            external,
            plugins: [externalGlobals(globals)]
          }
        : {}
    },
    esbuild: {
      // drop: isProd ? ['console', 'debugger'] : undefined // 删除所有 console 和 debugger
    }
  }
})
