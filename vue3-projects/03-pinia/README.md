# 03-pinia —— Pinia 状态管理（含持久化）

## 这个项目教你什么

1. **Pinia 基础**：全局数据共享（两个组件读写同一个 store）
2. **两种 store 写法**：选项式（`stores/counter.js`）vs 组合式（`stores/cart.js`）
3. **⭐ 数据持久化**（本项目的重点）：刷新页面后数据不丢，两种方案对比

## 怎么运行

```bash
npm install
npm run dev        # 端口 5175
```

**体验持久化**：给计数器 +10、购物车加个商品 → **按 F5 刷新** → 数据都在！

## 两种持久化方案对比

### 方案一：手写 watch + localStorage（`stores/cart.js`，零依赖）

```js
// 初始化时读回
const items = ref(loadFromStorage() || [默认数据])

// 变化时写入（核心就两行）
watch(items, (val) => {
  localStorage.setItem('vue3-cart', JSON.stringify(val))
}, { deep: true })
```

**优点**：零依赖、原理透明、完全可控
**缺点**：每个需要持久化的 store 都要自己写一遍

### 方案二：插件 pinia-plugin-persistedstate（`stores/counter.js`）

```js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)    // main.js 注册一次

// store 里配置一行（⚠️ 必须在第二个参数！）
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  // ...
  persist: true    // ← 关键：第二个参数里（和 state 同级），如果是组合式就放在第三个参数
})
```

**优点**：一行配置、自动处理、支持 `paths`（只持久化部分字段）、自定义 key/storage/serializer
**缺点**：多一个依赖、黑盒（出问题需要看插件文档）

**本质**：插件的原理就是方案一的 watch + localStorage，只是封装成了通用插件。


**为什么**：Pinia 源码里 `options = isSetupStore ? setupOptions : setup` ——
选项式 store 的插件上下文拿的是第二个参数，第三个参数 `setupOptions` 只有组合式 store 才用。

**排查方法**：如果 persist 配置了但没生效，检查：
1. `main.js` 是否 `pinia.use(插件)`
2. `persist` 是否在第二个参数
3. F12 → Application → Local Storage 看有没有写入


文档地址：https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config



## 文件结构

```
src/
├── main.js                  # 注册 pinia + 持久化插件
├── stores/
│   ├── counter.js           # 选项式 store + 插件持久化
│   └── cart.js              # 组合式 store + 手写持久化
└── components/
    ├── CounterPanel.vue     # 计数器（两个实例共享 counter store）
    └── CartPanel.vue        # 购物车（手写持久化）
```
