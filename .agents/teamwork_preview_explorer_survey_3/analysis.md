# Survey Analysis: Semantic HTML, Machine-Readable Files, and Programmatic Verification

**Agent**: Explorer 3 (Survey Phase)  
**Date**: 2026-08-25  
**Target Repository**: `vktofly.github.io`  
**Focus Areas**: Semantic HTML (R3), Machine-Readable Files (R3), Build/Test Scripts, Programmatic Verification Strategy.

---

## 1. Semantic HTML Structure Analysis

### 1.1 Root Layout (`app/layout.jsx`)
- **Container Structure**:
  - `<html>` with `lang="en"` (line 213).
  - `<head>` containing global JSON-LD schemas (`Organization`, `WebSite`, `Person`) via `<JsonLd>` (lines 215-217).
  - `<header>` inside `components/Header.jsx` (line 49) with `<nav className="hidden md:flex...">` (line 80).
  - `<main className="py-24">{children}</main>` (line 228) wraps all child page components.
  - `<footer>` inside `components/Footer.jsx` (line 22).
- **Assessment**: Global semantic skeleton is solid (`<header>`, `<nav>`, `<main>`, `<footer>`).

### 1.2 Home Page (`app/page.jsx`)
- **Semantic Tags**:
  - Uses `<Section>` component (`<section className="...">`).
  - `<h1>` for profile name (`profile.name`, line 71).
  - `<h2>` for major sections ("Truth is the foundation of all progress", "Core Domains", "Journey", "Current Focus", "Featured Blog Post", "Latest Writing", "Featured Projects", "Let's Build the Future Together").
- **Issues Identified**:
  - Lacks `<article>` tags for standalone featured items (e.g., featured blog post card).

### 1.3 About Page (`app/about/page.jsx`) & `content/aboutme.md`
- **Semantic Tags**:
  - Uses `<Section>` (`<section>`) for Hero, Structured Ledger, and Main Content sections.
  - `<h1>Building systems of infinite growth.</h1>` (line 117).
  - Vectors use `<h3>` with ids `V_01` to `V_05`.
  - Markdown content rendered via `components/Prose.jsx` (line 250), which renders `<div className="prose...">` instead of `<article>`.
- **Issues Identified**:
  - The long-form biographical content in `content/aboutme.md` is rendered inside a `<div>` rather than an `<article>` tag. Wrapping in `<article>` will explicitly designate the standalone document boundary for AI crawlers.

### 1.4 Vision Page (`app/vision/page.jsx`) & `content/myvision.md`
- **Semantic Tags**:
  - Uses `<Section title="The Infinite Growth Principle">` (line 82).
- **Critical Issues Identified**:
  1. **Missing `<h1>`**: `<Section>` renders `title` as `<h2>`, resulting in NO `<h1>` tag in the rendered DOM of the Vision page.
  2. **Plain-Text Headings in Markdown**: `content/myvision.md` lines 1, 8, 19, 32, 44, 58, etc., are plain text (e.g. `Introduction: The Infinite Thread`, `I. From Curiosity to Civilization Design`) without markdown `#` / `##` syntax, causing them to render as `<p>` paragraphs rather than proper `<h2>` / `<h3>` headings.
  3. **Missing `<article>`**: Wrapped in `<div>` via `Prose.jsx`.

### 1.5 Blog Post Pages (`app/blog/[slug]/page.jsx`)
- **Semantic Tags**:
  - Uses `components/BlogProse.jsx` (line 243), which renders `<article className="prose...">`.
- **Critical Heading Hierarchy Issue**:
  - Post title in `BlogPostPage` is passed to `<Section title={post.title}>`, rendering as `<h2>`.
  - Markdown content headings inside the article render as `<h2>`.
  - Consequently, blog post pages skip `<h1>` entirely.

---

## 2. Machine-Readable Files & AI Ingestion Analysis

### 2.1 `scripts/generate-llms-context.js`
- **Current Behavior**:
  - Traverses `content/` for all `.md` files.
  - Generates:
    1. `public/llms-full.txt` (full markdown compilation with file and URL headers).
    2. `public/llms-small.txt` (bulleted markdown list with title and short summary).
    3. `public/llms.txt` and `llms.txt` (llms.txt standard format with assistant directions, context files, core pages, socials).
- **Gaps & Recommended Improvements**:
  1. Add a **Key Facts / Direct Answers Block** at the top of `llms.txt` (answering core entity queries: "Who is Vikash?", "What is the Infinite Growth Principle?").
  2. Add references to `AGENTS.md` and `sitemap.xml`.
  3. Filter out non-content files like `_TEMPLATE.md` or backup files if present.

### 2.2 `robots.txt` & `sitemap.xml` (`next-sitemap.config.js`)
- **Current Behavior**:
  - Generates `out/robots.txt` and `out/sitemap.xml` (70+ URLs).
  - Robots policy allows all user-agents (`User-agent: *`).
- **Gaps & Recommended Improvements**:
  1. Add explicit link directive in `robots.txt` to `llms.txt` (`# LLM Context: https://vktofly.github.io/llms.txt`).
  2. Explicitly specify known AI crawler bot user-agents (`GPTBot`, `ChatGPT-User`, `Google-Extended`, `PerplexityBot`, `ClaudeBot`, `Applebot-Extended`, `Bytespider`).

### 2.3 `public/AGENTS.md`
- Contains structured crawler guidance: Core Identity, Definitions, Site Structure, and Contact info.
- Recommended: Ensure links in `AGENTS.md` are aligned with canonical URLs.

---

## 3. Build & Test Scripts in `package.json`

### 3.1 Current Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "node scripts/generate-llms-context.js && next build && next-sitemap",
    "start": "next start",
    "export": "next export",
    "lint": "next lint",
    "data:validate": "node scripts/data-management.mjs validate",
    "data:backup": "node scripts/data-management.mjs backup",
    "data:quality": "node scripts/data-management.mjs quality",
    "data:migrate": "node scripts/data-management.mjs migrate",
    "data:git": "node scripts/data-management.mjs git",
    "data:maintenance": "node scripts/data-management.mjs maintenance",
    "data:manager": "node scripts/data-manager.mjs",
    "data:check": "npm run data:validate && npm run data:quality"
  }
}
```

### 3.2 Build Output
- `next.config.mjs` configures `output: 'export'` and `trailingSlash: true`.
- Output static files are generated in `out/`.
- Verified build execution (`npm run build`) completes cleanly generating 71 static HTML routes and sitemap in `out/`.

### 3.3 Test Framework Gap
- No test runner or automated verification script exists in `package.json`.
- Recommended additions:
  ```json
  "verify:geo": "node scripts/verify-geo-llmo.mjs",
  "test": "npm run verify:geo"
  ```

---

## 4. Programmatic Verification Script Design

### 4.1 Script Architecture (`scripts/verify-geo-llmo.mjs`)
A lightweight, zero-dependency Node.js ESM verification script testing static HTML artifacts in `out/`:

```javascript
/**
 * Verification Test Matrix:
 * 1. JSON-LD Verification
 *    - out/about/index.html -> must contain valid JSON-LD with @type === 'Person'
 *    - out/blog/what-is-a-hero/index.html -> must contain valid JSON-LD with @type === 'BlogPosting' or 'Article'
 *    - Validates required schema fields (name, url, author, headline, datePublished)
 * 2. Semantic HTML Elements
 *    - Core pages (index, about, vision, blog) contain <main>
 *    - Blog posts and long-form pages contain <article>
 * 3. Heading Hierarchy
 *    - Each page contains exactly one <h1>
 *    - Heading levels do not skip levels (h1 -> h2 -> h3)
 * 4. 40-60 Word Direct Answer Summary Blocks
 *    - About page & Vision page contain standalone summary blocks between 40-60 words (tolerated: 35-65 words)
 * 5. Machine-Readable Files
 *    - Presence and non-empty content of out/llms.txt, out/robots.txt, out/sitemap.xml
 */
```

### 4.2 Complete Script Prototype Specification
The script should inspect the filesystem directly, parse HTML strings using regex/state parser without requiring jsdom/cheerio, execute all 5 suites, print colorized assertions, and exit with code 0 on all pass or code 1 on any failure.
