# Blog Posts Directory

This directory contains all blog post markdown files.

## Quick Publishing Checklist

When creating a new blog post, ensure you have:

- [ ] **Frontmatter** with all required fields (see template)
- [ ] **Title** in proper title case (e.g., "The Future of AI")
- [ ] **Date** in YYYY-MM-DD format (e.g., "2025-11-01")
- [ ] **Description** (150-160 characters for SEO)
- [ ] **Summary** (2-3 sentences)
- [ ] **Tags** as array: `[Tag1, Tag2, Tag3]`
- [ ] **Slug** (lowercase with hyphens) or let system auto-generate
- [ ] **Content** starts with `##` headings (not `#`)
- [ ] **File saved** with `.md` extension

## Template

Copy `_TEMPLATE.md` when creating a new post.

## Full Guide

See `docs/BLOG_PUBLISHING_GUIDE.md` for complete instructions.

## Common Issues

**Post not appearing?**
- Check frontmatter is between `---` markers
- Verify date format is YYYY-MM-DD
- Ensure file has `.md` extension

**Title looks wrong?**
- Check `title` field uses proper title case
- System preserves your title exactly as written

**Tags not working?**
- Ensure format: `[Tag1, Tag2, Tag3]`
- Use consistent tag names

