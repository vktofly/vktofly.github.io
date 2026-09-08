import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

console.log('=== CHALLENGER 1: EMPIRICAL VERIFICATION HARNESS ===\n');

if (!fs.existsSync(outDir)) {
  console.error(`ERROR: 'out' directory not found at ${outDir}`);
  process.exit(1);
}

// 1. Collect all HTML files
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(outDir);
console.log(`Found ${htmlFiles.length} HTML files in ${outDir}`);

let titleFailures = [];
let doubleSuffixFailures = [];
let canonicalFailures = [];
let canonicalTrailingSlashFailures = [];
let robotsMetaFailures = [];
let totalTitlesChecked = 0;
let totalCanonicalsChecked = 0;

const doubleSuffixRegex = /—\s*Vikash\s*—\s*Vikash/i;
const repeatedVikashRegex = /Vikash\s*—\s*Vikash/i;

for (const filePath of htmlFiles) {
  const relPath = path.relative(outDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check Title
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    totalTitlesChecked++;
    const titleText = titleMatch[1].trim();

    if (doubleSuffixRegex.test(titleText) || repeatedVikashRegex.test(titleText)) {
      doubleSuffixFailures.push({ file: relPath, title: titleText, issue: 'Double suffix detected' });
    }

    // Check if title ends with — Vikash or is exact home title
    const isHome = relPath === 'index.html';
    const isNotFound = relPath === '404.html' || relPath === 'not-found.html';
    
    // Also check OpenGraph and Twitter titles
    const ogTitleMatch = content.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
    const twTitleMatch = content.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']*)["']/i);

    if (ogTitleMatch && (doubleSuffixRegex.test(ogTitleMatch[1]) || repeatedVikashRegex.test(ogTitleMatch[1]))) {
      doubleSuffixFailures.push({ file: relPath, title: ogTitleMatch[1], issue: 'OG title double suffix' });
    }
    if (twTitleMatch && (doubleSuffixRegex.test(twTitleMatch[1]) || repeatedVikashRegex.test(twTitleMatch[1]))) {
      doubleSuffixFailures.push({ file: relPath, title: twTitleMatch[1], issue: 'Twitter title double suffix' });
    }
  } else {
    // Some 404 or specific dynamic partials might lack title, let's log
    titleFailures.push({ file: relPath, issue: 'Missing <title> tag' });
  }

  // Check Canonical
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  if (canonicalMatch) {
    totalCanonicalsChecked++;
    const canonicalHref = canonicalMatch[1];
    
    // Must start with base url https://vktofly.github.io
    if (!canonicalHref.startsWith('https://vktofly.github.io')) {
      canonicalFailures.push({ file: relPath, href: canonicalHref, issue: 'Does not start with base URL' });
    }

    // Must end with trailing slash unless it is a file with extension (.xml, .txt, etc.)
    if (!canonicalHref.endsWith('/')) {
      canonicalTrailingSlashFailures.push({ file: relPath, href: canonicalHref, issue: 'Missing trailing slash' });
    }
  } else {
    // If not 404.html, report missing canonical
    if (relPath !== '404.html') {
      canonicalFailures.push({ file: relPath, issue: 'Missing <link rel="canonical">' });
    }
  }

  // Check Robots meta for private routes
  if (relPath.startsWith('admin/') || relPath.startsWith('analytics/') || relPath === '404.html') {
    const robotsMatch = content.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
    if (!robotsMatch || !robotsMatch[1].includes('noindex')) {
      robotsMetaFailures.push({ file: relPath, robots: robotsMatch ? robotsMatch[1] : 'NONE', issue: 'Expected noindex on private/404 page' });
    }
  }
}

// 2. Inspect Sitemap
const sitemapPath = path.join(outDir, 'sitemap.xml');
let sitemapErrors = [];
let sitemapUrls = [];

if (!fs.existsSync(sitemapPath)) {
  sitemapErrors.push(`sitemap.xml not found at ${sitemapPath}`);
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1]);

  console.log(`Sitemap total URLs: ${sitemapUrls.length}`);

  const forbiddenPatterns = [
    { name: '/admin', regex: /\/admin(\/|$)/i },
    { name: '/analytics', regex: /\/analytics(\/|$)/i },
    { name: '/docs', regex: /\/docs(\/|$)/i },
    { name: '/404', regex: /\/404(\/|$)/i },
    { name: 'readme', regex: /readme/i },
    { name: '_template', regex: /_template/i },
    { name: 'your-article-slug', regex: /your-article-slug/i },
  ];

  for (const url of sitemapUrls) {
    // Check trailing slash
    if (!url.endsWith('/')) {
      sitemapErrors.push(`URL missing trailing slash: ${url}`);
    }

    // Check forbidden patterns
    for (const pattern of forbiddenPatterns) {
      if (pattern.regex.test(url)) {
        sitemapErrors.push(`Forbidden pattern "${pattern.name}" found in sitemap URL: ${url}`);
      }
    }

    // Check if URL matches a file in out/
    let route = url.replace('https://vktofly.github.io', '');
    if (route.startsWith('/')) route = route.slice(1);
    if (route.endsWith('/')) route = route.slice(0, -1);
    
    const expectedFile = route === '' ? path.join(outDir, 'index.html') : path.join(outDir, route, 'index.html');
    const expectedHtml = path.join(outDir, `${route}.html`);
    if (!fs.existsSync(expectedFile) && !fs.existsSync(expectedHtml)) {
      sitemapErrors.push(`Sitemap URL does not resolve to an HTML file in out/: ${url} (checked ${expectedFile})`);
    }
  }
}

// 3. Inspect robots.txt
const robotsTxtPath = path.join(outDir, 'robots.txt');
let robotsErrors = [];

if (!fs.existsSync(robotsTxtPath)) {
  robotsErrors.push(`robots.txt not found at ${robotsTxtPath}`);
} else {
  const robotsContent = fs.readFileSync(robotsTxtPath, 'utf-8');
  console.log('--- robots.txt content ---');
  console.log(robotsContent.trim());
  console.log('--------------------------\n');

  const requiredDisallows = ['/admin', '/analytics', '/docs', '/404'];
  for (const req of requiredDisallows) {
    const disallowRegex = new RegExp(`Disallow:\\s*${req}`, 'i');
    if (!disallowRegex.test(robotsContent)) {
      robotsErrors.push(`robots.txt is missing Disallow directive for: ${req}`);
    }
  }

  if (!/Sitemap:\s*https:\/\/vktofly\.github\.io\/sitemap\.xml/i.test(robotsContent)) {
    robotsErrors.push('robots.txt is missing valid Sitemap directive pointing to https://vktofly.github.io/sitemap.xml');
  }
}

// Summary Output
console.log('=== EMPIRICAL VERIFICATION RESULTS ===');
console.log(`1. Titles checked: ${totalTitlesChecked} across ${htmlFiles.length} HTML files`);
console.log(`   - Double suffix violations: ${doubleSuffixFailures.length}`);
console.log(`   - Missing title tags: ${titleFailures.length}`);
if (doubleSuffixFailures.length > 0) {
  console.log('   FAILURES:', JSON.stringify(doubleSuffixFailures, null, 2));
}

console.log(`2. Canonicals checked: ${totalCanonicalsChecked}`);
console.log(`   - Missing trailing slash violations: ${canonicalTrailingSlashFailures.length}`);
console.log(`   - Canonical structure errors: ${canonicalFailures.length}`);
if (canonicalTrailingSlashFailures.length > 0) {
  console.log('   TRAILING SLASH FAILURES:', JSON.stringify(canonicalTrailingSlashFailures, null, 2));
}
if (canonicalFailures.length > 0) {
  console.log('   CANONICAL FAILURES:', JSON.stringify(canonicalFailures, null, 2));
}

console.log(`3. Private route robots meta checks:`);
console.log(`   - Robots meta violations: ${robotsMetaFailures.length}`);
if (robotsMetaFailures.length > 0) {
  console.log('   ROBOTS META FAILURES:', JSON.stringify(robotsMetaFailures, null, 2));
}

console.log(`4. Sitemap verification:`);
console.log(`   - Total URLs in sitemap: ${sitemapUrls.length}`);
console.log(`   - Forbidden or invalid URLs in sitemap: ${sitemapErrors.length}`);
if (sitemapErrors.length > 0) {
  console.log('   SITEMAP ERRORS:', JSON.stringify(sitemapErrors, null, 2));
}

console.log(`5. Robots.txt verification:`);
console.log(`   - Robots.txt violations: ${robotsErrors.length}`);
if (robotsErrors.length > 0) {
  console.log('   ROBOTS.TXT ERRORS:', JSON.stringify(robotsErrors, null, 2));
}

const totalProblems = doubleSuffixFailures.length + titleFailures.length + canonicalTrailingSlashFailures.length + canonicalFailures.length + robotsMetaFailures.length + sitemapErrors.length + robotsErrors.length;

console.log('\n=======================================');
if (totalProblems === 0) {
  console.log('🎉 VERDICT: PASS — ALL CHECKS SATISFIED WITH ZERO ERRORS');
} else {
  console.log(`❌ VERDICT: FAIL — ${totalProblems} TOTAL ERROR(S) DETECTED`);
}
console.log('=======================================\n');

process.exit(totalProblems === 0 ? 0 : 1);
