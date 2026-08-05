<!-- UserView.vue —— 动态路由页面 -->
<!-- 演示：如何从 URL 中取出参数（:id） -->

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

// useRoute(): 拿到当前路由信息
const route = useRoute()

// 从 URL 中读取动态参数：/user/123 → route.params.id = "123"
// ref 包装一下，方便在模板中展示
const userId = ref(route.params.id)

// ⚠️ 关键：路由参数变化时组件会【复用】而不是重建！
// 例如从 /user/1 跳转到 /user/2，组件实例不变，需要 watch 监听参数变化
watch(
  () => route.params.id,
  (newId) => {
    userId.value = newId
    console.log('路由参数变化，重新获取用户数据:', newId)
  }
)
</script>

<template>
  <div class="card">
    <h2 class="page-title">👤 用户详情页</h2>
    <p>当前用户 ID：<strong>{{ userId }}</strong>（来自 URL 的 :id 参数）</p>
    <p class="tip">💡 试试切换不同的用户链接（导航栏里是 /user/10086，也可以手动改 URL 为 /user/999）。</p>
    <button @click="userId = route.params.id">重新读取参数</button>
    <p class="tip">🔄 打开 Console 观察：从 /user/1 跳到 /user/2 时，页面不会整页刷新，只是参数变了（组件复用）。</p>
  </div>
</template>
