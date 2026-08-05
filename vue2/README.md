# Vue 2 学习目录

前端菜鸟学习 Vue 2 的笔记与练习，**每个 HTML 文件都是可独立运行的实例**，直接双击用浏览器打开即可。

## 快速开始

1. **直接双击** `01/1.helloWorld.html` 用浏览器打开（纯本地运行，无需安装）
2. 或启动本地服务器（推荐，更接近真实环境）：

```bash
npx serve vue2
# 或
python -m http.server
```

## 学习路径

按编号顺序学习，循序渐进：

| 阶段 | 文件 | 核心知识点 |
|------|------|-----------|
| **入门** | `01/1.helloWorld.html` | 第一个 Vue 应用、插值、v-model、@click、v-if、v-for、:class |
| | `01/2.if.html` | 条件渲染：v-if / v-else-if / v-else，v-if vs v-show |
| | `01/3.bind.html` | 属性绑定：v-bind 绑定 title / class / style / disabled |
| | `01/4.for.html` | 列表渲染：v-for 遍历数组 / 对象、动态增删、响应式方法 |
| | `01/5.input.html` | 表单绑定：v-model 文本 / 复选框 / 单选 / 下拉 / 修饰符 |
| | `01/6.on.html` | 事件处理：v-on 点击、传参、修饰符（.prevent/.stop/.enter） |
| | `01/7.component.html` | 组件化：全局组件、props 传值、$emit、组件复用 |
| | `01/8.computed.html` | 计算属性 computed 与侦听器 watch（含深度监听） |
| **进阶** | `02/` 目录 | once / v-html / class 与 style 绑定 / 模板条件 |
| | `03/` 目录 | 缩写（@、:）、click / model / 其它指令 |
| | `04/` 目录 | 异步请求、动画（transition）、组件进阶 |
| **样式练习** | `css3/` 目录 | CSS3 特效练习（骰子、翻牌、转盘、硬币旋转等） |

## 项目结构

```
vue2/
├── 01/            # 基础入门（8 个核心案例）
├── 02/            # 模板进阶
├── 03/            # 指令简写与事件
├── 04/            # 请求 / 动画 / 组件进阶
├── css3/          # CSS3 样式练习
├── images/        # 练习用的图片资源
└── lib/           # Vue 2 本地库（vue.min.js 等）
```

## 学习建议

1. **动手改数据**：打开源码（Ctrl+U），修改 data 里的值，刷新页面观察变化
2. **看控制台**：按 F12 打开开发者工具，Vue 的警告和错误都会打印在这里
3. **对比 Vue 3**：学完本目录后，可以对照 `../vue3/` 目录学习 Vue 3（重点看 `04-进阶篇/5.Vue2迁移指南.html` 的差异对照表）
4. **组件概念要重视**：第 7 课的 props / $emit / 单向数据流 是后续所有框架（React/Vue3）的通用概念

## 版本说明

本目录使用 Vue 2（`lib/vue.min.js`），是 Vue 3 的学习前置。Vue 2 已于 2023 年 12 月停止维护，**新项目请直接学习 `../vue3/` 目录**。
