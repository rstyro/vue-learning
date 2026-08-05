// stores/counter.js —— 计数器 Store（插件持久化方案）
// 演示：【选项式写法】 用 pinia-plugin-persistedstate 插件实现"刷新不丢"
// 对比 cart.js 的手写方案：插件只需配置 persist: true，代码更简洁

import { defineStore } from 'pinia'

// ⚠️ 关键：选项式 store 中 persist 必须写在【第二个参数】里（和 state 同级）！
//   不要写成 defineStore('counter', {...}, { persist: true }) ——
//   第三参数 setupOptions 只对组合式 store 生效，选项式 store 会忽略它
export const useCounterStore = defineStore('counter', {
  // state：数据
  state: () => ({
    count: 0,
    history: []          // 记录每次变化
  }),

  // getters：计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
    historySummary: (state) => state.history.length + ' 次变化'
  },

  // actions：方法
  actions: {
    increment(n = 1) {
      this.count += n
      this.history.push(`+${n} → ${this.count}`)
    },
    decrement(n = 1) {
      this.count -= n
      this.history.push(`-${n} → ${this.count}`)
    },
    reset() {
      this.count = 0
      this.history = []
    }
  },

  // ⚠️ 关键：一行配置开启持久化（插件方案的核心优势）
  // 插件在 store 初始化时从 localStorage 读回数据，
  // 每次 state 变化时自动写入 —— 原理和手写 watch 完全一样，只是封装好了
  // 默认存到 localStorage，key 是 store 的 id（'counter'）
  persist: true
})
