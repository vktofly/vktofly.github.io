/**
 * Script to fetch and update images for books and people
 * 
 * Usage:
 *   node scripts/fetch-images.js books
 *   node scripts/fetch-images.js people
 *   node scripts/fetch-images.js all
 * 
 * This script will update the data files with fetched image URLs.
 * 
 * Note: This requires Node.js 18+ with fetch support, or you can use node-fetch package.
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
    } else if (errorMsg.includes('fetch') || errorMsg.includes('Network error')) {
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

async function updateBooks() {
  console.log('📚 Fetching book cover images...\n');
  
  const booksPath = path.join(rootDir, 'data', 'books.js');
  
  // Read and parse books file (avoid ES module import warning)
  let books;
  try {
    const booksContent = await fs.readFile(booksPath, 'utf8');
    // Simple extraction - find the array
    const match = booksContent.match(/const books = (\[[\s\S]*?\]);/);
    if (match) {
      // Evaluate safely (in production, use a proper parser)
      books = eval(match[1]);
    } else {
      // Try ES module format
      const esMatch = booksContent.match(/export default (\[[\s\S]*?\]);/);
      if (esMatch) {
        books = eval(esMatch[1]);
      } else {
        console.error('Could not parse books.js');
        return;
      }
    }
  } catch (e) {
    console.error('Error reading books.js:', e.message);
    return;
  }
  
  if (!books || !Array.isArray(books)) {
    console.error('Books data is not an array');
    return;
  }
  
  console.log(`Found ${books.length} books\n`);
  
  const updatedBooks = [];
  const forceRefresh = process.env.FORCE_REFRESH === 'true' || process.argv.includes('--force');
  
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(`[${i + 1}/${books.length}] Fetching cover for: ${book.title}...`);
    
    // Fetch if coverImage is missing, is a placeholder, or if force refresh is enabled
    if (forceRefresh || !book.coverImage || book.coverImage.includes('unsplash.com/photo-1544947950')) {
      const imageUrl = await fetchBookCover(
        book.title,
        book.author,
        book.isbn
      );
      
      if (imageUrl) {
        updatedBooks.push({
          ...book,
          coverImage: imageUrl,
        });
        console.log(`  ✓ Found: ${imageUrl}`);
      } else {
        updatedBooks.push(book);
        console.log(`  ✗ Not found, keeping existing`);
      }
    } else {
      updatedBooks.push(book);
      console.log(`  → Already has image, skipping`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Write updated books back to file
  const updatedContent = `/**
 * Books Data
 * 
 * A curated collection of books that have shaped thinking, philosophy, and work.
 * Each book represents a node in the knowledge compounding system.
 * 
 * Images are automatically fetched from Open Library or Google Books API.
 */

const books = ${JSON.stringify(updatedBooks, null, 2)};

export default books;
`;
  
  await fs.writeFile(booksPath, updatedContent, 'utf8');
  console.log(`\n✅ Updated ${booksPath}`);
}

function getPersonImagePlaceholder(name, category = 'philosopher') {
  const imageMap = {
    philosopher: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    technologist: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
    entrepreneur: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    historical: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  };
  return imageMap[category] || imageMap.philosopher;
}

async function updatePeople() {
  console.log('👤 Fetching people images...\n');
  
  const peoplePath = path.join(rootDir, 'data', 'influentialPeople.js');
  
  // Use dynamic import for ES modules
  let people;
  try {
    const peopleModule = await import('file://' + peoplePath);
    people = peopleModule.default || peopleModule.influentialPeople;
  } catch (e) {
    // Fallback: read and parse manually
    const peopleContent = await fs.readFile(peoplePath, 'utf8');
    const match = peopleContent.match(/const influentialPeople = (\[[\s\S]*?\]);/);
    if (match) {
      people = eval(match[1]);
    } else {
      console.error('Could not parse influentialPeople.js');
      return;
    }
  }
  
  if (!people || !Array.isArray(people)) {
    console.error('People data is not an array');
    return;
  }
  
  console.log(`Found ${people.length} people\n`);
  
  const updatedPeople = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    console.log(`[${i + 1}/${people.length}] Updating image for: ${person.name}...`);
    
    // Only update if image is missing or is a placeholder
    if (!person.image || person.image.includes('unsplash.com/photo-1507003211169')) {
      const imageUrl = getPersonImagePlaceholder(person.name, person.category);
      updatedPeople.push({
        ...person,
        image: imageUrl,
      });
      console.log(`  ✓ Updated: ${imageUrl}`);
    } else {
      updatedPeople.push(person);
      console.log(`  → Already has image, skipping`);
    }
  }
  
  // Write updated people back to file
  const updatedContent = `/**
 * Influential People Data
 * 
 * People whose ideas, work, and philosophy have shaped my thinking and approach.
 * Each person represents a node in the intellectual network that informs my work.
 * 
 * Images are curated or fetched from image services.
 */

const influentialPeople = ${JSON.stringify(updatedPeople, null, 2)};

export default influentialPeople;
`;
  
  await fs.writeFile(peoplePath, updatedContent, 'utf8');
  console.log(`\n✅ Updated ${peoplePath}`);
}

async function main() {
  const command = process.argv[2] || 'all';
  
  try {
    if (command === 'books' || command === 'all') {
      await updateBooks();
    }
    
    if (command === 'people' || command === 'all') {
      await updatePeople();
    }
    
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

