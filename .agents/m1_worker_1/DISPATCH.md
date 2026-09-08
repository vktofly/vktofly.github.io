## 2026-08-25T13:34:27Z
Scope & Tasks:
1. Fix title double suffixing in:
   - `app/page.jsx`: `title: { absolute: "Vikash — Polymath, Futurist & Founder" }`
   - `app/about/page.jsx`: `title: "About"`
   - `app/books/page.jsx`: `title: "Books"`
   - `app/content/page.jsx`: `title: "Content & Recognition"`
   - `app/glossary/page.jsx`: `title: "Glossary"`
   - `app/people/page.jsx`: `title: "Influential People"`
   - `app/projects/page.jsx`: `title: "Projects"`
   - `app/resources/page.jsx`: `title: "Resources"`
   - `app/skills/layout.jsx`: `title: "Skills & Expertise"`
   - `app/vision/page.jsx`: `title: "Vision — The Infinite Growth Principle"`
   - `app/blog/page.jsx`: `title: "Blog"`
   - `app/blog/[slug]/page.jsx`: `title: post.title`
   - `app/blog/[slug]/amp/page.jsx`: `title: post.title`
   - `app/contact/layout.jsx`: `title: "Contact"`
   - `app/projects/[slug]/page.jsx`: `title: \`${project.title} — Projects\``, fix canonical URL and breadcrumb item URLs to have trailing slashes.
   - `app/not-found.jsx`: add `robots: { index: false, follow: false }`.
2. Admin & Analytics route protection:
   - `app/admin/page.jsx`: add `metadata` with `robots: { index: false, follow: false }`.
   - `app/analytics/`: create `app/analytics/AnalyticsPageClient.jsx` (Client component) and convert `app/analytics/page.jsx` to a Server Component exporting `metadata` with `robots: { index: false, follow: false }`.
3. Sitemap configuration (`next-sitemap.config.js`):
   - Add exclusions and disallow policies for `/admin/*`, `/analytics/*`, `/docs/*`, `/404/*`, `/blog/readme*`, `/blog/_template*`, `/books/readme*`, and defense-in-depth `transform` filter as documented in `plan_sitemap_loaders.md`.
4. Markdown Loader Hygiene (`lib/blog.js` and `lib/book-blog.js`):
   - Add `isValidPostFile(fileName)` and `isValidBookBlogFile(fileName)` to exclude files starting with `_`, `.`, and names `readme`/`template`.
5. OG Images & Alt Text hardening:
   - In `lib/og-images.js`, ensure `getBlogOgImage(slug)` and `getBookOgImage(slug)` check `fs.existsSync` for the custom OG image, falling back gracefully to `/og.png` if the file is not on disk.
   - Ensure alt attributes on image tags have proper string fallbacks.
6. Verification & Build:
   - Run `npm run build` and ensure the build succeeds with 0 errors.
   - Verify that `out/sitemap.xml` does not contain excluded routes.
   - Verify that `out/admin/index.html` and `out/analytics/index.html` contain `noindex`.
   - Verify that double-suffixing is completely gone in `out/**/*.html`.
