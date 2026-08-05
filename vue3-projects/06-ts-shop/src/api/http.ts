// api/http.ts —— axios 实例封装（TS 版本，泛型解包）
// 与 04-complete 的 http.js 相比，本文件多了"泛型"：
//   调用 request<商品类型>(...) 后，返回的 Promise 直接带商品类型提示
// 学习重点：泛型函数、拦截器、统一错误处理（ElMessage 自动导入）

import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api'

// ① 创建 axios 实例（带统一配置）
const http = axios.create({
  // 基础路径：开发环境读 .env.development 的 /api，走 Vite 代理到 Mock
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000          // 10 秒超时
})

// ② 请求拦截器：每个请求【发出前】都会执行
http.interceptors.request.use(
  (config) => {
    // 模拟从 localStorage 读取登录 token（真实项目通常存这里）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ③ 响应拦截器：每个响应【返回前】都会执行
//    作用：统一解包 { code, data, message }、统一提示错误
//    注意：axios 的类型规定拦截器必须返回 AxiosResponse，但我们解包返回了 data，
//          所以这里用 : any 标注绕过（这是 axios + 解包拦截器的常见写法）
http.interceptors.response.use(
  (response): any => {
    const res = response.data as ApiResponse

    if (res.code === 0) {
      // 成功：只把 data 交给业务代码（配合泛型，业务代码拿到的是"带类型"的数据）
      return res.data
    } else {
      // 业务错误（后端返回了错误码）
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error: AxiosError<ApiResponse>) => {
    // HTTP 层错误（网络、4xx、5xx）
    let message = '网络异常，请稍后重试'
    if (error.response) {
      const status = error.response.status
      if (status === 401) message = '登录已过期，请重新登录'
      else if (status === 403) message = '没有权限访问'
      else if (status === 404) message = '接口不存在'
      else if (status >= 500) message = '服务器开小差了'
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时'
    }
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
)

// ④ 泛型请求函数：本项目统一用它发请求
//    request<PageResult<Product>>({...}) → Promise<PageResult<Product>>
//    原理：拦截器已经解包出 data，业务代码拿到的就是 data，
//          所以这里把返回值断言成 Promise<T>（T 由调用处指定）
export function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return http.request(config) as Promise<T>
}

export default http
