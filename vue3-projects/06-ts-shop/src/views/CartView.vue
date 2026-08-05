<template>
  <div class="page-container cart-page">
    <h2 class="page-title">购物车</h2>

    <!-- 空购物车 -->
    <el-empty v-if="cartStore.isEmpty" description="购物车还是空的，快去挑点好东西吧">
      <el-button type="primary" @click="router.push('/')">去逛逛</el-button>
    </el-empty>

    <template v-else>
      <!-- 购物车表格 -->
      <el-table :data="cartStore.items" class="cart-table">
        <el-table-column label="商品" min-width="260">
          <template #default="{ row }">
            <div class="cell-product">
              <span class="mini-emoji" :style="{ backgroundColor: row.product.color }">
                {{ row.product.emoji }}
              </span>
              <span class="name">{{ row.product.name }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="单价" width="120">
          <template #default="{ row }">¥{{ row.product.price.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column label="数量" width="180">
          <template #default="{ row }">
            <el-input-number
              :model-value="row.quantity"
              :min="1"
              :max="99"
              size="small"
              @change="(val) => onQuantityChange(row.product.id, val)"
            />
          </template>
        </el-table-column>

        <el-table-column label="小计" width="140">
          <template #default="{ row }">
            <span class="price-text">¥{{ (row.product.price * row.quantity).toFixed(2) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button type="danger" link @click="onRemove(row.product.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部结算栏 -->
      <div class="cart-footer">
        <el-button @click="onClear">清空购物车</el-button>

        <div class="summary">
          <span class="count">共 <b>{{ cartStore.totalCount }}</b> 件</span>
          <span class="total">
            合计：<b class="price-text big">¥{{ cartStore.totalPrice.toFixed(2) }}</b>
          </span>
          <el-button type="primary" size="large" @click="router.push('/checkout')">
            去结算
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// 数字输入框变化时更新数量（写入 store，会触发持久化）
function onQuantityChange(id: number, val: number | undefined) {
  if (val === undefined) return
  cartStore.setQuantity(id, val)
}

function onRemove(id: number) {
  cartStore.remove(id)
  ElMessage.success('已从购物车移除')
}

// 清空需要二次确认：演示 ElMessageBox（自动导入）
function onClear() {
  ElMessageBox.confirm('确定要清空购物车吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      cartStore.clear()
      ElMessage.success('购物车已清空')
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.cart-page {
  .page-title {
    margin-bottom: 16px;
  }

  .cart-table {
    background: #fff;
    border-radius: $radius;
    overflow: hidden;
  }

  .cell-product {
    display: flex;
    align-items: center;
    gap: 12px;

    .mini-emoji {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      border-radius: 6px;
    }

    .name {
      font-weight: 600;
    }
  }

  .cart-footer {
    margin-top: 16px;
    background: #fff;
    border-radius: $radius;
    border: 1px solid $border-color;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .summary {
      display: flex;
      align-items: center;
      gap: 24px;

      .count b {
        color: $primary;
      }

      .total b {
        font-size: 22px;
      }
    }
  }
}
</style>
