// mock/server.js —— 简易 Mock 服务器（教学用，和 04-complete 同款写法）
// 真实项目中不需要这个文件！这里是为了在无后端的情况下演示完整请求流程。
//
// 用法：node mock/server.js 启动本地服务器（端口 3000）
// 返回格式统一为 { code: 0, data: ..., message: '' }
//
// 提供的接口：
//   GET  /api/categories          分类列表
//   GET  /api/products            商品列表（支持 keyword / category / page / pageSize）
//   GET  /api/products/:id        商品详情
//   POST /api/orders              提交订单（返回订单号）

import http from 'node:http'

// ---------- 模拟数据库 ----------
const products = [
  { id: 1,  name: '华为 Mate 60 Pro',     category: '手机', price: 6999, stock: 20, sales: 320,  emoji: '📱', color: '#e6f4ff', description: '旗舰影像手机，卫星通信，鸿蒙系统。' },
  { id: 2,  name: '小米 14',              category: '手机', price: 4299, stock: 35, sales: 510,  emoji: '📲', color: '#fff7e6', description: '徕卡光学镜头，骁龙 8 Gen3，小屏旗舰。' },
  { id: 3,  name: 'iPhone 15',            category: '手机', price: 5999, stock: 15, sales: 680,  emoji: '🍎', color: '#f0f5ff', description: 'A16 芯片，灵动岛，4800 万主摄。' },
  { id: 4,  name: 'MacBook Air M3',       category: '电脑', price: 8999, stock: 10, sales: 150,  emoji: '💻', color: '#f6ffed', description: '13.6 英寸，M3 芯片，18 小时续航。' },
  { id: 5,  name: 'ThinkPad X1 Carbon',   category: '电脑', price: 9999, stock: 8,  sales: 96,   emoji: '🖥️', color: '#f9f0ff', description: '商务轻薄本，2.8K OLED 屏，1.09kg。' },
  { id: 6,  name: '罗技 MX Master 3S',    category: '配件', price: 649,  stock: 50, sales: 890,  emoji: '🖱️', color: '#e6fffb', description: '静音旗舰鼠标，8K DPI，电磁滚轮。' },
  { id: 7,  name: 'Cherry MX 机械键盘',   category: '配件', price: 499,  stock: 60, sales: 720,  emoji: '⌨️', color: '#fffbe6', description: '茶轴机械键盘，PBT 键帽，全键无冲。' },
  { id: 8,  name: '飞利浦 4K 显示器',     category: '电脑', price: 1999, stock: 25, sales: 260,  emoji: '🖥️', color: '#f0f5ff', description: '27 英寸 4K IPS 屏，Type-C 65W 反向充电。' },
  { id: 9,  name: '蓝牙降噪耳机 Pro',     category: '配件', price: 899,  stock: 40, sales: 1100, emoji: '🎧', color: '#e6fffb', description: '-45dB 主动降噪，40 小时续航，空间音频。' },
  { id: 10, name: '智能体脂秤',           category: '生活', price: 129,  stock: 100, sales: 2300, emoji: '⚖️', color: '#f6ffed', description: '蓝牙连接 App，21 项身体数据，家用健身必备。' },
  { id: 11, name: '小米智能手环 9',       category: '生活', price: 249,  stock: 80, sales: 1800, emoji: '⌚', color: '#fff0f6', description: '1.62 英寸 AMOLED 屏，心率血氧监测，14 天续航。' },
  { id: 12, name: '坚果 Pro 礼盒',        category: '生活', price: 99,   stock: 200, sales: 4500, emoji: '🍪', color: '#fff7e6', description: '每日坚果混合装 30 袋，健康零食。' }
]

// 分类 = 从商品数据中自动提取（保证不遗漏、不手误）
const categories = [...new Set(products.map(p => p.category))]

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

http.createServer((req, res) => {
  // 简单 CORS（走 Vite 代理则不需要，但直接访问接口时有用）
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.end()

  const url = new URL(req.url, 'http://localhost:3000')
  const path = url.pathname

  // ⚠️ 必须【先】收集请求体再进路由！
  //    请求体（POST 数据）在请求到达时就已开始传输，本地传输几毫秒就结束。
  //    如果像 GET 路由那样等 setTimeout 之后再监听 'data' 事件，body 早已流完，
  //    收不到任何内容 → JSON 解析失败。所以监听要放在这里（setTimeout 外层）。
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', () => {
    // 模拟网络延迟，让 loading 效果可见
    setTimeout(() => {
    // ---------- GET /api/categories 分类列表 ----------
    if (req.method === 'GET' && path === '/api/categories') {
      return json(res, 200, { code: 0, data: categories, message: 'ok' })
    }

    // ---------- GET /api/products 商品列表（关键词 + 分类 + 分页） ----------
    if (req.method === 'GET' && path === '/api/products') {
      const keyword = (url.searchParams.get('keyword') || '').trim()
      const category = url.searchParams.get('category') || ''
      const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
      const pageSize = Math.max(1, Number(url.searchParams.get('pageSize')) || 8)

      // 过滤
      let list = products
      if (keyword) list = list.filter(p => p.name.includes(keyword))
      if (category) list = list.filter(p => p.category === category)

      // 分页
      const start = (page - 1) * pageSize
      const pageList = list.slice(start, start + pageSize)

      return json(res, 200, {
        code: 0,
        data: { list: pageList, total: list.length, page, pageSize },
        message: 'ok'
      })
    }

    // ---------- GET /api/products/:id 商品详情 ----------
    const detailMatch = path.match(/^\/api\/products\/(\d+)$/)
    if (req.method === 'GET' && detailMatch) {
      const product = products.find(p => p.id === Number(detailMatch[1]))
      if (product) return json(res, 200, { code: 0, data: product, message: 'ok' })
      return json(res, 404, { code: 404, data: null, message: '商品不存在' })
    }

    // ---------- POST /api/orders 提交订单 ----------
    // 注意：body 已在上面（req.on('end') 之前）收集完毕，这里直接用即可
    if (req.method === 'POST' && path === '/api/orders') {
      try {
        const data = JSON.parse(body || '{}')

        // 参数校验（模拟真实后端）
        if (!data.items?.length) {
          return json(res, 400, { code: 400, data: null, message: '订单没有商品' })
        }
        if (!data.receiver?.name || !data.receiver?.phone || !data.receiver?.address) {
          return json(res, 400, { code: 400, data: null, message: '收货信息不完整' })
        }

        // 用后端数据重新计算总价（前端传的 totalPrice 只做参考）
        const orderItems = data.items.map(({ id, quantity }) => {
          const p = products.find(x => x.id === id)
          return { name: p.name, quantity, price: p.price }
        })
        const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

        // 生成订单号：SO + 时间戳 + 随机数
        const orderNo = 'SO' + Date.now() + String(Math.floor(Math.random() * 900) + 100)

        return json(res, 200, {
          code: 0,
          data: {
            orderNo,
            totalPrice,
            createdAt: new Date().toLocaleString('zh-CN'),
            receiver: data.receiver,
            items: orderItems
          },
          message: 'ok'
        })
      } catch (e) {
        return json(res, 400, { code: 400, data: null, message: '请求体不是合法 JSON' })
      }
    }

    json(res, 404, { code: 404, data: null, message: '接口不存在' })
    }, 500)  // 500ms 延迟，让 loading 效果可见
  })  // req.on('end') 回调结束
}).listen(3000, () => {
  console.log('🟢 Mock 服务器已启动: http://localhost:3000')
  console.log('   接口: GET /api/products, GET /api/products/:id, GET /api/categories, POST /api/orders')
})
