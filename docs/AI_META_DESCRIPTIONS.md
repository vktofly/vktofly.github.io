# AI-Generated Meta Descriptions Guide

This guide explains the dynamic meta description generation system that uses AI to create optimized SEO descriptions.

## Overview

The site automatically generates optimized meta descriptions for blog posts using:
1. **AI Generation** (OpenAI API) - When API key is available
2. **Template-Based Generation** - Fallback when AI is unavailable

## How It Works

### AI Generation (Primary Method)

When `OPENAI_API_KEY` is set, the system uses OpenAI's GPT-3.5-turbo to generate meta descriptions:

1. **Input**: Post title, content excerpt, tags, existing description
2. **Processing**: AI analyzes content and generates optimized description
3. **Output**: 150-160 character meta description optimized for SEO

### Template-Based Generation (Fallback)

When AI is unavailable, the system uses intelligent template-based generation:

1. **Content Analysis**: Extracts first meaningful sentences from content
2. **Length Optimization**: Ensures 120-160 character length
3. **Keyword Integration**: Includes relevant tags and keywords
4. **Value Proposition**: Focuses on compelling, click-worthy descriptions

## Setup

### Option 1: AI Generation (Recommended)

1. **Get OpenAI API Key**:
   - Sign up at https://platform.openai.com/
   - Create an API key in your account settings

2. **Add to Environment Variables**:
   
   **Local Development** (`.env.local`):
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

   **GitHub Actions** (Repository Secrets):
   - Go to Settings → Secrets and variables → Actions
   - Add secret: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

3. **Usage**: The system automatically uses AI generation when the key is available

### Option 2: Template-Based (No Setup Required)

The template-based generator works automatically without any API keys. It's less sophisticated but still produces good results.

## Features

### Smart Description Generation

- **Length Optimization**: Automatically ensures 150-160 characters (optimal for SEO)
- **Keyword Integration**: Naturally includes relevant tags and keywords
- **Content-Aware**: Analyzes actual post content, not just metadata
- **Enhancement**: Can enhance existing descriptions or generate new ones

### Fallback Strategy

1. **Try AI Generation** (if API key available)
2. **Fallback to Template** (if AI fails or unavailable)
3. **Use Existing Description** (if already optimal)

## Configuration

### In `lib/meta-generator.js`

```javascript
await generateMetaDescription(post, {
  useAI: true,              // Use AI if available
  minLength: 120,           // Minimum description length
  maxLength: 160,           // Maximum description length
  enhanceExisting: true,    // Enhance existing descriptions
});
```

### Options

- **`useAI`**: Enable/disable AI generation (default: `true` if API key exists)
- **`minLength`**: Minimum character count (default: `120`)
- **`maxLength`**: Maximum character count (default: `160`)
- **`enhanceExisting`**: Whether to enhance existing descriptions (default: `true`)

## Usage Examples

### Blog Post Metadata

Meta descriptions are automatically generated in:
- `app/blog/[slug]/page.jsx` - Individual blog posts
- `app/blog/page.jsx` - Blog index page

### Manual Generation

```javascript
import { generateMetaDescription } from '../../lib/meta-generator';

const post = await getPostBySlug('my-post');
const metaDescription = await generateMetaDescription(post, {
  useAI: true,
  enhanceExisting: true,
});
```

## Best Practices

### For AI Generation

1. **Quality Content**: Better input content = better AI descriptions
2. **Clear Titles**: Descriptive titles help AI understand context
3. **Relevant Tags**: Tags help AI identify key topics
4. **Existing Descriptions**: Good existing descriptions can be enhanced

### For Template Generation

1. **Clear Opening**: First sentences should be compelling
2. **Keyword Placement**: Include important keywords early
3. **Value Proposition**: Focus on what readers will learn

## Cost Considerations

### OpenAI API Costs

- **Model**: GPT-3.5-turbo (cost-effective)
- **Usage**: ~100 tokens per description
- **Cost**: ~$0.0002 per description
- **Monthly Estimate**: ~$0.10-1.00 for typical blog (50-500 posts)

### Cost Optimization

1. **Caching**: Descriptions are generated at build time (cached)
2. **Fallback**: Template-based generation avoids API calls when AI fails
3. **Selective Use**: Can disable AI for specific pages

## Troubleshooting

### AI Generation Not Working

1. **Check API Key**: Verify `OPENAI_API_KEY` is set correctly
2. **Check API Limits**: Ensure OpenAI account has available credits
3. **Check Logs**: Look for error messages in build output
4. **Fallback**: System automatically falls back to template generation

### Descriptions Too Short/Long

1. **Adjust Options**: Modify `minLength` and `maxLength` in configuration
2. **Content Quality**: Ensure post content has sufficient text
3. **Manual Override**: Can manually set descriptions in frontmatter

### API Rate Limits

1. **Build Time**: Descriptions generated at build time (not runtime)
2. **Caching**: Results are cached, not regenerated on every request
3. **Batch Processing**: All descriptions generated in single build

## Advanced Features

### Title Variations

```javascript
import { generateTitleVariations } from '../../lib/meta-generator';

const variations = generateTitleVariations(post.title, post.tags);
// Returns array of title variations for A/B testing
```

### Keyword Extraction

```javascript
import { extractKeywords } from '../../lib/meta-generator';

const keywords = extractKeywords(post.html, post.title, post.tags);
// Returns array of relevant keywords
```

## Monitoring

### Check Generated Descriptions

1. **View Source**: Check page source for `<meta name="description">`
2. **Search Console**: Monitor in Google Search Console
3. **SEO Tools**: Use tools like Screaming Frog to audit

### Quality Metrics

- **Length**: Should be 150-160 characters
- **Readability**: Should be clear and compelling
- **Keywords**: Should include relevant keywords naturally
- **Click-Through**: Monitor CTR in Google Search Console

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Meta Description Best Practices](https://moz.com/learn/seo/meta-description)
- [Google Search Console](https://search.google.com/search-console)

