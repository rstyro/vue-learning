<!-- App.vue —— 根组件 -->

<script setup>
// 使用 @ 别名导入（在 vite.config.js 里配置了 @ = src）
import UserList from '@/components/UserList.vue'
import ApiDemo from '@/components/ApiDemo.vue'
</script>

<template>
  <div class="container">
    <h1 class="page-title">🧰 综合实战：组件化 + API 封装</h1>

    <div class="card">
      <p class="tip">
        💡 本项目的目录规范（真实项目标准分层）：<br />
        <code>src/api/</code> —— 接口请求层（http 封装 + 按模块拆分的接口）<br />
        <code>src/components/</code> —— 可复用组件<br />
        <code>src/views/</code> —— 页面组件（这里简化）<br />
        <code>src/utils/</code> —— 工具函数<br />
        <code>src/stores/</code> —— 状态管理（配合项目3 的 Pinia）
      </p>
    </div>

    <!-- 演示：API 请求封装（真实请求 + 加载态 + 错误处理） -->
    <UserList />
    <!-- 演示：错误处理 -->
    <ApiDemo />
  </div>
</template>
