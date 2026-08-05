// vite.config.ts —— Vite 配置文件（TS 版本）
// 本项目的核心亮点：Element Plus 自动导入 + SCSS 全局变量注入

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // ① 自动导入 API（不用手写 import 的 Vue / Element Plus 方法）
    //    例：模板里直接用 ElMessage、ElMessageBox；还能自动导入 ref、computed 等
    //    运行后会生成 src/auto-imports.d.ts（类型声明，供 TS 识别）
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],   // 遇到 ElMessage 等会自动引入对应组件和样式
      dts: 'src/auto-imports.d.ts'
    }),

    // ② 自动导入组件（模板里的 <el-button> 等无需手动 import + app.use）
    //    按需加载：只有用到的组件才会打进包，产物更小
    //    运行后会生成 src/components.d.ts
    Components({
      resolvers: [
        // directives: true —— 同时解析 v-loading 等指令
        ElementPlusResolver({ directives: true })
      ],
      dts: 'src/components.d.ts'
    })
  ],

  resolve: {
    alias: {
      // 路径别名：@ = src 目录（和 04 一致）
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        // ③ SCSS 全局注入：每个 <style lang="scss"> 都会自动带上 variables.scss
        //    这样所有组件里可以直接用 $primary、$gap 等变量，无需手动 @use
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },

  server: {
    port: 5177,
    open: true,
    // 开发代理：把 /api 开头的请求转发到 Mock 服务器（解决跨域）
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
