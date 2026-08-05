// main.js —— 应用入口
// 与项目2的区别：这里注册了 Pinia（状态管理）+ 持久化插件

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'   // 导入持久化插件
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

// ⚠️ 关键：把持久化插件注册到 Pinia
//   注册后，任何 store 只要配置了 persist: true 就会自动持久化
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.mount('#app')
