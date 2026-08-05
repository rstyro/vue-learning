// main.js —— 应用入口
// 与项目1的区别：这里多了「路由」的注册

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'          // 导入路由配置（router/index.js）
import './style.css'

const app = createApp(App)
app.use(router)                        // ⚠️ 关键：把路由插件注册到应用里
app.mount('#app')

// 🧠 理解路由的作用：
//   没有路由：一个页面 = 一个 HTML 文件（多页应用）
//   有路由   ：一个 HTML 文件 + URL 变化 → 切换显示不同组件（单页应用 SPA）
//   浏览器的前进/后退、刷新页面，都由 router 接管
