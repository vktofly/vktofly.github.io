import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'out');

let errors = [];
let warnings = [];
let stats = {
  htmlFilesChecked: 0,
  sitemapUrls: 0,
  titlesChecked: 0,
  imagesChecked: 0,
  canonicalsChecked: 0,
  robotsChecked: 0,
};

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

console.log('=== Milestone 1 Verification Suite ===\n');

// 1. Check sitemap.xml
console.log('1. Checking out/sitemap.xml...');
const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  errors.push('out/sitemap.xml does not exist!');
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const forbiddenPatterns = [
    '/admin',
    '/analytics',
    '/docs',
    '/404',
    'readme',
    '_template',
    'your-article-slug',
  ];
  for (const pattern of forbiddenPatterns) {
    if (sitemapContent.toLowerCase().includes(pattern)) {
      errors.push(`sitemap.xml contains forbidden pattern: ${pattern}`);
    }
  }
  const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  stats.sitemapUrls = locMatches.length;
  console.log(`  ✓ sitemap.xml contains ${stats.sitemapUrls} clean URLs without excluded paths.`);
}

// 2. Check robots.txt
console.log('2. Checking out/robots.txt...');
const robotsPath = path.join(OUT_DIR, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  errors.push('out/robots.txt does not exist!');
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const requiredDisallows = ['/admin', '/analytics', '/docs', '/404'];
  for (const req of requiredDisallows) {
    if (!robotsContent.includes(`Disallow: ${req}`)) {
      errors.push(`robots.txt missing Disallow: ${req}`);
    }
  }
  console.log('  ✓ robots.txt contains all required Disallow directives.');
}

// 3. Scan all HTML files
console.log('3. Scanning all HTML files in out/...');
walkDir(OUT_DIR, (filePath) => {
  if (!filePath.endsWith('.html')) return;
  stats.htmlFilesChecked++;
  const relPath = path.relative(OUT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // A. Title check
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    stats.titlesChecked++;
    const title = titleMatch[1];
    const decodedTitle = title.replace(/&amp;/g, '&');
    if (title.includes('— Vikash — Vikash') || title.includes('— Projects — Vikash — Vikash')) {
      errors.push(`Double suffix title detected in ${relPath}: "${title}"`);
    }
    if (relPath === 'index.html' && decodedTitle !== 'Vikash — Polymath, Futurist & Founder') {
      errors.push(`Homepage title mismatch in ${relPath}: "${title}"`);
    }
  } else {
    warnings.push(`No <title> found in ${relPath}`);
  }

  // B. Admin & Analytics robots noindex check
  if (relPath === 'admin/index.html' || relPath === 'admin.html') {
    stats.robotsChecked++;
    if (!content.includes('name="robots" content="noindex, nofollow"') && !content.includes('name="robots" content="noindex,nofollow"')) {
      errors.push(`Admin page ${relPath} missing noindex, nofollow robots meta!`);
    }
  }
  if (relPath === 'analytics/index.html' || relPath === 'analytics.html') {
    stats.robotsChecked++;
    if (!content.includes('name="robots" content="noindex, nofollow"') && !content.includes('name="robots" content="noindex,nofollow"')) {
      errors.push(`Analytics page ${relPath} missing noindex, nofollow robots meta!`);
    }
  }

  // C. Canonical URL trailing slash check
  const canonicalMatch = content.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ||
                         content.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  if (canonicalMatch) {
    stats.canonicalsChecked++;
    const href = canonicalMatch[1];
    if (!href.endsWith('/') && !href.endsWith('.html') && !href.endsWith('.xml') && !href.endsWith('.txt')) {
      errors.push(`Canonical URL missing trailing slash in ${relPath}: "${href}"`);
    }
  }

  // D. Image alt attribute check
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  for (const imgTag of imgMatches) {
    stats.imagesChecked++;
    if (!/alt=/i.test(imgTag)) {
      errors.push(`Image missing alt attribute in ${relPath}: ${imgTag}`);
    }
    if (/alt="undefined"/i.test(imgTag) || /alt="null"/i.test(imgTag) || /alt="\[object Object\]"/i.test(imgTag)) {
      errors.push(`Invalid alt text detected in ${relPath}: ${imgTag}`);
    }
  }
});

console.log('\n=== Summary of Checks ===');
console.log(`- HTML files checked: ${stats.htmlFilesChecked}`);
console.log(`- Titles validated: ${stats.titlesChecked}`);
console.log(`- Images validated: ${stats.imagesChecked}`);
console.log(`- Canonicals validated: ${stats.canonicalsChecked}`);
console.log(`- Sitemap entries: ${stats.sitemapUrls}`);
console.log(`- Total Warnings: ${warnings.length}`);
console.log(`- Total Errors: ${errors.length}`);

if (warnings.length > 0) {
  console.log('\nWarnings:');
  warnings.forEach((w) => console.log('  ⚠️ ' + w));
}

if (errors.length > 0) {
  console.log('\nERRORS FOUND:');
  errors.forEach((e) => console.log('  ❌ ' + e));
  process.exit(1);
} else {
  console.log('\n✅ ALL VERIFICATION CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
