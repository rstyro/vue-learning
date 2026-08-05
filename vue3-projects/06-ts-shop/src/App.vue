<template>
  <div class="app-shell">
    <!-- 顶部导航 -->
    <header class="app-header">
      <div class="header-inner">
        <router-link to="/" class="logo">🛒 TS 商城实战</router-link>

        <nav class="nav">
          <router-link to="/">商品列表</router-link>
          <router-link to="/cart">购物车</router-link>
        </nav>

        <!-- 购物车角标：数量来自 Pinia store（持久化后刷新也在） -->
        <el-badge
          :value="cartStore.totalCount"
          :hidden="cartStore.totalCount === 0"
          :max="99"
          class="cart-badge"
        >
          <el-button
            :icon="ShoppingCart"
            circle
            aria-label="购物车"
            @click="router.push('/cart')"
          />
        </el-badge>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">
      Vue3 + TypeScript + Pinia + Element Plus 教学 Demo（06-ts-shop）
    </footer>
  </div>
</template>

<script setup lang="ts">
// script setup + lang="ts"：组件的 TS 写法
import { useRouter } from 'vue-router'
import { ShoppingCart } from '@element-plus/icons-vue'   // 图标手动导入（对比自动导入）
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
</script>

<style scoped lang="scss">
// 组件内 SCSS：支持嵌套、变量（$border-color、$gap 来自全局注入的 variables.scss）
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #fff;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 0;
  z-index: 100;

  .header-inner {
    max-width: 1080px;
    margin: 0 auto;
    height: $header-height;
    padding: 0 $gap;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 18px;
    font-weight: 700;
    color: $primary;
  }

  .nav {
    display: flex;
    gap: $gap;
    color: $text-regular;
    font-size: 14px;
  }

  .cart-badge {
    cursor: pointer;
  }
}

.app-main {
  flex: 1;
}

.app-footer {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: $text-secondary;
}
</style>
