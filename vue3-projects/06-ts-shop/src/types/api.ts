// types/api.ts —— 接口通用类型
// TS 的核心价值：让"接口返回什么"在编译期就明确，写错属性名会直接报错

// 后端统一返回格式（与 04-complete 约定一致）：{ code, data, message }
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

// 分页返回的通用结构
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
