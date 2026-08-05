<template>
  <div class="page-container detail-page">
    <div v-loading="loading" class="detail-card">
      <template v-if="product">
        <!-- 商品图（emoji 模拟） -->
        <div class="cover-emoji" :style="{ backgroundColor: product.color }">
          {{ product.emoji }}
        </div>

        <!-- 商品信息 -->
        <div class="info">
          <div class="name">{{ product.name }}</div>

          <div class="tags">
            <el-tag>{{ product.category }}</el-tag>
            <el-tag type="warning">已售 {{ product.sales }}</el-tag>
            <el-tag :type="product.stock > 0 ? 'success' : 'danger'">
              {{ product.stock > 0 ? `库存 ${product.stock}` : '暂时缺货' }}
            </el-tag>
          </div>

          <div class="price">¥{{ product.price.toFixed(2) }}</div>

          <div class="desc">{{ product.description }}</div>

          <div class="actions">
            <el-input-number v-model="quantity" :min="1" :max="Math.max(product.stock, 1)" />
            <el-button
              type="primary"
              size="large"
              :icon="ShoppingCart"
              :disabled="product.stock === 0"
              @click="onAdd"
            >
              加入购物车
            </el-button>
            <el-button size="large" @click="router.push('/')">返回列表</el-button>
          </div>
        </div>
      </template>

      <!-- 加载失败（商品不存在等） -->
      <el-result v-else-if="loadFailed" icon="error" title="商品不存在或已下架">
        <template #extra>
          <el-button type="primary" @click="router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ShoppingCart } from '@element-plus/icons-vue'
import { getProductDetail } from '@/api/product'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const loading = ref(true)
const loadFailed = ref(false)
const product = ref<Product | null>(null)
const quantity = ref(1)

async function fetchDetail(id: number) {
  loading.value = true
  loadFailed.value = false
  product.value = null
  try {
    product.value = await getProductDetail(id)
  } catch {
    // 错误提示已在 http.ts 拦截器统一处理，这里只标记失败状态
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

function onAdd() {
  if (!product.value) return
  cartStore.add(product.value, quantity.value)
  ElMessage.success(`已加入购物车（${quantity.value} 件）`)
}

onMounted(() => {
  fetchDetail(Number(route.params.id))
})

// 同一组件内路由参数变化时重新加载（如从商品A详情跳到商品B详情）
watch(() => route.params.id, (id) => fetchDetail(Number(id)))
</script>

<style scoped lang="scss">
.detail-page {
  display: flex;
  justify-content: center;
  padding-top: 32px;
}

.detail-card {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: $radius;
  border: 1px solid $border-color;
  padding: 32px;
  display: flex;
  gap: 32px;

  .cover-emoji {
    width: 260px;
    height: 260px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120px;
    border-radius: $radius;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .name {
      font-size: 22px;
      font-weight: 700;
    }

    .tags {
      display: flex;
      gap: 8px;
    }

    .price {
      font-size: 28px;
      font-weight: 700;
      color: $danger;
    }

    .desc {
      font-size: 14px;
      line-height: 1.7;
      color: $text-regular;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: auto;
    }
  }
}
</style>
