# Survey Report: Schema Markup (JSON-LD) & Machine-Readable Context

**Date**: 2026-08-25  
**Target Repository**: `vktofly.github.io` (Next.js 14 App Router, Static Export)  
**Investigator**: Explorer 3  

---

## Executive Summary

The portfolio at `vktofly.github.io` already contains foundational infrastructure for structured data (`components/JsonLd.jsx`) and LLM context generation (`scripts/generate-llms-context.js`). Because Next.js is configured with `output: 'export'`, JSON-LD script tags are pre-rendered directly into static HTML files during `npm run build`, ensuring zero-JS readability by search engines and AI crawlers (GPTBot, Perplexity, CCBot).

However, the current implementation exhibits critical discrepancies:
1. **Broken Profile Image URLs** in schema (`proflephoto.jpg` vs actual file `profile_photo.png`).
2. **Invalid / Incomplete Schema Properties** in `Person` and `BlogPosting` schemas.
3. **Dead / Unrendered Schemas** in `app/projects/page.jsx` and `app/books/page.jsx` where schema objects are constructed but never passed to `<JsonLd>`.
4. **URL & Template Leaks** in `generate-llms-context.js` and `sitemap.xml` (e.g. `_TEMPLATE.md`, `README.md`, `/admin/`, un-slugified URLs with raw spaces).
5. **No Automated Verification Test Suite** for validating DOM elements, JSON-LD schemas, meta tags, and `alt` attributes on built static files.

---

## 1. Existing JSON-LD & Structured Data Survey

### 1.1 Core Rendering Mechanism
- **File**: `components/JsonLd.jsx` (Lines 1–4)
  ```jsx
  export default function JsonLd({ data }) {
    const json = JSON.stringify(data);
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
  }
  ```
- **Evaluation**: Fully compatible with Next.js static export (`output: 'export'`). Pre-renders into static HTML in `out/`.

---

### 1.2 Root / Global Structured Data
- **File**: `app/layout.jsx` (Lines 109–209, 215–217)
- **Schemas Injected on Every Page**:
  1. `Organization`: Name (`Vikash Kumar`), URL (`https://vktofly.github.io`), logo (`https://vktofly.github.io/logo/logo.png`), founder (`Person`), sameAs (Twitter, LinkedIn), knowsAbout.
  2. `WebSite`: Name, URL, description, author, publisher, potentialAction (`SearchAction`).
  3. `Person`: Name, URL, image, jobTitle, worksFor (`MyPrinciple`), alumniOf (`University of Cambridge`), knowsAbout, sameAs, hasOccupation.
- **Issues Identified**:
  - `image` in `Person` schema is `"https://vktofly.github.io/proflephoto/proflephoto.jpg"`, but the actual asset on disk is `public/proflephoto/profile_photo.png` (929 KB). This results in a 404 for search engine and AI crawlers.
  - Duplication: A root `Person` schema is output on every single route, yet `/about/` also outputs a separate `Person` schema with different fields.

---

### 1.3 About Page Schema (`Person`)
- **File**: `app/about/page.jsx` (Lines 74–103)
- **Rendered Schema**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vikash Kumar",
    "jobTitle": "Full Stack AI Engineer | Founder & Polymath",
    "description": "...",
    "url": "https://vktofly.github.io/about/",
    "email": "vktofly@gmail.com",
    "image": "https://vktofly.github.io/proflephoto/profile%20photo.jpg",
    "sameAs": ["https://github.com/vktofly", "https://x.com/vktofly1", "https://linkedin.com/in/vktofly"],
    "knowsAbout": ["Artificial Intelligence", "Quantum Computing", "Robotics", "Space Systems", "Epistemology", "Systems Thinking", "Entrepreneurship", "Physics", "Cognitive Science"],
    "alumniOf": "Multiple ventures and research institutions",
    "founder": "23+ technology companies"
  }
  ```
- **Additional Schema**: `FAQSchema` rendered on Line 67 from `data/faqs.js`.
- **Issues Identified**:
  - `image` URL has space encoding `%20` (`profile%20photo.jpg`) and `.jpg` extension, but file is `profile_photo.png`.
  - `alumniOf`: Set to a string `"Multiple ventures and research institutions"`. Schema.org standard expects an `EducationalOrganization` or `Organization` object.
  - `founder`: In Schema.org, `founder` is an `Organization` property pointing to a `Person`, not a `Person` property. `founderOf` or structured `Organization` references should be used instead.
  - Missing `@id` connecting the `Person` entity to `WebSite` and `BlogPosting` author fields.

---

### 1.4 Blog Post Schema (`BlogPosting` & `BreadcrumbList`)
- **File**: `app/blog/[slug]/page.jsx` (Lines 139–189)
- **Rendered Schemas**:
  - `BlogPosting`:
    - `headline`: `post.title`
    - `description`: `post.description || post.summary`
    - `author`: `{ "@type": "Person", name: "Vikash", url: "https://vktofly.github.io/about/" }`
    - `publisher`: `{ "@type": "Person", name: "Vikash", url: "https://vktofly.github.io" }`
    - `datePublished`: `publishedTime` (ISO string)
    - `dateModified`: `publishedTime`
    - `url`: `https://vktofly.github.io/blog/${post.slug}/`
    - `mainEntityOfPage`: `{ "@type": "WebPage", "@id": url }`
    - `image`: `ogImage.url`
    - `keywords`: `post.tags?.join(", ")`
    - `wordCount`: `post.words`
    - `timeRequired`: `PT${post.readingTime}M`
  - `BreadcrumbList`: 3 items (Home -> Blog -> Post Title).
- **Issues Identified**:
  - `image`: `ogImage.url` resolves to relative path (e.g. `/og/blog/infinite-growth-principle.png`) rather than an absolute URL (`https://vktofly.github.io/og/blog/...`).
  - `author` is defined as a minimal inline object without canonical `@id` reference to `https://vktofly.github.io/#person`.

---

### 1.5 Status of Schemas Across Other Routes

| Route | File | Schemas Defined | Rendered in DOM? | Issues / Status |
|---|---|---|---|---|
| `/` (Home) | `app/page.jsx` | Layout global only | Yes (via layout) | `JsonLd` imported in `page.jsx:8` but unused. |
| `/about/` | `app/about/page.jsx` | `Person`, `FAQPage` | Yes | Broken image URL, invalid `founder`/`alumniOf` format. |
| `/blog/` | `app/blog/page.jsx` | `Blog`, `ItemList` | Yes | Generates ItemList of 20 posts + latest 10 in Blog. |
| `/blog/[slug]/` | `app/blog/[slug]/page.jsx` | `BlogPosting`, `BreadcrumbList` | Yes | Relative image URL in schema. |
| `/vision/` | `app/vision/page.jsx` | `Article` | Yes | Valid `Article` schema with author/publisher. |
| `/experience/` | `app/experience/page.jsx` | `ItemList` (Organizations) | Yes | Valid ItemList schema of past companies. |
| `/projects/` | `app/projects/page.jsx` | `SoftwareApplication` / `CreativeWork` | **NO (Dead Code)** | `projectsStructuredData` defined (lines 42–63) but `<JsonLd>` never rendered! |
| `/projects/[slug]/`| `app/projects/[slug]/page.jsx` | `SoftwareApplication`, `BreadcrumbList` | Yes | Valid `SoftwareApplication` schema. |
| `/skills/` | `app/skills/page.jsx` & `layout.jsx` | `ItemList` | Yes (Duplicate) | `layout.jsx:33` and `page.jsx:87` both render `ItemList`. |
| `/books/` | `app/books/page.jsx` | `Book` (multiple) | **NO (Dead Code)** | `booksStructuredData` defined (lines 97–127) but never passed to JSX! |
| `/books/[slug]/` | `app/books/[slug]/page.jsx` | None | **NO** | Missing `Review`, `Book`, or `BlogPosting` schema. |
| `/resources/` | `app/resources/page.jsx` | `CollectionPage` | Yes | Valid CollectionPage with ItemList. |

---

## 2. Content Pipeline (Markdown Loading, Parsing & Rendering)

### 2.1 Content Organization
- `content/aboutme.md`: Standalone markdown for About page.
- `content/myvision.md`: Standalone markdown for Vision page.
- `content/blog/*.md` (17 files):
  - 13 substantive essays.
  - 1 template (`_TEMPLATE.md`).
  - 1 documentation file (`README.md`).
  - 3 space-delimited filenames (`Books That Shaped My Philosophy of Infinite Growth.md`, `The Book That Redefined My Understanding of Progress.md`, `the Inner Architecture of Freedom.md`).
- `content/books/*.md` (9 files):
  - 8 book reviews.
  - 1 documentation file (`README.md`).

### 2.2 Loading & Parsing Pipeline
1. **Blog Loader (`lib/blog.js`)**:
   - `getAllPostFiles()` reads `content/blog/` filtering by `/\.(md|mdx)$/`.
   - `getAllPostsMeta()` parses frontmatter via `gray-matter`.
   - Slug resolution: `data.slug ? generateSlug(data.slug) : generateSlug(fileSlug)`.
   - Reading time: `Math.max(1, Math.round(words / 200))`.
   - Markdown to HTML: `remark().use(slugPlugin).use(html).process(content)`.
2. **About/Vision Loader (`lib/markdown.js`)**:
   - `loadMarkdownAsHtml(slugName)`: Reads `content/${slugName}.md`, removes legacy keyword metadata headers, and converts to HTML via `remark`.
3. **Book Blog Loader (`lib/book-blog.js`)**:
   - `getAllBookBlogsMeta()` and `getBookBlogBySlug(slug)`: Processes `content/books/*.md`.
4. **Rendering Components**:
   - `components/BlogProse.jsx`: Injects HTML via `dangerouslySetInnerHTML` with support for automated internal link mapping.
   - `components/Prose.jsx`: General prose container.

### 2.3 Critical Bugs in Content Pipeline
- **Leaked Files**: `README.md` and `_TEMPLATE.md` in `content/blog/` and `content/books/` are currently parsed as active blog posts and book reviews, creating routes like `/blog/readme/`, `/blog/your-article-slug/`, and `/books/readme/`.
- **Slug Generation Inconsistency**: `lib/blog.js` converts spaces to hyphens for slug URLs, but `scripts/generate-llms-context.js` does a naive file path replacement, causing broken link URLs with spaces in `llms-small.txt` and `llms-full.txt`.

---

## 3. Machine-Readable Context (`llms.txt`, Sitemaps, Robots)

### 3.1 LLM Context Files
- **Build Hook**: `package.json:8` executes `node scripts/generate-llms-context.js` prior to `next build`.
- **Files Generated**:
  1. `public/llms.txt` & root `llms.txt` (987 bytes): Contains assistant directions, links to context dumps, core pages list, and social profiles.
  2. `public/llms-small.txt` (7.6 KB): Summarized index of all markdown files with titles and links.
  3. `public/llms-full.txt` (94.4 KB): Full text dump of all markdown content separated by headers.
- **Issues in Generated Context Files**:
  - `llms-small.txt` includes entries for `_TEMPLATE.md`, `blog/README.md`, and `books/README.md`.
  - Links to space-named files are not slugified (e.g. `https://vktofly.github.io/blog/Books That Shaped My Philosophy of Infinite Growth` which returns 404).

### 3.2 Sitemaps & Robots.txt
- **Tool**: `next-sitemap` (`next-sitemap.config.js`).
- **Generated Files**: `out/sitemap.xml` and `out/robots.txt`.
- **Robots.txt Content**:
  ```txt
  User-agent: *
  Allow: /
  Disallow: /404
  Disallow: /404/
  Host: https://vktofly.github.io
  Sitemap: https://vktofly.github.io/sitemap.xml
  ```
- **Sitemap Issues**:
  - Includes unwanted internal routes: `/admin/`, `/docs/about-project/`, `/blog/readme/amp/`, `/books/readme/`, `/blog/your-article-slug/amp/`.
  - Includes both `/amp/` and canonical routes as separate sitemap entries.

---

## 4. Verification Setup & Requirements

### 4.1 Current Test & Validation Scripts
- `npm run data:validate` (`scripts/data-management.mjs validate`): Validates schema integrity of `data/*.js` files (books, projects, experience, skills, profile, socials). Passes with 8/8 valid files.
- `npm run data:quality` (`scripts/data-management.mjs quality`): Evaluates field completeness and data consistency across data files. Passes with 98% avg completeness.
- `npm run lint` (`next lint`): Runs ESLint 8.
- **Deficiency**: There is currently **no automated verification script** to test the static build output in `out/`.

### 4.2 Required Static Verification Script Specification
To fulfill acceptance criteria, a verification script (`scripts/verify-seo-schema.mjs`) must be implemented to test `out/**/*.html`:
1. **JSON-LD Presence & Validity**:
   - Verify `<script type="application/ld+json">` exists in all HTML files.
   - Parse JSON-LD content and validate Schema.org types (`Person` on `/about/`, `BlogPosting` on `/blog/*/`, `Article` on `/vision/`, `SoftwareApplication` on `/projects/*/`, `Book` on `/books/*/`).
   - Validate absolute URLs for `image`, `url`, and `@id`.
2. **Metadata Integrity**:
   - Verify every page has a non-empty, unique `<title>` and `<meta name="description">`.
   - Verify `<link rel="canonical">` matches the page URL.
3. **Accessibility & Image SEO**:
   - Scan all `<img>` tags in HTML output to assert that no image is missing an `alt` attribute.
4. **LLM Summary Block Verification**:
   - Verify core pages (`/`, `/about/`, `/vision/`) contain direct answer / summary blocks (40–60 words).

---

## Summary of Actionable Recommendations

1. **Fix Image URLs in Schema**: Update `app/layout.jsx` and `app/about/page.jsx` to reference `/proflephoto/profile_photo.png` (absolute URL `https://vktofly.github.io/proflephoto/profile_photo.png`).
2. **Render Missing Schemas**:
   - Render `projectsStructuredData` in `app/projects/page.jsx`.
   - Render `booksStructuredData` in `app/books/page.jsx`.
   - Add `Review` / `Book` / `BlogPosting` schema in `app/books/[slug]/page.jsx`.
   - Deduplicate `ItemList` schema in `app/skills/`.
3. **Clean Content Pipeline & Ignore Templates**:
   - Exclude `README.md` and `_TEMPLATE.md` in `lib/blog.js`, `lib/book-blog.js`, and `scripts/generate-llms-context.js`.
   - Ensure `scripts/generate-llms-context.js` slugifies all post URLs to match Next.js routes.
4. **Refine Sitemaps**: Exclude `/admin`, `/docs/`, `/404`, and markdown template slugs in `next-sitemap.config.js`.
5. **Add Automated Verification Script**: Create `scripts/verify-seo-schema.mjs` and wire it into `npm run test` or `npm run check`.
