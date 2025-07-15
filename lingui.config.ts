import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'en',
  locales: ['en', 'zh'],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src']
    }
  ]
})
