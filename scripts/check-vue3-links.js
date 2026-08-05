// 验证 vue3/index.html 导航页的所有链接指向的文件都存在
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'vue3');
const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const links = [...idx.matchAll(/href="([^"]+\.html)"/g)].map(m => m[1]);

let missing = 0;
for (const l of links) {
    const p = path.join(root, l);
    if (!fs.existsSync(p)) {
        console.log('缺失: ' + l);
        missing++;
    }
}
console.log(`链接总数: ${links.length}, 缺失: ${missing}`);
process.exit(missing > 0 ? 1 : 0);
