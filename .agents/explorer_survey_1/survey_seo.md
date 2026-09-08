# SEO & Architecture Survey Report

**Date**: 2026-08-25  
**Codebase**: `vktofly.github.io`  
**Investigator**: Explorer 1  

---

## 1. Project Architecture Overview

### Framework & Environment
| Property | Value | Notes |
|---|---|---|
| **Next.js Version** | `14.2.6` | App Router paradigm |
| **React Version** | `18.3.1` | React Server Components + Client Components |
| **Router Type** | **App Router (`app/`)** | Fully migrated to App Router; no `pages/` directory exists |
| **Export Mode** | `output: 'export'` | Static HTML export into `out/` |
| **Asset Optimization** | `images: { unoptimized: true }` | Required for static export on GitHub Pages |
| **URL Format** | `trailingSlash: true` | Routes generated with trailing slashes (e.g. `/about/`, `/blog/`) |
| **CSS Framework** | Tailwind CSS `3.4.13` + PostCSS `8.4.49` | Typography plugin `@tailwindcss/typography` |
| **Animation** | Framer Motion `12.23.25` | Page transitions in `app/template.jsx` |
| **Sitemap Generator** | `next-sitemap` `4.2.3` | Ran post-build to create `out/sitemap.xml` and `out/robots.txt` |

### Build & Export Scripts (`package.json`)
- `"dev": "next dev --turbo"` — Local development with Turbopack.
- `"build": "node scripts/generate-llms-context.js && next build && next-sitemap"` — 3-step build pipeline:
  1. Generates LLM context dumps (`public/llms-full.txt`, `public/llms-small.txt`, `public/llms.txt`, root `llms.txt`).
  2. Runs Next.js static build (`next build`), outputting HTML/CSS/JS into `out/`.
  3. Executes `next-sitemap` against `next-sitemap.config.js` to create `out/sitemap.xml` and `out/robots.txt`.
- `"export": "next export"` — Legacy command (redundant in Next 14 due to `output: 'export'` in `next.config.mjs`).
- `"lint": "next lint"` — ESLint with `eslint-config-next`.

---

## 2. Comprehensive Inventory: Routes, Layouts & Components

### 2.1 Layouts & Root Infrastructure
1. **Root Layout (`app/layout.jsx`)**:
   - Imports Google Fonts (`Inter`, `JetBrains_Mono`, `EB_Garamond`).
   - Defines global metadata defaults and `%s — Vikash` title template.
   - Injects root JSON-LD schemas: `Organization`, `WebSite`, and `Person`.
   - Wraps children in `<Providers>`, `<ErrorBoundary>`, `<Analytics>`, `<PerformanceMonitor>`, `<SEOMonitor>`, `<Header>`, `<main className="py-24">`, and `<Footer>`.
2. **Skills Layout (`app/skills/layout.jsx`)**:
   - Sets metadata for `/skills/` route.
   - Injects `ItemList` JSON-LD schema for skill taxonomy.
3. **Contact Layout (`app/contact/layout.jsx`)**:
   - Sets metadata for `/contact/` route (needed because `app/contact/page.jsx` is a Client Component).
4. **Transition Template (`app/template.jsx`)**:
   - Client Component providing smooth Framer Motion fade-in / exit animations between route transitions.

---

### 2.2 Route & Page Enumeration

| # | Route | File Path | Type | Render | Metadata Status | Schema Markup |
|---|---|---|---|---|---|---|
| 1 | `/` | `app/page.jsx` | Static | Server | Present (Double suffix issue) | Root Person, Org, WebSite |
| 2 | `/about/` | `app/about/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG, Twitter) | `Person`, `FAQSchema` |
| 3 | `/admin/` | `app/admin/page.jsx` | Static | Server | **MISSING** (Leaked into sitemap) | None |
| 4 | `/analytics/` | `app/analytics/page.jsx` | Static | Client | **MISSING** | None |
| 5 | `/blog/` | `app/blog/page.jsx` | Static | Server | Present (`generateMetadata`) | Array of `BlogPosting` |
| 6 | `/blog/[slug]/` | `app/blog/[slug]/page.jsx` | Dynamic (16 posts) | Server | Present (`generateMetadata`, OG, Twitter, canonical, AMP) | `BlogPosting`, Citation |
| 7 | `/blog/[slug]/amp/` | `app/blog/[slug]/amp/page.jsx` | Dynamic (16 posts) | Server | Present (`generateMetadata`, canonical, AMP) | AMP HTML metadata |
| 8 | `/books/` | `app/books/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG, Twitter) | ItemList / Books |
| 9 | `/books/[slug]/` | `app/books/[slug]/page.jsx` | Dynamic (8 reviews) | Server | Present (`generateMetadata`, OG, canonical) | None (Review schema absent) |
| 10 | `/contact/` | `app/contact/page.jsx` | Static | Client | Present via `app/contact/layout.jsx` | None |
| 11 | `/content/` | `app/content/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG) | None |
| 12 | `/docs/about-project/` | `app/docs/about-project/page.jsx` | Static | Server | Partial (`robots: noindex, nofollow`, no description) | None |
| 13 | `/experience/` | `app/experience/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG) | Timeline/Experience |
| 14 | `/glossary/` | `app/glossary/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG, Twitter) | DefinedTermSet |
| 15 | `/people/` | `app/people/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG) | None |
| 16 | `/projects/` | `app/projects/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG) | `SoftwareApplication` / `CreativeWork` |
| 17 | `/projects/[slug]/` | `app/projects/[slug]/page.jsx` | Dynamic (9 projects) | Server | Present (`generateMetadata`, non-trailing canonical) | `SoftwareApplication` |
| 18 | `/resources/` | `app/resources/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG, Twitter) | Collection / Resources |
| 19 | `/skills/` | `app/skills/page.jsx` | Static | Client | Present via `app/skills/layout.jsx` | `ItemList` (in layout) |
| 20 | `/vision/` | `app/vision/page.jsx` | Static | Server | Present (`title`, `description`, `canonical`, OG, Twitter) | `Article` |
| 21 | `404` | `app/not-found.jsx` | Static | Server | Present (`title`, `description`) | None |

---

### 2.3 Component Inventory (61 Total Components)

#### Core Navigation & Layout
- `Header.jsx`: Sticky responsive navbar with logo, nav links, dropdown, theme toggle, mobile toggle.
- `Footer.jsx`: Site footer with copyright, navigation columns, and social links.
- `Container.jsx`: Centered responsive max-width wrapper (`max-w-7xl`).
- `Section.jsx`: Semantic `<section>` wrapper with optional title, intro header, and spacing.
- `SectionDivider.jsx`: Visual section dividers (geometric, subtle, minimal).
- `SectionIcon.jsx`: Category and section icon indicators.
- `SectionNavigation.jsx` & `SectionTracker.jsx`: In-page navigation and active section tracking.
- `MobileNav.jsx`: Drawer mobile navigation.
- `NavDropdown.jsx`: Navigation dropdown menus.
- `ThemeToggle.jsx`: Light/dark mode switch.
- `BackToTop.jsx`: Floating back-to-top button.
- `ReadingProgress.jsx`: Top reading progress bar for long-form content.
- `Toc.jsx`: Table of contents component extracting markdown headings.

#### Schema & SEO Helpers
- `JsonLd.jsx`: Injects `<script type="application/ld+json">` dangerously setting inner HTML.
- `FAQSchema.jsx`: Formats and renders FAQPage JSON-LD schema.
- `HowToSchema.jsx`: Formats and renders HowTo JSON-LD schema.
- `VideoSchema.jsx`: Formats and renders VideoObject JSON-LD schema.
- `SEOMonitor.jsx`: Client-side diagnostic monitoring for meta tags and page titles.
- `PerformanceMonitor.jsx` & `Analytics.jsx`: Web Vitals and local analytics event dispatchers.

#### Content & Cards
- `BlogPostCard.jsx`: Blog article card with image, title, date, reading time, tags.
- `FeaturedBlogPost.jsx`: Large hero card for top blog post.
- `BlogPostCTA.jsx`: Inline newsletter/discussion callout at end of blog posts.
- `BlogPostNavigation.jsx`: Previous/Next post pagination.
- `BlogProse.jsx` & `Prose.jsx`: Styled typography container for markdown HTML.
- `BlogComments.jsx`: Discussion/comments placeholder.
- `RelatedPosts.jsx`: Computes and displays related posts by shared tags.
- `BookCard.jsx`: Detailed book card with cover image, category icon, author, tags.
- `CaseStudyCard.jsx`: Project case study presentation card.
- `ExperienceItem.jsx` & `InteractiveTimelineItem.jsx`: Career milestone timeline cards with logos.
- `PersonCard.jsx`: Influential thinker profile card with photo and key concepts.
- `PodcastCard.jsx`: Podcast episode card.
- `ProfilePhoto.jsx`: Avatar component for author portrait.
- `ProjectCard.jsx` & `ProjectPreview.jsx`: Project showcase card with preview modal.
- `PublicationCard.jsx`: Research papers and published works card.
- `SpeakingCard.jsx`: Conference and speaking engagements card.
- `TestimonialCard.jsx`: Quotes and recommendation card with avatar.
- `VideoCard.jsx`: Video/talk card with thumbnail and duration.
- `AnimatedStat.jsx`, `Callout.jsx`, `CollapsibleSection.jsx`, `ContextualLinks.jsx`, `ErrorBoundary.jsx`, `FadeInSection.jsx`, `Icons.jsx`, `InternalLinkMap.jsx`, `KeyTakeaways.jsx`, `LoadingWrapper.jsx`, `NewsletterSignup.jsx`, `ProficiencyIndicator.jsx`, `PullQuote.jsx`, `SkeletonLoader.jsx`, `TextToSpeech.jsx`, `TimelinePreview.jsx`.

#### Admin Components
- `components/admin/BookImageUploader.jsx`: Drag-and-drop cover manager for books.
- `components/admin/PersonImageUploader.jsx`: Drag-and-drop photo manager for thinkers.
- `components/ImageFetcherHelper.jsx`: Image helper for books and thinkers.

---

## 3. Metadata, Canonical URLs & Open Graph Audit

### 3.1 Global Root Metadata (`app/layout.jsx`)
- **Metadata Base**: `metadataBase: new URL('https://vktofly.github.io')` (Correctly configured for relative URL resolution).
- **Title Template**:
  ```js
  title: {
    default: 'Vikash — Polymath, Futurist & Founder',
    template: '%s — Vikash',
  }
  ```
- **Robots Configuration**:
  - `index: true`, `follow: true`
  - Explicit directives for Googlebot, GPTBot, and CCBot.
- **OpenGraph & Twitter**:
  - Sets site-wide default OG image (`/og.png`, 1200x630).
  - Twitter handle: `@vktofly1`, `summary_large_image`.

---

### 3.2 Audit Findings & Inconsistencies

1. **Title Template Double Suffixing Bug**:
   - In Next.js App Router, if `layout.jsx` defines `template: '%s — Vikash'`, any child page setting `title: 'About — Vikash'` results in the rendered HTML title:
     ```html
     <title>About — Vikash — Vikash</title>
     ```
   - Affected pages:
     - `app/page.jsx`: `title: "Vikash — Polymath, Futurist & Founder"` -> renders `"Vikash — Polymath, Futurist & Founder — Vikash"`
     - `app/about/page.jsx`: `title: "About — Vikash"` -> renders `"About — Vikash — Vikash"`
     - `app/books/page.jsx`: `title: "Books — Vikash"` -> renders `"Books — Vikash — Vikash"`
     - `app/content/page.jsx`: `title: "Content & Recognition — Vikash"` -> renders `"Content & Recognition — Vikash — Vikash"`
     - `app/glossary/page.jsx`: `title: "Glossary — Vikash"` -> renders `"Glossary — Vikash — Vikash"`
     - `app/people/page.jsx`: `title: "Influential People — Vikash"` -> renders `"Influential People — Vikash — Vikash"`
     - `app/projects/page.jsx`: `title: "Projects — Vikash"` -> renders `"Projects — Vikash — Vikash"`
     - `app/resources/page.jsx`: `title: "Resources — Vikash"` -> renders `"Resources — Vikash — Vikash"`
     - `app/skills/layout.jsx`: `title: "Skills & Expertise — Vikash"` -> renders `"Skills & Expertise — Vikash — Vikash"`
     - `app/vision/page.jsx`: `title: "Vision — Vikash"` -> renders `"Vision — Vikash — Vikash"`
     - `app/blog/[slug]/page.jsx`: `title: "${post.title} — Vikash"` -> renders `"${post.title} — Vikash — Vikash"`
     - `app/projects/[slug]/page.jsx`: `title: "${project.title} — Projects — Vikash"` -> renders `"${project.title} — Projects — Vikash — Vikash"`
   - **Fix Recommendation**: Either use `title: { absolute: '...' }` or specify bare titles (e.g. `title: 'About'`) to let the template append ` — Vikash` once.

2. **Missing Metadata on Internal/Admin Pages**:
   - `app/admin/page.jsx`: Missing metadata entirely. It inherits default root metadata and is listed in `sitemap.xml`. Needs `robots: { index: false, follow: false }` and exclusion from `next-sitemap.config.js`.
   - `app/analytics/page.jsx`: Missing metadata (is `"use client"` with no parent layout). Needs dedicated metadata layout or server wrapper with `noindex`.

3. **Canonical URL Format Discrepancies**:
   - `next.config.mjs` specifies `trailingSlash: true`.
   - Most pages use relative trailing slash canonicals (e.g., `alternates: { canonical: '/about/' }`).
   - `app/projects/[slug]/page.jsx` (line 26) uses `canonical: https://vktofly.github.io/projects/${project.slug}` without a trailing slash.
   - Root layout uses `alternates: { canonical: '/' }`.
   - `app/page.jsx` omits `alternates.canonical` (inherits root).

4. **Non-Content Files Rendered in Dynamic Slugs & Sitemap**:
   - `content/blog/README.md` and `content/blog/_TEMPLATE.md` are being converted into dynamic blog routes: `/blog/readme/`, `/blog/readme/amp/`, `/blog/your-article-slug/`.
   - `content/books/README.md` is being converted into `/books/readme/`.
   - All these non-article utility files appear in `out/sitemap.xml`.
   - **Fix Recommendation**: Exclude `README.md`, `_TEMPLATE.md`, and any files starting with `_` or matching markdown documentation in `lib/blog.js` and `lib/book-blog.js`.

---

## 4. Images & `alt` Attributes Audit

### 4.1 Audit Summary
- **Total `<img>` tags found**: 7
- **Total `<Image>` tags found**: 25
- **Missing `alt` attributes found**: 0 (Every image element has an `alt` attribute defined).

### 4.2 Detailed Breakdown

| File | Line | Element | Alt Attribute Content | Purpose | Assessment |
|---|---|---|---|---|---|
| `components/Header.jsx` | 68 | `<Image>` | `alt="Vikash Kumar Logo"` | Brand Logo | Optimal |
| `components/ProfilePhoto.jsx` | 15 | `<Image>` | `alt="Portrait of Vikash"` | Profile Photo | Optimal |
| `components/BlogPostCard.jsx` | 66 | `<Image>` | `alt={post.title}` | Blog Post Card Image | Optimal |
| `components/FeaturedBlogPost.jsx` | 56 | `<Image>` | `alt={ogImage.alt}` | Hero Blog Post Image | Optimal |
| `components/BookCard.jsx` | 103 | `<Image>` | `alt={`${book.title} by ${book.author}`}` | Book Cover | Optimal |
| `components/InteractiveTimelineItem.jsx` | 44 | `<Image>` | `alt={item.company}` | Company Logo | Optimal |
| `components/PersonCard.jsx` | 39 | `<Image>` | `alt={person.name}` | Thinker Portrait | Optimal |
| `components/ProjectCard.jsx` | 55 | `<Image>` | `alt={project.title || "Project"}` | Project Thumbnail | Optimal |
| `components/TestimonialCard.jsx` | 24 | `<Image>` | `alt={testimonial.author}` | Testimonial Avatar | Optimal |
| `components/VideoCard.jsx` | 62 | `<Image>` | `alt={video.title}` | Video Thumbnail | Optimal |
| `app/blog/[slug]/page.jsx` | 207 | `<Image>` | `alt={ogImage.alt}` | Article OG Image | Optimal |
| `app/books/BooksFilter.jsx` | 461 | `<Image>` | `alt={`${book.title} by ${book.author}`}` | Book Cover | Optimal |
| `app/books/[slug]/page.jsx` | 102 | `<Image>` | `alt={`${book.title} by ${book.author}`}` | Book Detail Cover | Optimal |
| `components/ImageFetcherHelper.jsx` | 115, 212 | `<img>` | `alt="Book cover"`, `alt="Person"` | Admin UI helper | Acceptable |
| `components/admin/BookImageUploader.jsx` | 162, 225 | `<img>` | `alt={selectedBook.title}`, `alt={`${selectedBook.title} cover`}` | Admin UI | Acceptable |
| `components/admin/PersonImageUploader.jsx` | 160, 222 | `<img>` | `alt={selectedPerson.name}`, `alt={`${selectedPerson.name} photo`}` | Admin UI | Acceptable |

#### Decorative Background Images (`alt=""`)
The following pages use Unsplash stock imagery as subtle, low-opacity (1-2%) background styling:
- `app/blog/page.jsx` (lines 138, 165)
- `app/books/BooksPageClient.jsx` (lines 44, 132)
- `app/books/[slug]/page.jsx` (line 79)
- `app/content/page.jsx` (lines 48, 79, 111, 142)
- `app/experience/page.jsx` (lines 119, 159, 212)
- `app/people/page.jsx` (lines 59, 114)
- `app/projects/page.jsx` (lines 79, 106)
- `app/resources/page.jsx` (lines 93, 165)
- `app/skills/page.jsx` (lines 149, 229, 320, 402, 471, 536)

**Assessment**: `alt=""` on these decorative elements is standard W3C WCAG practice, instructing screen readers to skip purely atmospheric elements.

---

## 5. Summary of Recommended Architecture & SEO Fixes

1. **Title Fix**: Refactor all page titles to either omit ` — Vikash` or wrap in `title: { absolute: '...' }` to eliminate double-title suffixing (`... — Vikash — Vikash`).
2. **Exclude Administrative & Template Routes**:
   - Add `robots: { index: false, follow: false }` to `/admin/` and `/analytics/`.
   - Update `next-sitemap.config.js` to exclude `/admin/`, `/admin/*`, `/analytics/`, `/analytics/*`, `/docs/*`.
   - Filter out `README.md` and `_TEMPLATE.md` in `lib/blog.js` and `lib/book-blog.js`.
3. **Canonical Trailing Slash Consistency**:
   - Fix `app/projects/[slug]/page.jsx` canonical URL to include trailing slash: `https://vktofly.github.io/projects/${project.slug}/`.
4. **Structured Data Enhancements**:
   - Enrich `Person` schema on `/about/` with `mainEntityOfPage` and complete biographical metadata.
   - Add `Review` / `Book` schema to `app/books/[slug]/page.jsx`.
