# E2E Test Infra: Next.js Portfolio SEO & GEO

## Test Philosophy
- Opaque-box, requirement-driven verification of built HTML artifacts in `out/` and machine-readable context files.
- No direct dependency on internal React component implementation details — validates final rendered HTML DOM and structured data.

## Test Methodology
- **Tier 1: Feature Coverage (≥5 tests per feature)**:
  - Validates `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:title">`, `<meta property="og:description">`, `<img> alt` attributes, JSON-LD schemas, and `llms.txt`.
- **Tier 2: Boundary & Corner Cases (≥5 tests per feature)**:
  - Validates absence of double suffixing (`— Vikash — Vikash`), non-empty descriptions, valid ISO dates in schemas, valid absolute URLs in schemas, exclusion of `/admin/` and `_TEMPLATE.md` from sitemap.
- **Tier 3: Cross-Feature Combinations**:
  - Validates entity graph consistency (`@id: https://vktofly.github.io/#person` referenced in `BlogPosting.author` and `WebSite.publisher`), canonical URL matching OG URL and sitemap URL.
- **Tier 4: Real-World AI / Search Engine Scenarios**:
  - Simulates Perplexity/ChatGPT extraction of 40-60 word direct answers from core pages.
  - Simulates Google Rich Results validation for `Person` and `BlogPosting` structured data.
- **Tier 5: Adversarial Hardening**:
  - Scans all generated HTML files in `out/` for broken links, unescaped entities, malformed JSON-LD scripts, missing headings, or unrendered markdown.

## Test Architecture
- **Runner Script**: `scripts/verify-seo-schema.mjs`
- **Execution Command**: `node scripts/verify-seo-schema.mjs`
- **Pass/Fail Criteria**: Exit code 0 if all assertions pass; non-zero with failure diagnostic details if any assertion fails.
- **Output Report**: Detailed assertion breakdown per page route and schema type.
