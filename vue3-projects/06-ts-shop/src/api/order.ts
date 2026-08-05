// api/order.ts —— 订单接口
import { request } from './http'
import type { CreateOrderParams, Order } from '@/types/order'

// 提交订单
export function createOrder(data: CreateOrderParams) {
  return request<Order>({ url: '/orders', method: 'post', data })
}
