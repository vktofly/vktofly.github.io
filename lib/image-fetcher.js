/**
 * Image Fetcher Utilities
 * 
 * Helper functions to fetch images for books and people from various APIs.
 * These can be used when adding new items to the data files.
 */

/**
 * Fetch book cover image from Open Library API
 * @param {string} title - Book title
 * @param {string} author - Book author (optional, helps with accuracy)
 * @param {string} isbn - ISBN (optional, most accurate)
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchBookCover(title, author = null, isbn = null) {
  try {
    // Try ISBN first (most accurate)
    if (isbn) {
      const isbnUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      // Test if image exists
      const response = await fetch(isbnUrl, { method: 'HEAD' });
      if (response.ok) {
        return isbnUrl;
      }
    }

    // Try Open Library Search API
    const searchQuery = author ? `${title} ${author}` : title;
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=1`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error('Open Library API error');

    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      const book = data.docs[0];
      
      // Try ISBN from search result
      if (book.isbn && book.isbn.length > 0) {
        const isbnUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
        return isbnUrl;
      }
      
      // Try OCLC number
      if (book.oclc && book.oclc.length > 0) {
        const oclcUrl = `https://covers.openlibrary.org/b/oclc/${book.oclc[0]}-L.jpg`;
        return oclcUrl;
      }
      
      // Try Open Library ID
      if (book.cover_edition_key) {
        const olidUrl = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
        return olidUrl;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
}

/**
 * Helper function to fetch with timeout and retry (for use in lib)
 */
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

/**
 * Fetch book cover image from Google Images using Custom Search API with retry
 * @param {string} title - Book title
 * @param {string} author - Book author (optional)
 * @param {string} apiKey - Google Custom Search API key (from environment or config)
 * @param {string} searchEngineId - Custom Search Engine ID configured for Google Images
 * @param {number} maxRetries - Maximum number of retry attempts (default: 2)
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchBookCoverFromGoogleImages(title, author = null, apiKey = null, searchEngineId = null, maxRetries = 2) {
  // Check if API credentials are available
  const GOOGLE_API_KEY = apiKey || process.env.NEXT_PUBLIC_GOOGLE_CSE_API_KEY || process.env.GOOGLE_CSE_API_KEY;
  const GOOGLE_CSE_ID = searchEngineId || process.env.NEXT_PUBLIC_GOOGLE_CSE_ID || process.env.GOOGLE_CSE_ID;

  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    console.warn('Google Custom Search API credentials not configured. Skipping Google Images search.');
    return null;
  }

  // Build search query: "book title author" + "book cover" for better results
  const searchQuery = author 
    ? `${title} ${author} book cover`
    : `${title} book cover`;
  
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=5&safe=active`;

  // Retry logic for Google Images
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithRetry(apiUrl);
      if (!response.ok) {
        if (attempt === maxRetries) {
          console.error('Google Custom Search API error:', response.status, response.statusText);
          return null;
        }
        continue; // Retry on HTTP error
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        // Filter for book cover images (prefer images with "cover" in URL or title)
        const coverImages = data.items.filter(item => {
          const url = item.link?.toLowerCase() || '';
          const title = item.title?.toLowerCase() || '';
          return url.includes('cover') || title.includes('cover') || url.includes('book');
        });

        // Return the best match (prefer filtered results, fallback to first result)
        const bestMatch = coverImages.length > 0 ? coverImages[0] : data.items[0];
        
        if (bestMatch?.link) {
          return bestMatch.link;
        }
      }

      // If no results but got response, retry
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }

      return null;
    } catch (error) {
      if (attempt === maxRetries) {
        console.error('Error fetching from Google Images:', error);
        return null;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  return null;
}

/**
 * Fetch book cover with fallback to Google Books API and Google Images
 * @param {string} title - Book title
 * @param {string} author - Book author (optional)
 * @param {string} isbn - ISBN (optional)
 * @param {object} options - Optional configuration
 * @param {string} options.googleApiKey - Google Custom Search API key
 * @param {string} options.googleCseId - Custom Search Engine ID
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchBookCoverWithFallback(title, author = null, isbn = null, options = {}) {
  // Try Open Library first (most reliable for books)
  const openLibraryUrl = await fetchBookCover(title, author, isbn);
  if (openLibraryUrl) return openLibraryUrl;

  // Fallback to Google Books API
  try {
    const searchQuery = author ? `${title}+inauthor:${author}` : title;
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`;
    
    const response = await fetch(googleBooksUrl);
    if (response.ok) {
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const book = data.items[0];
        if (book.volumeInfo?.imageLinks?.thumbnail) {
          // Replace thumbnail with large image
          const imageUrl = book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
          if (imageUrl) return imageUrl;
        }
        if (book.volumeInfo?.imageLinks?.large) {
          return book.volumeInfo.imageLinks.large;
        }
      }
    }
  } catch (error) {
    console.error('Error fetching from Google Books:', error);
  }

  // Final fallback to Google Images (with retries built-in)
  const googleImagesUrl = await fetchBookCoverFromGoogleImages(
    title, 
    author, 
    options.googleApiKey, 
    options.googleCseId,
    2 // maxRetries
  );
  if (googleImagesUrl) return googleImagesUrl;

  return null;
}

/**
 * Fetch person image from Unsplash (generic portraits)
 * @param {string} name - Person's name
 * @param {string} category - Category (philosopher, technologist, etc.)
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchPersonImage(name, category = 'philosopher') {
  try {
    // Use Unsplash API with category-based search
    const categoryMap = {
      philosopher: 'philosopher,thinker,portrait',
      technologist: 'scientist,engineer,technology',
      entrepreneur: 'business,professional,portrait',
      historical: 'historical,portrait,classic',
    };
    
    const searchQuery = categoryMap[category] || 'portrait,professional';
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&client_id=YOUR_UNSPLASH_ACCESS_KEY`;
    
    // Note: This requires Unsplash API key. For now, return a placeholder URL
    // You can get a free API key from https://unsplash.com/developers
    
    // Alternative: Use a placeholder service or manual images
    return null;
  } catch (error) {
    console.error('Error fetching person image:', error);
    return null;
  }
}

/**
 * Generate Unsplash image URL for a person (no API key needed, but less accurate)
 * @param {string} name - Person's name
 * @param {string} category - Category
 * @returns {string} Unsplash image URL
 */
export function getPersonImagePlaceholder(name, category = 'philosopher') {
  // Use Unsplash Source API (no key needed, but less control)
  const categoryMap = {
    philosopher: 'philosopher,thinker',
    technologist: 'scientist,engineer',
    entrepreneur: 'business,professional',
    historical: 'historical,portrait',
  };
  
  const searchQuery = categoryMap[category] || 'portrait';
  // Note: Unsplash Source API is deprecated, so we'll use a different approach
  
  // For now, return a curated Unsplash image based on category
  const imageMap = {
    philosopher: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    technologist: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
    entrepreneur: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    historical: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  };
  
  return imageMap[category] || imageMap.philosopher;
}

/**
 * Helper function to update book cover in data file
 * This can be used in a Node.js script to update data files
 */
export async function updateBookCoverImage(bookData) {
  const { title, author, isbn } = bookData;
  const imageUrl = await fetchBookCoverWithFallback(title, author, isbn);
  
  if (imageUrl) {
    return {
      ...bookData,
      coverImage: imageUrl,
    };
  }
  
  return bookData;
}

/**
 * Helper function to update person image in data file
 */
export async function updatePersonImage(personData) {
  const { name, category } = personData;
  
  // Try to get a better image (would need API key)
  // For now, use placeholder
  const imageUrl = getPersonImagePlaceholder(name, category);
  
  return {
    ...personData,
    image: imageUrl,
  };
}

/**
 * Batch update images for multiple books
 */
export async function batchUpdateBookCovers(books) {
  const updatedBooks = await Promise.all(
    books.map(book => updateBookCoverImage(book))
  );
  return updatedBooks;
}

/**
 * Batch update images for multiple people
 */
export async function batchUpdatePersonImages(people) {
  const updatedPeople = await Promise.all(
    people.map(person => updatePersonImage(person))
  );
  return updatedPeople;
}

