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
 * Fetch book cover with fallback to Google Books API
 * @param {string} title - Book title
 * @param {string} author - Book author (optional)
 * @param {string} isbn - ISBN (optional)
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchBookCoverWithFallback(title, author = null, isbn = null) {
  // Try Open Library first
  const openLibraryUrl = await fetchBookCover(title, author, isbn);
  if (openLibraryUrl) return openLibraryUrl;

  // Fallback to Google Books API
  try {
    const searchQuery = author ? `${title}+inauthor:${author}` : title;
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`;
    
    const response = await fetch(googleBooksUrl);
    if (!response.ok) return null;

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const book = data.items[0];
      if (book.volumeInfo?.imageLinks?.thumbnail) {
        // Replace thumbnail with large image
        return book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
      }
      if (book.volumeInfo?.imageLinks?.large) {
        return book.volumeInfo.imageLinks.large;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching from Google Books:', error);
    return null;
  }
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

