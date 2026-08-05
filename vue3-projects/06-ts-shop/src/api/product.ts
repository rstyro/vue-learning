// api/product.ts —— 商品接口（按业务模块拆分）
// 每个函数都标注了返回类型 —— 这就是 TS 带来的"接口文档即代码"
import { request } from './http'
import type { PageResult } from '@/types/api'
import type { Product, ProductQuery } from '@/types/product'

// 获取商品列表（关键词 / 分类 / 分页）
export function getProductList(params: ProductQuery) {
  return request<PageResult<Product>>({ url: '/products', method: 'get', params })
}

// 获取商品详情
export function getProductDetail(id: number) {
  return request<Product>({ url: `/products/${id}`, method: 'get' })
}

// 获取分类列表
export function getCategories() {
  return request<string[]>({ url: '/categories', method: 'get' })
}
