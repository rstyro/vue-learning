<template>
  <div class="page-container checkout-page">
    <h2 class="page-title">确认订单</h2>

    <!-- 购物车为空时不能下单 -->
    <el-empty v-if="cartStore.isEmpty" description="购物车为空，无法下单">
      <el-button type="primary" @click="router.push('/')">去逛逛</el-button>
    </el-empty>

    <template v-else>
      <div class="checkout-grid">
        <!-- 左：收货信息表单 -->
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="90px"
          class="receiver-form"
        >
          <h3 class="section-title">收货信息</h3>

          <el-form-item label="收货人" prop="name">
            <el-input v-model="form.name" placeholder="请输入收货人姓名" />
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入 11 位手机号" maxlength="11" />
          </el-form-item>

          <el-form-item label="收货地址" prop="address">
            <el-input v-model="form.address" type="textarea" :rows="2" placeholder="请输入详细地址" />
          </el-form-item>

          <el-form-item label="订单备注">
            <el-input v-model="remark" placeholder="选填，给商家留言" />
          </el-form-item>
        </el-form>

        <!-- 右：订单商品清单 -->
        <div class="order-summary">
          <h3 class="section-title">订单商品</h3>

          <div v-for="item in cartStore.items" :key="item.product.id" class="summary-row">
            <span class="item-name">{{ item.product.emoji }} {{ item.product.name }}</span>
            <span class="item-qty">×{{ item.quantity }}</span>
            <span class="price-text">¥{{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>

          <div class="summary-total">
            <span>应付总额</span>
            <b class="price-text big">¥{{ cartStore.totalPrice.toFixed(2) }}</b>
          </div>
        </div>
      </div>

      <!-- 底部提交 -->
      <div class="submit-bar">
        <el-button size="large" @click="router.back()">返回购物车</el-button>
        <el-button type="primary" size="large" :loading="submitting" @click="onSubmit">
          提交订单
        </el-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { createOrder } from '@/api/order'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const formRef = ref<FormInstance>()
const submitting = ref(false)
const remark = ref('')

// 收货表单（接口类型已定义在 types/order.ts）
interface ReceiverForm {
  name: string
  phone: string
  address: string
}

const form = reactive<ReceiverForm>({ name: '', phone: '', address: '' })

// 表单校验规则（FormRules 是 Element Plus 提供的类型）
const rules: FormRules<ReceiverForm> = {
  name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }]
}

async function onSubmit() {
  // ① 表单校验（不通过会 reject，表单内自动显示错误信息）
  if (!formRef.value) return
  try {
    await formRef.value.validate()
  } catch {
    return
  }

  // ② 提交订单
  submitting.value = true
  try {
    const order = await createOrder({
      items: cartStore.items.map(i => ({ id: i.product.id, quantity: i.quantity })),
      receiver: { ...form },
      remark: remark.value,
      totalPrice: cartStore.totalPrice
    })
    // ③ 下单成功：清空购物车并跳转成功页（订单号放 URL 参数里）
    cartStore.clear()
    router.push(`/order/success/${order.orderNo}`)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.checkout-page {
  .page-title {
    margin-bottom: 16px;
  }

  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 16px;
    align-items: start;

    .receiver-form,
    .order-summary {
      background: #fff;
      border-radius: $radius;
      border: 1px solid $border-color;
      padding: 20px;
    }

    .section-title {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .summary-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px dashed $border-color;

      .item-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-qty {
        color: $text-secondary;
      }
    }

    .summary-total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 16px;

      .big {
        font-size: 22px;
      }
    }
  }

  .submit-bar {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
