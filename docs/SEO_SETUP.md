# SEO Setup Guide

This guide explains how to configure SEO features for your portfolio site.

## Google Search Console Verification

### Step 1: Get Your Verification Code

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (your site URL: `https://vktofly.github.io`)
3. Choose "HTML tag" verification method
4. Copy the `content` value from the meta tag (the verification code)

### Step 2: Add Verification Code

#### Option A: Environment Variable (Recommended for GitHub Actions)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add a new secret:
   - Name: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: Your verification code (e.g., `abc123xyz...`)

The verification code will be automatically included in your site's metadata.

#### Option B: Local Development

1. Create a `.env.local` file in the root directory
2. Add:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code-here
   ```
3. Restart your development server

### Step 3: Verify

After deploying, go back to Google Search Console and click "Verify". The verification should succeed automatically.

## Open Graph Images

### Current Setup

The site is configured to use page-specific OG images with automatic fallback to the default image.

### Image Structure

```
public/
  ├── og.png                    # Default OG image (required)
  └── og/
      ├── about.png             # About page
      ├── blog.png              # Blog index
      ├── projects.png          # Projects page
      ├── experience.png        # Experience page
      ├── vision.png            # Vision page
      ├── skills.png            # Skills page
      ├── contact.png           # Contact page
      └── blog/
          ├── infinite-growth-machine.png
          ├── civilization-as-system.png
          └── freedom-from-known-algorithm.png
          # ... other blog post images
```

### Image Specifications

- **Dimensions**: 1200x630 pixels (recommended)
- **Format**: PNG or JPG
- **File size**: Keep under 1MB
- **Aspect ratio**: 1.91:1

### How It Works

1. **Page-specific images**: If `/og/{page-name}.png` exists, it will be used
2. **Blog post images**: If `/og/blog/{slug}.png` exists, it will be used
3. **Fallback**: If no page-specific image exists, `/og.png` is used

### Creating OG Images

#### Option 1: Design Tools
- **Figma**: Create a 1200x630px frame
- **Canva**: Use their OG image template
- **Photoshop/GIMP**: Create custom designs

#### Option 2: Online Generators
- [OG Image Generator](https://www.opengraph.xyz/)
- [Social Share Preview](https://socialsharepreview.com/)

#### Option 3: Automated Generation (Advanced)
You can use `@vercel/og` to generate OG images dynamically, but this requires a server component (not compatible with static export).

### Testing OG Images

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Paste your page URL to see how it will appear when shared.

## Current Status

✅ **Configured:**
- Google Search Console verification (via env var)
- Page-specific OG image system
- Automatic fallback to default image
- All pages have OG image metadata

📝 **To Do:**
- Create custom OG images for each page (optional but recommended)
- Add verification code to GitHub secrets
- Verify in Google Search Console after deployment

## Analytics Integration

### Google Analytics 4 Setup

1. **Create GA4 Property**: Go to [Google Analytics](https://analytics.google.com/) and create a new GA4 property
2. **Get Measurement ID**: Copy the measurement ID (format: G-XXXXXXXXXX)

#### Environment Variable Setup

**For Local Development:**
Create a `.env.local` file:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**For GitHub Actions:**
Add to repository secrets:
- Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Value: Your GA4 measurement ID

#### Features Included

- ✅ Page view tracking
- ✅ Scroll depth tracking (25%, 50%, 75%, 90%)
- ✅ Time on page tracking (30s, 1m, 2m, 5m)
- ✅ Outbound link tracking
- ✅ Search query tracking
- ✅ Core Web Vitals tracking
- ✅ Custom event tracking for blog interactions

### Advanced Analytics Features

The analytics system includes:
- **Content Engagement Tracking**: Tracks how users interact with blog posts, projects, and books
- **SEO Performance Monitoring**: Monitors search performance and user behavior
- **Conversion Tracking**: Tracks contact form submissions and newsletter signups
- **Custom Events**: Specialized tracking for knowledge content and research interactions

## Additional SEO Features

The site also includes:
- ✅ Comprehensive metadata on all pages
- ✅ Advanced structured data (Organization, WebSite, Book, SoftwareApplication schemas)
- ✅ **AMP Pages** for blog posts (Accelerated Mobile Pages) - see [AMP_SETUP.md](AMP_SETUP.md)
- ✅ **AI-Generated Meta Descriptions** - see [AI_META_DESCRIPTIONS.md](AI_META_DESCRIPTIONS.md)
- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ Canonical URLs
- ✅ Twitter Card support
- ✅ Mobile-responsive design
- ✅ Core Web Vitals optimization
- ✅ Advanced internal linking system
- ✅ LLM Optimization (llms.txt, semantic context) - see [LLM_OPTIMIZATION.md](LLM_OPTIMIZATION.md)

### AMP Pages

Blog posts automatically generate AMP (Accelerated Mobile Pages) versions for ultra-fast mobile loading:
- **Location**: `/blog/[slug]/amp/`
- **Benefits**: Faster mobile loading, better mobile search rankings
- **Setup**: Automatic - no configuration needed
- **See**: [AMP_SETUP.md](AMP_SETUP.md) for details

### AI Meta Descriptions

Dynamic meta descriptions are automatically generated using AI:
- **AI-Powered**: Uses OpenAI API when available
- **Template Fallback**: Intelligent template-based generation when AI unavailable
- **Optimized**: 150-160 characters, keyword-rich, compelling
- **Setup**: Add `OPENAI_API_KEY` environment variable (optional)
- **See**: [AI_META_DESCRIPTIONS.md](AI_META_DESCRIPTIONS.md) for details

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

