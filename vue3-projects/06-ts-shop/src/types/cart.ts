// types/cart.ts —— 购物车类型
import type { Product } from './product'

// 购物车条目：商品 + 数量
// 注意：这里存的是完整的 Product 对象（而不是 id），
//       因为购物车要"离线可用"——刷新后不请求接口也能展示商品信息
export interface CartItem {
  product: Product
  quantity: number
}
