# Vue 3 项目级实战（vue3-projects）

学完 `../vue3/` 的基础语法后，进入**真实工程开发**。这里用 4 个独立的 Vite 工程，**每个项目聚焦一个知识点**，循序渐进。

## 学习路径

| 项目 | 核心知识点 | 端口 |
|------|-----------|------|
| **[01-vite-starter](./01-vite-starter/)** | Vite 工程结构：目录规范、单文件组件（SFC）、组件通信、环境变量、构建 | 5173 |
| **[02-router](./02-router/)** | Vue Router 路由：页面导航、动态路由、嵌套路由、懒加载、404、编程式导航 | 5174 |
| **[03-pinia](./03-pinia/)** | Pinia 状态管理：全局数据共享、选项式/组合式 store、getters、actions | 5175 |
| **[04-complete](./04-complete/)** | 综合实战：axios 封装（拦截器/错误处理）、目录分层、Mock 服务器、环境变量 | 5176 |

## 每个项目怎么跑

```bash
cd vue3-projects/01-vite-starter
npm install          # 第一次需要安装依赖（已装过可跳过）
npm run dev          # 启动开发服务器，自动打开浏览器
```


### 特殊说明（项目4）

项目4 演示 API 请求，需要两个终端：

```bash
# 终端 1：启动 Mock 后端（返回假数据）
cd vue3-projects/04-complete
node mock/server.js

# 终端 2：启动前端（Vite 会把 /api 请求代理到 Mock）
cd vue3-projects/04-complete
npm run dev
```

## 项目结构演进（理解"为什么要这样组织"）

```
01-vite-starter（最小结构）
└── src/
    ├── main.js            # 入口
    ├── App.vue            # 根组件
    ├── components/        # 子组件
    └── assets/            # 静态资源

02-router（加入路由层）
└── src/
    ├── router/index.js    # ⭐ 新增：路由配置
    └── views/             # ⭐ 新增：页面组件（一个路由对应一个页面）

03-pinia（加入状态层）
└── src/
    └── stores/            # ⭐ 新增：全局状态（counter.js / cart.js）

04-complete（完整工程分层）
└── src/
    ├── api/               # ⭐ 新增：接口层（http 封装 + 按模块的接口文件）
    ├── components/        # 可复用组件
    ├── utils/             # 工具函数（占位）
    ├── stores/            # 状态管理
    └── views/             # 页面
```

**规律**：真实项目的目录就是一层层加出来的——先有结构，再加路由，再加状态，最后加 API 层。

## 学习建议

1. **按顺序学**：01 → 02 → 03 → 04，每个项目都在前一个基础上扩展
2. **每个项目都动手改**：改组件名、加路由、加 store、换接口
3. **看构建输出**：`npm run build` 后观察 dist 目录——02 的路由懒加载会拆成多个 JS 文件
4. **对照真实项目**：学完后打开任意一个开源 Vue3 项目（如 vue-element-admin），你会发现目录结构几乎一样

## 后续进阶方向

- **UI 组件库**：Element Plus / Naive UI / Ant Design Vue
- **TypeScript**：真实项目几乎都用 TS（Vue3 + TS 是官方推荐组合）
- **测试**：Vitest（单元测试）、Playwright（端到端）
- **部署**：Nginx + 环境变量区分、Docker 容器化
- **Monorepo**：pnpm workspace 多项目管理
