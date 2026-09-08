# Handoff Report — SEO & Architecture Survey

## 1. Observation
1. **Project Architecture**:
   - `package.json` lines 24, 36: `"next": "^14.2.6"`, `"next-sitemap": "^4.2.3"`.
   - `next.config.mjs` lines 3-5: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`.
   - `next-sitemap.config.js` lines 3-7: `siteUrl: 'https://vktofly.github.io'`, `generateRobotsTxt: true`, `exclude: ['/404', '/404/']`, `outDir: 'out'`.
   - Router structure: App Router located at `app/` containing 20 `page.jsx` files and 3 `layout.jsx` files (`app/layout.jsx`, `app/skills/layout.jsx`, `app/contact/layout.jsx`).
2. **Route Inventory**:
   - Static routes (16): `/`, `/about/`, `/admin/`, `/analytics/`, `/blog/`, `/books/`, `/contact/`, `/content/`, `/docs/about-project/`, `/experience/`, `/glossary/`, `/people/`, `/projects/`, `/resources/`, `/skills/`, `/vision/`, plus `404` (`not-found.jsx`).
   - Dynamic route templates (3): `/blog/[slug]/` & `/blog/[slug]/amp/` (16 markdown posts in `content/blog/`), `/books/[slug]/` (8 markdown reviews in `content/books/`), `/projects/[slug]/` (9 projects in `data/projects.js`).
   - Components: 61 components across `components/` (59 files) and `components/admin/` (2 files).
3. **Metadata & Title Duplication**:
   - `app/layout.jsx` lines 20-23:
     ```js
     title: {
       default: 'Vikash — Polymath, Futurist & Founder',
       template: '%s — Vikash',
     }
     ```
   - `app/about/page.jsx` line 15: `title: "About — Vikash"` results in rendered title `About — Vikash — Vikash`.
   - Same duplication occurs in `app/page.jsx`, `app/books/page.jsx`, `app/content/page.jsx`, `app/glossary/page.jsx`, `app/people/page.jsx`, `app/projects/page.jsx`, `app/resources/page.jsx`, `app/skills/layout.jsx`, `app/vision/page.jsx`, `app/blog/[slug]/page.jsx`, and `app/projects/[slug]/page.jsx`.
   - `app/admin/page.jsx` and `app/analytics/page.jsx` lack metadata and are indexed by default. `out/sitemap.xml` line 3 exposes `<loc>https://vktofly.github.io/admin/</loc>`.
   - `app/projects/[slug]/page.jsx` line 26 sets `canonical: https://vktofly.github.io/projects/${project.slug}` lacking the trailing slash configured in `next.config.mjs`.
4. **Image & Alt Attribute Inspection**:
   - Codebase search found 25 `<Image>` and 7 `<img>` elements.
   - Zero content images lack `alt` text. All content images have descriptive `alt` tags (`components/BlogPostCard.jsx:68`, `components/BookCard.jsx:105`, `components/PersonCard.jsx:41`, `components/ProjectCard.jsx:57`, `components/ProfilePhoto.jsx:17`, etc.).
   - Background Unsplash decorative images across 9 pages correctly use `alt=""`.

## 2. Logic Chain
1. *Observation 1 & 2* establish that the application is a Next.js 14 App Router project statically exported (`output: 'export'`) to GitHub Pages with `trailingSlash: true`.
2. *Observation 3* demonstrates that because `app/layout.jsx` defines a title template `'%s — Vikash'`, any child route that passes a title string containing ` — Vikash` is appended twice by Next.js metadata resolution, degrading SERP appearance.
3. *Observation 3* also shows that missing `robots` directives on `/admin/` and `/analytics/`, coupled with default inclusion in `next-sitemap.config.js`, leaks administrative tools into search indexes.
4. *Observation 4* confirms that all existing `Image` and `img` elements have `alt` attributes defined according to standard accessibility conventions (content images have descriptive alt; decorative backgrounds have empty alt).

## 3. Caveats
- No caveats. The entire `app/`, `components/`, `data/`, `content/`, and `lib/` trees were inspected directly.

## 4. Conclusion
The site is properly structured on Next.js 14 App Router with static export and has 100% `alt` attribute coverage on images. Four high-priority architectural/SEO issues need resolution in subsequent phases:
1. Fix title double-suffixing across all pages.
2. Add `noindex, nofollow` to `/admin/` and `/analytics/` and exclude them from `next-sitemap.config.js`.
3. Filter utility markdown files (`README.md`, `_TEMPLATE.md`) out of dynamic blog/book route generation and sitemap.
4. Normalize canonical URLs to enforce trailing slashes consistently.

## 5. Verification Method
1. Inspect report: `view_file` on `c:\Users\vikash\Documents\vktofly.github.io\.agents\explorer_survey_1\survey_seo.md`.
2. Build verification: `npm run build` in root, then check `out/sitemap.xml` and inspect built HTML files (`out/about/index.html`, `out/blog/index.html`) for `<title>` tags and `<link rel="canonical">` tags.
