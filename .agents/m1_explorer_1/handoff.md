# Handoff Report: Milestone 1 Title Double Suffix & Canonical URLs

## 1. Observation
1. **Root Layout Configuration (`app/layout.jsx:20-23`)**:
   ```javascript
   export const metadata = {
     title: {
       default: 'Vikash — Polymath, Futurist & Founder',
       template: '%s — Vikash',
     },
   ```
2. **Page Title Definitions with Hardcoded Suffix**:
   - `app/page.jsx:20`: `title: "Vikash — Polymath, Futurist & Founder"`
   - `app/about/page.jsx:15`: `title: "About — Vikash"`
   - `app/books/page.jsx:7`: `title: "Books — Vikash"`
   - `app/content/page.jsx:14`: `title: "Content & Recognition — Vikash"`
   - `app/glossary/page.jsx:7`: `title: "Glossary — Vikash"`
   - `app/people/page.jsx:10`: `title: "Influential People — Vikash"`
   - `app/projects/page.jsx:13`: `title: 'Projects — Vikash'`
   - `app/resources/page.jsx:14`: `title: "Resources — Vikash"`
   - `app/skills/layout.jsx:5`: `title: 'Skills & Expertise — Vikash'`
   - `app/vision/page.jsx:10`: `title: 'Vision — Vikash'`
   - `app/blog/page.jsx:34`: `title: "Blog — Vikash"`
   - `app/blog/[slug]/page.jsx:65`: `title: `${post.title} — Vikash``
   - `app/blog/[slug]/amp/page.jsx:23`: `title: `${post.title} — Vikash``
   - `app/contact/layout.jsx:4`: `title: 'Contact — Vikash'`
   - `app/projects/[slug]/page.jsx:23`: `title: `${project.title} — Projects — Vikash``
3. **Canonical URLs and Trailing Slash in `app/projects/[slug]/page.jsx`**:
   - `app/projects/[slug]/page.jsx:20`: `const url = \`https://vktofly.github.io/projects/${project.slug}\`;`
   - `app/projects/[slug]/page.jsx:26`: `canonical: url,`
   - `app/projects/[slug]/page.jsx:55`: `const url = \`https://vktofly.github.io/projects/${project.slug}\`;`
   - `app/projects/[slug]/page.jsx:86`: `"item": "https://vktofly.github.io/projects"`
   - `next.config.mjs:5`: `trailingSlash: true`
   - All other routes (`app/about/page.jsx:55`, `app/books/page.jsx:45`, `app/blog/[slug]/page.jsx:88`, etc.) use `/path/` with trailing slash.

---

## 2. Logic Chain
1. *Observation 1* establishes that `app/layout.jsx` configures the Next.js App Router metadata `title.template` to `'%s — Vikash'`.
2. In Next.js App Router, any child route exporting a string `title: S` is evaluated at build time as `template.replace('%s', S)`, producing `S — Vikash`.
3. *Observation 2* shows that 15 page/layout files export string titles that already contain `— Vikash` (e.g. `"About — Vikash"`). Substituting `"About — Vikash"` into `'%s — Vikash'` generates `<title>About — Vikash — Vikash</title>`, creating a double-suffix defect across the site.
4. On `app/page.jsx`, `"Vikash — Polymath, Futurist & Founder"` becomes `Vikash — Polymath, Futurist & Founder — Vikash`. Replacing it with `title: { absolute: "Vikash — Polymath, Futurist & Founder" }` tells Next.js to bypass the parent template.
5. On child pages (e.g. `app/about/page.jsx`), changing `title` to bare string `"About"` causes the parent template to cleanly render `<title>About — Vikash</title>`.
6. On dynamic post and project pages (`app/blog/[slug]/page.jsx`, `app/projects/[slug]/page.jsx`), setting `title: post.title` and `title: `${project.title} — Projects`` causes the parent template to render `<title>${post.title} — Vikash</title>` and `<title>${project.title} — Projects — Vikash</title>`.
7. *Observation 3* shows `next.config.mjs` enforces `trailingSlash: true`, and all core routes end in `/`. However, `app/projects/[slug]/page.jsx` omits the trailing slash in `url`, `alternates.canonical`, and the breadcrumb schema item, causing a canonical mismatch with the exported HTML structure.

---

## 3. Caveats
- No caveats. The Next.js metadata resolution specification and static export behavior for `title.template` and `alternates.canonical` have been directly verified against all 25 page/layout files in `app/`.

---

## 4. Conclusion
1. 15 files require title adjustments to eliminate double suffixing.
2. 1 file (`app/projects/[slug]/page.jsx`) requires trailing slash normalization across its canonical URL, openGraph URL, and breadcrumb schema item.
3. The exact before/after line replacements are detailed in `.agents/m1_explorer_1/plan_titles.md`.

---

## 5. Verification Method
1. **Source Inspection**:
   Inspect the modified files listed in `plan_titles.md` to ensure no title contains a redundant `— Vikash` suffix that conflicts with `layout.jsx`.
2. **Build and Static HTML Output Verification**:
   ```bash
   npm run build
   ```
   Inspect generated HTML files in `out/`:
   - Verify `out/index.html` contains `<title>Vikash — Polymath, Futurist & Founder</title>`.
   - Verify `out/about/index.html` contains `<title>About — Vikash</title>` (and no `About — Vikash — Vikash`).
   - Verify `out/projects/*/index.html` contains `<link rel="canonical" href="https://vktofly.github.io/projects/.../"/>`.
3. **Automated Verification Script**:
   When `scripts/verify-seo-schema.mjs` runs, regex check `/<title>.*— Vikash — Vikash.*<\/title>/` must return 0 matches across all `out/**/*.html`.
