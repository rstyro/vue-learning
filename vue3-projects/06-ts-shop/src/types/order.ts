// types/order.ts —— 订单相关类型

// 下单请求参数
export interface CreateOrderParams {
  // 购买的商品（提交最小信息即可，价格以服务器为准）
  items: { id: number; quantity: number }[]
  // 收货人信息
  receiver: {
    name: string
    phone: string
    address: string
  }
  remark?: string
  // 前端算好的总价（Mock 服务器会重新校验计算）
  totalPrice: number
}

// 订单结果
export interface Order {
  orderNo: string       // 订单号
  totalPrice: number
  createdAt: string     // 下单时间
  receiver: {
    name: string
    phone: string
    address: string
  }
  items: { name: string; quantity: number; price: number }[]
}
