# 06-ts-shop — TypeScript 商城实战 Demo

> 前 4 个项目学完"结构 → 路由 → 状态 → API 层"后，本项目的目标是：**把它们全部用 TS 重写一遍，并引入真实项目必备的 Element Plus 组件库**。
>
> 这是一个**可完整跑通的商城 Demo**：商品列表 → 商品详情 → 加购 → 购物车 → 下单 → 下单成功，外加 404 页。

## 本项目的核心知识点

| 知识点 | 说明 | 在哪里 |
|--------|------|--------|
| **TypeScript** | 全量 TS：类型定义、泛型、`script setup lang="ts"`、`vue-tsc` 构建时类型检查 | `src/types/`、`src/api/http.ts` |
| **SCSS** | `<style lang="scss">`、嵌套、变量、全局注入（`additionalData`） | `src/styles/`、各组件 |
| **Element Plus 自动导入** | `unplugin-auto-import` + `unplugin-vue-components`：模板组件、`ElMessage` 等方法全部按需自动引入 | `vite.config.ts` |
| **Pinia + 持久化** | `pinia-plugin-persistedstate`：购物车刷新不丢（对比 03 的手写方案） | `src/stores/cart.ts` |
| **Axios 泛型封装** | 响应拦截器统一解包 `{ code, data, message }` + 泛型让返回数据带类型 | `src/api/http.ts` |
| **真实工程分层** | types / api / stores / router / views / components 各司其职 | `src/` 目录 |

## 快速开始

需要**两个终端**（和 04-complete 一样，Mock 后端 + 前端）：

```bash
# 终端 1：启动 Mock 后端（商品/分类/下单接口，端口 3000）
cd vue3-projects/06-ts-shop
node mock/server.js

# 终端 2：启动前端（Vite 会把 /api 请求代理到 Mock，端口 5177）
cd vue3-projects/06-ts-shop
npm install      # 第一次需要
npm run dev      # 自动打开浏览器
```

打开 http://localhost:5177 即可体验完整购物流程。

## 构建命令

```bash
# 开发：启动热更新开发服务器（端口 5177，自动打开浏览器）
npm run dev

# 构建：TS 类型检查 + Vite 打包（输出到 dist/）
# ⚠️ 构建前确保先跑过一次 npm run dev，生成 auto-imports.d.ts 和 components.d.ts
npm run build

# 预览：本地预览构建产物（模拟生产环境，也需要先启动 Mock 后端）
npm run preview
```

> **注意**：`npm run build` 实际执行的是 `vue-tsc --noEmit && vite build`，先用 `vue-tsc` 做 TypeScript 类型检查（不生成文件），通过后才执行 `vite build` 打包。任何类型错误都会导致构建失败。

### 生产部署

构建产物在 `dist/` 目录，部署到服务器后需要 Nginx 将 `/api` 请求反向代理到真实后端（参照 `../05-nginx-deploy`）：

```bash
# 本地模拟生产环境
npm run build
npx vite preview --port 4173   # 默认预览端口，注意 /api 代理在生产环境需要 Nginx 处理
```

## 目录结构

```
06-ts-shop/
├── vite.config.ts          # ⭐ Element Plus 自动导入 + SCSS 全局注入 + 代理
├── tsconfig.json           # TS 配置（strict 模式）
├── .env.development        # 开发环境变量（VITE_API_BASE_URL=/api）
├── mock/
│   └── server.js           # Mock 服务器（node 内置 http，无第三方依赖）
└── src/
    ├── main.ts             # 入口：注册 Pinia + 持久化插件 + 路由
    ├── App.vue             # 布局：顶栏（购物车角标）+ 路由出口
    ├── types/              # ⭐ 新增：全部 TS 类型（api / product / cart / order）
    ├── api/                # 接口层：http 泛型封装 + product / order 模块
    ├── stores/             # 状态层：购物车（persist 持久化）
    ├── router/             # 路由层：懒加载 + 守卫设标题
    ├── styles/             # ⭐ 新增：SCSS 变量 + 全局样式
    ├── components/         # 可复用组件（ProductCard）
    └── views/              # 页面（Home / Detail / Cart / Checkout / Success / 404）
```

## 三个必看的关键点

### ① Element Plus 自动导入（vite.config.ts）

```ts
AutoImport({
  imports: ['vue', 'vue-router', 'pinia'],
  resolvers: [ElementPlusResolver()],   // ElMessage / ElMessageBox 等自动引入
  dts: 'src/auto-imports.d.ts'
}),
Components({
  resolvers: [ElementPlusResolver({ directives: true })],  // 含 v-loading 指令
  dts: 'src/components.d.ts'
})
```

效果：**模板里直接写 `<el-button>`，代码里直接调 `ElMessage`，都不用 import，也不用 `app.use(ElementPlus)` 全量注册**。产物只打包用到的组件（首屏 JS 由全量引入的 ~800KB 降到按需加载的几十 KB 每页）。

运行后会生成 `src/auto-imports.d.ts` 和 `src/components.d.ts`（类型声明，**请提交到仓库**，否则第一次 `npm run build` 的类型检查会报 ElMessage 未定义）。

### ② 购物车持久化（src/stores/cart.ts）

```ts
export const useCartStore = defineStore(
  'cart',
  () => { /* state + getters + actions */ },
  { persist: { key: 'ts-shop-cart', storage: localStorage } }   // ← 就这一行
)
```

和 03-pinia 对比：当时用 `watch + localStorage` 手写，现在插件自动完成。**加购 → 刷新页面 → 数据还在**。

### ③ Axios 泛型解包（src/api/http.ts）

```ts
export function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return http.request(config) as Promise<T>
}
// 调用处：返回值直接带类型
const data = await request<PageResult<Product>>({ url: '/products', params })
```

响应拦截器把 `{ code, data, message }` 解包成 `data`，泛型让业务代码拿到**带类型**的返回值——写错属性名在编译期就报错。

## 验证测试（无需浏览器）

```bash
# 1. 启动 Mock 后，直接验证接口
node mock/server.js   # 另开终端执行下面命令

curl http://localhost:3000/api/categories
curl "http://localhost:3000/api/products?keyword=小米"
curl http://localhost:3000/api/products/3
curl http://localhost:3000/api/products/999        # → { code: 404 }

# 2. 下单（JSON 存文件后提交，避免命令行转义问题）
#    POST http://localhost:3000/api/orders

# 3. 验证 Vite 代理（dev server 运行中）
curl http://localhost:5177/api/products?page=1&pageSize=2
```

## 常见问题

- **`npm run build` 报 ElMessage 未定义**：先跑一次 `npm run dev`（或 `npx vite build`）生成 `auto-imports.d.ts`。
- **3000 端口被占用**：`netstat -ano | findstr 3000` 找到 PID 后 `taskkill /F /PID <pid>`。
- **生产环境接口在哪**：打包后没有 dev 代理，`/api` 由 Nginx 反向代理到真实后端（衔接 05-nginx-deploy 的代理配置示例）。
- **为什么 emoji 当图片**：Demo 无后端图片资源，emoji + 渐变背景离线可用，真实项目替换为 `<img>` 即可。
