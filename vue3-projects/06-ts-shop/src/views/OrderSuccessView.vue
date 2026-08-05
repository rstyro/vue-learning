<template>
  <div class="page-container">
    <el-result icon="success" title="下单成功！" :sub-title="`订单号：${orderNo}`">
      <template #extra>
        <el-button type="primary" @click="router.push('/')">继续购物</el-button>
        <el-button @click="router.push('/cart')">查看购物车</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 订单号来自路由参数（/order/success/:orderNo）
const orderNo = computed(() => String(route.params.orderNo ?? ''))
</script>
