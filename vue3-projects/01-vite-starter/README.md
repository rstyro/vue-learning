# 01-vite-starter — Vite 工程结构入门

> 第一个项目，目标是搞懂 **Vite + Vue 项目的基本结构**：每一个文件是干什么的，开发命令怎么用，环境变量怎么配，以及最后怎么打包部署。
>
> 本项目内容很少，但每一行都带注释——适合作为你未来所有 Vue 项目的模板。

## 从 0 开始构建一个 Vite + Vue 项目

如果你想**亲手从零搭建一遍**（而不是直接 npm install），按下面步骤来：

### 1. 前置条件

- **Node.js** ≥ 18（推荐 20 LTS），安装后验证：

```bash
node -v    # 应输出 v18+ 或 v20+
npm -v     # 应输出 9+
```

### 2. 用 Vite 脚手架创建项目

```bash
# 在你想要放项目的目录下执行（比如桌面）
npm create vite@latest 01-vite-starter -- --template vue

# 上述命令等价于依次输入：
#   - 项目名：01-vite-starter
#   - 框架：Vue
#   - 变体：JavaScript
```

Vite 会自动生成以下文件：

```
01-vite-starter/
├── index.html          # HTML 入口（Vite 从这里开始，而不是 public/）
├── package.json        # 项目描述 + npm 脚本 + 依赖列表
├── vite.config.js      # Vite 配置文件（插件、端口、构建选项）
├── .gitignore
├── public/             # 不经过编译的静态资源（favicon 等）
└── src/
    ├── main.js         # JS 入口（创建 Vue 应用并挂载）
    ├── App.vue         # 根组件（.vue = template + script + style）
    ├── components/     # 可复用的子组件
    ├── assets/         # 需要 Vite 处理的静态资源（图片、CSS 等）
    └── style.css       # 全局样式
```

### 3. 安装依赖 & 启动开发服务器

```bash
cd 01-vite-starter
npm install     # 安装 package.json 里列出的依赖（Vue、Vite、插件等）
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
```

浏览器自动打开，你会看到 Vite 默认的欢迎页——**项目跑起来了！**

### 4. 理解核心文件（按阅读顺序）

| 文件 | 角色 | 关键点 |
|------|------|--------|
| `index.html` | HTML 入口 | `<script type="module" src="/src/main.js">` —— Vite 从这里开始加载 |
| `src/main.js` | JS 入口 | `createApp(App).mount('#app')` —— 创建 Vue 应用，挂到 `#app` 上 |
| `src/App.vue` | 根组件 | 单文件组件（SFC）：`<template>` + `<script setup>` + `<style scoped>` |
| `vite.config.js` | Vite 配置 | 插件（`@vitejs/plugin-vue`）、端口、构建输出、sourcemap |
| `package.json` | 项目元信息 | `scripts` 定义了 `dev` / `build` / `preview` 三个命令 |

### 5. 环境变量

Vite 通过 `.env` 文件管理环境变量（**只暴露 `VITE_` 前缀的变量**给客户端代码）：

```bash
# .env（所有环境共享）
VITE_APP_TITLE=Vite 项目结构入门

# .env.production（生产环境覆盖）
VITE_APP_TITLE=Vite 项目结构入门（生产环境）
```

在代码里通过 `import.meta.env.VITE_APP_TITLE` 读取。

## 快速开始（已有项目）

```bash
cd vue3-projects/01-vite-starter
npm install       # 首次需要安装依赖
npm run dev       # 启动开发服务器 → http://localhost:5173
```

## 构建命令

```bash
# 开发：启动热更新开发服务器
npm run dev

# 构建：打包成可部署的静态文件（输出到 dist/）
npm run build

# 预览：本地预览构建产物（模拟生产环境）
npm run preview
```

## 项目结构（本项目的实际目录）

```
01-vite-starter/
├── index.html              # HTML 入口，Vite 从这里开始
├── package.json            # 项目描述 + npm 脚本 + 依赖列表
├── vite.config.js          # Vite 配置：插件、端口、sourcemap
├── .env                    # 开发环境变量
├── .env.production         # 生产环境变量（会覆盖 .env 中的同名变量）
├── .gitignore
├── dist/                   # npm run build 的输出目录（可部署）
└── src/
    ├── main.js             # JS 入口：createApp(App).mount('#app')
    ├── App.vue             # 根组件：展示环境变量 + 引用子组件
    ├── style.css           # 全局样式
    ├── assets/             # 静态资源（Vite 会处理）
    ├── components/         # 子组件：AppHeader、CounterDemo、LifecycleDemo
    └── views/              # 页面级组件
```

## 本项目演示的知识点

| 知识点 | 在哪看 |
|--------|--------|
| **Vite 项目初始化** | `npm create vite@latest` 命令 |
| **单文件组件（SFC）** | `src/App.vue`：template / script setup / style scoped |
| **组件化开发** | `src/components/`：AppHeader、CounterDemo、LifecycleDemo |
| **Props 传参** | `App.vue` 向 CounterDemo 传 `initial-count="5"` |
| **v-if / v-else 条件渲染** | `App.vue` 中根据 `mode` 切换环境提示 |
| **响应式数据** | CounterDemo 里的 `ref()` 和 `computed()` |
| **生命周期钩子** | LifecycleDemo 里的 `onMounted` / `onUnmounted` |
| **环境变量** | `.env` → `import.meta.env.VITE_APP_TITLE` |
| **Vite 开发服务器** | `vite.config.js` → `server.port` / `server.open` |
| **构建与预览** | `npm run build` → `npm run preview` |

## 下一步

搞懂了这个项目的基本结构后，去看 `../02-component`，学习怎么把页面拆成更多组件、组件之间怎么通信。

---

📖 这个项目是 [vue-learning](../../README.md) 系列的第 1 个项目。每个文件都有详细注释，建议**从 `package.json` → `index.html` → `src/main.js` → `src/App.vue` → `vite.config.js`** 的顺序读一遍。
