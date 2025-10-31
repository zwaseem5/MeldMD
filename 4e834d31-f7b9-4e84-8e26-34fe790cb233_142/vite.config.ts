import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Use import.meta.env.* in app code (not process.env)
export default defineConfig({
  plugins: [react()],
})
