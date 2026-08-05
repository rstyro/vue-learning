<!-- ProfileLayout.vue —— 嵌套路由的「父布局」组件 -->
<!-- 演示：嵌套路由 = 页面内部还有子页面 -->

<template>
  <div class="card">
    <h2 class="page-title">👤 个人中心（嵌套路由布局）</h2>

    <!-- 子导航：切换到个人中心内部的子页面 -->
    <div class="sub-nav">
      <router-link to="/profile">📋 基本信息</router-link>
      <router-link to="/profile/settings">⚙️ 设置</router-link>
    </div>

    <p class="tip">💡 嵌套路由 = 父组件提供「布局外壳」，内部再放一个 <code>&lt;router-view&gt;</code> 渲染子页面。<br />
    访问 <code>/profile</code> 和 <code>/profile/settings</code> 时，父布局不变，只切换子内容。</p>

    <!-- 子路由出口：子页面渲染在这里 -->
    <router-view />
  </div>
</template>

<style scoped>
.sub-nav {
  display: flex;
  gap: 12px;
  margin: 12px 0;
}

.sub-nav a {
  text-decoration: none;
  padding: 6px 14px;
  background: #e9ecef;
  color: #333;
  border-radius: 6px;
  font-size: 14px;
}

.sub-nav a.router-link-exact-active {
  background: #42b983;
  color: #fff;
}
</style>
