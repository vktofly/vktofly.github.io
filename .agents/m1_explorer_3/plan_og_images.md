# Plan: OpenGraph Metadata, Twitter Cards & Image Alt Verification

## 1. Executive Summary
- **OpenGraph & Twitter Cards**: 8 pages lack explicit Twitter card metadata, causing fallback to root default metadata. 12+ blog routes and 8+ book routes reference non-existent `/og/blog/*.png` and `/og/*.png` assets without fallback to `/og.png` or `/og/blog.png`.
- **Title Double Suffixing**: 14 route pages pass `Title — Vikash`, which combining with `template: '%s — Vikash'` in `layout.jsx` renders double suffixes like `About — Vikash — Vikash`.
- **Image Alt Tags**: 7 UI components lack safe string fallbacks on dynamic `alt` attributes, risking `undefined` or `undefined by undefined` if data fields are missing.
- **Worker Action Scope**: 1 utility helper (`lib/og-images.js`), 3 dynamic routes, 11 static route files, 7 component files, and 2 markdown loaders.

---

## 2. OpenGraph & Twitter Metadata Audit

### 2.1 Root & Route Metadata Matrix

| Route / File | Canonical URL | OG Image URL | OG Image Exists? | Twitter Card Present? | Title Template Status |
|---|---|---|---|---|---|
| `app/layout.jsx` | `https://vktofly.github.io/` | `/og.png` | Yes (1200x630) | Yes (`summary_large_image`) | Base Template: `%s — Vikash` |
| `app/blog/[slug]/page.jsx` | `/blog/${slug}/` | `/og/blog/${slug}.png` | Only 3 of 15 exist | Yes | Double suffix bug (`${post.title} — Vikash`) |
| `app/projects/[slug]/page.jsx` | `/projects/${slug}/` | `/og.png` | Yes | **Missing** (inherits root) | Double suffix bug (`${project.title} — Projects — Vikash`) |
| `app/books/[slug]/page.jsx` | `/books/${slug}/` | `/og/blog/${slug}.png` | **0 of 8 exist (404)** | **Missing** (inherits root) | Double suffix bug (`${blog.title} — Book Review`) |
| `app/blog/page.jsx` | `/blog/` | `/og/blog.png` | Yes | **Missing** (inherits root) | Double suffix bug (`Blog — Vikash`) |
| `app/books/page.jsx` | `/books/` | `/og/books.png` | **No (404)** | Yes (`/og/books.png` 404) | Double suffix bug (`Books — Vikash`) |
| `app/about/page.jsx` | `/about/` | `/og/about.png` | **No (404)** | Yes (`/og/about.png` 404) | Double suffix bug (`About — Vikash`) |
| `app/projects/page.jsx` | `/projects/` | `/og/projects.png` | **No (404)** | **Missing** (inherits root) | Double suffix bug (`Projects — Vikash`) |
| `app/experience/page.jsx` | `/experience/` | `/og/experience.png` | **No (404)** | **Missing** (inherits root) | Needs bare title |
| `app/skills/layout.jsx` | `/skills/` | `/og/skills.png` | **No (404)** | **Missing** (inherits root) | Double suffix bug (`Skills & Expertise — Vikash`) |
| `app/vision/page.jsx` | `/vision/` | `/og/vision.png` | **No (404)** | Yes (`/og/vision.png` 404) | Double suffix bug (`Vision — Vikash`) |
| `app/people/page.jsx` | `/people/` | `/og/people.png` | **No (404)** | **Missing** (inherits root) | Double suffix bug (`Influential People — Vikash`) |
| `app/resources/page.jsx` | `/resources/` | `/og/resources.png` | **No (404)** | Yes (`/og/resources.png` 404) | Double suffix bug (`Resources — Vikash`) |
| `app/content/page.jsx` | `/content/` | `/og/content.png` | **No (404)** | **Missing** (inherits root) | Double suffix bug (`Content & Recognition — Vikash`) |
| `app/glossary/page.jsx` | `/glossary/` | `/og/glossary.png` | **No (404)** | Yes (`/og/glossary.png` 404) | Double suffix bug (`Glossary — Vikash`) |
| `app/contact/layout.jsx` | `/contact/` | `/og/contact.png` | **No (404)** | **Missing** (inherits root) | Double suffix bug (`Contact — Vikash`) |

### 2.2 Root Cause in `lib/og-images.js`
`getOgImage` in `lib/og-images.js` blindly synthesizes paths like `/og/about.png`, `/og/books.png`, and `/og/blog/${slug}.png`.
Existing files in `public/og/`:
- `public/og.png` (Default site banner)
- `public/og/blog.png` (Default blog banner)
- `public/og/blog/freedom-from-known-algorithm.png`
- `public/og/blog/infinite-growth-principle.png`
- `public/og/blog/the-book-that-redefined-my-understanding-of-progress.png`

**Required Solution**:
Update `lib/og-images.js` with an asset existence fallback mechanism:
1. If slug-specific image exists on disk (`public/og/${page}/${slug}.png`), use it.
2. Else if page image exists (`public/og/${page}.png`), use it.
3. Else if page is 'blog' or 'books', fallback to `/og/blog.png`.
4. Otherwise fallback to `/og.png`.

---

## 3. Image Alt Tag Audit & Fallback Hardening

### 3.1 Content & Card Images Audit

| Component | Line | Tag | Current `alt` | Fallback Risk | Recommended Code Fix |
|---|---|---|---|---|---|
| `BlogPostCard.jsx` | 68 | `<Image>` | `{post.title}` | If `post.title` undefined -> `undefined` | `alt={post.title \|\| "Blog post cover"}` |
| `FeaturedBlogPost.jsx` | 58 | `<Image>` | `{ogImage.alt}` | Fallbacks to slug string | `alt={post.title \|\| ogImage.alt \|\| "Featured blog post"}` |
| `BookCard.jsx` | 105 | `<Image>` | `{\`${book.title} by ${book.author}\`}` | If fields missing -> `"undefined by undefined"` | `alt={book.title ? (book.author ? \`${book.title} by ${book.author}\` : book.title) : "Book cover"}` |
| `InteractiveTimelineItem.jsx` | 46 | `<Image>` | `{item.company}` | If `item.company` missing -> `undefined` | `alt={item.company \|\| "Company logo"}` |
| `PersonCard.jsx` | 41 | `<Image>` | `{person.name}` | If `person.name` missing -> `undefined` | `alt={person.name \|\| "Portrait of thinker"}` |
| `ProjectCard.jsx` | 57 | `<Image>` | `{project.title \|\| "Project"}` | Safe | Keep as `alt={project.title \|\| "Project thumbnail"}` |
| `TestimonialCard.jsx` | 26 | `<Image>` | `{testimonial.author}` | If `testimonial.author` missing -> `undefined` | `alt={testimonial.author \|\| "Testimonial author avatar"}` |
| `VideoCard.jsx` | 64 | `<Image>` | `{video.title}` | If `video.title` missing -> `undefined` | `alt={video.title \|\| "Video thumbnail"}` |
| `app/books/[slug]/page.jsx` | 104 | `<Image>` | `{\`${book.title} by ${book.author}\`}` | Missing book props | `alt={book ? \`${book.title} by ${book.author}\` : "Book cover"}` |
| `app/books/BooksFilter.jsx` | 463 | `<Image>` | `{\`${book.title} by ${book.author}\`}` | Missing book props | `alt={book.title ? (book.author ? \`${book.title} by ${book.author}\` : book.title) : "Book cover"}` |

### 3.2 Decorative Background Images (16 instances)
- Found across `app/blog/page.jsx`, `app/books/BooksPageClient.jsx`, `app/books/[slug]/page.jsx`, `app/content/page.jsx`, `app/experience/page.jsx`, `app/people/page.jsx`, `app/projects/page.jsx`, `app/resources/page.jsx`, and `app/skills/page.jsx`.
- All decorative background `<Image>` elements currently have `alt=""` and `unoptimized`.
- In WCAG 2.1 / HTML5, `alt=""` is correct for non-text decorative visuals. Worker must ensure `aria-hidden="true"` or `alt=""` is consistently maintained on all 16 background elements.

---

## 4. Markdown Loader Hygiene
- In `lib/blog.js` and `lib/book-blog.js`:
  `getAllPostFiles()` and `getAllBookBlogFiles()` must exclude `readme.md`, `_template.md`, and any files starting with `_`.
- Fix snippet:
```javascript
export async function getAllPostFiles() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name) && !['readme.md', '_template.md'].includes(e.name.toLowerCase()) && !e.name.startsWith('_'))
      .map((e) => e.name);
  } catch {
    return [];
  }
}
```

---

## 5. Worker Validation Checks

Worker must implement and run programmatic assertions verifying:
1. **Zero Double Suffix Titles**: `<title>` in all built `.html` files in `out/` must not contain `— Vikash — Vikash`.
2. **100% Valid OpenGraph Tags**: Every page has non-empty `<meta property="og:title">`, `<meta property="og:description">`, and `<meta property="og:image">`.
3. **100% Valid Twitter Tags**: Every page has `<meta name="twitter:card" content="summary_large_image">`, `<meta name="twitter:title">`, and `<meta name="twitter:image">`.
4. **Zero Missing or Broken OG Images**: All `og:image` and `twitter:image` URLs resolve to files physically present in `out/` or `public/`.
5. **100% Image Alt Presence**: All `<img>` tags in HTML contain the `alt` attribute, with no instance of `alt="undefined"`, `alt="null"`, or `alt="[object Object]"`.
