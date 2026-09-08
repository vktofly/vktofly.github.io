# Title Suffix & Canonical URL Fix Plan (Milestone 1)

## Root Cause Summary
`app/layout.jsx` lines 20-23 defines:
```javascript
title: {
  default: 'Vikash — Polymath, Futurist & Founder',
  template: '%s — Vikash',
}
```
When child pages define `title` with a hardcoded `— Vikash` suffix (e.g. `title: "About — Vikash"`), Next.js App Router evaluates the layout template and appends `— Vikash` a second time, resulting in `<title>About — Vikash — Vikash</title>`.

On the homepage (`app/page.jsx`), `title: "Vikash — Polymath, Futurist & Founder"` gets templated to `Vikash — Polymath, Futurist & Founder — Vikash`.

On dynamic routes (`app/blog/[slug]/page.jsx`, `app/projects/[slug]/page.jsx`, `app/blog/[slug]/amp/page.jsx`), titles are constructed with `${title} — Vikash` or `${title} — Projects — Vikash`, leading to double suffixing.

---

## Detailed File-by-File Fix Strategy

### 1. `app/page.jsx`
- **Location**: Line 20
- **Current**:
```javascript
export const metadata = {
  title: "Vikash — Polymath, Futurist & Founder",
```
- **Replacement**:
```javascript
export const metadata = {
  title: {
    absolute: "Vikash — Polymath, Futurist & Founder",
  },
```
- **Rendered Output**: `<title>Vikash — Polymath, Futurist & Founder</title>`

---

### 2. `app/about/page.jsx`
- **Location**: Line 15
- **Current**:
```javascript
export const metadata = {
  title: "About — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "About",
```
- **Rendered Output**: `<title>About — Vikash</title>`
- **Canonical Status**: `/about/` (Valid)

---

### 3. `app/books/page.jsx`
- **Location**: Line 7
- **Current**:
```javascript
export const metadata = {
  title: "Books — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "Books",
```
- **Rendered Output**: `<title>Books — Vikash</title>`
- **Canonical Status**: `/books/` (Valid)

---

### 4. `app/content/page.jsx`
- **Location**: Line 14
- **Current**:
```javascript
export const metadata = {
  title: "Content & Recognition — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "Content & Recognition",
```
- **Rendered Output**: `<title>Content & Recognition — Vikash</title>`
- **Canonical Status**: `/content/` (Valid)

---

### 5. `app/glossary/page.jsx`
- **Location**: Line 7
- **Current**:
```javascript
export const metadata = {
  title: "Glossary — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "Glossary",
```
- **Rendered Output**: `<title>Glossary — Vikash</title>`
- **Canonical Status**: `/glossary/` (Valid)

---

### 6. `app/people/page.jsx`
- **Location**: Line 10
- **Current**:
```javascript
export const metadata = {
  title: "Influential People — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "Influential People",
```
- **Rendered Output**: `<title>Influential People — Vikash</title>`
- **Canonical Status**: `/people/` (Valid)

---

### 7. `app/projects/page.jsx`
- **Location**: Line 13
- **Current**:
```javascript
export const metadata = {
  title: 'Projects — Vikash',
```
- **Replacement**:
```javascript
export const metadata = {
  title: 'Projects',
```
- **Rendered Output**: `<title>Projects — Vikash</title>`
- **Canonical Status**: `/projects/` (Valid)

---

### 8. `app/resources/page.jsx`
- **Location**: Line 14
- **Current**:
```javascript
export const metadata = {
  title: "Resources — Vikash",
```
- **Replacement**:
```javascript
export const metadata = {
  title: "Resources",
```
- **Rendered Output**: `<title>Resources — Vikash</title>`
- **Canonical Status**: `/resources/` (Valid)

---

### 9. `app/skills/layout.jsx`
- **Location**: Line 5
- **Current**:
```javascript
export const metadata = {
  title: 'Skills & Expertise — Vikash',
```
- **Replacement**:
```javascript
export const metadata = {
  title: 'Skills & Expertise',
```
- **Rendered Output**: `<title>Skills & Expertise — Vikash</title>`
- **Canonical Status**: `/skills/` (Valid)

---

### 10. `app/vision/page.jsx`
- **Location**: Line 10
- **Current**:
```javascript
export const metadata = {
  title: 'Vision — Vikash',
```
- **Replacement**:
```javascript
export const metadata = {
  title: 'Vision — The Infinite Growth Principle',
```
- **Rendered Output**: `<title>Vision — The Infinite Growth Principle — Vikash</title>`
- **Canonical Status**: `/vision/` (Valid)

---

### 11. `app/blog/page.jsx`
- **Location**: Line 34
- **Current**:
```javascript
export async function generateMetadata() {
  const description = await getBlogMetaDescription();

  return {
    title: "Blog — Vikash",
```
- **Replacement**:
```javascript
export async function generateMetadata() {
  const description = await getBlogMetaDescription();

  return {
    title: "Blog",
```
- **Rendered Output**: `<title>Blog — Vikash</title>`
- **Canonical Status**: `/blog/` (Valid)

---

### 12. `app/blog/[slug]/page.jsx`
- **Location**: Line 65
- **Current**:
```javascript
  return {
    title: `${post.title} — Vikash`,
```
- **Replacement**:
```javascript
  return {
    title: post.title,
```
- **Rendered Output**: `<title>${post.title} — Vikash</title>`
- **Canonical Status**: `/blog/${post.slug}/` (Valid)

---

### 13. `app/blog/[slug]/amp/page.jsx`
- **Location**: Line 23
- **Current**:
```javascript
  return {
    title: `${post.title} — Vikash`,
```
- **Replacement**:
```javascript
  return {
    title: post.title,
```
- **Rendered Output**: `<title>${post.title} — Vikash</title>`
- **Canonical Status**: `/blog/${post.slug}/` (Valid)

---

### 14. `app/contact/layout.jsx`
- **Location**: Line 4
- **Current**:
```javascript
export const metadata = {
  title: 'Contact — Vikash',
```
- **Replacement**:
```javascript
export const metadata = {
  title: 'Contact',
```
- **Rendered Output**: `<title>Contact — Vikash</title>`
- **Canonical Status**: `/contact/` (Valid)

---

### 15. `app/projects/[slug]/page.jsx` (Title & Trailing Slash Fix)
- **Locations**: Lines 20, 23, 26, 29, 55, 86, 91
- **Current**:
```javascript
// Line 20
  const url = `https://vktofly.github.io/projects/${project.slug}`;

// Line 23
  return {
    title: `${project.title} — Projects — Vikash`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} — Projects — Vikash`,
      description: project.description,
      url,
      type: 'article',
// Line 55
  const url = `https://vktofly.github.io/projects/${project.slug}`;
// Line 86
            "name": "Projects",
            "item": "https://vktofly.github.io/projects"
// Line 91
            "name": project.title,
            "item": url
```
- **Replacement**:
```javascript
// Line 20
  const url = `https://vktofly.github.io/projects/${project.slug}/`;

// Line 23
  return {
    title: `${project.title} — Projects`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
    openGraph: {
      title: `${project.title} — Projects`,
      description: project.description,
      url,
      type: 'article',
// Line 55
  const url = `https://vktofly.github.io/projects/${project.slug}/`;
// Line 86
            "name": "Projects",
            "item": "https://vktofly.github.io/projects/"
// Line 91
            "name": project.title,
            "item": url
```
- **Rendered Output**: `<title>${project.title} — Projects — Vikash</title>`
- **Canonical Status**: `<link rel="canonical" href="https://vktofly.github.io/projects/${project.slug}/" />` (Trailing slash restored)

---

## Complete Route Audit Matrix

| Route | File Path | Current Title Value | Resolved With Template | Proposed Title Value | Proposed Resolved Title | Canonical Trailing Slash |
|---|---|---|---|---|---|---|
| `/` | `app/page.jsx` | `"Vikash — Polymath, Futurist & Founder"` | `Vikash — Polymath, Futurist & Founder — Vikash` (BUG) | `{ absolute: "Vikash — Polymath, Futurist & Founder" }` | `Vikash — Polymath, Futurist & Founder` | ✅ `/` |
| `/about/` | `app/about/page.jsx` | `"About — Vikash"` | `About — Vikash — Vikash` (BUG) | `"About"` | `About — Vikash` | ✅ `/about/` |
| `/books/` | `app/books/page.jsx` | `"Books — Vikash"` | `Books — Vikash — Vikash` (BUG) | `"Books"` | `Books — Vikash` | ✅ `/books/` |
| `/books/[slug]/` | `app/books/[slug]/page.jsx` | `"${blog.title} — Book Review"` | `${blog.title} — Book Review — Vikash` (OK) | `"${blog.title} — Book Review"` | `${blog.title} — Book Review — Vikash` | ✅ `/books/[slug]/` |
| `/content/` | `app/content/page.jsx` | `"Content & Recognition — Vikash"` | `Content & Recognition — Vikash — Vikash` (BUG) | `"Content & Recognition"` | `Content & Recognition — Vikash` | ✅ `/content/` |
| `/glossary/` | `app/glossary/page.jsx` | `"Glossary — Vikash"` | `Glossary — Vikash — Vikash` (BUG) | `"Glossary"` | `Glossary — Vikash` | ✅ `/glossary/` |
| `/people/` | `app/people/page.jsx` | `"Influential People — Vikash"` | `Influential People — Vikash — Vikash` (BUG) | `"Influential People"` | `Influential People — Vikash` | ✅ `/people/` |
| `/projects/` | `app/projects/page.jsx` | `'Projects — Vikash'` | `Projects — Vikash — Vikash` (BUG) | `'Projects'` | `Projects — Vikash` | ✅ `/projects/` |
| `/projects/[slug]/` | `app/projects/[slug]/page.jsx` | `"${project.title} — Projects — Vikash"` | `${project.title} — Projects — Vikash — Vikash` (BUG) | `"${project.title} — Projects"` | `${project.title} — Projects — Vikash` | ⚠️ Missing slash -> Fixed `/projects/${slug}/` |
| `/resources/` | `app/resources/page.jsx` | `"Resources — Vikash"` | `Resources — Vikash — Vikash` (BUG) | `"Resources"` | `Resources — Vikash` | ✅ `/resources/` |
| `/skills/` | `app/skills/layout.jsx` | `'Skills & Expertise — Vikash'` | `Skills & Expertise — Vikash — Vikash` (BUG) | `'Skills & Expertise'` | `Skills & Expertise — Vikash` | ✅ `/skills/` |
| `/vision/` | `app/vision/page.jsx` | `'Vision — Vikash'` | `Vision — Vikash — Vikash` (BUG) | `'Vision — The Infinite Growth Principle'` | `Vision — The Infinite Growth Principle — Vikash` | ✅ `/vision/` |
| `/blog/` | `app/blog/page.jsx` | `"Blog — Vikash"` | `Blog — Vikash — Vikash` (BUG) | `"Blog"` | `Blog — Vikash` | ✅ `/blog/` |
| `/blog/[slug]/` | `app/blog/[slug]/page.jsx` | `"${post.title} — Vikash"` | `${post.title} — Vikash — Vikash` (BUG) | `post.title` | `${post.title} — Vikash` | ✅ `/blog/[slug]/` |
| `/blog/[slug]/amp/`| `app/blog/[slug]/amp/page.jsx` | `"${post.title} — Vikash"` | `${post.title} — Vikash — Vikash` (BUG) | `post.title` | `${post.title} — Vikash` | ✅ `/blog/[slug]/` |
| `/contact/` | `app/contact/layout.jsx` | `'Contact — Vikash'` | `Contact — Vikash — Vikash` (BUG) | `'Contact'` | `Contact — Vikash` | ✅ `/contact/` |
| `/experience/` | `app/experience/page.jsx` | `"My Journey — From Curiosity to Creation"` | `My Journey — From Curiosity to Creation — Vikash` (OK) | `"My Journey — From Curiosity to Creation"` | `My Journey — From Curiosity to Creation — Vikash` | ✅ `/experience/` |
| `/docs/about-project/` | `app/docs/about-project/page.jsx` | `'About this Project — Docs'` | `About this Project — Docs — Vikash` (OK) | `'About this Project — Docs'` | `About this Project — Docs — Vikash` | ✅ (Has `noindex`) |
| `not-found` | `app/not-found.jsx` | `'404 — Page Not Found'` | `404 — Page Not Found — Vikash` (OK) | `'404 — Page Not Found'` | `404 — Page Not Found — Vikash` | N/A |
