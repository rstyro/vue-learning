// stores/cart.ts —— 购物车 Store（组合式写法 + 自动持久化）
// 与 03-pinia 的 cart.js 对比：当时是"手写 watch + localStorage"，
// 现在用 pinia-plugin-persistedstate 插件，一个 persist 配置就搞定，更符合真实项目。
//
// 学习重点：① persist 持久化配置  ② computed getters  ③ TS 类型标注

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore(
  'cart',
  () => {
    // ---------- state ----------
    const items = ref<CartItem[]>([])

    // ---------- getters（computed，像计算属性） ----------
    // 商品总件数（顶部角标用）
    const totalCount = computed(() =>
        // 这个是所有数量的总和
      // items.value.reduce((sum, item) => sum + item.quantity, 0)
      // 商品类型就行
        items.value.length
    )
    // 总金额
    const totalPrice = computed(() =>
      items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    )
    // 是否为空（结算页、购物车空态用）
    const isEmpty = computed(() => items.value.length === 0)

    // ---------- actions ----------
    // 加入购物车：已存在则数量 +1，不存在则新增条目
    function add(product: Product, quantity = 1) {
      const existing = items.value.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        items.value.push({ product, quantity })
      }
    }

    function increase(id: number) {
      const item = items.value.find(i => i.product.id === id)
      if (item) item.quantity++
    }

    function decrease(id: number) {
      const item = items.value.find(i => i.product.id === id)
      if (item && item.quantity > 1) {
        item.quantity--
      } else {
        remove(id)   // 数量减到 0 就移除该条目
      }
    }

    // 直接设置数量（购物车页的数字输入框用）
    function setQuantity(id: number, quantity: number) {
      const item = items.value.find(i => i.product.id === id)
      if (item && quantity >= 1) {
        item.quantity = Math.min(Math.floor(quantity), 99)
      }
    }

    function remove(id: number) {
      items.value = items.value.filter(i => i.product.id !== id)
    }

    function clear() {
      items.value = []
    }

    return {
      items, totalCount, totalPrice, isEmpty,
      add, increase, decrease, setQuantity, remove, clear
    }
  },
  {
    // ⚠️ 持久化：插件注册后（见 main.ts），配置这个对象即可自动保存到 localStorage
    //    效果：加购 → 刷新页面 → 购物车数据还在（03 手写 watch 实现的是同一件事）
    persist: {
      key: 'ts-shop-cart',       // localStorage 的 key
      storage: localStorage,      // 默认就是 localStorage，这里写出来更明确
      pick:["items"]
    }
  }
)
