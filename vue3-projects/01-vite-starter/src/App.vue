<!-- App.vue —— 根组件，整个应用的最外层容器 -->
<!-- ================= 单文件组件（SFC）的三段式结构 =================
     <template>  : 写 HTML（模板）
     <script setup>: 写 JS 逻辑（组合式 API，<script setup> 是 Vue3.2+ 的推荐语法）
     <style>      : 写 CSS（加 scoped 表示只作用于当前组件，不影响其他组件）
     ================================================================= -->

<script setup>
// <script setup> 语法：直接写逻辑，不需要 export default
// 导入的组件可以直接在模板中使用（Vue 自动注册）

// 引入子组件（组件化开发：页面由一个个小组件拼起来）
import AppHeader from './components/AppHeader.vue'
import CounterDemo from './components/CounterDemo.vue'
import LifecycleDemo from './components/LifecycleDemo.vue'

// import.meta.env 是 Vite 提供的内置对象，读取环境变量
// 开发时 .env 文件里的变量会注入到这里（后面会讲）
const appName = import.meta.env.VITE_APP_TITLE
const mode = import.meta.env.MODE          // development（开发）/ production（生产）
</script>

<template>
  <div class="app-container">
    <!-- 使用子组件：就像自定义 HTML 标签 -->
    <AppHeader :title="appName" />

    <main class="main-content">
      <h2 class="page-title">项目结构入门</h2>

      <div class="card">
        <h3>📁 当前运行环境</h3>
        <p>
          环境：<code>{{ mode }}</code>（
          <span v-if="mode === 'development'">🟢 开发模式 —— npm run dev</span>
          <span v-else>🟠 生产模式 —— npm run build 后</span>
          ）
        </p>
        <p>应用标题（来自 .env）：<code>{{ appName }}</code></p>
      </div>

      <!-- 子组件：计数器（演示组件通信 props + emit） -->
      <CounterDemo initial-count="5" />
      <!-- 子组件：生命周期演示 -->
      <LifecycleDemo />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
