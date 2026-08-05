<!-- App.vue —— 根组件：只负责「布局 + 导航」，具体页面内容由路由渲染 -->

<script setup>
// <router-link> 和 <router-view> 是 vue-router 提供的两个内置组件，无需导入
// router-link:  导航链接（编译成 <a>，但拦截了默认跳转，用路由切换）
// router-view:  路由出口（当前 URL 对应的组件渲染在这里）
</script>

<template>
  <!-- 顶部导航：点击切换页面 -->
  <nav>
    <!-- to="/" 跳转首页 -->
    <router-link to="/">🏠 首页</router-link>
    <!-- to="/about" 跳转关于页 -->
    <router-link to="/about">📄 关于</router-link>
    <!-- 动态路由示例：带参数的链接 -->
    <router-link to="/user/10086">👤 用户 10086</router-link>
    <!-- 嵌套路由：个人中心（内部有子页面） -->
    <router-link to="/profile">👤 个人中心</router-link>
    <!-- 404 演示 -->
    <router-link to="/不存在的页面">❓ 404 演示</router-link>
  </nav>

  <div class="container">
    <!-- ⚠️ 核心：路由出口！当前 URL 对应的页面组件会渲染到这里 -->
    <router-view />
  </div>
</template>
