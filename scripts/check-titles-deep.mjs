import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

function walk(dir) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) res.push(...walk(full));
    else if (item.endsWith('.html')) res.push(full);
  }
  return res;
}

const htmlFiles = walk(outDir);

console.log('--- Checking all <title> tags per HTML file ---');
for (const f of htmlFiles) {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf-8');
  const matches = [...content.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(m => m[1].trim());
  const nonEmpties = matches.filter(t => t.length > 0);
  
  if (nonEmpties.length === 0) {
    console.error(`FAIL: No non-empty title in ${rel}`);
  } else {
    for (const t of nonEmpties) {
      if (/Vikash.*Vikash/i.test(t) && !t.includes('Polymath')) { // note: "Vikash — Polymath, Futurist & Founder" is home title
        console.warn(`WARNING/NOTICE on title: "${t}" in ${rel}`);
      }
    }
  }
}

console.log('All HTML files evaluated.');
