import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    port: 3400,
  },
  preview: {
    port: 3200,
  },
  // build: {
  //   rollupOptions: {
  //     input: resolve(__dirname, 'index.html'),
  //   }
  // },
  // optimizeDeps: {
  //   include: ['react', 'react-dom'],
  // },
})
