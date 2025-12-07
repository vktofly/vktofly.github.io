# AMP Pages Setup Guide

This guide explains the AMP (Accelerated Mobile Pages) implementation for blog posts.

## What is AMP?

AMP (Accelerated Mobile Pages) is a web component framework that creates fast-loading, mobile-optimized web pages. AMP pages are designed to load instantly on mobile devices and are often featured prominently in Google search results.

## Implementation

### AMP Pages Location

AMP versions of blog posts are automatically generated at:
- Regular post: `/blog/[slug]/`
- AMP version: `/blog/[slug]/amp/`

### Features

✅ **Automatic HTML Conversion**: Regular blog HTML is converted to AMP-compliant format
✅ **Image Optimization**: Images are converted to `amp-img` components with responsive layout
✅ **Canonical Links**: Proper canonical links between AMP and regular pages
✅ **SEO Optimized**: Full Open Graph and Twitter Card support
✅ **Fast Loading**: Minimal CSS and optimized structure

## How It Works

1. **HTML Conversion**: The `lib/amp-converter.js` utility converts regular HTML to AMP-compliant HTML:
   - Removes invalid JavaScript
   - Converts `<img>` to `<amp-img>`
   - Converts `<iframe>` to `<amp-iframe>`
   - Removes inline styles
   - Ensures absolute URLs

2. **AMP Page Generation**: Each blog post automatically generates an AMP version during build time

3. **Canonical Linking**: Both pages link to each other:
   - Regular page has `<link rel="amphtml" href="/blog/[slug]/amp/">`
   - AMP page has `<link rel="canonical" href="/blog/[slug]/">`

## Testing AMP Pages

### Google AMP Validator

1. Visit: https://validator.ampproject.org/
2. Enter your AMP page URL: `https://vktofly.github.io/blog/[slug]/amp/`
3. Check for validation errors

### Google Search Console

1. Go to Google Search Console
2. Navigate to "Enhancements" → "AMP"
3. Check for AMP validation issues

## AMP Requirements

### What's Allowed
- ✅ Standard HTML tags (div, p, h1-h6, etc.)
- ✅ `amp-img` for images
- ✅ `amp-iframe` for embeds
- ✅ Inline CSS in `<style amp-custom>`
- ✅ AMP boilerplate CSS

### What's Not Allowed
- ❌ Custom JavaScript (except AMP components)
- ❌ Inline styles on elements
- ❌ External stylesheets (except AMP CSS)
- ❌ Forms (unless using `amp-form`)
- ❌ Certain HTML attributes (onclick, style, etc.)

## Customization

### AMP CSS

Edit `lib/amp-converter.js` → `generateAMPCSS()` function to customize AMP page styling.

### AMP Components

To add more AMP components (e.g., `amp-video`, `amp-carousel`), update the converter in `lib/amp-converter.js`.

## Benefits

1. **Faster Mobile Loading**: AMP pages load almost instantly on mobile
2. **Better Search Rankings**: Google may prioritize AMP pages in mobile search
3. **Improved User Experience**: Lightning-fast page loads reduce bounce rate
4. **Mobile-First**: Optimized specifically for mobile devices

## Limitations

- **No Custom JavaScript**: AMP pages cannot use custom JavaScript
- **Limited Styling**: CSS must be inline in `<style amp-custom>` tag
- **Simplified Features**: Some interactive features may not work
- **Static Export**: Works with static site generation

## Troubleshooting

### AMP Validation Errors

1. Check the AMP validator: https://validator.ampproject.org/
2. Review common issues:
   - Missing `amp-img` width/height attributes
   - Invalid HTML attributes
   - Custom JavaScript usage
   - Inline styles

### Images Not Loading

- Ensure images use absolute URLs
- Check that `amp-img` has width and height attributes
- Verify image URLs are accessible

### Styling Issues

- All CSS must be in the `<style amp-custom>` tag
- No external stylesheets allowed
- Inline styles on elements are removed automatically

## Resources

- [AMP Documentation](https://amp.dev/documentation/)
- [AMP Validator](https://validator.ampproject.org/)
- [AMP Components](https://amp.dev/documentation/components/)

