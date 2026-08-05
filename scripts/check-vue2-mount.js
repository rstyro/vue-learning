// 检查 vue2/01 所有案例的 el 选择器与 HTML id 是否匹配
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'vue2', '01');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();

let allOk = true;
for (const f of files) {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const els = [...c.matchAll(/el:\s*["']#([^"']+)["']/g)].map(m => m[1]);
    const ids = [...c.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    const missing = els.filter(e => !ids.includes(e));
    if (missing.length) {
        console.log(`❌ ${f}: el 选择器 [${els.join(',')}] 缺失 id: ${missing.join(', ')}`);
        allOk = false;
    } else {
        console.log(`✅ ${f}: el [${els.join(',')}] 全部匹配`);
    }
}
process.exit(allOk ? 0 : 1);
