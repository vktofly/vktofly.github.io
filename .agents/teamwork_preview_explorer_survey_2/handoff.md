# Handoff Report — Explorer 2: Structured Data & Schema Markup (R2)

## 1. Observation
- `next.config.mjs:3`: `output: 'export'` configures static HTML generation.
- `components/JsonLd.jsx:1-4`: Component renders `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />`.
- `app/layout.jsx:109-209`: Global `Organization`, `WebSite`, and `Person` schemas defined in `structuredData` array and rendered into `<head>` at line 216.
- `app/about/page.jsx:74-103`: Local `Person` schema rendered in page body, declaring `founder: "23+ technology companies"` (invalid Schema.org property on `Person`) and `alumniOf: "Multiple ventures and research institutions"`.
- `app/blog/[slug]/page.jsx:139-167`: Blog post renders `BlogPosting` schema with relative `image: ogImage.url` (`/og/blog/...`) and unlinked `author: { "@type": "Person", name: "Vikash" }`.
- `out/about/index.html` & `out/blog/infinite-growth-principle/index.html`: Build inspection verified that all JSON-LD `<script type="application/ld+json">` tags are fully rendered into static HTML output.
- `lib/meta-generator.js:15-47`: Sentence splitting bug causes empty meta descriptions (`content=" | Philosophy, Systems"`).

## 2. Logic Chain
1. *From Next.js static export config (`next.config.mjs:3`) and build verification (`out/**/*.html`)*: The `<JsonLd>` component correctly injects schemas into pre-rendered static HTML, making all structured data immediately accessible to AI crawlers (GPTBot, Perplexity, CCBot) without client-side hydration.
2. *From layout (`app/layout.jsx:165-208`) vs about page (`app/about/page.jsx:74-103`)*: Having two distinct `Person` schemas across layout and about page creates fragmented entity signals. Aligning with an entity graph (`@id: "https://vktofly.github.io/#person"`) and converting the about page to `ProfilePage` (`mainEntity: {"@id": "#person"}`) establishes clean entity disambiguation for LLMs.
3. *From blog schema (`app/blog/[slug]/page.jsx:139-167`)*: The existing `BlogPosting` schema is syntactically active, but lacks absolute image URLs (`https://vktofly.github.io/...`) and canonical author `@id` linking.
4. *From meta-generator analysis (`lib/meta-generator.js:15-47`)*: A fallback edge case corrupts meta descriptions in static blog builds.

## 3. Caveats
- AMP blog routes (`app/blog/[slug]/amp/page.jsx`) currently do not include JSON-LD schemas; AMP pages are secondary to standard web pages.
- Social links in `data/socials.js` (Twitter, LinkedIn, GitHub) are complete, but additional scholarly profile links (Google Scholar, ORCID) can be added if available.

## 4. Conclusion
The structured data infrastructure is already established via `components/JsonLd.jsx` and Next.js App Router pre-rendering. Implementation requires three high-impact enhancements:
1. Standardize the canonical `Person` schema and link `WebSite`, `Organization`, and `BlogPosting` to `@id: "https://vktofly.github.io/#person"`.
2. Convert `app/about/page.jsx` schema to `ProfilePage` referencing the canonical Person entity.
3. Fix relative image URLs in `app/blog/[slug]/page.jsx` `BlogPosting` schema and resolve the description fallback bug in `lib/meta-generator.js`.

## 5. Verification Method
1. **Build Test**: Run `npx next build` and inspect `out/about/index.html` and `out/blog/*/index.html`.
2. **Schema Tag Verification**: Run Node script to assert `<script type="application/ld+json">` contains valid `Person` on About page and `BlogPosting` on blog post pages with absolute URLs.
3. **Invalidation Condition**: If JSON-LD tags fail to appear in `out/*.html` or if Schema.org validator detects syntax/property errors.
