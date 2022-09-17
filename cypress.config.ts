import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    chromeWebSecurity: false,
    supportFile: false,
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    supportFile: 'cypress/support/component.tsx',
    experimentalSingleTabRunMode: true,
    experimentalWebKitSupport: true,
    experimentalSourceRewriting: true,
  },
})
