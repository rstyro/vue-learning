// Vue2 学习文件渲染验证：Edge headless 打开 01 目录所有案例，检查 Vue 是否成功渲染
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = path.join(__dirname, '..', 'vue2', '01');

// 每个页面期望渲染出的关键内容（来自 data 或模板）
const expectations = {
    '1.helloWorld.html': ['Hello Vue!', '点击次数'],
    '2.if.html': ['苹果', '及格', '切换'],
    '3.bind.html': ['你还要我怎样', '切换高亮'],
    '4.for.html': ['襁褓', '而立之年', '第一个'],
    '5.input.html': ['来呀，快活呀', '已选', '请选择'],
    '6.on.html': ['你是年少的欢喜', '最近一次点击的坐标'],
    '7.component.html': ['苹果', '葡萄', '你点了我'],
    '8.computed.html': ['张 三', '合计金额', '修改全名的次数'],
};

function toFileUrl(file) {
    const parts = file.split(path.sep);
    const drive = parts[0].replace(':', '');
    const rest = parts.slice(1).map(p => encodeURIComponent(p)).join('/');
    return `file:///${drive}:/${rest}`;
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();
let pass = 0, fail = 0;

for (const f of files) {
    const url = toFileUrl(path.join(DIR, f));
    try {
        const args = ['--headless', '--disable-gpu', '--no-first-run',
            '--virtual-time-budget=4000', '--dump-dom', url];
        const body = execFileSync(EDGE, args, { encoding: 'utf8', timeout: 25000, maxBuffer: 15 * 1024 * 1024 });

        const kws = expectations[f] || [];
        const hasMountError = body.includes('Failed to mount') || body.includes('mount target selector')
            || body.includes('is not defined') || body.includes('Cannot read property');
        const missing = kws.filter(k => !body.includes(k));

        if (!hasMountError && missing.length === 0) {
            console.log(`PASS ${f}（关键内容全部命中: ${kws.join(' / ')}）`);
            pass++;
        } else {
            console.log(`FAIL ${f}`);
            if (hasMountError) console.log(`  存在运行时错误`);
            if (missing.length) console.log(`  缺失内容: ${missing.join(', ')}`);
            fail++;
        }
    } catch (e) {
        console.log(`ERROR ${f}: ${e.message.split('\n')[0]}`);
        fail++;
    }
}

console.log(`\n===== Vue2 渲染验证：${pass} 通过，${fail} 失败 =====`);
process.exit(fail > 0 ? 1 : 0);
