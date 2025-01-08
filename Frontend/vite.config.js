import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Change the output directory to "dist"
  },
  plugins: [react()],
})
