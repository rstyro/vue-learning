<template>
  <div class="product-card">
    <!-- 点击封面进详情 -->
    <router-link :to="`/product/${product.id}`" class="card-cover">
      <div class="cover-emoji" :style="{ backgroundColor: product.color }">
        {{ product.emoji }}
      </div>
    </router-link>

    <div class="card-body">
      <div class="card-name" :title="product.name">{{ product.name }}</div>

      <div class="card-meta">
        <el-tag size="small" type="info" effect="plain">{{ product.category }}</el-tag>
        <span class="sales">已售 {{ product.sales }}</span>
      </div>

      <div class="card-footer">
        <span class="price">¥{{ product.price.toFixed(2) }}</span>
        <el-button
          type="primary"
          size="small"
          :icon="ShoppingCart"
          @click="emit('add', product)"
        >
          加购
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps / defineEmits 的 TS 泛型写法（Vue 3.3+）
import { ShoppingCart } from '@element-plus/icons-vue'
import type { Product } from '@/types/product'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: 'add', product: Product): void }>()

// 使用 props 引用父组件传来的数据（模板里可直接用 product）
void props
</script>

<style scoped lang="scss">
.product-card {
  background: #fff;
  border-radius: $radius;
  border: 1px solid $border-color;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .card-cover {
    display: block;
    padding: 24px;
    text-align: center;
  }

  .cover-emoji {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    border-radius: $radius;
  }

  .card-body {
    padding: 12px 16px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-name {
    font-size: 15px;
    font-weight: 600;
    color: $text-main;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sales {
      font-size: 12px;
      color: $text-secondary;
    }
  }

  .card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .price {
      color: $danger;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
