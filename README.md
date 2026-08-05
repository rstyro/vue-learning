# vue-learning

前端菜鸟，学习 Vue 的笔记与练习。

## 目录结构

```
vue-learning/
├── vue2/            # Vue 2 学习（入门案例 + 进阶 + CSS3 练习）
├── vue3/            # Vue 3 基础语法（16 课完整教程，单文件 HTML 形式）
├── vue3-projects/   # Vue 3 项目级实战（4 个 Vite 真实工程，进阶必学）
├── style/           # 样式资源
└── scripts/         # 验证脚本（检查 HTML 语法 / 浏览器渲染 / 交互测试）
```

## 学习路线

### 第一阶段：Vue 2 入门（了解核心概念）
- 打开 `vue2/01/` 的 8 个案例：指令、双向绑定、组件、计算属性

### 第二阶段：Vue 3 基础语法（推荐新项目）
- 打开 `vue3/index.html` 开始 16 课完整学习
- 想快速了解 Vue2 → Vue3 差异：`vue3/04-进阶篇/5.Vue2迁移指南.html`

### 第三阶段：Vue 3 项目级实战
- 打开 `vue3-projects/README.md`，4 个真实 Vite 工程：
  1. **01-vite-starter**：工程结构入门
  2. **02-router**：Vue Router 路由
  3. **03-pinia**：Pinia 状态管理
  4. **04-complete**：axios API 封装 + 完整分层

## 如何运行

```bash
# 静态学习页面（vue2/vue3 目录）：直接双击 HTML 即可
# 项目工程（vue3-projects 目录）：
cd vue3-projects/01-vite-starter
npm install
npm run dev
```
