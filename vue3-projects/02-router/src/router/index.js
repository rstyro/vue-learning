// router/index.js —— 路由配置（整个应用有哪些"页面"都在这定义）
// 这是学习路由的核心文件！

import { createRouter, createWebHistory } from 'vue-router'

// ① 定义路由表：URL 路径 → 对应组件
//    懒加载写法：() => import(...) 表示"用到时才加载"（代码分割，优化首屏性能）
const routes = [
  {
    path: '/',                        // 访问 http://localhost:5174/ 时
    name: 'home',                     // 路由名字（编程式导航用）
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    // 动态路由：:id 表示"任意值"，如 /user/123、/user/456
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    // 嵌套路由：父路由 + children 子路由
    // 访问 /profile 时显示 ProfileLayout，内部再根据子路径切换
    path: '/profile',
    component: () => import('../views/ProfileLayout.vue'),
    children: [
      {
        path: '',                    // 空路径 = /profile 时显示
        name: 'profile-home',
        component: () => import('../views/profile/ProfileInfo.vue')
      },
      {
        path: 'settings',            // = /profile/settings
        name: 'profile-settings',
        component: () => import('../views/profile/ProfileSettings.vue')
      }
    ]
  },
  {
    // 404 兜底：匹配所有未定义路径
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

// ② 创建路由实例
//    createWebHistory: HTML5 模式，URL 干净（http://x.com/about）
//    createWebHashHistory: Hash 模式（http://x.com/#/about），旧浏览器兼容
const router = createRouter({
  history: createWebHistory(),
  routes
})

// ③ 全局前置守卫（导航守卫）：每次跳转前执行
//    场景：登录校验、权限控制、设置页面标题
router.beforeEach((to, from, next) => {
  console.log(`🛡 守卫：从 ${from.path} → ${to.path}`)

  // 设置页面标题（读路由 meta.title）
  document.title = to.meta.title ? `${to.meta.title} - Router教学` : 'Router教学'

  // next() 放行 / next(false) 取消 / next('/路径') 重定向
  // 这里示例：访问 /admin 时重定向到首页（模拟无权限）
  if (to.path === '/admin') {
    next('/')     // 重定向
  } else {
    next()        // 放行
  }
})

export default router
