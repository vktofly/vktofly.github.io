# Blog Publishing Guide

This guide explains how to publish new blog posts on your site without using a code editor.

## Quick Start

1. **Create a new markdown file** in `content/blog/` directory
2. **Use the template** below (copy from `content/blog/_TEMPLATE.md`)
3. **Fill in the frontmatter** (title, date, description, etc.)
4. **Write your content** in Markdown format
5. **Save the file** with a descriptive filename
6. **Commit and push** to GitHub - the site will automatically rebuild

## File Naming

- **Use descriptive filenames**: `my-article-title.md`
- **Spaces are OK**: The system will convert them to hyphens automatically
- **Special characters**: Will be removed automatically
- **Case doesn't matter**: `My-Article.md` and `my-article.md` work the same

**Example filenames:**
- ✅ `the-future-of-ai.md`
- ✅ `My New Article.md` (spaces OK)
- ✅ `philosophy-of-progress.md`
- ❌ `article@2025.md` (special chars will be removed)

## Frontmatter (Required Metadata)

Every blog post **must** start with frontmatter between `---` markers:

```yaml
---
title: Your Article Title Here
date: 2025-01-15
description: A brief description for SEO and social sharing (150-160 characters recommended)
summary: A longer summary that appears in the article preview (2-3 sentences)
tags: [Tag1, Tag2, Tag3]
slug: your-article-slug
---
```

### Frontmatter Fields Explained

#### `title` (Required)
- **What it is**: The main title of your article
- **How it's used**: 
  - Displayed as the page title
  - Used in browser tab
  - Used in social sharing (Open Graph)
- **Formatting**: 
  - Use proper title case: "The Future of AI" not "the future of ai"
  - Capitalize important words
  - Keep it clear and descriptive
- **Example**: `title: The Infinite Growth Principle`

#### `date` (Required)
- **What it is**: Publication date
- **Format**: `YYYY-MM-DD` (e.g., `2025-01-15`)
- **How it's used**: 
  - Sorts posts chronologically
  - Displays on the blog post page
  - Used in RSS feeds
- **Example**: `date: 2025-11-01`

#### `description` (Required)
- **What it is**: Short description for SEO and social media
- **Length**: 150-160 characters (optimal for search engines)
- **How it's used**: 
  - Meta description for search engines
  - Open Graph description for social sharing
  - Twitter card description
- **Tips**: 
  - Make it compelling and clear
  - Include keywords naturally
  - Write it like a hook
- **Example**: `description: A philosophy of creation, civilization, and the future of intelligence. Understanding how knowledge evolves and how humanity can evolve with it.`

#### `summary` (Optional but Recommended)
- **What it is**: Longer summary for article previews
- **Length**: 2-3 sentences (50-100 words)
- **How it's used**: 
  - Appears in the summary box at the top of the article
  - Used in blog listing pages
  - More detailed than description
- **Example**: `summary: A comprehensive exploration of how knowledge grows, how civilization evolves through explanations, and how we can design systems for infinite growth.`

#### `tags` (Required)
- **What it is**: Array of topic tags
- **Format**: `[Tag1, Tag2, Tag3]` (comma-separated in brackets)
- **How it's used**: 
  - Filters posts on blog page
  - Shows related posts
  - SEO keywords
- **Tips**: 
  - Use 3-6 tags per post
  - Be consistent with tag names
  - Use existing tags when possible
- **Common tags**: Philosophy, AI, Systems, Epistemology, Civilization, Knowledge, Entrepreneurship, Technology, Creativity
- **Example**: `tags: [Philosophy, Systems, Epistemology, Civilization, AI, Knowledge]`

#### `slug` (Optional but Recommended)
- **What it is**: URL-friendly version of the title
- **Format**: Lowercase with hyphens: `my-article-title`
- **How it's used**: 
  - Creates the URL: `/blog/my-article-title/`
  - If not provided, generated from filename
- **Tips**: 
  - Keep it short and descriptive
  - Use hyphens, not underscores
  - No special characters
- **Example**: `slug: infinite-growth-principle`

#### `takeaways` (Optional)
- **What it is**: Key points from the article
- **Format**: Array of strings
- **How it's used**: 
  - Displays as a "Key Takeaways" box
  - Helps readers scan main points
- **Example**: 
  ```yaml
  takeaways:
    - AI encodes our theory of intelligence
    - Technology is philosophy embodied
    - Systems outlive goals
  ```

## Title Formatting Rules

The system handles title formatting automatically, but here are best practices:

### In Frontmatter (`title` field):
- **Use proper title case**: Capitalize important words
- **Examples**:
  - ✅ `The Infinite Growth Principle`
  - ✅ `Books That Shaped My Philosophy`
  - ✅ `Freedom from the Known Algorithm`
  - ❌ `the infinite growth principle` (all lowercase)
  - ❌ `THE INFINITE GROWTH PRINCIPLE` (all uppercase)

### In Filename:
- **Spaces are OK**: `My Article Title.md`
- **Case doesn't matter**: `my-article.md` or `My-Article.md` both work
- **System will convert**: Spaces → hyphens, special chars removed

### Title Case Rules:
- Capitalize: First word, last word, all important words
- Don't capitalize: Articles (a, an, the), prepositions (of, from, to), conjunctions (and, or, but)
- **Exception**: Always capitalize if it's the first or last word

## Content Formatting

### Markdown Basics

```markdown
# Heading 1 (for main title - usually not needed, title is in frontmatter)
## Heading 2 (for major sections)
### Heading 3 (for subsections)

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](/blog/other-post/)
[External link](https://example.com)

> Blockquote for important quotes

`Code inline`

\`\`\`
Code block
\`\`\`
```

### Best Practices

1. **Use `##` for main sections** (not `#`)
2. **Keep paragraphs short** (3-4 sentences max)
3. **Use headings** to break up long content
4. **Add links** to related posts or external resources
5. **Use blockquotes** for important quotes
6. **Include images** if relevant (place in `public/` directory)

## Publishing Workflow

### Option 1: GitHub Web Interface (Recommended)

1. Go to your repository on GitHub
2. Navigate to `content/blog/` folder
3. Click "Add file" → "Create new file"
4. Name the file: `your-article-title.md`
5. Copy the template from `_TEMPLATE.md`
6. Fill in frontmatter and write content
7. Scroll down, add commit message: "Add blog post: [Your Title]"
8. Click "Commit new file"
9. Site will automatically rebuild and deploy

### Option 2: GitHub Desktop / Git CLI

1. Create new file: `content/blog/your-article-title.md`
2. Copy template and fill in
3. Commit: `git add content/blog/your-article-title.md`
4. Commit: `git commit -m "Add blog post: Your Title"`
5. Push: `git push origin main`
6. Site will automatically rebuild

### Option 3: Markdown Editor (VS Code, Obsidian, etc.)

1. Open `content/blog/` folder
2. Create new file with `.md` extension
3. Use template
4. Write and save
5. Commit and push via Git

## Adding Open Graph Images

To add a custom image for social sharing:

1. Create an image: 1200x630 pixels (PNG or JPG)
2. Save it as: `public/og/blog/your-article-slug.png`
3. The image will automatically appear:
   - In social media shares
   - On the blog post page
   - In the featured blog section

**Example**: For slug `infinite-growth-principle`, save image as:
`public/og/blog/infinite-growth-principle.png`

## Common Tags Reference

Use these tags consistently:

- **Philosophy**: For philosophical essays
- **AI**: Artificial intelligence topics
- **Systems**: Systems thinking, complexity
- **Epistemology**: Knowledge, learning, understanding
- **Civilization**: Civilization design, progress
- **Knowledge**: Knowledge creation, information
- **Entrepreneurship**: Business, startups, ventures
- **Technology**: Tech topics, innovation
- **Creativity**: Creative process, innovation
- **Consciousness**: Awareness, mind, perception
- **Books**: Book reviews, reading lists
- **Leadership**: Leadership, management

## Troubleshooting

### Post not appearing?
- Check frontmatter is correct (between `---` markers)
- Verify `date` is in `YYYY-MM-DD` format
- Check filename has `.md` extension
- Ensure file is in `content/blog/` directory

### Wrong title formatting?
- Check `title` field in frontmatter uses proper title case
- The system preserves your title exactly as written

### Slug not working?
- Ensure `slug` field is lowercase with hyphens
- Or let system auto-generate from filename
- Check no special characters in slug

### Tags not showing?
- Verify tags are in array format: `[Tag1, Tag2]`
- Check spelling matches existing tags
- Use consistent capitalization

## Example: Complete Blog Post

See `content/blog/infinite-growth-principle.md` for a complete example with all fields properly formatted.

## Need Help?

- Check existing blog posts for examples
- Review this guide
- The system is forgiving - if something is missing, it will use defaults

