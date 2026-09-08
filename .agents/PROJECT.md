# Project: vktofly.github.io GEO/LLMO Optimization

## Architecture
Next.js 14 App Router static export (`output: 'export'`) portfolio website. Content sourced from Markdown (`content/`) and React JSX components (`app/`, `components/`). Build pipeline runs `scripts/generate-llms-context.js`, `next build`, and `next-sitemap` producing static HTML/assets in `out/`.

## Feature Inventory
Every feature from the Survey phase is mapped to a milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | 40-60 Word Answer Blocks | Standalone direct answer blocks answering core questions about Vikash and philosophy | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Query Headings | Natural language query headings (`## Who is Vikash?`, etc.) | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Sequential Heading Hierarchy | Strict sequential `h1 -> h2 -> h3` hierarchy across About, Vision, Home, and Blog pages | M1 | ORIGINAL_REQUEST §R1, AC |
| 4 | Person Schema | Comprehensive JSON-LD Person schema on About page with canonical `@id` | M2 | ORIGINAL_REQUEST §R2, AC |
| 5 | BlogPosting Schema | Valid JSON-LD BlogPosting schema with absolute URLs and linked author on blog posts | M2 | ORIGINAL_REQUEST §R2, AC |
| 6 | Meta Description Fix | Fix sentence-split fallback in `lib/meta-generator.js` | M2 | Survey Explorer 2 |
| 7 | Semantic HTML Elements | Ensure `<main>` and `<article>` wrap long-form content across all core pages | M3 | ORIGINAL_REQUEST §R3, AC |
| 8 | Enhanced LLM Context Files | Enriched `llms.txt`, `robots.txt`, and `sitemap.xml` for autonomous AI ingestion | M3 | ORIGINAL_REQUEST §R3 |
| 9 | Programmatic GEO Verification Suite | Automated verification script `scripts/verify-geo-llmo.mjs` testing static build output | M4 (E2E) | ORIGINAL_REQUEST §VR, AC |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Content Structures & Headings | `content/aboutme.md`, `content/myvision.md`, `app/about/page.jsx`, `app/vision/page.jsx`, `app/page.jsx`, `app/blog/[slug]/page.jsx` | none | IN_PROGRESS |
| M2 | JSON-LD Schema Markup & SEO | `app/layout.jsx`, `app/about/page.jsx`, `app/blog/[slug]/page.jsx`, `lib/meta-generator.js` | none | IN_PROGRESS |
| M3 | Semantic HTML & Machine Files | `components/Prose.jsx`, `scripts/generate-llms-context.js`, `next-sitemap.config.js` | none | IN_PROGRESS |
| M4 | E2E Verification & Final Audit | `scripts/verify-geo-llmo.mjs`, `package.json`, full build & audit | M1, M2, M3 | IN_PROGRESS |

## Code Layout
- `content/`: Markdown sources for pages (`aboutme.md`, `myvision.md`) and posts (`blog/*.md`)
- `app/`: Next.js App Router pages and layouts (`layout.jsx`, `page.jsx`, `about/`, `vision/`, `blog/`)
- `components/`: UI components (`JsonLd.jsx`, `Prose.jsx`, `Section.jsx`, `Header.jsx`, `Footer.jsx`)
- `lib/`: Utilities (`meta-generator.js`, `blog.js`, `markdown.js`)
- `scripts/`: Build and verification scripts (`generate-llms-context.js`, `verify-geo-llmo.mjs`)
- `out/`: Static build export output

## Interface Contracts
### Content ↔ Markdown Rendering
- `content/aboutme.md` and `content/myvision.md` export clean markdown with `## ` headings and 40-60 word answer paragraphs.
- `components/Prose.jsx` wraps rendered markdown in `<article className="prose prose-neutral ...">`.
### Structured Data ↔ DOM
- Person canonical ID: `https://vktofly.github.io/#person`
- About page emits `ProfilePage` or `Person` JSON-LD via `<JsonLd>` with valid Schema.org fields.
- Blog post pages emit `BlogPosting` with absolute `image` and `author` `@id: "https://vktofly.github.io/#person"`.
### Verification Contract
- `scripts/verify-geo-llmo.mjs` runs against `out/` HTML files and exits with code 0 on pass, non-zero on failure.
