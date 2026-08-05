# 05-nginx-deploy ｜ Nginx 打包部署（Vue3 项目上线）

> 前面 4 个项目都在讲**怎么写代码**，本项目讲**写完之后怎么上线**。
> 重点解决一个真实痛点：**history 模式路由部署后刷新就 404**。

| 前置项目 | 为什么要用它 |
|---------|------------|
| [02-router](../02-router/) | 它用了 `createWebHistory()`（HTML5 模式）—— 部署时必踩 404 的坑，本项目用它演示 |

**核心一句话**：`npm run build` 得到的是静态文件（dist），但"静态文件"≠"能访问"。你需要一个 Web 服务器（Nginx）托管它们，并配好**路由回退**。

---

## 完整流程（四步）

```
① 构建  ──> ② 拿产物  ──> ③ 配 Nginx  ──> ④ 验证
npm run build   dist/ 目录   nginx.conf     刷新不 404
```

---

## 第一步：构建

```bash
cd vue3-projects/02-router
npm run build
```

## 第二步：认识构建产物

`dist/` 目录长这样（Vite 输出，文件名是固定的，内容会变）：

```
dist/
├── index.html                  # 入口页（唯一 HTML）
└── assets/
    ├── index-DC1GgKP8.js       # 主 JS 包
    ├── index-D4Z-xHyT.css      # 全局样式
    ├── HomeView-DyC6Axya.js    # ★ 路由懒加载：每个页面单独一个 JS
    ├── AboutView-CvJlh7u-.js
    ├── UserView-Cj6JuvFP.js
    └── ...
```

**两个关键观察**：

1. **文件名带 hash**（`index-DC1GgKP8.js`）—— hash 由内容算出，内容一变 hash 就变。这是"静态资源可以放心缓存一年"的前提（详见知识点 2）。
2. **每个路由一个 JS** —— 02 的路由懒加载在构建时生效了，首屏只加载用到的页面，访问其他页再按需下载。

---

## 第三步：部署到 Nginx

### 方案 A：Windows 本机演示（最快出效果）

1. 下载 Nginx Windows 版：<https://nginx.org/en/download.html>（选 `nginx-x.x.x.zip`）
2. 解压到任意目录（如 `C:\nginx`）
3. **把 `02-router/dist` 里所有文件复制到 `C:\nginx\html\`**（覆盖默认的 index.html 等，保留其它文件无妨）
4. 用本项目的 `nginx.conf` 替换 `C:\nginx\conf\nginx.conf`
5. 启动：

```bash
cd C:\nginx
start nginx.exe          # 后台启动
# 改配置后重载：nginx.exe -s reload
# 停止：nginx.exe -s stop
```

6. 浏览器打开 <http://localhost:8080>

### 方案 B：Linux 云服务器（真实生产）

```bash
# 1. 安装 nginx（CentOS / Ubuntu 示例）
yum install nginx        # Ubuntu: apt install nginx

# 2. 本地上传 dist 到服务器
scp -r dist/* root@服务器IP:/usr/share/nginx/html/vue-app/

# 3. 把 server 块写入站点配置（把 root 改成上面目录）
vim /etc/nginx/conf.d/vue-app.conf

# 4. 检查语法 + 生效
nginx -t && nginx -s reload
```

---

## 第四步：验证（本项目的灵魂）

**测试 1：首页正常**
打开 `http://localhost:8080/` 应显示 02-router 的首页。

**测试 2：路由页面直接访问（先看 404，再修复）**

> 对比实验是最直观的学习方式。

1. 临时注释掉 `nginx.conf` 里 `location /` 的 `try_files` 那一行，`nginx -s reload`
2. 浏览器打开 `http://localhost:8080/user/1` → **404 Not Found**
3. 恢复 `try_files $uri $uri/ /index.html;`，reload
4. 再打开同一个地址 → **正常渲染**，且不刷新页面也能看到 URL 是干净的 `/user/1`

**测试 3：页面内跳转 + 刷新**
在 `/about` 页按 F5 —— 修复前 404，修复后正常。这就是 history 模式部署的完整体验。

**测试 4：静态资源缓存头（curl）**

```bash
curl -I http://localhost:8080/assets/index-DC1GgKP8.js
# 期望：Cache-Control: public, max-age=2592000, immutable

curl -I http://localhost:8080/
# 期望：Cache-Control: no-cache, no-store, must-revalidate
```

> 如果你本地没有 curl，用浏览器开发者工具 → Network → 点资源 → Headers 看同样效果。

---

## 核心知识点拆解（面试向）

| # | 知识点 | 一句话结论 |
|---|--------|-----------|
| 1 | `try_files $uri $uri/ /index.html` | history 模式路由的保命符：找不到文件就交给 index.html，由 Vue Router 接管 |
| 2 | 静态资源 hash + 强缓存 | 文件名 hash 由内容决定，变了就换新文件，所以 `/assets/` 可以缓存 30 天 |
| 3 | index.html 不缓存 | 它引用资源文件名，缓存它 = 永远拿不到新版本 |
| 4 | gzip | 文本资源压缩 60%+，几行配置搞定 |
| 5 | `/api` 反向代理 | 前端同源请求，nginx 转发到后端，免跨域、藏后端地址 |
| 6 | hash 模式 vs history 模式 | `createWebHashHistory()`（带 `#`）无需服务端配合；`createWebHistory()`（干净 URL）必须配回退 |
| 7 | 子路径部署 | 部署在 `域名/vue-app/` 时，构建前要在 `vite.config.js` 配 `base: '/vue-app/'`（nginx 无法单独解决） |

---

## 常见问题

**Q：`nginx: [emerg] ...` 配置报错？**
运行 `nginx -t` 检查语法，看错误行号定位。最常见：`location` 块里少了分号、`#` 注释没写到行尾。

**Q：改了配置没生效？**
Nginx 不会自动加载配置。改完必须 `nginx -s reload`（Windows 上先 stop 再 start 也可以）。

**Q：80 端口被占用？**
Windows 常见。要么换 `listen 8080`，要么找到占用程序（`netstat -ano | findstr :80`）处理。生产环境 80 是默认 HTTP 端口。

**Q：部署后打开还是旧版本？**
浏览器缓存了旧 index.html。本项目已对 index.html 设置 `no-cache`；如果仍有问题，`Ctrl+F5` 强刷或清缓存。CDN 场景还要在 CDN 上配同样策略。

**Q：刷新 404 但首页正常？**
正是没配 `try_files` 回退，回到**测试 2** 走一遍。

---

## 延伸阅读

- 本项目只覆盖"静态托管"。真实项目还会用到：**环境变量区分**（dev/prod 接口地址，回忆 04-complete 的 `.env`）、**HTTPS 证书**、**Docker 容器化**（把 nginx + dist 打成镜像）。
- 试试把部署对象换成 `04-complete`：它带 `/api` 请求，能顺便演示反向代理 —— 把 `02-router` 换成 `04-complete` 重新 build，再启用 `nginx.conf` 里注释掉的 `location /api/`。
