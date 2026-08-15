import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Pre-bundle Firebase ESM entrypoints so Vite's import analysis can resolve them reliably.
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/firestore',
      // add other firebase modules you use here if needed, e.g. 'firebase/auth'
    ],
  },
})
