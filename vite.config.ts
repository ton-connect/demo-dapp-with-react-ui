import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

process.env.VITE_TG_ANALYTICS_URL ??= 'https://unpkg.com/tganalytics-staging@0.0.4-staging/dist/index.js'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs'
  },
  // @ts-ignore
  base: process.env.GH_PAGES ? '/demo-dapp-with-wallet/' : './',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})
