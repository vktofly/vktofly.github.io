# Original User Request

## 2026-08-25T13:21:42Z

Perform traditional Search Engine Optimization (SEO) and LLM Optimization (GEO) on a Next.js personal portfolio website (vktofly.github.io). The goal is to improve rankings on Google and traditional search engines while simultaneously making the profile highly extractable and citable by AI assistants (ChatGPT, Perplexity, AI Overviews).

Working directory: c:\Users\vikash\Documents\vktofly.github.io
Integrity mode: demo

## Requirements

### R1. Traditional SEO (Technical & On-Page)
- Audit and optimize meta titles and descriptions across all pages for target keywords.
- Ensure proper canonical URLs and open graph (OG) tags are implemented.
- Check and fix any missing `alt` attributes on images for accessibility and image search.

### R2. LLM-Extractable Content Structures
- Update core pages to include 40-60 word direct answer blocks that clearly summarize key information (e.g., "Who is Vikash?").
- Structure headings (`h1`, `h2`, `h3`) as natural language queries where appropriate for AI extraction.

### R3. Structured Data (Schema Markup)
- Implement JSON-LD schema markup across the site. Use `Person` schema on the About page and `Article`/`BlogPosting` schema on blog posts to benefit both traditional and AI search.

### R4. Machine-Readable Code & Context
- Ensure semantic HTML5 tags (`<main>`, `<article>`, `<section>`) are used cleanly.
- Review and refine `llms.txt` and generated context files for optimal AI agent parsing.

## Verification Resources
- A script should be written to programmatically verify the presence of `<script type="application/ld+json">`, `<title>`, and `<meta name="description">` tags in the built HTML files.
- Run a static analysis script to ensure all `<img>` tags have `alt` attributes.
- Agent-as-judge to verify 40-60 word summary blocks exist on the core pages.

## Acceptance Criteria

### Technical SEO & Semantic HTML
- [ ] Every page has a unique `<title>` and `<meta name="description">`.
- [ ] No `<img>` tags are missing `alt` attributes.
- [ ] Core pages use semantic HTML5 structural elements.

### LLM Optimization & Schema
- [ ] JSON-LD schema markup is present in the DOM for the About page (`Person`) and blog posts.
- [ ] Core pages contain at least one standalone 40-60 word summary block.
