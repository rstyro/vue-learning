<template>
  <div class="page-container home-page">
    <!-- 搜索 + 分类筛选 -->
    <div class="toolbar">
      <div class="search-box">
        <el-input
          v-model="keywordInput"
          placeholder="搜索商品名称"
          clearable
          :prefix-icon="Search"
          @keyup.enter="onSearch"
          @clear="onSearch"
        />
        <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
      </div>

      <el-radio-group v-model="query.category" @change="onSearch">
        <el-radio-button value="">全部</el-radio-button>
        <el-radio-button v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 商品列表（v-loading 指令由 Element Plus 自动导入） -->
    <div v-loading="loading" class="product-list">
      <el-row :gutter="16">
        <el-col v-for="p in products" :key="p.id" :xs="12" :sm="8" :md="6" class="product-col">
          <ProductCard :product="p" @add="onAddToCart" />
        </el-col>
      </el-row>

      <!-- 无结果 -->
      <el-empty v-if="!loading && products.length === 0" description="没有找到相关商品" />
    </div>

    <!-- 分页 -->
    <div class="pagination-bar">
      <el-pagination
        v-model:current-page="query.page"
        :page-size="query.pageSize"
        :total="total"
        layout="prev, pager, next, total"
        background
        @current-change="fetchList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 对比：vue API 用显式 import（教学清晰），Element Plus 的组件/方法走自动导入
import { onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import ProductCard from '@/components/ProductCard.vue'
import { getCategories, getProductList } from '@/api/product'
import { useCartStore } from '@/stores/cart'
import type { Product, ProductQuery } from '@/types/product'

const cartStore = useCartStore()

// ---------- 页面状态 ----------
const loading = ref(false)
const products = ref<Product[]>([])
const categories = ref<string[]>([])
const total = ref(0)
const keywordInput = ref('')

// 查询参数：category 用 '' 表示"全部"（与后端的 undefined 语义一致）
const query = reactive<ProductQuery>({ page: 1, pageSize: 8 })

// ---------- 数据加载 ----------
async function fetchList() {
  loading.value = true
  try {
    const data = await getProductList(query)
    products.value = data.list
    total.value = data.total
  } catch (e) {
    // 错误提示已在 http.ts 拦截器统一处理
    console.error('加载商品失败', e)
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  categories.value = await getCategories()
}

// 搜索 / 切换分类：回到第一页再刷新
function onSearch() {
  query.keyword = keywordInput.value.trim()
  query.page = 1
  fetchList()
}

// ---------- 加购 ----------
function onAddToCart(product: Product) {
  cartStore.add(product)
  ElMessage.success(`「${product.name}」已加入购物车`)
}

onMounted(() => {
  fetchList()
  fetchCategories()
})
</script>

<style scoped lang="scss">
.home-page {
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;

    .search-box {
      display: flex;
      gap: 12px;
      max-width: 420px;
    }
  }

  .product-list {
    min-height: 320px;

    .product-col {
      margin-bottom: $gap;
    }
  }

  .pagination-bar {
    display: flex;
    justify-content: center;
    padding: 8px 0 24px;
  }
}
</style>
