# Handoff Report — Explorer Survey 3 (Schema Markup & Machine-Readable Context)

## 1. Observation
- `components/JsonLd.jsx:1-4`: Custom component outputs `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />`. Pre-renders into static HTML in Next.js static export.
- `app/layout.jsx:109-209, 215-217`: Injects global `Organization`, `WebSite`, and `Person` schemas into `<head>` on every page. Line 170 specifies `"image": "https://vktofly.github.io/proflephoto/proflephoto.jpg"`, but `public/proflephoto/` contains `profile_photo.png` (929,277 bytes), returning 404.
- `app/about/page.jsx:74-103`: Injects a page-level `Person` schema with `"image": "https://vktofly.github.io/proflephoto/profile%20photo.jpg"` (404), plain string `alumniOf`, and invalid `founder: "23+ technology companies"` (in Schema.org, `founder` is an property of `Organization`, not `Person`).
- `app/blog/[slug]/page.jsx:139-189`: Renders `BlogPosting` and `BreadcrumbList` schemas. Uses relative image path (`ogImage.url` -> `/og/blog/[slug].png`) instead of absolute URL.
- `app/projects/page.jsx:42-63`: Defines `projectsStructuredData` array but never renders `<JsonLd>` in the JSX return block (dead code).
- `app/books/page.jsx:97-127`: Defines `booksStructuredData` mapping each book to Schema.org `Book`, but never renders `<JsonLd>` (dead code).
- `app/books/[slug]/page.jsx`: Has zero JSON-LD structured data rendered.
- `app/skills/layout.jsx:33` & `app/skills/page.jsx:87`: Both render `ItemList` structured data, creating duplicate `ItemList` schemas on `/skills/`.
- `content/blog/` & `content/books/`: Contain `_TEMPLATE.md` and `README.md` which are read by `lib/blog.js`, `lib/book-blog.js`, and `scripts/generate-llms-context.js` as real articles, exposing `/blog/readme/`, `/blog/your-article-slug/`, and `/books/readme/` in `sitemap.xml`.
- `scripts/generate-llms-context.js:56-62`: Replaces `.md` with empty string without slugifying spaces, resulting in broken URLs with raw spaces in `public/llms-small.txt` (e.g. `https://vktofly.github.io/blog/Books That Shaped My Philosophy of Infinite Growth`).
- `package.json`: Contains scripts `data:validate` and `data:quality` for validating `data/*.js` files, but no test runner (Jest/Vitest/Playwright) or DOM verification script for `out/`.

## 2. Logic Chain
1. *From Next.js static build inspection (`out/about/index.html`, `out/blog/infinite-growth-principle/index.html`)*: Next.js App Router static export correctly embeds `<script type="application/ld+json">` directly into the static HTML files, making all rendered schemas accessible to AI and search crawlers without JavaScript.
2. *From image file verification in `public/proflephoto/profile_photo.png` vs schema definitions in `app/layout.jsx:170` and `app/about/page.jsx:83`*: Both schemas reference non-existent `.jpg` filenames (`proflephoto.jpg` and `profile%20photo.jpg`), which breaks rich snippets and entity image associations.
3. *From JSX component analysis in `app/projects/page.jsx` and `app/books/page.jsx`*: Because the constructed structured data variables (`projectsStructuredData` and `booksStructuredData`) are never passed into `<JsonLd data={...} />`, two major sections of the site lack structured data in the output HTML.
4. *From context generator analysis in `scripts/generate-llms-context.js` and sitemap analysis in `out/sitemap.xml`*: Because file iteration does not filter out documentation (`README.md`) and boilerplate (`_TEMPLATE.md`), non-production pages are indexed by search engines and leaked into LLM context dumps.
5. *From verification resource analysis*: Because there is currently no programmatic static HTML inspector, regressions in schema validity, meta tags, missing `alt` attributes, and 40-60 word answer blocks cannot be caught in CI/CD without creating a custom verification script.

## 3. Caveats
- Did not modify any codebase files (read-only investigation).
- External search engine indexing status (Google Search Console / Bing Webmaster Tools live data) was not queried.
- Did not evaluate client-side runtime behavior of `SEOMonitor.jsx` in production environments.

## 4. Conclusion
The structured data infrastructure is functional and statically exported, but requires 5 concrete fixes:
1. Correct image URLs and Schema.org properties in `app/layout.jsx` and `app/about/page.jsx`.
2. Render missing `<JsonLd>` tags in `app/projects/page.jsx`, `app/books/page.jsx`, and `app/books/[slug]/page.jsx`, while deduplicating in `app/skills/`.
3. Filter out `README.md` and `_TEMPLATE.md` in `lib/blog.js`, `lib/book-blog.js`, and `scripts/generate-llms-context.js`.
4. Fix slug URL formatting in `scripts/generate-llms-context.js` to eliminate broken space-delimited links.
5. Implement `scripts/verify-seo-schema.mjs` to programmatically validate HTML files in `out/` for `<script type="application/ld+json">`, `<title>`, `<meta name="description">`, `<img> alt`, and 40-60 word direct answer blocks.

## 5. Verification Method
1. **Validate Data Files**:
   `node scripts/data-management.mjs validate`
2. **Inspect Generated LLM Context**:
   `node scripts/generate-llms-context.js` and view `public/llms-small.txt` to confirm no raw space URLs or template links exist.
3. **Build and Inspect HTML**:
   `npm run build`
   Inspect `out/about/index.html` for `<script type="application/ld+json">` containing `Person` schema with `profile_photo.png`.
   Inspect `out/projects/index.html` and `out/books/index.html` for rendered `SoftwareApplication` and `Book` JSON-LD schemas.
