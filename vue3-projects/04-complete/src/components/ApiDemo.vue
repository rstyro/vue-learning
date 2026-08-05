<!-- ApiDemo.vue —— 错误处理演示 -->
<!-- 演示：请求失败时拦截器如何统一处理错误 -->

<script setup>
import { ref } from 'vue'
import http from '@/api/http'

const result = ref('（还没有请求）')
const loading = ref(false)

async function triggerError() {
  loading.value = true
  result.value = '请求中...'
  try {
    // 请求一个不存在的接口 → 404
    await http.get('/users/99999')
    result.value = '✅ 请求成功（不应该走到这）'
  } catch (err) {
    // 拦截器已经格式化错误信息，这里直接展示
    result.value = `❌ 捕获到错误：${err.message}`
  } finally {
    loading.value = false
  }
}

async function triggerServerError() {
  loading.value = true
  result.value = '请求中...'
  try {
    // 请求一个后端故意报 500 的接口
    await http.get('/error')
  } catch (err) {
    result.value = `❌ 捕获到错误：${err.message}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card">
    <h3>🚨 错误处理演示（看 Console 的拦截器日志）</h3>
    <p>{{ result }}</p>
    <button :disabled="loading" @click="triggerError">触发 404 错误</button>
    <button :disabled="loading" @click="triggerServerError">触发 500 错误</button>
    <p class="warn">⚠️ 注意：错误信息是<strong>拦截器统一格式化</strong>的（"接口不存在"、"服务器开小差了"），业务代码不需要关心具体的错误类型。</p>
  </div>
</template>
