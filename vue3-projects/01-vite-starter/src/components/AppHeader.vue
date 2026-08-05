<!-- AppHeader.vue —— 顶部导航组件 -->
<!-- 演示：组件如何接收父组件传来的数据（props） -->

<script setup>
// defineProps 用于声明组件接收哪些属性（父组件传进来）
// 这里声明接收一个 title 字符串属性
defineProps({
  title: {
    type: String,
    default: '默认标题'       // 父组件没传时用这个默认值
  }
})
</script>

<template>
  <header class="app-header">
    <h1>🚀 {{ title }}</h1>
    <p class="subtitle">这是 AppHeader 子组件 —— 通过 props 接收父组件传入的标题</p>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #42b983 0%, #2c7be5 100%);
  color: #fff;
  padding: 24px 20px;
  border-radius: 12px;
  text-align: center;
}

.subtitle {
  opacity: 0.9;
  font-size: 0.9em;
  margin-top: 6px;
}
</style>
