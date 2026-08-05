<!-- CartPanel.vue —— 购物车面板（组合式 store + 手写持久化演示） -->

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

// 新增商品的表单
const newName = ref('')
const newPrice = ref(10)

function handleAdd() {
  if (!newName.value) return
  cart.addItem(newName.value, Number(newPrice.value) || 0)
  newName.value = ''
}
</script>

<template>
  <div class="card">
    <h3>🛒 购物车（手写 watch 持久化）</h3>

    <table>
      <!-- HTML 规范：<table> 的直接子元素必须是 thead/tbody/tfoot
           直接写 <tr> 虽然浏览器会自动补 tbody，但 Vue 编译器会警告 -->
      <thead>
        <tr>
          <th>商品</th><th>单价</th><th>数量</th><th>小计</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>￥{{ item.price }}</td>
          <td>
            <button style="padding: 2px 10px" @click="cart.decrease(item.id)">-</button>
            {{ item.quantity }}
            <button style="padding: 2px 10px" @click="cart.increase(item.id)">+</button>
          </td>
          <td>￥{{ item.price * item.quantity }}</td>
          <td><button class="danger" style="padding: 2px 10px" @click="cart.removeItem(item.id)">删除</button></td>
        </tr>
      </tbody>
    </table>

    <p>商品总数：<strong>{{ cart.totalCount }}</strong> 件</p>
    <p>合计：<strong style="font-size: 1.4em; color: #e83e8c">￥{{ cart.totalPrice }}</strong></p>
    <button class="danger" @click="cart.clearCart()">🗑 清空购物车（也会写入 localStorage）</button>
    <p class="tip">💡 试试：加几个商品 → <strong>按 F5 刷新页面</strong> → 购物车还在！<br />
    原理：store 里 <code>watch(items, ...)</code> 每次变化都写入 localStorage，刷新时初始化读回来（看 cart.js 源码）。</p>

    <div style="margin-top: 12px; border-top: 1px dashed #dee2e6; padding-top: 12px">
      <h4>添加商品（演示 action 传参）</h4>
      <input v-model="newName" placeholder="商品名" />
      <input v-model.number="newPrice" type="number" placeholder="价格" />
      <button @click="handleAdd">添加</button>
    </div>
  </div>
</template>
