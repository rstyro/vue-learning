<!-- UserList.vue —— 用户列表：演示完整的请求流程（loading / 成功 / 失败） -->

<script setup>
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/user'

// 三种状态：数据 / 加载中 / 错误
const users = ref([])
const loading = ref(false)
const errorMsg = ref('')

// 发起请求（抽出成函数，方便"重试"）
async function fetchUsers() {
  loading.value = true
  errorMsg.value = ''
  try {
    // 调用 api 层的封装函数（返回的已经是解包后的 data）
    const data = await getUserList({ page: 1, size: 10 })
    users.value = data
  } catch (err) {
    // 错误已经过拦截器格式化，这里直接展示
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

// 组件挂载时自动请求
onMounted(fetchUsers)
</script>

<template>
  <div class="card">
    <h3>👥 用户列表（真实请求）</h3>

    <!-- 加载中 -->
    <p v-if="loading" class="loading">⏳ 加载中，请稍候...</p>

    <!-- 错误 -->
    <p v-else-if="errorMsg" class="error-text">❌ {{ errorMsg }}
      <button @click="fetchUsers">重试</button>
    </p>

    <!-- 成功 -->
    <table v-else>
      <thead>
        <tr>
          <th>ID</th><th>姓名</th><th>年龄</th><th>邮箱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <p class="tip">💡 请求流程：组件调用 <code>api/user.js</code> → 走 <code>http.js</code> 的拦截器 → 发到 Mock 服务器 → 返回数据解包 → 渲染列表。<br />
    打开 Console 可以看到请求/响应日志。</p>
  </div>
</template>
