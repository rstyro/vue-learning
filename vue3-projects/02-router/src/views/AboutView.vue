<!-- AboutView.vue —— 关于页 -->

<template>
  <div class="card">
    <h2 class="page-title">📄 关于页面</h2>
    <p>这是第二个路由页面。</p>
    <p class="tip">💡 每次切换页面，Vue 都会销毁旧页面组件、创建新页面组件。<br />
    可以在每个页面的 <code>onMounted</code> 里加 console.log 观察这个行为。</p>
  </div>
</template>
