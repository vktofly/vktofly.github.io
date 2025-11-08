# Image Fetcher Utilities

This guide explains how to automatically fetch images for books and people when adding new items to your portfolio.

## Overview

The image fetcher system provides:
- **Automatic book cover fetching** from Open Library and Google Books APIs
- **Person image placeholders** based on category
- **Helper components** for interactive image fetching
- **Scripts** for batch updating images

## Quick Start

### For Books

When adding a new book to `data/books.js`, you can:

1. **Use the helper component** (recommended for one-off additions):
   - The `BookImageFetcher` component can be added to an admin page
   - Enter book title, author (optional), and ISBN (optional)
   - Click "Fetch Cover Image" to get the image URL
   - Copy the URL and add it to your book data

2. **Run the script** (for batch updates):
   ```bash
   node scripts/fetch-images.js books
   ```

3. **Manual approach**:
   - Use the `fetchBookCoverWithFallback()` function in `lib/image-fetcher.js`
   - Or manually find images and add URLs

### For People

When adding a new person to `data/influentialPeople.js`:

1. **Use the helper component**:
   - The `PersonImageFetcher` component provides category-based placeholders
   - Enter person name and select category
   - Get a placeholder image URL

2. **Run the script**:
   ```bash
   node scripts/fetch-images.js people
   ```

3. **Manual approach**:
   - Use `getPersonImagePlaceholder()` function
   - Or manually find and add specific image URLs

## API Details

### Book Cover Fetching

The system tries multiple sources in order:

1. **Open Library API** (primary)
   - Uses ISBN if available (most accurate)
   - Falls back to title + author search
   - Free, no API key required

2. **Google Books API** (fallback)
   - Searches by title and author
   - Free, no API key required
   - Good quality images

### Person Images

Currently uses curated Unsplash placeholders based on category:
- **Philosopher**: Generic thinker/portrait images
- **Technologist**: Scientist/engineer images
- **Entrepreneur**: Business/professional images
- **Historical**: Historical/classic portrait images

For better results, manually find and add specific image URLs.

## Usage Examples

### Using the Helper Functions

```javascript
import { fetchBookCoverWithFallback, getPersonImagePlaceholder } from '../lib/image-fetcher';

// Fetch book cover
const bookImage = await fetchBookCoverWithFallback(
  'The Beginning of Infinity',
  'David Deutsch',
  '9780143121350' // Optional ISBN
);

// Get person placeholder
const personImage = getPersonImagePlaceholder('David Deutsch', 'philosopher');
```

### Adding a New Book

```javascript
// In data/books.js
{
  slug: 'new-book',
  title: 'Book Title',
  author: 'Author Name',
  isbn: '9780123456789', // Optional but recommended
  coverImage: null, // Will be fetched automatically or add manually
  // ... other fields
}
```

Then run:
```bash
node scripts/fetch-images.js books
```

### Adding a New Person

```javascript
// In data/influentialPeople.js
{
  slug: 'new-person',
  name: 'Person Name',
  category: 'philosopher', // or 'technologist', 'entrepreneur', 'historical'
  image: null, // Will use placeholder or add manually
  // ... other fields
}
```

Then run:
```bash
node scripts/fetch-images.js people
```

## Helper Components

### BookImageFetcher

A React component for interactive book cover fetching:

```jsx
import { BookImageFetcher } from '../components/ImageFetcherHelper';

<BookImageFetcher 
  onImageFetched={(url) => {
    console.log('Fetched image:', url);
    // Copy URL to your book data
  }}
/>
```

### PersonImageFetcher

A React component for getting person image placeholders:

```jsx
import { PersonImageFetcher } from '../components/ImageFetcherHelper';

<PersonImageFetcher 
  onImageFetched={(url) => {
    console.log('Image URL:', url);
    // Copy URL to your person data
  }}
/>
```

## Script Usage

### Fetch Images for Books

```bash
node scripts/fetch-images.js books
```

This will:
- Read all books from `data/books.js`
- Fetch cover images for books missing images or with placeholder images
- Update the data file with fetched image URLs
- Skip books that already have images

### Fetch Images for People

```bash
node scripts/fetch-images.js people
```

This will:
- Read all people from `data/influentialPeople.js`
- Update placeholder images based on category
- Update the data file

### Fetch All

```bash
node scripts/fetch-images.js all
```

Runs both books and people updates.

## Notes

- **Rate Limiting**: The script includes delays to avoid rate limiting. If you have many items, the script may take a while.

- **Image Quality**: Open Library provides good quality images. Google Books images are also high quality.

- **Fallbacks**: If no image is found, the existing image (or null) is kept. You can manually add images later.

- **ISBN Recommended**: For books, providing an ISBN gives the most accurate results.

- **Manual Override**: You can always manually add image URLs to the data files if automatic fetching doesn't work.

## Troubleshooting

### Script fails with "Cannot find module"

Make sure you're running from the project root:
```bash
cd /path/to/vktofly.github.io
node scripts/fetch-images.js books
```

### No images found

- Check if the book title/author is correct
- Try adding an ISBN for better accuracy
- Some books may not be in Open Library or Google Books
- Manually find and add the image URL

### Fetch errors

- Check your internet connection
- Open Library and Google Books APIs are free but may have rate limits
- Wait a few minutes and try again

## Future Enhancements

Potential improvements:
- [ ] Add Unsplash API integration for person images (requires API key)
- [ ] Add caching to avoid re-fetching existing images
- [ ] Add image validation (check if URLs are still valid)
- [ ] Add support for more image sources
- [ ] Create admin page with UI for fetching images

