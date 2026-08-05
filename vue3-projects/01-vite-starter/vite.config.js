import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// vite.config.js 是 Vite 的配置文件（项目级配置都在这）
export default defineConfig({
  plugins: [vue()],          // 必须：让 Vite 认识 .vue 单文件组件
  server: {
    port: 5173,              // 开发服务器端口
    open: true               // 启动后自动打开浏览器
  },
  build: {
    outDir: 'dist',          // 构建输出目录
    sourcemap: true          // 生成 sourcemap，方便调试线上代码
  }
})
