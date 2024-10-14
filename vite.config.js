import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://total-wil-mette-sigos-6a0bb541.koyeb.app',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
