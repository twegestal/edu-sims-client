import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  }, 
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://10.2.3.27:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
