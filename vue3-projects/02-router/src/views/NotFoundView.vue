<!-- NotFoundView.vue —— 404 页面 -->

<template>
  <div class="card" style="text-align: center; padding: 60px 20px;">
    <h2 style="font-size: 60px; color: #e83e8c;">404</h2>
    <p>页面不存在（路由兜底）</p>
    <p class="tip">💡 访问任何未定义的 URL（如 /不存在的页面），都会匹配到路由表最后的 <code>/:pathMatch(.*)*</code>，显示这个页面。</p>
    <router-link to="/">← 返回首页</router-link>
  </div>
</template>
