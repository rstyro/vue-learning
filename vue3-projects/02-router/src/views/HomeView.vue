<!-- HomeView.vue —— 首页 -->

<script setup>
import { useRouter } from 'vue-router'

// useRouter(): 拿到路由实例，进行「编程式导航」（用代码跳转，而不是 <router-link>）
const router = useRouter()

function goToAbout() {
  // 编程式导航：等价于 <router-link to="/about">
  router.push('/about')
}

function goBack() {
  router.back()   // 相当于浏览器"后退"
}
</script>

<template>
  <div class="card">
    <h2 class="page-title">🏠 首页</h2>
    <p>这是路由对应的第一个页面组件。</p>
    <p class="tip">💡 注意 URL 的变化：点击导航时 URL 改变，但页面并没有整页刷新 —— 这就是单页应用（SPA）。</p>

    <h3>编程式导航（useRouter）</h3>
    <button @click="goToAbout">router.push('/about') 跳转</button>
    <button @click="goBack">router.back() 后退</button>
  </div>
</template>
