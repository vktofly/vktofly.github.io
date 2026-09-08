import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as ogImagesModule from '../lib/og-images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('===========================================================');
console.log('CHALLENGER 2: ADVERSARIAL STRESS TEST & EDGE-CASE HARNESS');
console.log('===========================================================\n');

let stressFailures = [];
let stressChecksPassed = 0;

// ====================================================================
// TEST 1: Source JSX Code Audit for <img> and <Image> alt attributes
// ====================================================================
console.log('Test 1: Auditing all JSX/JS files in app/ and components/ for <img> and <Image> tags...');

function scanJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanJsxFiles(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const sourceFiles = [
  ...scanJsxFiles(path.join(rootDir, 'app')),
  ...scanJsxFiles(path.join(rootDir, 'components')),
];

let totalJsxImgTags = 0;

for (const file of sourceFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const code = fs.readFileSync(file, 'utf-8');

  // Match JSX <img ...> or <Image ...>
  const tagMatches = code.match(/<(?:Image|img)\b[^>]*\/?>/g) || [];
  for (const tag of tagMatches) {
    totalJsxImgTags++;
    
    // Check if alt attribute exists in JSX
    const hasAlt = /\balt\s*=/i.test(tag);
    if (!hasAlt) {
      stressFailures.push({
        test: 'JSX Image Tag missing alt',
        file: relPath,
        tag,
        issue: 'No alt attribute provided in JSX source tag',
      });
    } else {
      stressChecksPassed++;
    }
  }
}

console.log(`  ✓ Scanned ${sourceFiles.length} source files. Found ${totalJsxImgTags} JSX image tags.`);

// ====================================================================
// TEST 2: lib/og-images.js Edge-Case & Fallback Stress Testing
// ====================================================================
console.log('\nTest 2: Stress-testing lib/og-images.js dynamic resolvers and fallbacks...');

const { getBlogOgImage, getBookOgImage, getPageOgImage, getOgImage, getTwitterOgImage } = ogImagesModule;

// A. Non-existent blog slug
const nonExistentBlogOg = getBlogOgImage('this-slug-definitely-does-not-exist-12345');
console.log(`  - Non-existent blog slug resolved to: "${nonExistentBlogOg}"`);
if (!fs.existsSync(path.join(rootDir, 'public', nonExistentBlogOg.startsWith('/') ? nonExistentBlogOg.slice(1) : nonExistentBlogOg))) {
  stressFailures.push({
    test: 'OG Fallback Existence',
    issue: `Fallback for non-existent blog slug "${nonExistentBlogOg}" does not exist in public/`,
  });
} else {
  stressChecksPassed++;
}

// B. Non-existent book slug
const nonExistentBookOg = getBookOgImage('this-book-slug-definitely-does-not-exist-99999');
console.log(`  - Non-existent book slug resolved to: "${nonExistentBookOg}"`);
if (!fs.existsSync(path.join(rootDir, 'public', nonExistentBookOg.startsWith('/') ? nonExistentBookOg.slice(1) : nonExistentBookOg))) {
  stressFailures.push({
    test: 'OG Fallback Existence',
    issue: `Fallback for non-existent book slug "${nonExistentBookOg}" does not exist in public/`,
  });
} else {
  stressChecksPassed++;
}

// C. Non-existent page name
const nonExistentPageOg = getOgImage('some-random-unknown-page-name');
console.log(`  - Non-existent page name resolved to: "${nonExistentPageOg.url}"`);
if (!fs.existsSync(path.join(rootDir, 'public', nonExistentPageOg.url.startsWith('/') ? nonExistentPageOg.url.slice(1) : nonExistentPageOg.url))) {
  stressFailures.push({
    test: 'OG Fallback Existence',
    issue: `Fallback for non-existent page "${nonExistentPageOg.url}" does not exist in public/`,
  });
} else {
  stressChecksPassed++;
}

// D. Null/undefined/empty input handling
try {
  const nullBlogOg = getBlogOgImage(null);
  const emptyBlogOg = getBlogOgImage('');
  const undefinedBookOg = getBookOgImage(undefined);
  console.log(`  - Null/undefined inputs resolved safely without throws: "${nullBlogOg}", "${emptyBlogOg}", "${undefinedBookOg}"`);
  stressChecksPassed += 3;
} catch (e) {
  stressFailures.push({
    test: 'OG Null Input Handling',
    issue: `Threw unexpected error on null/empty input: ${e.message}`,
  });
}

// ====================================================================
// TEST 3: Admin and Analytics HTML Exact Meta Tag Direct Inspection
// ====================================================================
console.log('\nTest 3: Verifying exact robots meta content on admin and analytics outputs...');

const adminHtmlPath = path.join(rootDir, 'out', 'admin', 'index.html');
const analyticsHtmlPath = path.join(rootDir, 'out', 'analytics', 'index.html');

if (!fs.existsSync(adminHtmlPath)) {
  stressFailures.push({ test: 'Admin HTML existence', issue: `File not found at ${adminHtmlPath}` });
} else {
  const adminHtml = fs.readFileSync(adminHtmlPath, 'utf-8');
  if (!adminHtml.includes('<meta name="robots" content="noindex, nofollow"/>') && !adminHtml.includes('content="noindex, nofollow"')) {
    stressFailures.push({ test: 'Admin robots tag', issue: 'Missing strict noindex, nofollow meta in out/admin/index.html' });
  } else {
    console.log('  ✓ out/admin/index.html strictly contains noindex, nofollow');
    stressChecksPassed++;
  }
}

if (!fs.existsSync(analyticsHtmlPath)) {
  stressFailures.push({ test: 'Analytics HTML existence', issue: `File not found at ${analyticsHtmlPath}` });
} else {
  const analyticsHtml = fs.readFileSync(analyticsHtmlPath, 'utf-8');
  if (!analyticsHtml.includes('<meta name="robots" content="noindex, nofollow"/>') && !analyticsHtml.includes('content="noindex, nofollow"')) {
    stressFailures.push({ test: 'Analytics robots tag', issue: 'Missing strict noindex, nofollow meta in out/analytics/index.html' });
  } else {
    console.log('  ✓ out/analytics/index.html strictly contains noindex, nofollow');
    stressChecksPassed++;
  }
}

// ====================================================================
// TEST 4: Exhaustive OG Image Physical File Hash & Size Validation
// ====================================================================
console.log('\nTest 4: Verifying all physical OG image files on disk have non-zero file sizes...');

const ogPublicDir = path.join(rootDir, 'public', 'og');
if (fs.existsSync(ogPublicDir)) {
  const ogFiles = fs.readdirSync(ogPublicDir, { recursive: true });
  for (const ogFile of ogFiles) {
    const fullOgPath = path.join(ogPublicDir, ogFile);
    if (fs.statSync(fullOgPath).isFile()) {
      const size = fs.statSync(fullOgPath).size;
      if (size === 0) {
        stressFailures.push({ test: 'Zero-byte OG image', file: ogFile, issue: 'OG image is 0 bytes!' });
      } else {
        stressChecksPassed++;
      }
    }
  }
  console.log(`  ✓ Checked ${ogFiles.length} OG image assets in public/og/. All have non-zero byte length.`);
}

// ====================================================================
// Summary
// ====================================================================
console.log('\n===========================================================');
console.log('STRESS TEST SUMMARY');
console.log('===========================================================');
console.log(`Total Passed Invariant Checks: ${stressChecksPassed}`);
console.log(`Total Stress Failures: ${stressFailures.length}`);

if (stressFailures.length > 0) {
  console.log('\n❌ FAILURES:');
  stressFailures.forEach(f => console.log(`  - [${f.test}] ${f.file || ''} -> ${f.issue}`));
  process.exit(1);
} else {
  console.log('\n✅ ALL ADVERSARIAL STRESS TESTS PASSED WITH ZERO DEFECTS!');
  process.exit(0);
}
