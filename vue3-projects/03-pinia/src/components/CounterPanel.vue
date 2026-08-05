<!-- CounterPanel.vue —— 计数器面板（两个实例共享同一个 store） -->

<script setup>
import { useCounterStore } from '../stores/counter'

// 使用 store：调用 useXxxStore() 拿到全局共享的数据
const counter = useCounterStore()

defineProps({
  title: { type: String, default: '计数器' }
})
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>
      当前值：<strong style="font-size: 1.8em; color: #e83e8c">{{ counter.count }}</strong>
      （翻倍：{{ counter.doubleCount }}）
    </p>
    <button @click="counter.increment()">+1</button>
    <button @click="counter.decrement()">-1</button>
    <button @click="counter.increment(10)">+10</button>
    <button class="danger" @click="counter.reset()">重置</button>
    <p class="tip">
      💡 在<strong>另一个</strong>「计数器」里 +1，这里也会同步变化 ——
      因为它们用的是同一个 store（数据不是组件私有的）。<br />
      🔄 试试 <code>+10</code> 后 <strong>F5 刷新</strong>：计数不丢！这是
      <code>pinia-plugin-persistedstate</code> 插件实现的（counter.js 里一行
      <code>persist: true</code>）。
    </p>
    <p>变化记录（共 {{ counter.historySummary }}）：</p>
    <code v-for="(h, i) in counter.history" :key="i">{{ h }}　</code>
  </div>
</template>
