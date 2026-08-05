<!-- ProfileSettings.vue —— 个人中心子页面：设置 -->

<script setup>
import { ref } from 'vue'

const settings = ref({
  theme: 'light',
  language: 'zh-CN'
})
</script>

<template>
  <div style="margin-top: 8px;">
    <h3>⚙️ 设置</h3>
    <p>主题：{{ settings.theme }}</p>
    <p>语言：{{ settings.language }}</p>
    <p class="tip">💡 这是嵌套路由的另一个子页面，位于 /profile/settings 路径下。</p>
  </div>
</template>
