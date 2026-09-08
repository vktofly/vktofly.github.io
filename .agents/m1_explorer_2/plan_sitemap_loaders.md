# Implementation Plan: Sitemap, Robots & Markdown Loader Hygiene

**Milestone**: Milestone 1 (Feature 4 & Feature 5)  
**Author**: Explorer 2  
**Date**: 2026-08-25  
**Target Files**:
1. `app/admin/page.jsx`
2. `app/analytics/page.jsx` & `app/analytics/AnalyticsPageClient.jsx` (New Client component)
3. `next-sitemap.config.js`
4. `lib/blog.js`
5. `lib/book-blog.js`
6. `app/not-found.jsx` (Recommended defense-in-depth)

---

## 1. Problem Statement & Executive Summary

### Problem Summary
1. **Robots Meta Leakage**: `/admin/` and `/analytics/` currently lack page-level metadata. They inherit default root metadata from `app/layout.jsx` (`robots: { index: true, follow: true }`), exposing private administrative and analytics dashboards to search engine indexing and AI bot scraping.
2. **Client Component Metadata Constraint**: `app/analytics/page.jsx` is marked `"use client"`. Next.js App Router forbids exporting `metadata` from Client Components.
3. **Sitemap Pollution**: `next-sitemap.config.js` does not exclude `/admin/*`, `/analytics/*`, `/docs/*`, nor does it filter out non-article markdown artifacts (`README.md`, `_TEMPLATE.md`).
4. **Markdown Loader Contamination**: `lib/blog.js` and `lib/book-blog.js` read all `.md` files in `content/blog/` and `content/books/` without filtering out `README.md`, `_TEMPLATE.md`, or underscore-prefixed draft files. Consequently, Next.js generates static routes `/blog/readme/`, `/blog/readme/amp/`, `/blog/your-article-slug/`, and `/books/readme/`.

### Core Solution
- Add explicit `robots: { index: false, follow: false }` to `app/admin/page.jsx`.
- Refactor `app/analytics/page.jsx` into a Server Component wrapper + `AnalyticsPageClient.jsx` (Client Component) to export `robots: { index: false, follow: false }`.
- Update `next-sitemap.config.js` with comprehensive `exclude` rules and `robotsTxtOptions` policies, plus a defense-in-depth `transform` filter.
- Update `getAllPostFiles()` in `lib/blog.js` and `getAllBookBlogFiles()` in `lib/book-blog.js` with `isValidPostFile` filtering.

---

## 2. Detailed Technical Specifications & Code Changes

### 2.1 `app/admin/page.jsx`

#### File Location
`c:\Users\vikash\Documents\vktofly.github.io\app\admin\page.jsx`

#### Current Implementation (Lines 1-8)
```jsx
import AdminPageClient from "./AdminPageClient";
import books from "../../data/books";
import influentialPeople from "../../data/influentialPeople";

export default function AdminPage() {
  return <AdminPageClient books={books} people={influentialPeople} />;
}
```

#### Proposed Changes
Add `metadata` export specifying `robots: { index: false, follow: false }`:

```jsx
import AdminPageClient from "./AdminPageClient";
import books from "../../data/books";
import influentialPeople from "../../data/influentialPeople";

export const metadata = {
  title: "Admin — Data Management",
  description: "Internal administrative dashboard for managing portfolio data.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPageClient books={books} people={influentialPeople} />;
}
```

---

### 2.2 `app/analytics/page.jsx` & `app/analytics/AnalyticsPageClient.jsx`

#### Problem
`app/analytics/page.jsx` currently starts with `"use client";` (Line 1). Next.js App Router will fail if `metadata` is exported from a Client Component:
`Error: You are attempting to export "metadata" from a component marked with "use client", that's not allowed.`

#### Architectural Refactor
1. **Create `app/analytics/AnalyticsPageClient.jsx`**:
   Move the existing interactive UI from `app/analytics/page.jsx` into this dedicated client component.
2. **Update `app/analytics/page.jsx`**:
   Convert `app/analytics/page.jsx` into a clean Server Component wrapper that exports `metadata` and renders `<AnalyticsPageClient />`.

#### Proposed Content for `app/analytics/AnalyticsPageClient.jsx` (New File)
```jsx
"use client";

import { useState, useEffect } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import { getSectionViewStats, clearAnalyticsData } from "../../lib/analytics";

export default function AnalyticsPageClient() {
  const [stats, setStats] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getSectionViewStats());
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      clearAnalyticsData();
      setStats([]);
    }
  };

  if (!isClient) {
    return (
      <Section title="Analytics" intro="Loading analytics data...">
        <Container>
          <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
            Loading...
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section title="Section Analytics" intro="View which sections are most viewed on your site">
      <Container>
        <div className="max-w-4xl mx-auto">
          {stats.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
                No analytics data yet. Visit different sections to start tracking.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-palette-secondary dark:text-zinc-400">
                  {stats.length} section{stats.length !== 1 ? "s" : ""} tracked
                </p>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
                >
                  Clear Data
                </button>
              </div>

              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.sectionId}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 font-bold text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                            {stat.sectionName}
                          </h3>
                        </div>
                        <p className="text-sm text-palette-secondary dark:text-zinc-400">
                          ID: {stat.sectionId}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                          {stat.viewCount}
                        </div>
                        <div className="text-xs text-palette-secondary dark:text-zinc-500">
                          view{stat.viewCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 rounded-full transition-all duration-500"
                          style={{
                            width: `${(stat.viewCount / stats[0].viewCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-palette-secondary dark:text-zinc-500">
                      {stat.lastViewed && (
                        <span>
                          Last viewed:{" "}
                          {new Date(stat.lastViewed).toLocaleDateString()}
                        </span>
                      )}
                      <span>Total views: {stat.totalViews}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
```

#### Proposed Content for `app/analytics/page.jsx` (Server Component)
```jsx
import AnalyticsPageClient from "./AnalyticsPageClient";

export const metadata = {
  title: "Analytics — Section Views",
  description: "Internal analytics dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsPageClient />;
}
```

---

### 2.3 `next-sitemap.config.js`

#### File Location
`c:\Users\vikash\Documents\vktofly.github.io\next-sitemap.config.js`

#### Current Implementation (Lines 1-23)
```javascript
/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://vktofly.github.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/404/'],
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/404/'],
      },
    ],
    additionalSitemaps: [],
  },
};
```

#### Proposed Replacement
```javascript
/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://vktofly.github.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/404',
    '/404/',
    '/admin',
    '/admin/*',
    '/analytics',
    '/analytics/*',
    '/docs',
    '/docs/*',
    '/blog/readme',
    '/blog/readme/*',
    '/blog/_template',
    '/blog/_template/*',
    '/blog/your-article-slug',
    '/blog/your-article-slug/*',
    '/books/readme',
    '/books/readme/*',
  ],
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/404',
          '/404/',
          '/admin',
          '/admin/',
          '/analytics',
          '/analytics/',
          '/docs',
          '/docs/',
        ],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const excludedPrefixes = ['/admin', '/analytics', '/docs', '/404'];
    if (excludedPrefixes.some((prefix) => path.startsWith(prefix))) {
      return null;
    }
    const lower = path.toLowerCase();
    if (lower.includes('readme') || lower.includes('_template') || lower.includes('your-article-slug')) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
```

---

### 2.4 `lib/blog.js`

#### File Location
`c:\Users\vikash\Documents\vktofly.github.io\lib\blog.js`

#### Current Implementation (Lines 16-23)
```javascript
export async function getAllPostFiles() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name)).map((e) => e.name);
  } catch {
    return [];
  }
}
```

#### Proposed Replacement
Add `isValidPostFile(fileName)` and update `getAllPostFiles()`:

```javascript
function isValidPostFile(fileName) {
  if (!fileName || typeof fileName !== 'string') return false;
  // Must have .md or .mdx extension
  if (!/\.(md|mdx)$/i.test(fileName)) return false;
  // Ignore hidden files and draft/template files starting with _ or .
  if (fileName.startsWith('_') || fileName.startsWith('.')) return false;
  // Ignore README and template files (case-insensitive)
  const baseName = fileName.replace(/\.(md|mdx)$/i, '').toLowerCase().trim();
  if (baseName === 'readme' || baseName === 'template' || baseName === '_template') {
    return false;
  }
  return true;
}

export async function getAllPostFiles() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && isValidPostFile(e.name))
      .map((e) => e.name);
  } catch {
    return [];
  }
}
```

---

### 2.5 `lib/book-blog.js`

#### File Location
`c:\Users\vikash\Documents\vktofly.github.io\lib\book-blog.js`

#### Current Implementation (Lines 23-30)
```javascript
export async function getAllBookBlogFiles() {
  try {
    const entries = await fs.readdir(BOOK_BLOGS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name)).map((e) => e.name);
  } catch {
    return [];
  }
}
```

#### Proposed Replacement
Add `isValidBookBlogFile(fileName)` and update `getAllBookBlogFiles()`:

```javascript
function isValidBookBlogFile(fileName) {
  if (!fileName || typeof fileName !== 'string') return false;
  // Must have .md or .mdx extension
  if (!/\.(md|mdx)$/i.test(fileName)) return false;
  // Ignore hidden files and draft/template files starting with _ or .
  if (fileName.startsWith('_') || fileName.startsWith('.')) return false;
  // Ignore README and template files (case-insensitive)
  const baseName = fileName.replace(/\.(md|mdx)$/i, '').toLowerCase().trim();
  if (baseName === 'readme' || baseName === 'template' || baseName === '_template') {
    return false;
  }
  return true;
}

export async function getAllBookBlogFiles() {
  try {
    const entries = await fs.readdir(BOOK_BLOGS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && isValidBookBlogFile(e.name))
      .map((e) => e.name);
  } catch {
    return [];
  }
}
```

---

### 2.6 Defense-in-Depth: `app/not-found.jsx`

#### File Location
`c:\Users\vikash\Documents\vktofly.github.io\app\not-found.jsx`

#### Current Implementation (Lines 1-5)
```jsx
export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};
```

#### Proposed Replacement
```jsx
export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};
```

---

## 3. Risk Assessment & Edge Cases

| Risk / Edge Case | Impact | Mitigation Strategy |
|---|---|---|
| Client Component metadata crash on `/analytics/` | Build break if metadata exported directly with `"use client"` | Move Client logic to `AnalyticsPageClient.jsx`; keep `page.jsx` as Server Component wrapper |
| Author creates uppercase `README.MD` or `_template.md` | Non-article page generated and leaked into sitemap | `isValidPostFile` uses case-insensitive regex `/\.(md|mdx)$/i`, `startsWith('_')`, and `.toLowerCase()` comparison |
| Author names a legitimate article `readme-to-infinity.md` | Legitimate article could be accidentally filtered out if matching is substring-based | Use exact equality on base name (`baseName === 'readme'`), not `.includes('readme')` |
| `next-sitemap` glob patterns mismatching trailing slash | `/admin/` leaked into `sitemap.xml` | Supply both exact and wildcard patterns (`'/admin'`, `'/admin/*'`, `'/admin/'`) and custom `transform` callback |
| `scripts/generate-llms-context.js` still dumping `README.md` | `llms-full.txt` has `blog/README` entry | Flagged for Milestone 4 to apply matching filtering logic in `generate-llms-context.js` |

---

## 4. Verification & Testing Plan

### 4.1 Unit / Function Verification
1. Import `getAllPostFiles` from `lib/blog.js` in a node script and assert:
   - Does NOT include `README.md`.
   - Does NOT include `_TEMPLATE.md`.
   - Count equals exactly 16 blog posts.
2. Import `getAllBookBlogFiles` from `lib/book-blog.js` in a node script and assert:
   - Does NOT include `README.md`.
   - Count equals exactly 8 book posts.

### 4.2 Build & Output Verification
Run build:
```powershell
npm run build
```
Verify generated output in `out/`:
1. `out/robots.txt`:
   - Contains `Disallow: /admin/`
   - Contains `Disallow: /analytics/`
   - Contains `Disallow: /docs/`
   - Contains `Disallow: /404`
2. `out/sitemap.xml`:
   - Does NOT contain `/admin`
   - Does NOT contain `/analytics`
   - Does NOT contain `/docs`
   - Does NOT contain `/404`
   - Does NOT contain `/blog/readme`
   - Does NOT contain `/blog/_template`
   - Does NOT contain `/blog/your-article-slug`
   - Does NOT contain `/books/readme`
3. `out/admin/index.html` and `out/analytics/index.html`:
   - Contains `<meta name="robots" content="noindex, nofollow"/>` or `<meta name="robots" content="noindex,nofollow"/>`.
4. `out/blog/readme/` and `out/books/readme/`:
   - Directories do not exist in `out/`.
