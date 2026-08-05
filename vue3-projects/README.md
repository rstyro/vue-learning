# Vue 3 项目级实战（vue3-projects）

学完 `../vue3/` 的基础语法后，进入**真实工程开发**。这里用 5 个独立的 Vite 工程 + 1 个部署项目，**每个项目聚焦一个知识点**，循序渐进。

## 学习路径

| 项目 | 核心知识点 | 端口 |
|------|-----------|------|
| **[01-vite-starter](./01-vite-starter/)** | Vite 工程结构：目录规范、单文件组件（SFC）、组件通信、环境变量、构建 | 5173 |
| **[02-router](./02-router/)** | Vue Router 路由：页面导航、动态路由、嵌套路由、懒加载、404、编程式导航 | 5174 |
| **[03-pinia](./03-pinia/)** | Pinia 状态管理：全局数据共享、选项式/组合式 store、getters、actions | 5175 |
| **[04-complete](./04-complete/)** | 综合实战：axios 封装（拦截器/错误处理）、目录分层、Mock 服务器、环境变量 | 5176 |
| **[05-nginx-deploy](./05-nginx-deploy/)** | 生产部署：构建产物 + Nginx 托管、history 路由刷新 404 修复、静态资源缓存、gzip、接口代理 | 8080 |
| **[06-ts-shop](./06-ts-shop/)** | 综合实战（TS 版）：TypeScript + Element Plus 自动导入 + SCSS + Pinia 持久化 + Axios 泛型封装（商城 Demo） | 5177 |

## 每个项目怎么跑

```bash
cd vue3-projects/01-vite-starter
npm install          # 第一次需要安装依赖（已装过可跳过）
npm run dev          # 启动开发服务器，自动打开浏览器
```


### 特殊说明（项目4 / 项目6）

项目4 和项目6 都演示 API 请求，需要两个终端：

```bash
# 终端 1：启动 Mock 后端（返回假数据）
cd vue3-projects/04-complete        # 项目6 则换成 cd vue3-projects/06-ts-shop
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

06-ts-shop（TypeScript + 组件库）
└── src/
    ├── types/             # ⭐ 新增：TS 类型定义（接口返回、实体、请求参数）
    ├── styles/            # ⭐ 新增：SCSS 变量 + 全局样式
    ├── api/               # axios 泛型封装（拦截器解包后返回带类型的数据）
    ├── stores/            # Pinia + 持久化插件（persist 一行配置）
    ├── components/        # 组件（Element Plus 组件自动导入，无需注册）
    └── views/             # 页面（6 个完整页面：列表/详情/购物车/结算/成功/404）
```

**规律**：真实项目的目录就是一层层加出来的——先有结构，再加路由，再加状态，最后加 API 层。到 06 之后，目录结构与真实项目几乎一致（types / api / stores / views / components / styles）。

> **05-nginx-deploy 不是第 5 层**：部署不属于源码分层，它直接复用 02-router 的构建产物（dist），只新增 Nginx 配置与部署文档。理解这一点很重要——一套前端代码可以部署到任意服务器，部署逻辑和源码逻辑是解耦的。

## 学习建议

1. **按顺序学**：01 → 02 → 03 → 04 → 06，每个项目都在前一个基础上扩展
2. **每个项目都动手改**：改组件名、加路由、加 store、换接口
3. **看构建输出**：`npm run build` 后观察 dist 目录——02 的路由懒加载会拆成多个 JS 文件；06 的 Element Plus 自动导入会把用到的组件按需拆包；学完 04/06 后到 05 把它真正部署起来
4. **对照真实项目**：学完后打开任意一个开源 Vue3 项目（如 vue-element-admin），你会发现目录结构几乎一样

## 后续进阶方向

- **测试**：Vitest（单元测试）、Playwright（端到端）
- **工程化**：ESLint + Prettier（代码规范）、Husky + lint-staged（提交前检查）
- **SSR / 全栈**：Nuxt3（Vue 全栈框架）、或者把 06 的 Mock 换成真实后端（Node/Java/Go）
- **部署进阶**：05 已覆盖基础部署（Nginx 静态托管 + 路由回退 + 缓存 + 代理）；继续深入：环境变量区分、HTTPS、Docker 容器化
- **Monorepo**：pnpm workspace 多项目管理

> 06 已覆盖：TypeScript、Element Plus 组件库、SCSS、Pinia 持久化、Axios 封装——这些就是接手真实项目前需要补全的最后一环。
