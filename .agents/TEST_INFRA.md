# E2E Test Infra: vktofly.github.io GEO/LLMO Optimization

## Test Philosophy
- Opaque-box, requirement-driven verification against pre-rendered static HTML in `out/` and machine-readable assets.
- Methodology: Multi-tier testing covering Feature Coverage, Boundary Cases, Cross-Feature Combinations, and Real-World LLM Ingestion.

## Feature Inventory & Test Coverage
| # | Feature | Source | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Cross) | Tier 4 (Scenario) |
|---|---------|--------|:----------------:|:-----------------:|:--------------:|:-----------------:|
| 1 | Answer Blocks (40-60 words) | ORIGINAL_REQUEST §R1, AC | 5 | 5 | ✓ | ✓ |
| 2 | Query Headings | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | Sequential Heading Hierarchy | ORIGINAL_REQUEST §R1, AC | 5 | 5 | ✓ | ✓ |
| 4 | Person Schema on About | ORIGINAL_REQUEST §R2, AC | 5 | 5 | ✓ | ✓ |
| 5 | BlogPosting Schema on Posts | ORIGINAL_REQUEST §R2, AC | 5 | 5 | ✓ | ✓ |
| 6 | Semantic HTML5 (`<main>`, `<article>`) | ORIGINAL_REQUEST §R3, AC | 5 | 5 | ✓ | ✓ |
| 7 | Machine-Readable Assets (`llms.txt`, `robots.txt`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test runner: `scripts/verify-geo-llmo.mjs`
- Invocation: `node scripts/verify-geo-llmo.mjs` (or `npm run verify:geo` / `npm test`)
- Pass/fail semantics: Exit code 0 on all tests passing; detailed console log with per-test status; non-zero exit on failure.
- Target inspection directories: `out/about/index.html`, `out/vision/index.html`, `out/index.html`, `out/blog/*/index.html`, `out/llms.txt`, `out/robots.txt`, `out/sitemap.xml`.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised |
|---|----------|--------------------|
| 1 | LLM Direct Answer Extraction (Perplexity/GPTBot query "Who is Vikash?") | F1, F2, F6 |
| 2 | Knowledge Graph Ingestion (Google Knowledge Panel JSON-LD Person parsing) | F4, F5 |
| 3 | Full Document Semantic Traversal (Sequential Heading tree parsing) | F3, F6 |
| 4 | Agent Ingestion Pipeline (`llms.txt` + `robots.txt` + `sitemap.xml`) | F7 |
| 5 | Blog Article Entity Attribution (Author linking to Person `@id`) | F4, F5 |
