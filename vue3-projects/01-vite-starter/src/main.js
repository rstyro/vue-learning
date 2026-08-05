// main.js —— 应用的「入口文件」，所有东西都从这里启动
// Vite 的入口文件固定为 src/main.js（在 index.html 里被引用）

import { createApp } from 'vue'          // 从 vue 导入 createApp（创建应用）
import App from './App.vue'              // 导入根组件（整个应用的"大容器"）
import './style.css'                     // 全局样式（可选）

// 创建应用并挂载到 index.html 里的 #app 元素
// 链式调用：createApp(...).mount('#app')
createApp(App).mount('#app')

// 🧠 理解应用的结构：
//   createApp(根组件)  →  根组件内部再引用其他子组件 → 组件树
//   App.vue（根） → HelloWorld.vue（子）...
//   所有组件最终渲染到 <div id="app"> 里
