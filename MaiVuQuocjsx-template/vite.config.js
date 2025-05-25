import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 Dòng quan trọng để tránh lỗi 404 trên Vercel
})
