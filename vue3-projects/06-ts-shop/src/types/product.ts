// types/product.ts —— 商品相关类型

// 商品实体（对应 Mock 服务器返回的字段）
export interface Product {
  id: number
  name: string
  category: string   // 分类名，如 '手机'
  price: number      // 单价（元）
  stock: number      // 库存
  sales: number      // 销量
  emoji: string      // 商品图标（Demo 用 emoji 代替真实图片，离线可用）
  color: string      // 图标背景色
  description: string
}

// 商品列表查询参数
export interface ProductQuery {
  keyword?: string
  category?: string
  page?: number
  pageSize?: number
}
