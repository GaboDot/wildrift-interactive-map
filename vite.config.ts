import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@roleConstants': fileURLToPath(new URL('./src/constants/Roles', import.meta.url)),
      '@drawingColors': fileURLToPath(new URL('./src/constants/DrawingColors', import.meta.url)),
      '@animations': fileURLToPath(new URL('./src/assets/animations', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@mapTools': fileURLToPath(new URL('./src/components/MapTools', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
    },
  },
})
