# BRIEFING — 2026-08-25T13:28:00Z

## Mission
Investigate Schema Markup (JSON-LD) and Machine-Readable Context (llms.txt, sitemaps, robots.txt, markdown/content pipeline, verification test setup) across the Next.js portfolio website.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Schema Markup & Machine-Readable Context Investigator
- Working directory: c:\Users\vikash\Documents\vktofly.github.io\.agents\explorer_survey_3\
- Original parent: 5d7f0243-850b-4f3f-8c76-9d2064c2817b
- Milestone: Phase 1 Exploratory Survey Complete

## 🔒 Key Constraints
- Read-only investigation — do NOT implement changes in codebase
- Write only to .agents/explorer_survey_3/
- Adhere to user output style: concise, direct, numbered multi-step, ADHD-friendly, max 5 items per list

## Current Parent
- Conversation ID: 5d7f0243-850b-4f3f-8c76-9d2064c2817b
- Updated: 2026-08-25T13:28:00Z

## Investigation State
- **Explored paths**: `app/layout.jsx`, `app/about/page.jsx`, `app/blog/[slug]/page.jsx`, `app/blog/page.jsx`, `app/vision/page.jsx`, `app/projects/page.jsx`, `app/projects/[slug]/page.jsx`, `app/skills/page.jsx`, `app/skills/layout.jsx`, `app/books/page.jsx`, `app/books/[slug]/page.jsx`, `app/resources/page.jsx`, `components/JsonLd.jsx`, `components/FAQSchema.jsx`, `lib/blog.js`, `lib/book-blog.js`, `lib/markdown.js`, `scripts/generate-llms-context.js`, `scripts/data-management.mjs`, `next-sitemap.config.js`, `public/llms.txt`, `public/llms-small.txt`, `public/llms-full.txt`, `out/**/*.html`.
- **Key findings**:
  1. JSON-LD scripts are pre-rendered into static HTML during build via `components/JsonLd.jsx`.
  2. Schema image URLs point to 404 paths (`proflephoto.jpg` vs `profile_photo.png`).
  3. Schemas in `app/projects/page.jsx` and `app/books/page.jsx` are defined in code but never rendered to JSX.
  4. Content loaders & context generator parse `README.md` and `_TEMPLATE.md` as blog posts, leaking into sitemap and llms.txt.
  5. No static verification script exists for auditing `out/` HTML for schemas, tags, or alt attributes.
- **Unexplored areas**: None within scope.

## Key Decisions Made
- Delivered full survey report to `survey_schema_llms.md` and 5-component handoff report to `handoff.md`.

## Artifact Index
- `.agents/explorer_survey_3/survey_schema_llms.md` — Detailed survey report
- `.agents/explorer_survey_3/handoff.md` — 5-component handoff report
- `.agents/explorer_survey_3/progress.md` — Liveness heartbeat tracker
