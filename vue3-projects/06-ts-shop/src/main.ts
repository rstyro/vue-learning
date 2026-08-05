// main.ts —— 应用入口（TS 版本）
// 与 03/04 的 main.js 相比：类型检查更严格，且入口文件后缀变成了 .ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'    // 全局样式

const app = createApp(App)
const pinia = createPinia()

// ⚠️ 注册持久化插件：之后任何 store 配置 persist 就会自动保存到 localStorage
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
