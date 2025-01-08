import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "public", // Change the output directory to "public"
  },
  plugins: [react()],
})
