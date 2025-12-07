# Google Images Setup Guide

This guide explains how to set up Google Custom Search API to fetch book cover images from Google Images.

## Overview

The image fetcher now supports fetching book covers from Google Images as a fallback option. The search order is:

1. **Open Library** (primary - most reliable for books)
2. **Google Books API** (fallback)
3. **Google Images** (final fallback - requires API setup)

## Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (Google Custom Search API has a free tier: 100 queries/day)

### Step 2: Enable Custom Search API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Custom Search API"
3. Click **Enable**

### Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy your API key
4. (Optional) Restrict the API key to "Custom Search API" for security

### Step 4: Create Custom Search Engine

1. Go to [Google Custom Search](https://programmablesearchengine.google.com/)
2. Click **Add** to create a new search engine
3. **Sites to search**: Enter `*` (search entire web)
4. **Name**: Give it a name (e.g., "Book Cover Images")
5. Click **Create**
6. Go to **Setup** > **Basics**
7. Enable **Search the entire web**
8. Go to **Setup** > **Advanced** > **Image search**
9. Enable **Image search**
10. Copy your **Search engine ID** (also called CX)

### Step 5: Configure Environment Variables

Add the following to your `.env.local` file (or `.env` for Node.js scripts):

```env
# Google Custom Search API
GOOGLE_CSE_API_KEY=your_api_key_here
GOOGLE_CSE_ID=your_search_engine_id_here

# For Next.js public access (if needed)
NEXT_PUBLIC_GOOGLE_CSE_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_CSE_ID=your_search_engine_id_here
```

**Note**: 
- Use `GOOGLE_CSE_API_KEY` and `GOOGLE_CSE_ID` for server-side scripts
- Use `NEXT_PUBLIC_GOOGLE_CSE_API_KEY` and `NEXT_PUBLIC_GOOGLE_CSE_ID` if you need client-side access (not recommended for API keys)

### Step 6: Test the Setup

Run the image fetcher script:

```bash
node scripts/fetch-images.js books
```

The script will automatically use Google Images as a fallback if Open Library and Google Books don't have the cover.

## Usage

### In Code

```javascript
import { fetchBookCoverWithFallback } from '@/lib/image-fetcher';

// Automatic fallback chain (uses env variables)
const imageUrl = await fetchBookCoverWithFallback(
  'The Beginning of Infinity',
  'David Deutsch'
);

// Or with explicit API credentials
const imageUrl = await fetchBookCoverWithFallback(
  'The Beginning of Infinity',
  'David Deutsch',
  null,
  {
    googleApiKey: 'your_key',
    googleCseId: 'your_cse_id'
  }
);
```

### Direct Google Images Search

```javascript
import { fetchBookCoverFromGoogleImages } from '@/lib/image-fetcher';

const imageUrl = await fetchBookCoverFromGoogleImages(
  'The Beginning of Infinity',
  'David Deutsch'
);
```

## API Limits

- **Free Tier**: 100 queries per day
- **Paid Tier**: $5 per 1,000 queries (after free tier)

## Troubleshooting

### "API credentials not configured"
- Make sure you've added the environment variables to `.env.local`
- Restart your development server after adding env variables
- For scripts, ensure the variables are in `.env` or exported in your shell

### "API error: 403"
- Check that Custom Search API is enabled in Google Cloud Console
- Verify your API key is correct
- Check that billing is enabled (required even for free tier)

### "API error: 400"
- Verify your Search Engine ID (CX) is correct
- Ensure Image search is enabled in your Custom Search Engine settings

### No results found
- The book might not have images indexed in Google
- Try a more specific search query (include author name)
- Check that "Search the entire web" is enabled in Custom Search Engine settings

## Security Notes

- **Never commit API keys to version control**
- Add `.env.local` to `.gitignore`
- Use environment variables, not hardcoded keys
- Consider restricting API keys to specific IPs or domains in production

## Alternative: Without API Setup

If you don't want to set up Google Custom Search API, the system will still work using:
- Open Library (primary)
- Google Books API (fallback)

Google Images is only used as a final fallback when the above don't have results.

