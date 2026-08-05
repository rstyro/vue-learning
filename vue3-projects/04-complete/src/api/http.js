// api/http.js —— axios 实例封装（整个项目的请求都走这里）
// 学习重点：统一配置、请求/响应拦截器、错误处理

import axios from 'axios'

// ① 创建 axios 实例（带统一配置）
const http = axios.create({
  // 基础路径：所有请求自动拼接前缀
  // 生产环境用环境变量（.env.production），开发环境走 Vite 代理
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000          // 请求超时时间（10 秒）
})

// ② 请求拦截器：每个请求【发出前】都会执行
// 用途：自动附加 token、统一加请求头、统一参数处理
http.interceptors.request.use(
  (config) => {
    // 模拟从 localStorage 读取登录 token（真实项目通常存这里）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`   // 附加认证头
    }
    console.log('🚀 [请求]', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    // 请求本身出错（如网络断开）
    return Promise.reject(error)
  }
)

// ③ 响应拦截器：每个响应【返回前】都会执行
// 用途：统一解包数据、统一处理错误码、统一处理 401 跳登录
http.interceptors.response.use(
  (response) => {
    console.log('✅ [响应]', response.config.url, response.data)

    // 约定后端返回格式：{ code: 0, data: ..., message: '...' }
    // 这里直接解包，业务代码拿到的就是 data
    const res = response.data
    if (res.code === 0) {
      return res.data          // 成功：只把 data 交给业务代码
    } else {
      // 业务错误（后端返回了错误码）
      // 统一弹提示（真实项目接 Element Plus 的 ElMessage）
      console.error('❌ [业务错误]', res.message)
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error) => {
    // HTTP 层错误（网络、4xx、5xx）
    let message = '网络异常，请稍后重试'
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        message = '登录已过期，请重新登录'
        // 真实项目：跳转登录页
        // window.location.href = '/login'
      } else if (status === 403) {
        message = '没有权限访问'
      } else if (status === 404) {
        message = '接口不存在'
      } else if (status >= 500) {
        message = '服务器开小差了'
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时'
    }
    console.error('❌ [HTTP错误]', message, error.message)
    // 统一返回格式化后的错误，业务代码 catch 到的就是它
    return Promise.reject(new Error(message))
  }
)

export default http
