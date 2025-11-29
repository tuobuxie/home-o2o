import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键配置：设置为相对路径，确保在 GitHub Pages 的子目录下能找到资源
  base: './', 
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})