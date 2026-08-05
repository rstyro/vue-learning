// stores/cart.js —— 购物车 Store（手写持久化方案，零依赖）
// 演示：【组合式写法】 如何用 watch + localStorage 实现"刷新页面数据不丢"
// （不装任何插件，原理透明，适合理解持久化本质）

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// localStorage 的 key（约定一个前缀，避免冲突）
const STORAGE_KEY = 'vue3-cart'

// 组合式 store
export const useCartStore = defineStore('cart', () => {
  // ---------- state ----------
  // ① 初始化时先从 localStorage 读回上次保存的数据（刷新后不丢的关键）
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      console.warn('读取购物车缓存失败（可能是 JSON 损坏）:', e)
      return null
    }
  }

  const items = ref(loadFromStorage() || [
    { id: 1, name: '苹果', price: 5, quantity: 3 },
    { id: 2, name: '香蕉', price: 3, quantity: 5 },
    { id: 3, name: '西瓜', price: 20, quantity: 1 }
  ])

  // ---------- getters ----------
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  // ---------- ② 持久化核心：watch 监听 items，一变就存进 localStorage ----------
  // deep: true 深度监听 —— items 里的 quantity 变化也会触发
  watch(items, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    console.log('💾 [手写持久化] 购物车已保存到 localStorage')
  }, { deep: true })

  // ---------- actions ----------
  function increase(itemId) {
    const item = items.value.find(i => i.id === itemId)
    if (item) item.quantity++
  }

  function decrease(itemId) {
    const item = items.value.find(i => i.id === itemId)
    if (item && item.quantity > 0) item.quantity--
  }

  function removeItem(itemId) {
    items.value = items.value.filter(i => i.id !== itemId)
  }

  function addItem(name, price) {
    items.value.push({ id: Date.now(), name, price, quantity: 1 })
  }

  function clearCart() {
    items.value = []
  }

  return {
    items, totalCount, totalPrice,
    increase, decrease, removeItem, addItem, clearCart
  }
})
