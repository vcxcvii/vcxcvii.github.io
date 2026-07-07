import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Builds a single self-contained nav.js + nav.css straight into the Jekyll
// site's assets/ dir. No dist folder, no manifest — Jekyll just serves these
// as static files alongside the hand-written CSS/JS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../assets'),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'),
      output: {
        entryFileNames: 'js/nav.js',
        assetFileNames: (info) => (info.name?.endsWith('.css') ? 'css/nav.css' : 'js/[name][extname]'),
        format: 'iife',
      },
    },
  },
})
