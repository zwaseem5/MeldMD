// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use BASE_PATH from env if provided (Vercel/CI), else default to '/'
const base = process.env.BASE_PATH || '/'
// Optional preview flag you were using
const isPreview = !!process.env.IS_PREVIEW

// Resolve src path without importing node:path (avoids TS complaints in CI)
const SRC_ALIAS = new URL('./src', import.meta.url).pathname

export default defineConfig({
  // Expose globals used in your code
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
  },

  plugins: [
    // Use the standard React plugin (not the SWC variant)
    react(),
    // NOTE:
    // If you need unplugin-auto-import, add it back here AND ensure
    // `unplugin-auto-import` is in devDependencies. Otherwise, leave it out.
  ],

  // Set the base path for assets/router
  base,

  build: {
    sourcemap: true,
    // Vercel expects "dist" by default; keep it consistent with vercel.json or presets
    outDir: 'dist',
  },

  resolve: {
    alias: {
      '@': SRC_ALIAS,
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
