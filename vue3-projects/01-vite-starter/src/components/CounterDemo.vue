<!-- CounterDemo.vue —— 计数器组件 -->
<!-- 演示：props（父传子）+ emit（子传父）+ ref 响应式 -->

<script setup>
import { ref } from 'vue'

// ① props：父组件传进来的数据（只读，不能直接修改）
const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
})

// ② 子组件自己的状态（ref 响应式）
const count = ref(props.initialCount)

// ③ emit：声明要向外触发的事件（子传父）
const emit = defineEmits(['change'])

function increment() {
  count.value++
  // 每次变化都通知父组件（第二个参数是传给父组件的数据）
  emit('change', count.value)
}

function reset() {
  count.value = props.initialCount
  emit('change', count.value)
}
</script>

<template>
  <div class="card counter-card">
    <h3>🔢 计数器组件（演示 props / emit / ref）</h3>
    <p>
      当前值：<strong class="count">{{ count }}</strong>
      （初始值 {{ initialCount }} 来自父组件 props）
    </p>
    <button @click="increment">+1（同时 emit 通知父组件）</button>
    <button @click="reset">重置</button>
    <p class="tip">💡 打开浏览器的 Console 面板，点击 +1 看父组件是否收到通知。</p>
  </div>
</template>

<style scoped>
.counter-card {
  text-align: center;
}

.count {
  font-size: 1.8em;
  color: #e83e8c;
}
</style>
