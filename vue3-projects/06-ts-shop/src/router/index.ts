// router/index.ts —— 路由配置（TS 版本，沿用 02-router 的懒加载 + 守卫设标题）

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '商品列表' }
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetailView.vue'),
      meta: { title: '商品详情' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { title: '购物车' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { title: '确认订单' }
    },
    {
      path: '/order/success/:orderNo',
      name: 'order-success',
      component: () => import('@/views/OrderSuccessView.vue'),
      meta: { title: '下单成功' }
    },
    {
      // 404 兜底
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '页面不存在' }
    }
  ],
  // 切换路由时回到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫：设置页面标题（读路由 meta.title）
router.beforeEach((to) => {
  document.title = `${to.meta.title ?? '商城'} - TS 商城实战`
})

export default router
