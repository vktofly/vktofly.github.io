# Project: Next.js Portfolio SEO & GEO (LLM Optimization)

## Architecture
- **Framework**: Next.js 14.2.6 App Router
- **Export Mode**: Static HTML Export (`output: 'export'`) into `out/`
- **Routing**: Static & dynamic routes with `trailingSlash: true`
- **Metadata**: Next.js metadata API in `layout.jsx` and `page.jsx` / `layout.jsx`
- **Structured Data**: `components/JsonLd.jsx` injecting static JSON-LD script tags
- **AI Context**: `llms.txt`, `llms-small.txt`, `llms-full.txt` generated via `scripts/generate-llms-context.js`
- **Sitemap**: `next-sitemap` generating `out/sitemap.xml` and `out/robots.txt`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Fix Title Double Suffixing | Resolve `%s — Vikash` template conflict causing double suffix across 12+ pages | M1 | Survey 1 |
| 2 | Unique Meta Titles & Descriptions | Ensure every page route has unique, keyword-rich title and meta description | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Canonical URL & Trailing Slash Consistency | Ensure canonical URLs across all pages use consistent trailing slash format | M1 | Survey 1 |
| 4 | Robots & Sitemap Protection | Add `noindex` to `/admin/` and `/analytics/` and exclude admin/templates from `next-sitemap.config.js` | M1 | Survey 1 |
| 5 | Clean Blog/Book Markdown Loaders | Exclude `README.md` and `_TEMPLATE.md` from `lib/blog.js` and `lib/book-blog.js` | M1 | Survey 3 |
| 6 | Image Alt Attributes Integrity | Verify and maintain 100% valid alt attributes on all `<img>` and `<Image>` tags | M1 | ORIGINAL_REQUEST §R1 |
| 7 | Fix Missing `<h1>` Tags | Fix 7 core pages lacking `<h1>` (`/projects`, `/projects/[slug]`, `/blog/[slug]`, `/experience`, `/skills`, `/contact`, `/vision`) | M2 | Survey 2 |
| 8 | Fix `myvision.md` Markdown Headings | Add markdown `##` heading markers in `content/myvision.md` so headings render and TOC populates | M2 | Survey 2 |
| 9 | Direct Answer Summary Blocks (40-60 words) | Add standalone 40-60 word direct answer summary blocks to core pages (`/`, `/about/`, `/projects/`, `/experience/`, `/skills/`, `/vision/`, `/blog/`, `/books/`, `/contact/`) | M2 | ORIGINAL_REQUEST §R2 |
| 10 | Natural Language Query Headings | Refactor section headings into natural language query formats for AI extraction | M2 | ORIGINAL_REQUEST §R2 |
| 11 | Semantic HTML5 Tags Adoption | Convert `Prose.jsx` and cards (`ProjectCard`, `CaseStudyCard`, etc.) to `<article>`, add `<aside>` for sidebars, `<time>` for dates | M2 | ORIGINAL_REQUEST §R4 |
| 12 | Fix Profile Photo URLs in Schema | Update schema image URLs in `layout.jsx` and `about/page.jsx` to `/proflephoto/profile_photo.png` | M3 | Survey 3 |
| 13 | Complete Person Schema on About Page | Enrich `Person` schema with valid Schema.org properties (`@id`, `jobTitle`, `knowsAbout`, `sameAs`, `worksFor`) | M3 | ORIGINAL_REQUEST §R3 |
| 14 | Article / BlogPosting Schema on Posts | Enrich `BlogPosting` and `Article` schemas with absolute image URLs and author entity `@id` | M3 | ORIGINAL_REQUEST §R3 |
| 15 | Render Dead/Missing Schemas | Render `projectsStructuredData` in `/projects/`, `booksStructuredData` in `/books/`, add `Book`/`Review` in `/books/[slug]/`, deduplicate `/skills/` | M3 | Survey 3 |
| 16 | Machine-Readable Context & `llms.txt` Refinement | Refine `scripts/generate-llms-context.js` (exclude templates, slugify links with spaces, add 50-word entity bio at top of `llms.txt`) | M4 | ORIGINAL_REQUEST §R4 |
| 17 | Automated Verification Script (`verify-seo-schema.mjs`) | Create verification script testing built HTML in `out/` for meta tags, titles, JSON-LD schemas, image alt tags, and 40-60 word answer blocks | M5 | ORIGINAL_REQUEST §Verification |
| 18 | Final E2E Build, Verification & Audit | Execute full build, run verification suite across all tiers (Tiers 1-4), adversarial hardening (Tier 5), and forensic integrity audit | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Traditional SEO & Metadata & Markdown Loader Hygiene | Features 1-6 (Titles, descriptions, canonicals, robots, sitemap, loader filters, alt tags) | none | PLANNED |
| M2 | LLM Direct Answers, Headings & Semantic HTML5 | Features 7-11 (`<h1>` fix, `myvision.md` headings, 40-60 word summaries, query headings, `<article>`/`<aside>`) | M1 | PLANNED |
| M3 | Structured Data JSON-LD Schema Markup | Features 12-15 (Image URLs, Person schema, BlogPosting/Article schema, dead schemas) | M1 | PLANNED |
| M4 | Machine-Readable Context & llms.txt Refinement | Feature 16 (`generate-llms-context.js`, `llms.txt`, slug URLs, entity bio) | M1 | PLANNED |
| M5 | E2E Verification Test Suite & Final Audit | Features 17-18 (`verify-seo-schema.mjs`, static HTML testing, full pass, audit clean) | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Metadata Contract (`layout.jsx` <-> Child Pages)
- `layout.jsx`: `title: { default: 'Vikash — Polymath, Futurist & Founder', template: '%s — Vikash' }`
- Child pages specify bare title strings (e.g. `title: 'About'`) or `title: { absolute: '...' }` so rendered title is `${pageTitle} — Vikash` without duplicate suffix.
- Canonical URLs must resolve to absolute or root-relative paths with trailing slash (e.g. `/about/`, `/blog/infinite-growth-principle/`).

### Schema Contract (Entity Graph ID Resolution)
- Primary Person Entity: `@id: "https://vktofly.github.io/#person"`
- WebSite Entity: `@id: "https://vktofly.github.io/#website"`
- BlogPosting / Article `author`: `{ "@type": "Person", "@id": "https://vktofly.github.io/#person", "name": "Vikash", "url": "https://vktofly.github.io/about/" }`
- Image URLs in JSON-LD must be absolute (`https://vktofly.github.io/proflephoto/profile_photo.png`).

### Verification Contract (`scripts/verify-seo-schema.mjs`)
- Input: `out/**/*.html` generated after `npm run build`.
- Verification Checks:
  1. `<title>` exists, non-empty, no double suffix (`— Vikash — Vikash`).
  2. `<meta name="description">` exists, non-empty, length between 50 and 200 chars.
  3. `<link rel="canonical">` exists with matching trailing slash path.
  4. `<script type="application/ld+json">` exists, valid JSON, schema types match page type (`Person` on `/about/`, `BlogPosting` on `/blog/*/`, `Article` on `/vision/`, `SoftwareApplication` on `/projects/*/`, `Book` on `/books/*/`).
  5. All `<img>` tags in HTML have non-null `alt` attribute.
  6. Core pages contain direct answer summary block (40-60 words).
- Exit code 0 on 100% pass, non-zero on failure.

## Code Layout
- `app/layout.jsx`: Root layout, global metadata, root JSON-LD schemas
- `app/**/page.jsx`: Individual route pages
- `app/**/layout.jsx`: Sub-layouts with metadata
- `components/JsonLd.jsx`: JSON-LD script injector
- `components/Section.jsx`: Section component supporting `<h1>` or `<h2>` heading levels
- `components/Prose.jsx`: Prose container rendering `<article>`
- `components/*.jsx`: Card components (`ProjectCard`, `BlogPostCard`, etc.)
- `content/aboutme.md`, `content/myvision.md`: Core markdown files
- `content/blog/*.md`, `content/books/*.md`: Markdown post collections
- `lib/blog.js`, `lib/book-blog.js`, `lib/markdown.js`: Content loader utilities
- `scripts/generate-llms-context.js`: LLM context file generator
- `scripts/verify-seo-schema.mjs`: E2E verification test suite
- `next-sitemap.config.js`: Sitemap configuration
