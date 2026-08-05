# Vue 3 学习目录

从零开始学习 Vue 3 的完整教程，**每一课都是可独立运行的 HTML 实例**，配套详细的中文注释讲解。

## 快速开始

两种打开方式任选其一：

1. **直接双击** 打开 `index.html`（推荐，纯本地运行，无需安装）
2. **启动本地服务器**（更接近真实项目环境）：

```bash
npx serve vue3
# 或
python -m http.server
```

## 学习路径

打开 `index.html` 即可看到带链接的导航页，按编号顺序学习：

| 阶段 | 课程 | 核心知识点 |
|------|------|-----------|
| **基础篇** | 第1课 Hello World | 插值、v-model、@click、v-if、v-for、:class |
| | 第2课 选项式 vs 组合式 | 两种代码风格对比 |
| | 第3课 模板语法全解 | v-bind / v-on / v-if / v-for / v-model 全解 |
| **响应式篇** | 第4课 ref 与 reactive | 响应式核心、解构陷阱、toRefs |
| | 第5课 computed | 计算属性、缓存机制、可写 computed |
| | 第6课 watch | deep / immediate / watchEffect / 停止监听 |
| | 第7课 生命周期 | onMounted / onUnmounted 实战 |
| **组件篇** | 第8课 组件基础 | props 父传子、emit 子传父 |
| | 第9课 插槽 | 默认 / 具名 / 作用域插槽 |
| | 第10课 通信进阶 | v-model 组件、defineExpose、provide/inject |
| | 第11课 动态组件 | component :is、KeepAlive 缓存 |
| **进阶篇** | 第12课 组合式函数 | useCounter / useMouse / useLocalStorage |
| | 第13课 响应式进阶 | toRefs / readonly / shallowRef / customRef |
| | 第14课 内置组件 | Teleport、Transition 动画 |
| | 第15课 自定义指令 | v-focus / v-color / 点击外部关闭 / 权限 |
| | 第16课 迁移指南 | Vue2 → Vue3 差异速查表 |

## 项目结构

```
vue3/
├── index.html              # 🏠 学习导航页（从这里开始）
├── lib/
│   ├── vue.global.js       # Vue 3.4.38 开发版（学习用，含完整报错提示）
│   └── vue.global.prod.js  # 生产版（体积更小）
├── 01-基础篇/              # 第 1-3 课
├── 02-响应式篇/             # 第 4-7 课
├── 03-组件篇/               # 第 8-11 课
└── 04-进阶篇/               # 第 12-16 课
```

## 学习建议

1. **动手优先**：每个例子都打开源码（Ctrl+U），改一改数据，观察页面变化
2. **对比记忆**：第2课（两种 API）、第4课（ref vs reactive）反复对比
3. **勤看控制台**：按 F12 打开控制台，很多课程会在控制台打印提示或警告
4. **先跑通再深挖**：先按顺序看完一遍，再回头精读感兴趣的章节

## 进阶方向

学完本目录后，继续学习：

- **Vue Router** —— 单页应用路由
- **Pinia** —— 官方状态管理（替代 Vuex）
- **Vite** —— 新一代构建工具（真实项目都用它）
- **单文件组件（SFC）** —— `.vue` 文件才是生产环境的标准写法

> 注：本目录用「单个 HTML + 全局构建版」的方式教学，目的是零门槛入门；生产项目请使用 Vite + 单文件组件的方式。
