// Vue3 学习文件验证脚本：提取每个 HTML 的内联 <script> 做语法检查
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const root = path.join(__dirname, '..', 'vue3');
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vue3-syntax-'));
let pass = 0, fail = 0;

function walk(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...walk(full));
        else if (entry.name.endsWith('.html')) results.push(full);
    }
    return results;
}

for (const file of walk(root)) {
    const content = fs.readFileSync(file, 'utf8');
    // 提取所有内联 <script>（不含 src 的）
    const scripts = [...content.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
    // 检查 script 内是否真实调用 mount（排除 pre 代码展示块中的伪代码）
    let i = 0;
    for (const script of scripts) {
        i++;
        // 跳过纯注释脚本（迁移指南）
        if (!script.includes('mount(') && script.trim().startsWith('//')) {
            console.log(`SKIP(注释) ${path.relative(root, file)}#${i}`);
            continue;
        }
        const tmpFile = path.join(tmpDir, `check_${pass + fail}_${i}.js`);
        fs.writeFileSync(tmpFile, script, 'utf8');
        try {
            execFileSync(process.execPath, ['--check', tmpFile], { stdio: 'pipe', encoding: 'utf8' });
            console.log(`PASS ${path.relative(root, file)}#${i}`);
            pass++;
        } catch (e) {
            console.log(`FAIL ${path.relative(root, file)}#${i}`);
            console.log('  ' + (e.stderr || e.message).split('\n').slice(0, 8).join('\n  '));
            fail++;
        }
    }
}

console.log(`\n===== 结果：${pass} 通过，${fail} 失败 =====`);
process.exit(fail > 0 ? 1 : 0);
