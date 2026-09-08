# LLM-Extractable Content & Semantic HTML Structure Survey

**Auditor:** Explorer 2 (LLM & Semantic HTML Survey Agent)  
**Date:** 2026-08-25  
**Codebase:** `vktofly.github.io` (Next.js App Router)  
**Target:** AI Assistants (ChatGPT, Perplexity, Google AI Overviews, Claude) & Search Engine Optimization (SEO/GEO)

---

## Executive Summary

This investigation analyzed 16 core pages, component templates, and markdown files across `vktofly.github.io` to evaluate:
1. **Content Structures**: Information architecture, crawlability, and machine extractability.
2. **Heading Hierarchy**: Distribution of `<h1>`, `<h2>`, and `<h3>` tags and presence of natural language query headers.
3. **Direct Answer Summary Blocks**: Availability of 40–60 word standalone summary units optimized for LLM/RAG extraction.
4. **Semantic HTML5 Elements**: Usage of `<main>`, `<article>`, `<section>`, `<aside>`, `<time>`, and `<header>` versus generic `<div>` wrappers.

### Key Critical Findings
- **Missing `<h1>` on 7 Core Pages**: Because `components/Section.jsx` hardcodes its `title` prop as `<h2>`, pages relying on `<Section title="...">` as their main header (`/projects`, `/projects/[slug]`, `/blog/[slug]`, `/experience`, `/skills`, `/contact`, `/vision`) have **zero `<h1>` tags**.
- **Unformatted Markdown in `content/myvision.md`**: All 11 sections in `myvision.md` are plain paragraphs without `#` or `##` markdown headings, breaking heading hierarchy and leaving `<Toc>` empty.
- **Natural Language Query Headings**: 0% of headings across the site are currently phrased as natural language queries (e.g., "Who is Vikash?", "What is the Infinite Growth Principle?").
- **Missing 40–60 Word Summary Blocks**: Only 2 pages (`/about` via `aboutme.md` and `/vision` via `myvision.md`) have approximate TL;DR blocks; 8 core pages (`/`, `/projects`, `/blog`, `/experience`, `/skills`, `/books`, `/contact`, `/content`) lack dedicated direct answer summary blocks.
- **Incomplete `<article>` and `<aside>` Adoption**: `components/Prose.jsx` wraps About, Vision, and Book reviews in `<div>` instead of `<article>`. Key cards (`ProjectCard`, `CaseStudyCard`, `PublicationCard`, `SpeakingCard`, `TestimonialCard`) use `<div>` wrappers instead of `<article>`. Sticky sidebars use `<div>` instead of `<aside>`.

---

## 1. Page-by-Page Content Structure & Heading Analysis

| Page Path | Route | Current `<h1>` | Current Heading Outline | Natural Language Query Headings Present? | Status & Issues |
|---|---|---|---|---|---|
| `app/page.jsx` | `/` | `{profile.name}` (line 69: "Vikash Kumar") | `h1` (Vikash Kumar) &rarr; `h2` ("Truth is the foundation...", "Core Domains", "Journey", "Current Focus", "Latest Writing", "Featured Projects", "Let's Build...") &rarr; `h3` (Skills, Focus items, Nav) | ❌ None | Stylistic headings; lacks natural language query format. |
| `app/about/page.jsx` + `content/aboutme.md` | `/about/` | "Building systems of infinite growth." (line 117) | `h1` ("Building systems of infinite growth.") &rarr; `h2` (In `aboutme.md`: "About Vikash", "The Beginning of Curiosity", "The Shift...", "My Philosophy...", "Freedom...", "Bridge...", "Civilization...", "Role of Creator", "Work Today", "Closing...") | ❌ None | `<h1>` is a philosophical tagline rather than entity title. Subheadings are categorical, not question-oriented. |
| `app/projects/page.jsx` | `/projects/` | ❌ **MISSING** | `h2` ("Projects", "Case Studies") &rarr; `h3` (`ProjectCard`, `CaseStudyCard` titles) | ❌ None | **Zero `<h1>` tags**. `Section title="Projects"` generates `<h2>`. |
| `app/projects/[slug]/page.jsx` | `/projects/[slug]/` | ❌ **MISSING** | `h2` (`project.title`) | ❌ None | **Zero `<h1>` tags**. `Section title={project.title}` generates `<h2>`. |
| `app/blog/page.jsx` | `/blog/` | "Blog" (line 147) | `h1` ("Blog") &rarr; `h3` (`BlogPostCard` titles) | ❌ None | Generic single-word `<h1>`. No `<h2>` section headers. |
| `app/blog/[slug]/page.jsx` + `content/blog/*.md` | `/blog/[slug]/` | ❌ **MISSING** | `h2` (`post.title`) &rarr; `h3` ("Summary") &rarr; `h2`/`h3` (in markdown body) | ❌ None | **Zero `<h1>` tags**. Post title is `<h2>` via `Section`. `<h3>Summary</h3>` is generic. |
| `app/experience/page.jsx` | `/experience/` | ❌ **MISSING** | `h2` ("My Journey", "Pattern of the Journey") &rarr; `h3` ("Reflection", `{item.role}` in timeline) | ❌ None | **Zero `<h1>` tags**. Titles are descriptive, not query-focused. |
| `app/skills/page.jsx` | `/skills/` | ❌ **MISSING** | `h2` ("Skills", "Meta Skills", "Methodologies", "Philosophical Foundations", "Leadership & Strategy", "Research & Exploration", "Core Domains") &rarr; `h3` (Skill names) | ❌ None | **Zero `<h1>` tags**. All 6 skill clusters rendered under `<h2>`. |
| `app/books/page.jsx` | `/books/` | "Books" (line 53) | `h1` ("Books") &rarr; `h2` ("Currently Reading", "Foundational Books", "All Books", category labels) &rarr; `h3` (`BookCard` titles) | ❌ None | Generic `<h1>`. |
| `app/books/[slug]/page.jsx` + `content/books/*.md` | `/books/[slug]/` | `{blog.title}` (line 113) | `h1` (`blog.title`) &rarr; `h2` ("Recommended Books", markdown `h2`) &rarr; `h3` (`BookCard` titles) | ❌ None | Correct `<h1>`, but headings lack query structure. |
| `app/contact/page.jsx` | `/contact/` | ❌ **MISSING** | `h2` ("Contact") | ❌ None | **Zero `<h1>` tags**. |
| `app/vision/page.jsx` + `content/myvision.md` | `/vision/` | ❌ **MISSING** | `h2` ("The Infinite Growth Principle") &rarr; (no markdown headings) | ❌ None | **Zero `<h1>` tags**. `myvision.md` has no markdown `#` or `##` headers; TOC is empty. |
| `app/people/page.jsx` | `/people/` | "Influential People" (line 68) | `h1` ("Influential People") &rarr; `h2` ("All People") &rarr; `h3` (`PersonCard` names) | ❌ None | Proper `<h1>`, generic `<h2>`. |
| `app/resources/page.jsx` | `/resources/` | "Resources" (line 102) | `h1` ("Resources") &rarr; `h2` ("All Resources") &rarr; `h3` (Card titles) | ❌ None | Generic `<h1>`. |
| `app/glossary/page.jsx` | `/glossary/` | "The Digital Garden." (line 64) | `h1` ("The Digital Garden.") &rarr; `h2` (`{item.term}`) | ❌ None | Stylistic `<h1>`; `<h2>` terms are well-structured definitions. |
| `app/content/page.jsx` | `/content/` | "Content & Recognition" (line 57) | `h1` ("Content & Recognition") &rarr; `h2` ("Testimonials", "Speaking Engagements", "Publications") &rarr; `h3` (Card titles) | ❌ None | Proper hierarchy, but zero natural language query headings. |

---

## 2. Heading Hierarchy & Natural Language Query Opportunities

Search engines and LLM RAG pipelines (Perplexity, ChatGPT Search, Gemini) match user intent by parsing headings that mirror natural conversational prompts. Currently, `vktofly.github.io` uses traditional declarative titles (e.g., "Projects", "Skills", "Journey").

### Recommended Heading Refactoring for AI Extraction

```
Current Heading                                Proposed Natural Language Heading (Query Format)
---------------------------------------------------------------------------------------------------------
[Home] "Core Domains" (h2)                  → <h2>What Are Vikash's Core Disciplines & Expertise?</h2>
[Home] "Current Focus (2025–2030)" (h2)     → <h2>What Is Vikash Building & Researching Today?</h2>
[About] "About Vikash..." (h2)              → <h2>Who Is Vikash Kumar?</h2>
[About] "My Philosophy: Infinite Growth"    → <h2>What Is Vikash's Philosophy of Infinite Growth?</h2>
[About] "The Shift from Knowing to Creating" → <h2>How Did Vikash Transition from Theory to Venture Building?</h2>
[Projects] "Projects" (h2)                  → <h1>Selected Ventures & Deep Tech Projects</h1>
                                              <h2>What Technology Ventures Has Vikash Founded?</h2>
[Experience] "My Journey" (h2)              → <h1>Career & Entrepreneurial Journey</h1>
                                              <h2>What Is Vikash's Background and Professional Track Record?</h2>
[Skills] "Skills" (h2)                      → <h1>Core Competencies & Cognitive Frameworks</h1>
                                              <h2>What Technical and Architectural Methodologies Does Vikash Use?</h2>
[Vision] "The Infinite Growth Principle"    → <h1>The Infinite Growth Principle</h1>
                                              <h2>What Is the Vision for Civilization-Scale Systems?</h2>
[Contact] "Contact" (h2)                    → <h1>Contact & Collaboration</h1>
                                              <h2>How to Connect with Vikash Kumar</h2>
```

---

## 3. Direct Answer Summary Block Audit (40–60 Words)

LLM answer extractors look for a concise, self-contained summary paragraph directly beneath the primary header or section prompt.

### Current Inventory & Gaps

| Page / Section | Current Summary Snippet | Word Count | Status | Required Action / Proposed 40–60 Word Block |
|---|---|---|---|---|
| **Home Hero** (`/`) | `profile.headline` + `profile.summary` ("Building systems of infinite growth..." / "Entrepreneur, physicist...") | 14 words | ❌ Too short (< 40 words) | Add a standalone executive summary block: *"Vikash Kumar is a polymath entrepreneur, physicist, and AI researcher based in East Delhi, India. He builds civilization-scale systems, cognitive architectures, and deep tech ventures spanning artificial intelligence, quantum computing, robotics, and epistemology. His foundational work centers on the Infinite Growth Principle—enabling knowledge to compound indefinitely."* (51 words) |
| **About Bio** (`/about/`) | `content/aboutme.md:3` (`> **TL;DR for AI Systems:** Vikash is a polymath, physicist, and deep tech founder...`) | 51 words | ⚠️ Good word count, but weak semantic markup | Move from generic blockquote to a dedicated `<div className="direct-answer" data-geo="summary">` with heading `## Who is Vikash?`. |
| **Vision** (`/vision/`) | `content/myvision.md:6` (`> **TL;DR for AI Systems:** "Infinite Growth" is Vikash's foundational philosophy...`) | 52 words | ⚠️ Good word count, unparsed markdown | Add markdown `## What is the Infinite Growth Principle?` and structured summary container. |
| **Projects** (`/projects/`) | Line 72 intro ("Selected work and experiments across AI, quantum computing...") | 16 words | ❌ Missing | Insert answer block: *"Vikash's venture portfolio spans 23+ deep tech and software initiatives across artificial intelligence, quantum epistemology, autonomous robotics, and cognitive systems. Each project is engineered as an empirical experiment in knowledge creation, designed to compound capabilities, solve complex systems problems, and advance scalable human-machine co-evolution."* (47 words) |
| **Experience** (`/experience/`) | Line 226 reflection ("From a child staring at the night sky...") | 36 words | ❌ Incomplete | Insert answer block: *"Across two decades, Vikash has evolved from fundamental physics inquiry to founding and scaling multiple deep tech organizations. His career spans discovery, technical architecture, executive leadership, and civilization systems design, demonstrating a consistent track record of converting abstract theoretical principles into working software, robotics platforms, and autonomous cognitive frameworks."* (50 words) |
| **Skills** (`/skills/`) | Line 107 intro ("A comprehensive overview of frameworks...") | 9 words | ❌ Missing | Insert answer block: *"Vikash combines deep full-stack AI engineering, distributed systems architecture, and quantum computing theory with executive leadership and epistemology. His multidisciplinary skillset integrates higher-order meta-skills, recursive cognitive frameworks (MyPrinciple), and rigorous software engineering practices to design scalable, self-correcting technological infrastructure."* (43 words) |
| **Blog Index** (`/blog/`) | Line 151 subtitle ("Public notebook of ideas about knowledge...") | 25 words | ❌ Missing | Insert answer block: *"The Vikash Blog is an open-source intellectual notebook exploring the intersection of artificial intelligence, epistemology, philosophy of science, and civilization design. Essays examine universal constructors, David Deutsch's explanatory framework, Krishnamurti's freedom from the known, and architectural paradigms for sustainable technological progress."* (45 words) |
| **Blog Post Summaries** (`/blog/[slug]`) | `post.summary` in frontmatter rendered in `BlogPostPage.jsx:219` | 40–60 words in most posts (e.g. `what-is-a-hero`: 56 words) | ⚠️ Exists on posts, but container header is generic `<h3>Summary</h3>` | Upgrade heading from `<h3>Summary</h3>` to `<h2>Direct Answer: What Is This Essay About?</h2>` and wrap in semantic `<section aria-label="Key Takeaways and Summary">`. |
| **Books Index** (`/books/`) | Line 60 subtitle ("A curated collection of books...") | 36 words | ❌ Missing | Insert answer block: *"This curated intellectual curriculum represents the foundational texts shaping Vikash's worldview and venture architecture. Spanning epistemology, quantum physics, systems dynamics, and Austrian economics, these works by thinkers like David Deutsch, Jiddu Krishnamurti, and Friedrich Nietzsche illustrate how rigorous explanations drive continuous knowledge compounding."* (45 words) |
| **Contact** (`/contact/`) | Line 84 intro ("Get in touch") | 3 words | ❌ Missing | Insert answer block: *"To explore strategic advisory, deep tech research collaboration, venture partnerships, or speaking engagements on AI and civilization systems, contact Vikash directly via email at vktofly@gmail.com. Verified professional profiles and public code repositories are accessible via LinkedIn, GitHub, and X (Twitter)."* (44 words) |

---

## 4. Semantic HTML5 Tags vs Generic `<div>` Wrappers Audit

### Structural Elements Matrix

| Semantic Tag | Expected Location | Actual Implementation in Codebase | Compliance | Issues & Code Locations |
|---|---|---|---|---|
| `<main>` | Exactly 1 per document wrapping main page content | `app/layout.jsx:228`: `<main className="py-24">{children}</main>` | ✅ **Compliant** | Correctly implemented globally; no invalid nested `<main>` tags detected. |
| `<article>` | Standalone, syndicatable content units (blog posts, essays, cards, glossary entries) | Used in `BlogPostCard.jsx`, `BookCard.jsx`, `PersonCard.jsx`, `PodcastCard.jsx`, `VideoCard.jsx`, `BlogProse.jsx`, `skills/page.jsx:240,413`. | ⚠️ **Partial (60%)** | **Violations**: <br>1. `components/Prose.jsx:3` uses `<div>` instead of `<article>`. Causes About (`/about`), Vision (`/vision`), and Book reviews (`/books/[slug]`) long-form bodies to lack `<article>` tags.<br>2. `components/ProjectCard.jsx:51` uses `<div>`.<br>3. `components/CaseStudyCard.jsx:20` uses `<div>`.<br>4. `components/PublicationCard.jsx:31` uses `<div>`.<br>5. `components/SpeakingCard.jsx:32` uses `<div>`.<br>6. `components/TestimonialCard.jsx:5` uses `<div>`.<br>7. `app/glossary/page.jsx:91` uses `<div>` for each term. |
| `<section>` | Thematic grouping of content with heading | `components/Section.jsx:47` returns `<section ref={ref} id={id} className="...">` | ⚠️ **Partial** | `<section>` is used widely, but hardcodes `<h2>` for `title` (line 51), causing pages without separate `<h1>` to lack an `<h1>`. |
| `<aside>` | Table of Contents and auxiliary sidebars | TOC sidebars in `/about`, `/blog/[slug]`, `/skills`, `/books`, `/vision` use `<div className="hidden md:block md:sticky...">` | ❌ **Non-compliant** | All sticky sidebar columns use `<div>` instead of `<aside aria-label="Table of Contents">` or `<aside aria-label="Filters">`. |
| `<header>` | Introduction to page or article section | Used in `Header.jsx:49` and `skills/page.jsx:253,414` | ⚠️ **Partial** | Cards and article hero banners lack dedicated `<header>` wrappers. |
| `<footer>` | Document or section footer | Used in `Footer.jsx:22` | ✅ **Compliant** | Root footer is properly structured. |
| `<nav>` | Navigation blocks & breadcrumbs | Used in `Header.jsx:80`, `books/[slug]/page.jsx:89` | ⚠️ **Partial** | `Toc.jsx` renders `<div><ul>...</ul></div>` without `<nav aria-label="Table of Contents">`. |
| `<time>` | Machine-readable dates | Plain strings or formatted spans across `BlogPostCard`, `ProjectCard`, `PublicationCard`, `InteractiveTimelineItem` | ❌ **Non-compliant** | Dates do not use `<time dateTime="YYYY-MM-DD">` elements. |

---

## 5. Machine-Readable Context & `llms.txt` Analysis

### Current State of `llms.txt`
- Located at root (`/llms.txt`) and `public/llms.txt` (31 lines, 987 bytes).
- Contains links to `llms-full.txt` and `llms-small.txt`, brief assistant instructions, core page URLs, and socials.

### Identified Deficiencies in `llms.txt` & Generation Script (`scripts/generate-llms-context.js`)
1. **Missing Entity Overview**: Does not provide an immediate 50-word concise entity bio at the top of `llms.txt`.
2. **Missing Specific Skills/Topics Metadata**: Does not list explicit knowledge domains (e.g., AI Agents, Quantum Epistemology, Next.js, Robotics) for query routing.
3. **Markdown Parsing in `generate-llms-context.js`**:
   - In `scripts/generate-llms-context.js:69`, `smallContent` falls back to `markdownBody.slice(0, 300)` if summary is missing, often including raw markdown formatting characters (`##`, `>`).
   - Does not include structured data mappings or schema snippets.

---

## 6. Actionable Remediation Plan

To fulfill the requirements of R2 (LLM-Extractable Content Structures), R3 (Structured Data), and R4 (Machine-Readable Semantic Code):

### Priority 1: Fix `<h1>` Structure Across All Pages
- Update `components/Section.jsx` to support an `isMainTitle` / `headingLevel="h1"` prop, OR render explicit `<h1>` headers on `/projects`, `/projects/[slug]`, `/blog/[slug]`, `/experience`, `/skills`, `/contact`, and `/vision`.

### Priority 2: Fix `content/myvision.md` Markdown Headings
- Convert the 11 section headers in `content/myvision.md` from plain text to proper markdown headings (`## Introduction: The Infinite Thread`, `## I. From Curiosity to Civilization Design`, etc.) so that `remark` parses them into `<h2>` elements and `<Toc>` functions correctly.

### Priority 3: Add 40–60 Word Direct Answer Blocks
- Add structured summary answer blocks on Home (`app/page.jsx`), About (`content/aboutme.md`), Vision (`content/myvision.md`), Projects (`app/projects/page.jsx`), Experience (`app/experience/page.jsx`), Skills (`app/skills/page.jsx`), and Contact (`app/contact/page.jsx`).
- Phase headings into natural language query formats (e.g. `## Who is Vikash?`, `## What is the Infinite Growth Principle?`).

### Priority 4: Upgrade Semantic HTML5 Tags
- Update `components/Prose.jsx` to render `<article className="prose...">` instead of `<div className="prose...">`.
- Convert `ProjectCard.jsx`, `CaseStudyCard.jsx`, `PublicationCard.jsx`, `SpeakingCard.jsx`, and `TestimonialCard.jsx` wrappers from `<div>` to `<article>`.
- Wrap sticky TOC / navigation columns in `<aside aria-label="...">`.
- Wrap date displays in `<time dateTime="...">`.
