# BRIEFING — 2026-08-25T13:20:00Z

## Mission
Implement GEO/LLMO optimizations for vktofly.github.io across content structures, heading hierarchies, structured data, semantic HTML, machine-readable files, and automated verification tests.

## 🔒 My Identity
- Archetype: teamwork_preview_worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\vikash\Documents\vktofly.github.io\.agents\teamwork_preview_worker_1
- Original parent: 33de982e-6691-4688-87e6-adf00ed0af87
- Milestone: M1, M2, M3, M4

## 🔒 Key Constraints
- DO NOT CHEAT. All implementations must be genuine.
- Strict sequential heading hierarchy (h1 -> h2 -> h3).
- 40-60 word standalone direct answer blocks under natural-language query headings.
- Valid JSON-LD schema markup with canonical @id for Person and ProfilePage, BlogPosting.
- Semantic HTML (<main>, <article>).
- Test script verifying build output in `out/`.

## Current Parent
- Conversation ID: 33de982e-6691-4688-87e6-adf00ed0af87
- Updated: 2026-08-25T13:20:00Z

## Task Summary
- **What to build**: Full GEO/LLMO optimization suite and programmatic verification test
- **Success criteria**: Strict h1-h2-h3 hierarchy, 40-60 word summaries, valid JSON-LD schemas, semantic tags, passing verification test suite
- **Interface contracts**: PROJECT.md

## Change Tracker
- **Files modified**: [TBD]
- **Build status**: [TBD]
- **Pending issues**: [TBD]

## Quality Status
- **Build/test result**: [TBD]
- **Lint status**: clean
- **Tests added/modified**: `scripts/verify-geo-llmo.mjs`, `package.json` test scripts

## Loaded Skills
- None required directly (core Next.js, Schema.org, HTML5 semantics, Markdown)

## Key Decisions Made
- Use `<article>` in `components/Prose.jsx` for semantic wrapping.
- Normalize post titles to `<h1>` and headings to `<h2>`/`<h3>`.
- Programmatic verification script `scripts/verify-geo-llmo.mjs` checking static HTML export in `out/`.

## Artifact Index
- `.agents/teamwork_preview_worker_1/DISPATCH.md` — Assignment record
- `.agents/teamwork_preview_worker_1/BRIEFING.md` — Agent memory
- `.agents/teamwork_preview_worker_1/progress.md` — Progress tracker
- `.agents/teamwork_preview_worker_1/handoff.md` — Final handoff report
