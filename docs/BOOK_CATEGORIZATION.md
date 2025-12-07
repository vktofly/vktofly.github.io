# Book Auto-Categorization Guide

This guide explains how to automatically categorize books based on their content using AI.

## Overview

The book categorization system can automatically assign books to categories using:
1. **AI Categorization** (OpenAI API) - Analyzes book content to determine the best category
2. **Keyword Matching** (Fallback) - Uses keyword matching when AI is unavailable

## Categories

The system supports these categories:
- **epistemology** - The theory of how knowledge grows and evolves
- **philosophy** - Deep questions about consciousness, freedom, and meaning
- **ai** - Artificial intelligence, singularity, and the future of technology
- **systems** - Understanding complexity, leverage points, and system design
- **entrepreneurship** - Leverage, wealth creation, and building scalable systems
- **physics** - Quantum theory, computation, and the fabric of reality

## Setup

### Option 1: AI Categorization (Recommended)

1. **Get OpenAI API Key**:
   - Sign up at https://platform.openai.com/
   - Create an API key in your account settings

2. **Add to Environment Variables**:
   
   **Local Development** (`.env.local`):
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

   **For Scripts** (`.env`):
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

### Option 2: Keyword Matching (No Setup)

The keyword-based categorizer works automatically without any API keys. It's less accurate but still useful.

## Usage

### Preview Changes (Dry Run)

See what categories would be assigned without making changes:

```bash
node scripts/categorize-books.js
```

This will:
- Analyze all books
- Show which books would be recategorized
- Display current vs suggested categories
- **Not modify** the books.js file

### Apply Changes

To actually update the books.js file with new categories:

```bash
node scripts/categorize-books.js --apply
```

**⚠️ Warning**: This will modify `data/books.js`. Make sure to commit your changes or create a backup first.

### Use Keyword Matching Only

If you want to use keyword matching instead of AI:

```bash
node scripts/categorize-books.js --keywords-only
```

Or to apply keyword-based changes:

```bash
node scripts/categorize-books.js --keywords-only --apply
```

## How It Works

### AI Categorization

The AI analyzes:
- Book title
- Author name
- Description (`whyItMatters`)
- Key insights
- Tags

Then assigns the book to the most appropriate category based on its primary focus.

### Keyword Matching

The keyword matcher:
- Searches for category-specific keywords in book content
- Scores each category based on keyword matches
- Assigns the category with the highest score

## Example Output

```
📚 Book Categorization Tool

Found 8 books to categorize

Using AI categorization (OpenAI API)

Progress: 8/8 (100%) - The Fabric of Reality

📊 Categorization Results:

🔄 2 books would be recategorized:

  • The Fabric of Reality
    epistemology → physics

  • Zero to One
    entrepreneurship → ai

✓ 6 books would remain unchanged

💡 Run with --apply flag to apply these changes

Summary:
  Total books: 8
  Would change: 2
  Unchanged: 6
```

## Programmatic Usage

You can also use the categorizer in your code:

```javascript
import { categorizeBookWithAI, categorizeBookByKeywords } from '../lib/book-categorizer.js';

// Using AI
const category = await categorizeBookWithAI(book);

// Using keywords only
const category = categorizeBookByKeywords(book);

// Batch categorize
import { categorizeBooks } from '../lib/book-categorizer.js';

const results = await categorizeBooks(books, {
  useAI: true,
  delay: 200, // Delay between API calls (ms)
  onProgress: (current, total, result) => {
    console.log(`Processing ${current}/${total}: ${result.title}`);
  }
});
```

## Cost Considerations

### OpenAI API Costs

- **Model**: GPT-4o-mini (cost-effective)
- **Usage**: ~50-100 tokens per book
- **Cost**: ~$0.0001-0.0002 per book
- **For 100 books**: ~$0.01-0.02

### Cost Optimization

1. **Preview First**: Always run without `--apply` first to see changes
2. **Batch Processing**: The script includes delays to avoid rate limits
3. **Keyword Fallback**: Automatically falls back to keywords if API fails

## Troubleshooting

### API Key Not Found

If you see "OPENAI_API_KEY not found":
- Check that `.env.local` or `.env` file exists
- Verify the key is set correctly
- Restart your terminal/IDE after adding the key

### API Rate Limits

If you hit rate limits:
- The script includes automatic delays
- Reduce the number of books processed at once
- Wait a few minutes and try again

### Invalid Categories

If you see "Invalid category returned":
- The AI might return an unexpected category
- The system automatically falls back to keyword matching
- Check the book content - it might genuinely fit multiple categories

### Script Errors

If the script fails:
- Make sure `data/books.js` uses `export default books;`
- Check that Node.js version is 18+ (for ES modules)
- Verify all dependencies are installed

## Best Practices

1. **Review Before Applying**: Always preview changes first
2. **Manual Override**: Some books might need manual categorization
3. **Commit Changes**: Use version control to track category changes
4. **Test First**: Test on a small subset before processing all books
5. **Update Keywords**: If keyword matching is used, update keywords in `lib/book-categorizer.js` as needed

## Manual Categorization

If you prefer to manually categorize books, you can still use the tool to:
- Get suggestions for uncategorized books
- Validate existing categories
- Find books that might be miscategorized

Just review the preview output and manually update `data/books.js` as needed.

