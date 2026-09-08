# Structured Data & Schema Markup (R2) Technical Analysis

## Executive Summary
vktofly.github.io uses Next.js 14 (App Router) with static HTML export (`output: 'export'`). Structured data is generated using a custom `<JsonLd>` component (`components/JsonLd.jsx`) that renders `<script type="application/ld+json">` tags during build time. This is 100% compatible with static export and AI crawler parsing without client JavaScript. However, several critical schema inconsistencies, duplicate entity definitions, invalid Schema.org properties, and relative image URL issues currently degrade GEO/LLMO indexing.

---

## 1. Existing Architecture & Metadata Handling

### Key Files and Mechanisms
1. **Next.js Metadata API**:
   - `app/layout.jsx` (lines 19-106): Global metadata (title template, OpenGraph, Twitter card, robots with GPTBot/CCBot rules).
   - Page-level routes: Static `metadata` export (`app/about/page.jsx:14-57`, `app/vision/page.jsx:9-46`) or dynamic `generateMetadata` (`app/blog/[slug]/page.jsx:49-99`).
2. **Schema Injection Mechanism**:
   - `components/JsonLd.jsx` (lines 1-5):
     ```jsx
     export default function JsonLd({ data }) {
       const json = JSON.stringify(data);
       return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
     }
     ```
3. **Static Build Output**:
   - Config: `next.config.mjs` sets `output: 'export'`.
   - Build pre-renders 71 HTML pages in `out/`.
   - Verified: All `<script type="application/ld+json">` blocks are pre-rendered directly into the static HTML files (`out/about/index.html`, `out/blog/*/index.html`, `out/index.html`).

---

## 2. Component-by-Component Schema Survey

| Location | Current Schemas | Status & Issues | Recommended Fix |
|---|---|---|---|
| `app/layout.jsx:109-218` | `Organization`, `WebSite`, `Person` | Emitted globally in `<head>`. Person schema has placeholder education; not linked via `@id`. | Unify with canonical `@id: "https://vktofly.github.io/#person"` and `@id: "https://vktofly.github.io/#website"`. |
| `app/about/page.jsx:74-103` | `Person`, `FAQPage` | Duplicate Person schema on About page; uses invalid `founder: "23+ companies"` on Person; relative photo URL. | Convert to `ProfilePage` / `AboutPage` schema pointing `mainEntity` to canonical `#person`. |
| `app/blog/[slug]/page.jsx:139-189` | `BlogPosting`, `BreadcrumbList` | Relative OG image URL in JSON-LD; author/publisher not linked by `@id`. | Use absolute image URL, canonical author `@id`, add `inLanguage: "en-US"`. |
| `app/blog/page.jsx:70-123` | `Blog`, `ItemList` | Includes 10 posts in Blog and 20 in ItemList. | Valid; ensure consistent author `@id` references. |
| `app/vision/page.jsx:56-80` | `Article` | Valid Article schema for the Infinite Growth Principle essay. | Link author/publisher to canonical `#person`. |
| `app/books/[slug]/page.jsx` | None | Missing structured data on book review pages. | Add `Review` / `Book` schema. |
| `app/projects/[slug]/page.jsx:59-94` | `SoftwareApplication`, `BreadcrumbList` | Present and valid. | Link author to canonical `#person`. |

---

## 3. Schema Enhancement Specifications for GEO/LLMO

### A. Canonical Person Schema (to define in Layout or Graph)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://vktofly.github.io/#person",
  "name": "Vikash Kumar",
  "alternateName": ["Vikash", "vktofly"],
  "url": "https://vktofly.github.io/about/",
  "image": "https://vktofly.github.io/proflephoto/proflephoto.jpg",
  "jobTitle": "Full Stack AI Engineer | Founder & Polymath",
  "description": "Entrepreneur, physicist, and AI researcher exploring civilization-scale systems, quantum computing, and the evolution of knowledge.",
  "knowsAbout": [
    "Artificial Intelligence",
    "Quantum Computing",
    "Theoretical Physics",
    "Epistemology",
    "Systems Thinking",
    "Civilization Design",
    "Robotics",
    "Knowledge Creation"
  ],
  "sameAs": [
    "https://github.com/vktofly",
    "https://x.com/vktofly1",
    "https://linkedin.com/in/vktofly"
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://vktofly.github.io/#organization",
    "name": "MyPrinciple",
    "url": "https://vktofly.github.io"
  }
}
```

### B. About Page Schema (`app/about/page.jsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://vktofly.github.io/about/#webpage",
  "url": "https://vktofly.github.io/about/",
  "name": "About Vikash — Polymath Entrepreneur & AI Researcher",
  "mainEntity": {
    "@id": "https://vktofly.github.io/#person"
  }
}
```

### C. Blog Post Schema (`app/blog/[slug]/page.jsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://vktofly.github.io/blog/{slug}/#article",
  "isPartOf": {
    "@type": "Blog",
    "@id": "https://vktofly.github.io/blog/#blog"
  },
  "headline": "{post.title}",
  "description": "{post.description || post.summary}",
  "inLanguage": "en-US",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://vktofly.github.io/blog/{slug}/"
  },
  "url": "https://vktofly.github.io/blog/{slug}/",
  "image": "https://vktofly.github.io/og/blog/{slug}.png",
  "datePublished": "{publishedTime}",
  "dateModified": "{publishedTime}",
  "author": {
    "@type": "Person",
    "@id": "https://vktofly.github.io/#person",
    "name": "Vikash Kumar",
    "url": "https://vktofly.github.io/about/"
  },
  "publisher": {
    "@type": "Person",
    "@id": "https://vktofly.github.io/#person",
    "name": "Vikash Kumar"
  },
  "keywords": "{post.tags.join(', ')}",
  "wordCount": "{post.words}",
  "timeRequired": "PT{post.readingTime}M"
}
```

---

## 4. Discovered Edge Case / Bug in Meta Description Generator
- **Location**: `lib/meta-generator.js:15-47` (`generateMetaDescriptionFromContent`).
- **Issue**: When `content` does not match standard punctuation sentence splits, `description` defaults to empty string, resulting in output `<meta name="description" content=" | Philosophy, Systems"/>`.
- **Fix**: Fallback to `post.summary` or `post.description` before invoking tag concatenation.

---

## 5. Automated Verification Strategy (R2 Verification Resource)
Write `scripts/verify-schemas.mjs` to validate pre-rendered HTML in `out/`:
1. Check `out/about/index.html` for valid Person / ProfilePage JSON-LD.
2. Check all `out/blog/*/index.html` for valid `BlogPosting` JSON-LD with absolute image URLs.
3. Validate JSON parseability and required Schema.org fields (`headline`, `author`, `datePublished`).
