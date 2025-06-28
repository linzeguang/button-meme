import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import cdn from 'vite-plugin-cdn-import'
import svgr from 'vite-plugin-svgr'

import { external, globals, modules } from './cdn.modules'

// https://vite.dev/config/
export default defineConfig((env) => {
  const isVisualizer = process.argv.includes('--visualizer')
  const isProd = env.mode === 'production'
  const timestamp = Date.now()

  return {
    plugins: [
      react(),
      tailwindcss(),
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
      port: 2888
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
      drop: isProd ? ['console', 'debugger'] : undefined // 删除所有 console 和 debugger
    }
  }
})
