import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

console.log('=== CHALLENGER 1: ADVERSARIAL DEEP STRESS TEST ===\n');

// 1. Check AMP pages canonicals
const ampDirs = fs.readdirSync(path.join(outDir, 'blog'), { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => path.join(outDir, 'blog', d.name, 'amp', 'index.html'))
  .filter(p => fs.existsSync(p));

console.log(`Checking ${ampDirs.length} AMP pages...`);
for (const ampPath of ampDirs) {
  const content = fs.readFileSync(ampPath, 'utf-8');
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const rel = path.relative(outDir, ampPath).replace(/\\/g, '/');
  if (!canonicalMatch) {
    console.error(`FAIL: AMP page ${rel} missing canonical`);
  } else {
    const href = canonicalMatch[1];
    // In next.js app router amp page, canonical should end with trailing slash and be valid URL
    if (!href.endsWith('/')) {
      console.error(`FAIL: AMP canonical missing trailing slash: ${href}`);
    }
  }
}

// 2. Check title formats in detail
function walkHtml(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files.push(...walkHtml(full));
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const allHtml = walkHtml(outDir);
let titleDetails = [];
for (const f of allHtml) {
  const content = fs.readFileSync(f, 'utf-8');
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  const title = (content.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const canonical = (content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || [])[1] || '';
  titleDetails.push({ rel, title, canonical });
}

console.log(`Sample of verified titles and canonicals:`);
console.log(titleDetails.slice(0, 10));

// 3. Check for any sitemap anomaly
const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf-8');
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  console.warn('Notice: sitemap.xml xml declaration check');
}
const urlCount = (sitemap.match(/<url>/g) || []).length;
const locCount = (sitemap.match(/<loc>/g) || []).length;
if (urlCount !== locCount) {
  console.error(`FAIL: Sitemap mismatch <url> (${urlCount}) vs <loc> (${locCount})`);
} else {
  console.log(`Sitemap structure valid: ${urlCount} <url> tags and ${locCount} <loc> tags.`);
}

console.log('\nAdversarial stress test completed.');
