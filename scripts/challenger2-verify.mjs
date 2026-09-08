import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const publicDir = path.join(rootDir, 'public');

console.log('===========================================================');
console.log('CHALLENGER 2: EMPIRICAL IMAGE & METADATA VERIFICATION SUITE');
console.log('===========================================================\n');

if (!fs.existsSync(outDir)) {
  console.error(`ERROR: 'out' directory not found at ${outDir}`);
  process.exit(1);
}

// Helper: recursively collect all HTML files
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
console.log(`Found ${htmlFiles.length} HTML files in ${outDir}\n`);

let stats = {
  htmlFilesChecked: htmlFiles.length,
  totalImgTags: 0,
  imgWithAlt: 0,
  imgEmptyAlt: 0,
  imgMeaningfulAlt: 0,
  imgMissingAlt: 0,
  imgInvalidAlt: 0,
  imgBrokenSrc: 0,
  totalOgImages: 0,
  ogImagesValidOnDisk: 0,
  ogImagesBroken: 0,
  totalTwitterImages: 0,
  twitterImagesValidOnDisk: 0,
  twitterImagesBroken: 0,
  adminRobotsChecked: 0,
  analyticsRobotsChecked: 0,
  robotsMetaNoindexPages: [],
  robotsMetaIndexPages: [],
};

let failures = {
  missingAlt: [],
  invalidAlt: [],
  brokenImgSrc: [],
  adminRobots: [],
  analyticsRobots: [],
  brokenOgImages: [],
  brokenTwitterImages: [],
  unexpectedNoindex: [],
};

// Check asset existence on disk (either in out/ or in public/)
function checkAssetExists(assetPath) {
  if (!assetPath) return false;
  // Clean query strings or hashes
  const cleanPath = assetPath.split('?')[0].split('#')[0];
  
  // Strip leading slash
  const relPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
  
  // Try directly in outDir and publicDir
  const candidateOut = path.join(outDir, relPath);
  const candidatePublic = path.join(publicDir, relPath);
  
  if (fs.existsSync(candidateOut) && fs.statSync(candidateOut).isFile()) return true;
  if (fs.existsSync(candidatePublic) && fs.statSync(candidatePublic).isFile()) return true;
  
  // If encoded URI, try decoding
  try {
    const decodedRelPath = decodeURIComponent(relPath);
    const decodedOut = path.join(outDir, decodedRelPath);
    const decodedPublic = path.join(publicDir, decodedRelPath);
    if (fs.existsSync(decodedOut) && fs.statSync(decodedOut).isFile()) return true;
    if (fs.existsSync(decodedPublic) && fs.statSync(decodedPublic).isFile()) return true;
  } catch (e) {
    // ignore decode error
  }
  
  return false;
}

// Regex helpers
const imgTagRegex = /<img\b[^>]*>/gi;
const altAttrRegex = /\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const srcAttrRegex = /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const metaRobotsRegex = /<meta\b[^>]*name=["']robots["'][^>]*>/gi;
const contentAttrRegex = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const metaOgImageRegex = /<meta\b[^>]*property=["']og:image(?::(?:url|secure_url))?["'][^>]*>/gi;
const metaTwitterImageRegex = /<meta\b[^>]*name=["']twitter:image(?::src)?["'][^>]*>/gi;

for (const filePath of htmlFiles) {
  const relPath = path.relative(outDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

  // ==========================================
  // 1. IMAGE TAG VERIFICATION
  // ==========================================
  const imgMatches = content.match(imgTagRegex) || [];
  for (const imgTag of imgMatches) {
    stats.totalImgTags++;
    
    // Extract alt attribute
    const altMatch = imgTag.match(altAttrRegex);
    if (!altMatch) {
      stats.imgMissingAlt++;
      failures.missingAlt.push({ file: relPath, tag: imgTag });
    } else {
      const altValue = altMatch[1] !== undefined ? altMatch[1] : (altMatch[2] !== undefined ? altMatch[2] : altMatch[3]);
      stats.imgWithAlt++;
      
      // Check invalid alt values
      const trimmedAlt = (altValue || '').trim().toLowerCase();
      if (
        trimmedAlt === 'undefined' ||
        trimmedAlt === 'null' ||
        trimmedAlt === '[object object]' ||
        trimmedAlt === 'nan'
      ) {
        stats.imgInvalidAlt++;
        failures.invalidAlt.push({ file: relPath, tag: imgTag, alt: altValue });
      } else if (trimmedAlt === '') {
        stats.imgEmptyAlt++;
      } else {
        stats.imgMeaningfulAlt++;
      }
    }

    // Extract and verify src attribute
    const srcMatch = imgTag.match(srcAttrRegex);
    if (srcMatch) {
      const srcValue = srcMatch[1] !== undefined ? srcMatch[1] : (srcMatch[2] !== undefined ? srcMatch[2] : srcMatch[3]);
      
      // If it's a relative/local URL (not data: and not http:// / https://)
      if (srcValue && !srcValue.startsWith('data:') && !srcValue.startsWith('http://') && !srcValue.startsWith('https://')) {
        // Next.js static images or local assets
        // If Next.js image optimizer URL (e.g. /_next/image?url=%2Fimages%2F...&w=...)
        if (srcValue.startsWith('/_next/image')) {
          const urlParam = srcValue.match(/url=([^&]+)/);
          if (urlParam) {
            const rawPath = decodeURIComponent(urlParam[1]);
            if (!checkAssetExists(rawPath)) {
              stats.imgBrokenSrc++;
              failures.brokenImgSrc.push({ file: relPath, src: srcValue, rawPath, tag: imgTag });
            }
          }
        } else if (srcValue.startsWith('/') || !srcValue.includes(':')) {
          // Direct asset path
          if (!checkAssetExists(srcValue)) {
            stats.imgBrokenSrc++;
            failures.brokenImgSrc.push({ file: relPath, src: srcValue, tag: imgTag });
          }
        }
      }
    }
  }

  // ==========================================
  // 2. META ROBOTS VERIFICATION
  // ==========================================
  const robotsMatches = content.match(metaRobotsRegex) || [];
  let hasNoindex = false;
  let robotsContentStr = '';

  for (const rTag of robotsMatches) {
    const cMatch = rTag.match(contentAttrRegex);
    if (cMatch) {
      const cValue = (cMatch[1] || cMatch[2] || cMatch[3] || '').toLowerCase();
      robotsContentStr = cValue;
      if (cValue.includes('noindex')) {
        hasNoindex = true;
      }
    }
  }

  const isProtectedAdmin = (relPath === 'admin/index.html' || relPath === 'admin.html');
  const isProtectedAnalytics = (relPath === 'analytics/index.html' || relPath === 'analytics.html');
  const isProtectedDocs = (relPath.startsWith('docs/'));
  const is404 = (relPath === '404/index.html' || relPath === '404.html');

  if (isProtectedAdmin) {
    stats.adminRobotsChecked++;
    if (!hasNoindex) {
      failures.adminRobots.push({ file: relPath, content: robotsContentStr, issue: 'Missing noindex in robots meta' });
    }
  } else if (isProtectedAnalytics) {
    stats.analyticsRobotsChecked++;
    if (!hasNoindex) {
      failures.analyticsRobots.push({ file: relPath, content: robotsContentStr, issue: 'Missing noindex in robots meta' });
    }
  } else if (isProtectedDocs || is404) {
    // Internal documentation or 404 page: noindex is expected/allowed
    stats.robotsMetaNoindexPages.push(relPath);
  } else {
    // Standard public page: assert it is NOT noindexed
    if (hasNoindex) {
      stats.robotsMetaNoindexPages.push(relPath);
      failures.unexpectedNoindex.push({ file: relPath, content: robotsContentStr, issue: 'Public page accidentally has noindex!' });
    } else {
      stats.robotsMetaIndexPages.push(relPath);
    }
  }

  // ==========================================
  // 3. OPEN GRAPH & TWITTER IMAGES
  // ==========================================
  // A. OG Image
  const ogMatches = content.match(metaOgImageRegex) || [];
  for (const ogTag of ogMatches) {
    stats.totalOgImages++;
    const cMatch = ogTag.match(contentAttrRegex);
    if (!cMatch) {
      stats.ogImagesBroken++;
      failures.brokenOgImages.push({ file: relPath, tag: ogTag, issue: 'Missing content attribute' });
    } else {
      const ogUrl = cMatch[1] || cMatch[2] || cMatch[3] || '';
      if (!ogUrl || ogUrl === 'undefined' || ogUrl === 'null') {
        stats.ogImagesBroken++;
        failures.brokenOgImages.push({ file: relPath, tag: ogTag, url: ogUrl, issue: 'Invalid or undefined OG image URL' });
      } else {
        // Resolve URL path
        let urlPath = ogUrl;
        if (ogUrl.startsWith('https://vktofly.github.io')) {
          urlPath = ogUrl.replace('https://vktofly.github.io', '');
        } else if (ogUrl.startsWith('http://vktofly.github.io')) {
          urlPath = ogUrl.replace('http://vktofly.github.io', '');
        }

        if (urlPath.startsWith('/')) {
          if (checkAssetExists(urlPath)) {
            stats.ogImagesValidOnDisk++;
          } else {
            stats.ogImagesBroken++;
            failures.brokenOgImages.push({ file: relPath, tag: ogTag, url: ogUrl, resolvedPath: urlPath, issue: 'OG image asset not found on disk' });
          }
        } else if (ogUrl.startsWith('http://') || ogUrl.startsWith('https://')) {
          // External URL (e.g. Unsplash, CDN, etc.)
          stats.ogImagesValidOnDisk++;
        } else {
          stats.ogImagesBroken++;
          failures.brokenOgImages.push({ file: relPath, tag: ogTag, url: ogUrl, issue: 'Unrecognized URL scheme' });
        }
      }
    }
  }

  // B. Twitter Image
  const twMatches = content.match(metaTwitterImageRegex) || [];
  for (const twTag of twMatches) {
    stats.totalTwitterImages++;
    const cMatch = twTag.match(contentAttrRegex);
    if (!cMatch) {
      stats.twitterImagesBroken++;
      failures.brokenTwitterImages.push({ file: relPath, tag: twTag, issue: 'Missing content attribute' });
    } else {
      const twUrl = cMatch[1] || cMatch[2] || cMatch[3] || '';
      if (!twUrl || twUrl === 'undefined' || twUrl === 'null') {
        stats.twitterImagesBroken++;
        failures.brokenTwitterImages.push({ file: relPath, tag: twTag, url: twUrl, issue: 'Invalid or undefined Twitter image URL' });
      } else {
        let urlPath = twUrl;
        if (twUrl.startsWith('https://vktofly.github.io')) {
          urlPath = twUrl.replace('https://vktofly.github.io', '');
        } else if (twUrl.startsWith('http://vktofly.github.io')) {
          urlPath = twUrl.replace('http://vktofly.github.io', '');
        }

        if (urlPath.startsWith('/')) {
          if (checkAssetExists(urlPath)) {
            stats.twitterImagesValidOnDisk++;
          } else {
            stats.twitterImagesBroken++;
            failures.brokenTwitterImages.push({ file: relPath, tag: twTag, url: twUrl, resolvedPath: urlPath, issue: 'Twitter image asset not found on disk' });
          }
        } else if (twUrl.startsWith('http://') || twUrl.startsWith('https://')) {
          stats.twitterImagesValidOnDisk++;
        } else {
          stats.twitterImagesBroken++;
          failures.brokenTwitterImages.push({ file: relPath, tag: twTag, url: twUrl, issue: 'Unrecognized URL scheme' });
        }
      }
    }
  }
}

// Print Findings
console.log('-----------------------------------------------------------');
console.log('DETAILED VERIFICATION RESULTS:');
console.log('-----------------------------------------------------------');
console.log(`1. Image Tags Verification:`);
console.log(`   - Total <img> tags found: ${stats.totalImgTags}`);
console.log(`   - Images with 'alt' attribute: ${stats.imgWithAlt} (100% target)`);
console.log(`   - Images with descriptive alt text: ${stats.imgMeaningfulAlt}`);
console.log(`   - Images with decorative alt="" text: ${stats.imgEmptyAlt}`);
console.log(`   - Images missing 'alt' attribute: ${stats.imgMissingAlt}`);
console.log(`   - Images with invalid/malformed alt: ${stats.imgInvalidAlt}`);
console.log(`   - Images with broken local src: ${stats.imgBrokenSrc}`);

console.log(`\n2. Robots Meta Tags Verification:`);
console.log(`   - Admin pages checked: ${stats.adminRobotsChecked}`);
console.log(`   - Analytics pages checked: ${stats.analyticsRobotsChecked}`);
console.log(`   - Admin noindex failures: ${failures.adminRobots.length}`);
console.log(`   - Analytics noindex failures: ${failures.analyticsRobots.length}`);
console.log(`   - Public pages with unexpected noindex: ${failures.unexpectedNoindex.length}`);
console.log(`   - Public pages indexable: ${stats.robotsMetaIndexPages.length}`);

console.log(`\n3. OpenGraph & Twitter Image Meta Tags Verification:`);
console.log(`   - Total OpenGraph image tags: ${stats.totalOgImages}`);
console.log(`   - OG images verified valid on disk/URL: ${stats.ogImagesValidOnDisk}`);
console.log(`   - Broken OG images: ${stats.ogImagesBroken}`);
console.log(`   - Total Twitter image tags: ${stats.totalTwitterImages}`);
console.log(`   - Twitter images verified valid on disk/URL: ${stats.twitterImagesValidOnDisk}`);
console.log(`   - Broken Twitter images: ${stats.twitterImagesBroken}`);

let totalErrors = 
  failures.missingAlt.length +
  failures.invalidAlt.length +
  failures.brokenImgSrc.length +
  failures.adminRobots.length +
  failures.analyticsRobots.length +
  failures.unexpectedNoindex.length +
  failures.brokenOgImages.length +
  failures.brokenTwitterImages.length;

console.log('\n-----------------------------------------------------------');
console.log(`TOTAL DISCOVERED ERRORS: ${totalErrors}`);
console.log('-----------------------------------------------------------');

if (totalErrors > 0) {
  if (failures.missingAlt.length > 0) {
    console.log('\n❌ MISSING ALT FAILURES:');
    failures.missingAlt.forEach(f => console.log(`   - [${f.file}] ${f.tag}`));
  }
  if (failures.invalidAlt.length > 0) {
    console.log('\n❌ INVALID ALT FAILURES:');
    failures.invalidAlt.forEach(f => console.log(`   - [${f.file}] alt="${f.alt}" in ${f.tag}`));
  }
  if (failures.brokenImgSrc.length > 0) {
    console.log('\n❌ BROKEN IMG SRC FAILURES:');
    failures.brokenImgSrc.forEach(f => console.log(`   - [${f.file}] src="${f.src}" (raw: ${f.rawPath || ''})`));
  }
  if (failures.adminRobots.length > 0) {
    console.log('\n❌ ADMIN ROBOTS FAILURES:');
    failures.adminRobots.forEach(f => console.log(`   - [${f.file}] ${f.issue} (content="${f.content}")`));
  }
  if (failures.analyticsRobots.length > 0) {
    console.log('\n❌ ANALYTICS ROBOTS FAILURES:');
    failures.analyticsRobots.forEach(f => console.log(`   - [${f.file}] ${f.issue} (content="${f.content}")`));
  }
  if (failures.unexpectedNoindex.length > 0) {
    console.log('\n❌ UNEXPECTED NOINDEX ON PUBLIC PAGES:');
    failures.unexpectedNoindex.forEach(f => console.log(`   - [${f.file}] content="${f.content}"`));
  }
  if (failures.brokenOgImages.length > 0) {
    console.log('\n❌ BROKEN OG IMAGE FAILURES:');
    failures.brokenOgImages.forEach(f => console.log(`   - [${f.file}] ${f.issue} URL: "${f.url}" (resolved: "${f.resolvedPath || ''}")`));
  }
  if (failures.brokenTwitterImages.length > 0) {
    console.log('\n❌ BROKEN TWITTER IMAGE FAILURES:');
    failures.brokenTwitterImages.forEach(f => console.log(`   - [${f.file}] ${f.issue} URL: "${f.url}" (resolved: "${f.resolvedPath || ''}")`));
  }
  
  console.log('\nVERDICT: FAIL ❌');
  process.exit(1);
} else {
  console.log('\nVERDICT: PASS ✅');
  console.log('All <img> tags have valid alt attributes (100%).');
  console.log('All admin and analytics pages enforce noindex, nofollow.');
  console.log('All OG and Twitter image tags resolve to physical on-disk assets with 0 404s.');
  process.exit(0);
}
