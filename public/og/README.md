# Open Graph Images Directory

This directory contains page-specific Open Graph images for social media sharing.

## Image Specifications

- **Dimensions**: 1200x630 pixels (recommended OG image size)
- **Format**: PNG or JPG
- **File size**: Keep under 1MB for fast loading

## Naming Convention

Place your custom OG images here following this structure:

```
/og/
  ├── about.png          # About page
  ├── blog.png           # Blog index page
  ├── projects.png       # Projects page
  ├── experience.png     # Experience page
  ├── vision.png         # Vision page
  ├── skills.png         # Skills page
  ├── contact.png        # Contact page
  └── blog/
      ├── infinite-growth-machine.png
      ├── civilization-as-system.png
      └── freedom-from-known-algorithm.png
      # ... other blog post images
```

## Default Fallback

If a page-specific image doesn't exist, the system will fall back to `/og.png` (root level).

## Creating OG Images

You can create OG images using:
- Design tools (Figma, Canva, Photoshop)
- Online generators
- Automated tools like `@vercel/og` (for dynamic generation)

## Current Status

- Default OG image: `/og.png` ✅
- Page-specific images: Create as needed
- Blog post images: Create as needed

## Tips

- Include your name/title prominently
- Use consistent branding/colors
- Keep text readable at small sizes
- Consider dark/light mode variations if needed

