# Book Blogs Directory

This directory contains book review blog posts. These are separate from regular blog posts and are linked to specific books.

## Structure

Each book blog post should:
- Be linked to a book via `bookSlug` in frontmatter
- Include book recommendations via `recommendedBooks` array
- Follow similar structure to regular blog posts but focused on book review

## Frontmatter Template

```markdown
---
title: "Review: The Beginning of Infinity"
bookSlug: "the-beginning-of-infinity"  # Links to book in data/books.js
date: 2024-12-15
description: "A deep dive into David Deutsch's epistemology and how it shaped my thinking."
tags: ['Epistemology', 'Book Review', 'Knowledge Creation']
recommendedBooks:
  - "the-fabric-of-reality"
  - "the-rational-optimist"
---
```

## Linking Books to Blogs

In `data/books.js`, add a `blog` field to link a book to its blog post:

```javascript
{
  slug: "the-beginning-of-infinity",
  // ... other fields
  blog: true, // Set to true if book has a blog post
}
```

The blog post filename should match the book slug (e.g., `the-beginning-of-infinity.md`).

