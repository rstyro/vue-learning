<!-- LifecycleDemo.vue —— 生命周期演示组件 -->
<!-- 演示：组件从创建到销毁过程中，各个生命周期钩子的触发时机 -->

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const tick = ref(0)
let timer = null

// 挂载完成后执行（最常用：发请求、初始化）
onMounted(() => {
  console.log('🟢 LifecycleDemo onMounted：组件挂载完成')
  // 启动一个定时器，每秒 +1（演示"副作用"）
  timer = setInterval(() => {
    tick.value++
  }, 1000)
})

// 数据更新、重新渲染后执行
onUpdated(() => {
  console.log('🟡 LifecycleDemo onUpdated：组件更新了')
})

// 组件卸载前执行（最常用：清理定时器、解绑事件）
onUnmounted(() => {
  console.log('🔴 LifecycleDemo onUnmounted：组件卸载，清理定时器')
  clearInterval(timer)   // 必须清理！否则定时器会一直跑（内存泄漏）
})
</script>

<template>
  <div class="card">
    <h3>⏱ 生命周期演示（看 Console 日志）</h3>
    <p>定时器每秒 +1：<strong>{{ tick }}</strong></p>
    <p class="tip">
      💡 打开 Console 观察生命周期钩子的触发顺序：<br />
      <code>onMounted</code>（挂载完成）→ <code>onUpdated</code>（每秒更新）→
      <code>onUnmounted</code>（卸载时清理）
    </p>
    <button @click="tick++">手动触发一次更新</button>
  </div>
</template>
