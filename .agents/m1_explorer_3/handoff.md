# Handoff Report — Milestone 1: Image Alt Tag Verification & OpenGraph Meta

## 1. Observation
1. **OpenGraph & Twitter Card Metadata**:
   - `app/layout.jsx:59-82` defines global OpenGraph and Twitter card configurations referencing `/og.png`.
   - Dynamic route `app/projects/[slug]/page.jsx:28-41` specifies `openGraph` but omits `twitter`, causing Next.js to fall back to root layout Twitter metadata (`Vikash — Polymath, Futurist & Founder`).
   - Dynamic route `app/books/[slug]/page.jsx:35-40` specifies `openGraph` with `images: [generateOgImageMetadata("blog", params.slug, blog.title)]` but omits `twitter`, and resolves to non-existent `/og/blog/${params.slug}.png`.
   - Dynamic route `app/blog/[slug]/page.jsx:69-86` generates `/og/blog/${post.slug}.png` for all 15 blog posts, but only 3 posts (`freedom-from-known-algorithm`, `infinite-growth-principle`, `the-book-that-redefined-my-understanding-of-progress`) have image files in `public/og/blog/`. The other 12 routes render 404 image URLs in metadata.
   - Static pages (`app/about/page.jsx:43`, `app/books/page.jsx:34`, `app/experience/page.jsx:40`, `app/skills/layout.jsx:23`, `app/vision/page.jsx:33`, `app/people/page.jsx:35`, `app/resources/page.jsx:40`, `app/content/page.jsx:32`, `app/glossary/page.jsx:26`, `app/contact/layout.jsx:17`) reference `/og/{page}.png`, which do not exist in `public/og/`.
2. **Title Template Double Suffixing**:
   - `app/layout.jsx:20-23` sets `title: { default: 'Vikash — Polymath, Futurist & Founder', template: '%s — Vikash' }`.
   - `app/blog/[slug]/page.jsx:65` returns `title: \`${post.title} — Vikash\``, resulting in rendered HTML `<title>The Infinite Growth Principle — Vikash — Vikash</title>` (`out/blog/infinite-growth-principle/index.html:1`).
   - `app/projects/[slug]/page.jsx:23` returns `title: \`${project.title} — Projects — Vikash\``, resulting in rendered HTML `<title>Direct Preference Optimization (DPO) from Scratch — Projects — Vikash — Vikash</title>` (`out/projects/dpo-from-scratch/index.html:1`).
3. **Image Alt Tags**:
   - `components/BlogPostCard.jsx:68`: `<Image src={imageUrl} alt={post.title} ... />` lacks default fallback if `post.title` is falsy.
   - `components/BookCard.jsx:105`: `<Image src={book.coverImage} alt={\`${book.title} by ${book.author}\`} ... />` yields `"undefined by undefined"` if fields are missing.
   - `components/InteractiveTimelineItem.jsx:46`: `<Image src={item.logo} alt={item.company} ... />` lacks fallback string.
   - `components/PersonCard.jsx:41`: `<Image src={person.image} alt={person.name} ... />` lacks fallback string.
   - `components/TestimonialCard.jsx:26`: `<Image src={testimonial.avatar} alt={testimonial.author} ... />` lacks fallback string.
   - `components/VideoCard.jsx:64`: `<Image src={video.thumbnail} alt={video.title} ... />` lacks fallback string.
   - 16 decorative background `<Image>` instances across 9 pages correctly use `alt=""` and `unoptimized`.

---

## 2. Logic Chain
1. OpenGraph image helper `lib/og-images.js` constructs image paths dynamically without checking if files exist on disk. Because only `/og.png`, `/og/blog.png`, and 3 blog-specific images exist, all other page calls produce 404 image URLs in production metadata.
2. Next.js metadata inheritance does not copy `openGraph` properties to `twitter` when `twitter` is missing from child pages; it falls back to root `layout.jsx` Twitter tags. Dynamic routes omitting `twitter` display generic homepage cards when shared on Twitter/X.
3. Next.js applies the root layout `template: '%s — Vikash'` to any string title returned by child pages. When child pages already append `— Vikash`, Next.js appends a second suffix. Passing bare title strings (e.g. `title: 'About'`) or `{ absolute: '...' }` solves the issue.
4. Dynamic expressions inside `alt={...}` props without nullish coalescing operators evaluate to `undefined` or `"undefined by undefined"` if data objects have missing properties. Explicit fallbacks guarantee 100% compliant `alt` attributes.

---

## 3. Caveats
- No new OG image graphics files need to be created if `lib/og-images.js` falls back gracefully to `/og/blog.png` (for articles/reviews) and `/og.png` (for site pages).
- Background decorative images with `alt=""` comply with WCAG 2.1 Success Criterion 1.1.1; they must not be assigned fake descriptive text that impairs screen reader experiences.

---

## 4. Conclusion
1. Update `lib/og-images.js` to implement an asset existence lookup table that falls back to `/og/blog.png` or `/og.png`.
2. Update all dynamic routes (`app/blog/[slug]/page.jsx`, `app/projects/[slug]/page.jsx`, `app/books/[slug]/page.jsx`) and static layouts/pages to specify bare titles and explicit `twitter` card objects.
3. Update 7 component files (`BlogPostCard.jsx`, `FeaturedBlogPost.jsx`, `BookCard.jsx`, `InteractiveTimelineItem.jsx`, `PersonCard.jsx`, `TestimonialCard.jsx`, `VideoCard.jsx`) with resilient `alt` fallback strings.
4. Update `lib/blog.js` and `lib/book-blog.js` to filter out non-post files (`README.md`, `_TEMPLATE.md`).

---

## 5. Verification Method
1. **Inspect plan**: View `c:\Users\vikash\Documents\vktofly.github.io\.agents\m1_explorer_3\plan_og_images.md`.
2. **Build and test HTML export**:
   ```bash
   npm run build
   ```
3. **Run validation checks**:
   - Check `<title>` tags in `out/**/*.html` for absence of `— Vikash — Vikash`.
   - Check `og:image` and `twitter:image` tags in `out/**/*.html` for valid image URLs.
   - Check `<img>` tags in `out/**/*.html` for non-null `alt` attributes.
