<!-- App.vue —— 根组件：演示两种持久化方案 + 数据共享 -->

<script setup>
import CounterPanel from './components/CounterPanel.vue'
import CartPanel from './components/CartPanel.vue'
</script>

<template>
  <div class="container">
    <h1 class="page-title">🛍 Pinia 状态管理（含持久化）</h1>

    <div class="card">
      <p class="tip">
        💡 <strong>两种持久化方案对比</strong>：<br />
        ① <strong>手写方案</strong>（下方购物车）：store 里用 <code>watch</code> + <code>localStorage</code> 自己实现 —— 零依赖、原理透明<br />
        ② <strong>插件方案</strong>（下方计数器）：<code>pinia-plugin-persistedstate</code>，store 配置 <code>persist: true</code> 一行搞定<br />
        两种方式效果一样：<strong>刷新页面后数据不丢</strong>。试试操作后按 F5 刷新！
      </p>
    </div>

    <!-- 两个计数器共享同一个 counter store（插件持久化） -->
    <CounterPanel title="计数器 A（插件持久化·操作区）" />
    <CounterPanel title="计数器 B（插件持久化·观察区）" />

    <!-- 购物车（手写 watch 持久化） -->
    <CartPanel />
  </div>
</template>
