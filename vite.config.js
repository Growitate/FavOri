import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 2111,
    strictPort: true,
    allowedHosts: ['carpets.cyberpunk.co.in', 'localhost', '127.0.0.1'],
  },
  preview: {
    host: '0.0.0.0',
    port: 2111,
    strictPort: true,
    allowedHosts: ['carpets.cyberpunk.co.in', 'localhost', '127.0.0.1'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
