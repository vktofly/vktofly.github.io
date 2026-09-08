# Handoff Report — Explorer 3: Semantic HTML, Machine-Readable Files & Programmatic Verification

## 1. Observation
- **Semantic HTML & Layout**:
  - `app/layout.jsx:228`: `<main className="py-24">{children}</main>` wraps all page contents.
  - `components/Header.jsx:49,80`: Uses `<header>` and `<nav>`.
  - `components/Footer.jsx:22`: Uses `<footer>`.
  - `components/Prose.jsx:1-3`: Uses `<div>` instead of `<article>`. About (`app/about/page.jsx:250`) and Vision (`app/vision/page.jsx:88`) render markdown using `Prose.jsx`, so long-form content lacks an `<article>` container.
  - `components/BlogProse.jsx:12`: Uses `<article>` for blog posts (`app/blog/[slug]/page.jsx:243`).
  - `components/Section.jsx:51`: Renders `title` as `<h2>`.
  - `app/vision/page.jsx:82`: Uses `<Section title="The Infinite Growth Principle">`, producing `<h2>` and omitting `<h1>` on the Vision page.
  - `content/myvision.md:1,8,19,32`: Section headings lack `#` / `##` markdown prefixes, rendering as `<p>` paragraphs.
  - `app/blog/[slug]/page.jsx:192`: Post title is passed to `<Section title={post.title}>`, rendering as `<h2>` instead of `<h1>`, omitting `<h1>` on blog post pages.
- **Machine-Readable Files**:
  - `scripts/generate-llms-context.js:1-120`: Runs during build to produce `public/llms-full.txt`, `public/llms-small.txt`, `public/llms.txt`, and root `llms.txt`.
  - `next-sitemap.config.js:1-20`: Generates `out/robots.txt` and `out/sitemap.xml` with 71 routes.
  - `public/AGENTS.md:1-34`: Exists with crawler metadata and key philosophical definitions.
  - `content/aboutme.md:3`: Contains 43-word summary block: `"Vikash is a polymath, physicist, and deep tech founder building cognitive architectures..."`.
  - `content/myvision.md:6`: Contains 54-word summary block: `"'Infinite Growth' is Vikash's foundational philosophy and design framework..."`.
- **Build & Verification Setup**:
  - `package.json:8`: `"build": "node scripts/generate-llms-context.js && next build && next-sitemap"`.
  - `npm run build`: Executed with code 0; generates static files in `out/`.
  - No automated verification or test script exists in `package.json`.

---

## 2. Logic Chain
1. **Observation**: `app/layout.jsx` encapsulates pages in `<main>`, and `components/Header.jsx` / `components/Footer.jsx` use `<header>`, `<nav>`, `<footer>`.
   **Inference**: The global document skeleton satisfies baseline semantic HTML requirements, but individual page templates require specific structural adjustments.
2. **Observation**: `components/Prose.jsx` uses `<div>`, whereas `components/BlogProse.jsx` uses `<article>`.
   **Inference**: About and Vision pages lack `<article>` tags for their primary content bodies. Replacing or wrapping `Prose.jsx` with `<article>` aligns About and Vision with semantic HTML5 specifications for LLM document extraction.
3. **Observation**: `components/Section.jsx` outputs `<h2>` for `title`. `app/vision/page.jsx` and `app/blog/[slug]/page.jsx` pass their page/post titles to `<Section title="...">`.
   **Inference**: Vision and Blog Post pages lack an `<h1>` tag in the generated DOM, violating strict heading hierarchy (h1 -> h2 -> h3).
4. **Observation**: `content/myvision.md` has plain-text section titles ("I. From Curiosity to Civilization Design") without markdown `#`/`##` headers.
   **Inference**: Markdown parsers output `<p>` tags for section titles, preventing LLMs and search engines from indexing the document's logical outline.
5. **Observation**: `scripts/generate-llms-context.js` generates `llms.txt`, `llms-full.txt`, and `llms-small.txt`, while `next-sitemap` creates `robots.txt` and `sitemap.xml`.
   **Inference**: LLM context generation infrastructure is active; adding explicit bot definitions to `robots.txt` and direct answer blocks to `llms.txt` will maximize LLMO discovery.
6. **Observation**: `out/` contains static HTML pages, and Node.js v24 is available in the workspace.
   **Inference**: A zero-dependency script (`scripts/verify-geo-llmo.mjs`) can parse `out/` HTML files directly after `npm run build` to validate JSON-LD schemas, semantic tags, heading hierarchies, and word counts.

---

## 3. Caveats
- `app/projects/page.jsx` contains an unused `projectsStructuredData` object definition in lines 42-63 that is not currently rendered via `<JsonLd>` into the DOM.
- Client-side interactive components (e.g. `SkillsPageClient`) render structured data via server components or layout, but search input state changes are client-rendered.

---

## 4. Conclusion
1. **Semantic HTML Fixes Needed**:
   - Wrap long-form content in `components/Prose.jsx` or in `app/about/page.jsx` and `app/vision/page.jsx` with `<article>`.
   - Update `app/vision/page.jsx` and `app/blog/[slug]/page.jsx` to render an explicit `<h1>` for page/post titles instead of `<h2>`.
   - Convert section titles in `content/myvision.md` to standard markdown `##` headings.
2. **Machine-Readable Enhancements Needed**:
   - Enhance `scripts/generate-llms-context.js` to insert concise answer blocks (40-60 words) and key definitions into `llms.txt`.
   - Update `next-sitemap.config.js` to include AI bot allowances and link to `llms.txt`.
3. **Programmatic Verification Script Implementation**:
   - Implement `scripts/verify-geo-llmo.mjs` verifying:
     - JSON-LD Person schema on `/about/index.html` and BlogPosting schema on `/blog/*/index.html`.
     - Presence of `<main>` and `<article>` tags.
     - Strict `<h1>` existence and sequential heading structure.
     - Standalone summary block word counts (40-60 words).
     - Presence of `llms.txt`, `robots.txt`, and `sitemap.xml`.
   - Add `"verify:geo": "node scripts/verify-geo-llmo.mjs"` and `"test": "npm run verify:geo"` to `package.json`.

---

## 5. Verification Method
1. **Build Step**:
   ```bash
   npm run build
   ```
2. **Test Command (once implemented)**:
   ```bash
   node scripts/verify-geo-llmo.mjs
   ```
3. **Manual DOM Checks**:
   - Inspect `out/about/index.html` for `<script type="application/ld+json">` containing `"@type":"Person"`, `<main>`, and `<article>`.
   - Inspect `out/vision/index.html` for `<h1>`, `<article>`, and `<h2>` headings.
   - Inspect `out/blog/what-is-a-hero/index.html` for `<h1>`, `<article>`, and `"@type":"BlogPosting"`.
   - Inspect `out/llms.txt` and `out/robots.txt` for AI agent directives.
