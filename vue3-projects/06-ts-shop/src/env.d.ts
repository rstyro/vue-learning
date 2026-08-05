// env.d.ts —— 让 TS 认识 .vue 文件和环境变量
/// <reference types="vite/client" />

// ① 让 .vue 文件可以被 import（默认 TS 不认识 .vue）
//    把每个 .vue 文件都当作一个通用的 Vue 组件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// ② 扩展 import.meta.env 的类型（这样写 env 属性有自动补全）
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_APP_TITLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
