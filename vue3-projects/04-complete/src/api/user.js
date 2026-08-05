// api/user.js —— 用户相关的接口（按业务模块拆分）
// 每个接口一个函数，组件里只需要 import 然后调用，不用关心 axios 细节

import http from './http'

// 获取用户列表
export function getUserList(params) {
  return http.get('/users', { params })     // ?page=1&size=10
}

// 获取单个用户详情
export function getUserById(id) {
  return http.get(`/users/${id}`)
}

// 新增用户
export function createUser(data) {
  return http.post('/users', data)
}

// 更新用户
export function updateUser(id, data) {
  return http.put(`/users/${id}`, data)
}

// 删除用户
export function deleteUser(id) {
  return http.delete(`/users/${id}`)
}
