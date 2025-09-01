// vite.widget.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/widget/sdk.ts',
      name: 'GIMMIE',
      formats: ['iife'],
      fileName: () => 'gimmie-widget.js',
    },
    outDir: 'public/widget',
    emptyOutDir: false,
  }
})
