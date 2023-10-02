import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/scrape': 'http://localhost:5001',
      '/generate': 'http://localhost:5001',
    },
  },
})
