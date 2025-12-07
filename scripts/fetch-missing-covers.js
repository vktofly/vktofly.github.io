/**
 * Script to fetch cover images only for books that are missing covers
 * 
 * Usage:
 *   node scripts/fetch-missing-covers.js
 * 
 * This script will:
 * 1. Find all books without coverImage or with placeholder images
 * 2. Fetch covers for only those books
 * 3. Update the data file with new cover URLs
 */

const fs = require('fs').promises;
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Polyfill fetch for Node.js versions that don't have it
let fetch;
try {
  // Try to use native fetch (Node.js 18+)
  if (typeof globalThis.fetch === 'function') {
    fetch = globalThis.fetch;
  } else {
    // Fallback to node-fetch (CommonJS style for Node.js < 18)
    const nodeFetch = require('node-fetch');
    fetch = nodeFetch.default || nodeFetch;
  }
} catch (e) {
  console.error('Error: fetch is not available.');
  console.error('Please install node-fetch: npm install --save-dev node-fetch');
  console.error('Or use Node.js 18+ which has native fetch support.');
  console.error('Error details:', e.message);
  process.exit(1);
}

// Helper function to fetch book cover from Google Images with retry
async function fetchBookCoverFromGoogleImages(title, author = null, maxRetries = 2) {
  const GOOGLE_API_KEY = process.env.GOOGLE_CSE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_CSE_API_KEY;
  const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || process.env.NEXT_PUBLIC_GOOGLE_CSE_ID;

  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    return null; // Silently skip if not configured
  }

  const searchQuery = author 
    ? `${title} ${author} book cover`
    : `${title} book cover`;
  
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=5&safe=active`;

  // Retry logic for Google Images
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithRetry(apiUrl);
      if (!response.ok) {
        if (attempt === maxRetries) return null;
        continue; // Retry on HTTP error
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        // Filter for book cover images
        const coverImages = data.items.filter(item => {
          const url = item.link?.toLowerCase() || '';
          const title = item.title?.toLowerCase() || '';
          return url.includes('cover') || title.includes('cover') || url.includes('book');
        });

        const bestMatch = coverImages.length > 0 ? coverImages[0] : data.items[0];
        if (bestMatch?.link) {
          return bestMatch.link;
        }
      }

      // If no results but got response, retry with different query
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }

      return null;
    } catch (error) {
      if (attempt === maxRetries) {
        return null; // Silently fail after all retries
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  return null;
}

// Helper function to fetch with timeout and retry
async function fetchWithRetry(url, options = {}, maxRetries = 2, timeoutMs = 15000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('ETIMEDOUT')), timeoutMs);
      });

      // Race between fetch and timeout
      const fetchPromise = fetch(url, options);
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}

// Helper function to fetch book cover
async function fetchBookCover(title, author = null, isbn = null) {
  try {
    // Try ISBN first (most accurate)
    if (isbn) {
      const isbnUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      try {
        const response = await fetchWithRetry(isbnUrl, { method: 'HEAD' });
        if (response.ok) {
          return isbnUrl;
        }
      } catch (e) {
        // Continue to next method
      }
    }

    // Try Open Library Search API
    const searchQuery = author ? `${title} ${author}` : title;
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=1`;
    
    let response;
    try {
      response = await fetchWithRetry(searchUrl);
    } catch (fetchError) {
      throw new Error(`Network error fetching from Open Library: ${fetchError.message || fetchError.code || 'Connection timeout'}`);
    }
    
    if (!response.ok) {
      throw new Error(`Open Library API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      const book = data.docs[0];
      
      // Try ISBN from search result
      if (book.isbn && book.isbn.length > 0) {
        return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
      }
      
      // Try Open Library ID
      if (book.cover_edition_key) {
        return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
      }
    }

    // Fallback to Google Books
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`;
    let googleResponse;
    try {
      googleResponse = await fetchWithRetry(googleBooksUrl);
    } catch (fetchError) {
      // Continue to next fallback
      googleResponse = null;
    }
    
    if (googleResponse && googleResponse.ok) {
      const googleData = await googleResponse.json();
      if (googleData.items && googleData.items.length > 0) {
        const book = googleData.items[0];
        if (book.volumeInfo?.imageLinks?.thumbnail) {
          return book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
        }
      }
    }

    // Try Google Images (with retries built-in)
    const googleImagesUrl = await fetchBookCoverFromGoogleImages(title, author, 2);
    if (googleImagesUrl) return googleImagesUrl;

    return null;
  } catch (error) {
    // Provide more detailed error information
    const errorMsg = error.message || String(error);
    const errorCode = error.code || (errorMsg.includes('ETIMEDOUT') ? 'ETIMEDOUT' : null);
    
    if (errorCode === 'ENOTFOUND') {
      console.error(`Error fetching book cover: DNS lookup failed - ${errorMsg}`);
      console.error('  Check your internet connection and DNS settings.');
    } else if (errorCode === 'ECONNREFUSED') {
      console.error(`Error fetching book cover: Connection refused - ${errorMsg}`);
      console.error('  The server may be down or unreachable. Check firewall/proxy settings.');
    } else if (errorCode === 'ETIMEDOUT' || errorMsg.includes('timeout') || errorMsg.includes('ETIMEDOUT')) {
      console.error(`Error fetching book cover: Request timeout - ${errorMsg}`);
      console.error('  The server took too long to respond. This could be:');
      console.error('  - Network connectivity issues');
      console.error('  - Firewall/proxy blocking the connection');
      console.error('  - The API server is slow or overloaded');
      console.error('  - Try again later or check your network settings');
    } else if (errorMsg.includes('fetch')) {
      console.error(`Error fetching book cover: ${errorMsg}`);
      console.error('  This might be a network issue or the API endpoint is unreachable.');
    } else {
      console.error(`Error fetching book cover: ${errorMsg}`);
      if (errorCode) {
        console.error(`  Error code: ${errorCode}`);
      }
    }
    return null;
  }
}

// Check if a book needs a cover image
function needsCoverImage(book) {
  // Missing coverImage
  if (!book.coverImage) {
    return true;
  }
  
  // Placeholder images (common Unsplash placeholders)
  const placeholderPatterns = [
    'unsplash.com/photo-1544947950',
    'unsplash.com/photo-1507003211169',
    'unsplash.com/photo-1481627834876',
    'unsplash.com/photo-1557682250',
    'unsplash.com/photo-1677442136019',
  ];
  
  const hasPlaceholder = placeholderPatterns.some(pattern => 
    book.coverImage.includes(pattern)
  );
  
  return hasPlaceholder;
}

async function fetchMissingCovers() {
  console.log('📚 Fetching cover images for books missing covers...\n');
  
  const booksPath = path.join(rootDir, 'data', 'books.js');
  
  // Read the books file
  let booksContent;
  try {
    booksContent = await fs.readFile(booksPath, 'utf8');
  } catch (error) {
    console.error('Error reading books.js:', error);
    process.exit(1);
  }

  // Parse the books array
  let books;
  try {
    // Try to extract the books array using regex
    const match = booksContent.match(/const books = (\[[\s\S]*?\]);/);
    if (match) {
      books = eval(match[1]);
    } else {
      // Try ES module export
      const esModuleMatch = booksContent.match(/export default (\[[\s\S]*?\]);/);
      if (esModuleMatch) {
        books = eval(esModuleMatch[1]);
      } else {
        console.error('Could not parse books.js - array not found');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('Error parsing books.js:', error);
    process.exit(1);
  }

  if (!books || !Array.isArray(books)) {
    console.error('Books data is not an array');
    process.exit(1);
  }

  // Filter books that need covers
  const booksNeedingCovers = books.filter(needsCoverImage);
  
  if (booksNeedingCovers.length === 0) {
    console.log('✅ All books already have cover images!\n');
    return;
  }

  console.log(`Found ${books.length} total books`);
  console.log(`Found ${booksNeedingCovers.length} books missing covers\n`);

  // Create a map for quick lookup
  const updatedBooksMap = new Map();
  books.forEach(book => updatedBooksMap.set(book.slug, { ...book }));

  // Fetch covers for books that need them
  let fetchedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < booksNeedingCovers.length; i++) {
    const book = booksNeedingCovers[i];
    console.log(`[${i + 1}/${booksNeedingCovers.length}] Fetching cover for: ${book.title}...`);
    
    const imageUrl = await fetchBookCover(
      book.title,
      book.author,
      book.isbn
    );
    
    if (imageUrl) {
      updatedBooksMap.set(book.slug, {
        ...book,
        coverImage: imageUrl,
      });
      console.log(`  ✓ Found: ${imageUrl}`);
      fetchedCount++;
    } else {
      console.log(`  ✗ Not found`);
      failedCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Convert map back to array (preserve original order)
  const updatedBooks = books.map(book => updatedBooksMap.get(book.slug));

  // Reconstruct the file content
  const headerMatch = booksContent.match(/(\/\*\*[\s\S]*?\*\/)/);
  const header = headerMatch ? headerMatch[1] : `/**
 * Books Data
 * 
 * A curated collection of books that have shaped thinking, philosophy, and work.
 * Each book represents a node in the knowledge compounding system.
 * 
 * Images are automatically fetched from Open Library or Google Books API.
 */`;

  const isESModule = booksContent.includes('export default');
  
  const updatedContent = `${header}

const books = ${JSON.stringify(updatedBooks, null, 2)};

${isESModule ? 'export default books;' : 'module.exports = books;'}
`;

  // Write the updated content
  try {
    await fs.writeFile(booksPath, updatedContent, 'utf8');
    console.log(`\n✅ Updated ${booksPath}`);
    console.log(`   ✓ Fetched ${fetchedCount} covers`);
    if (failedCount > 0) {
      console.log(`   ✗ Failed to find ${failedCount} covers`);
    }
  } catch (error) {
    console.error('Error writing books.js:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await fetchMissingCovers();
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

