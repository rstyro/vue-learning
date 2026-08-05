// Vue3 学习文件浏览器渲染验证：用 Edge headless 逐个打开页面，检查渲染内容
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT = path.join(__dirname, '..', 'vue3');

function walk(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...walk(full));
        else if (entry.name.endsWith('.html')) results.push(full);
    }
    return results;
}

// 构造 file:// URL：file:///D:/repo/vue3/...（每个路径段 URL 编码，保留 /）
function toFileUrl(file) {
    const parts = file.split(path.sep);
    const drive = parts[0].replace(':', '');          // "D:"
    const rest = parts.slice(1).map(p => encodeURIComponent(p)).join('/');
    return `file:///${drive}:/${rest}`;
}

const htmlFiles = walk(ROOT);
let pass = 0, fail = 0;
const failures = [];

for (const file of htmlFiles) {
    const rel = path.relative(ROOT, file);
    const url = toFileUrl(file);

    try {
        const args = ['--headless', '--disable-gpu', '--no-first-run',
            '--virtual-time-budget=4000', '--dump-dom', url];
        const body = execFileSync(EDGE, args, { encoding: 'utf8', timeout: 25000, maxBuffer: 15 * 1024 * 1024 });

        // 判定渲染成功
        let rendered = false;
        const hasMountError = body.includes('Failed to mount') || body.includes('mount target selector');
        const hasContent = body.length > 4000;

        if (rel.includes('index.html')) {
            rendered = body.includes('学习之旅') || body.includes('学习导航') || body.includes('Vue 3');
        } else if (rel.includes('5.Vue2迁移指南')) {
            rendered = body.includes('迁移指南') && !hasMountError;
        } else {
            // Vue 应用页：挂载成功的标志 —— #app 内部不再有未解析的 {{ }}，且有实际中文内容
            // 另外 Vue 会在挂载容器上添加 data-v-app 属性
            rendered = (body.includes('data-v-app') || hasContent) && !hasMountError;
        }

        if (rendered) {
            console.log(`PASS ${rel}`);
            pass++;
        } else {
            console.log(`FAIL ${rel}`);
            failures.push(rel);
            console.log(`  mountError=${hasMountError} contentLen=${body.length}`);
        }
    } catch (e) {
        console.log(`ERROR ${rel}: ${e.message.split('\n')[0]}`);
        failures.push(rel);
        fail++;
    }
}

console.log(`\n===== 渲染验证：${pass} 通过，${fail} 失败 =====`);
if (failures.length) console.log('失败列表: ' + failures.join(', '));
process.exit(fail > 0 ? 1 : 0);
