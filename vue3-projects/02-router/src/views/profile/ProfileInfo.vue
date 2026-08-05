<!-- ProfileInfo.vue —— 个人中心子页面：基本信息 -->

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  name: '张三',
  age: 25,
  city: '深圳'
})
</script>

<template>
  <div style="margin-top: 8px;">
    <h3>📋 基本信息</h3>
    <p>名字：{{ userInfo.name }}</p>
    <p>年龄：{{ userInfo.age }}</p>
    <p>城市：{{ userInfo.city }}</p>
    <p class="tip">💡 这是嵌套路由的子页面，位于 /profile 路径下。</p>
  </div>
</template>
