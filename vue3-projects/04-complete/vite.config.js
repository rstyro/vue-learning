import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5176,
    open: true,
    // 开发代理：把 /api 开头的请求转发到后端服务器
    // 作用：前端写 /api/xxx，实际请求到 http://localhost:3000/api/xxx
    //      解决跨域问题（浏览器不允许跨域，但服务器之间可以）
    proxy: {
      '/api': {
        target: 'http://localhost:3000',   // 模拟的后端地址
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      // 路径别名：@ = src 目录
      // 这样 import 的时候可以写 @/components/Xxx 而不是 ../../components/Xxx
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
