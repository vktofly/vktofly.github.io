/**
 * Shared Image Fetching Library
 * 
 * Contains logic for fetching images from Google Custom Search, Open Library, etc.
 * Uses a Calibre-like fallback strategy: ISBN -> Google Books -> Open Library -> Google Images
 */

import fetch from 'node-fetch';

// Helper: Clean query string (remove special chars that might confuse search APIs)
function cleanQuery(text) {
  if (!text) return '';
  return text.replace(/[^\w\s\-\.]/gi, ' ').replace(/\s+/g, ' ').trim();
}

// Helper function to fetch with timeout and retry
export async function fetchWithRetry(url, options = {}, maxRetries = 2, timeoutMs = 15000) {
  const headers = {
    'User-Agent': 'BookCoverFetcher/1.0 (Node.js script; +https://github.com/vktofly)',
    ...options.headers
  };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('ETIMEDOUT')), timeoutMs);
      });

      // Race between fetch and timeout
      const fetchPromise = fetch(url, { ...options, headers });
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

// Helper function to fetch image from Google Images with retry
// Generic version that can be used for books or people
export async function fetchImageFromGoogle(query, maxRetries = 2) {
  const GOOGLE_API_KEY = process.env.GOOGLE_CSE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_CSE_API_KEY;
  const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || process.env.NEXT_PUBLIC_GOOGLE_CSE_ID;

  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    return null; // Silently skip if not configured
  }

  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}&searchType=image&num=5&safe=active&imgSize=large`;

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
        // Filter out placeholders and generic images if possible
        const validImages = data.items.filter(item => {
          const url = item.link?.toLowerCase() || '';
          return !url.includes('placeholder') && !url.includes('generic');
        });

        const bestMatch = validImages.length > 0 ? validImages[0] : data.items[0];
        if (bestMatch?.link) {
          return bestMatch.link;
        }
      }

      // If no results but got response, retry with different query?
      // For now just return null if no items found
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

// Helper function specifically for books (wraps fetchImageFromGoogle)
export async function fetchBookCoverFromGoogleImages(title, author = null, maxRetries = 2) {
  const cleanTitle = cleanQuery(title);
  const cleanAuthor = cleanQuery(author);

  const searchQuery = author 
    ? `${cleanTitle} ${cleanAuthor} book cover`
    : `${cleanTitle} book cover`;
  
  return fetchImageFromGoogle(searchQuery, maxRetries);
}

/**
 * Fetch person image from Wikipedia/Wikimedia Commons (FREE, no API key needed)
 * This is the primary method for finding free images of people
 */
export async function fetchPersonImageFromWikipedia(name, maxRetries = 2) {
  const cleanName = cleanQuery(name);
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Step 1: Search Wikipedia for the person's page
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`;
      const response = await fetchWithRetry(searchUrl);
      
      if (!response.ok) {
        if (attempt === maxRetries) return null;
        continue;
      }
      
      const data = await response.json();
      
      // Step 2: Check if there's a thumbnail image
      if (data.thumbnail && data.thumbnail.source) {
        // Wikipedia thumbnails are usually small, try to get larger version
        // Replace /thumb/ URLs with direct image URLs for better quality
        let imageUrl = data.thumbnail.source;
        
        // Convert thumbnail URL to full-size image URL
        // Wikipedia thumbnails: https://upload.wikimedia.org/wikipedia/commons/thumb/.../filename.jpg/220px-filename.jpg
        // Full image: https://upload.wikimedia.org/wikipedia/commons/.../filename.jpg
        if (imageUrl.includes('/thumb/')) {
          imageUrl = imageUrl.replace('/thumb/', '/').split('/').slice(0, -1).join('/');
        }
        
        return imageUrl;
      }
      
      // Step 3: If no thumbnail, try to get image from page content
      if (data.content_urls && data.content_urls.desktop) {
        const pageUrl = data.content_urls.desktop.page;
        // Try to extract image from page (this would require parsing HTML, skip for now)
      }
      
      return null;
    } catch (error) {
      if (attempt === maxRetries) {
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  return null;
}

/**
 * Fetch person image from Wikimedia Commons search (FREE, no API key needed)
 * Alternative method that searches Commons directly
 */
export async function fetchPersonImageFromCommons(name, maxRetries = 2) {
  const cleanName = cleanQuery(name);
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Search Wikimedia Commons API
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(cleanName + ' portrait')}&srnamespace=6&srlimit=5`;
      const response = await fetchWithRetry(searchUrl);
      
      if (!response.ok) {
        if (attempt === maxRetries) return null;
        continue;
      }
      
      const data = await response.json();
      
      if (data.query && data.query.search && data.query.search.length > 0) {
        // Get the first result's image info
        const firstResult = data.query.search[0];
        const imageTitle = firstResult.title;
        
        // Get image URL
        const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(imageTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=800`;
        const imageResponse = await fetchWithRetry(imageInfoUrl);
        
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          const pages = imageData.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            const imageUrl = pages[pageId]?.imageinfo?.[0]?.url || pages[pageId]?.imageinfo?.[0]?.thumburl;
            if (imageUrl) return imageUrl;
          }
        }
      }
      
      return null;
    } catch (error) {
      if (attempt === maxRetries) {
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  return null;
}

/**
 * Main function to fetch person image
 * Strategy: Wikipedia API (FREE) -> Wikimedia Commons (FREE) -> Google Images (if API key available) -> Placeholder
 */
export async function fetchPersonImage(name, category, maxRetries = 2) {
  const cleanName = cleanQuery(name);
  
  // 1. Try Wikipedia API first (FREE, no API key needed, best for famous people)
  try {
    const wikipediaImage = await fetchPersonImageFromWikipedia(name, maxRetries);
    if (wikipediaImage) {
      return wikipediaImage;
    }
  } catch (error) {
    console.warn(`Wikipedia fetch failed for ${name}:`, error.message);
  }
  
  // 2. Try Wikimedia Commons search (FREE, no API key needed)
  try {
    const commonsImage = await fetchPersonImageFromCommons(name, maxRetries);
    if (commonsImage) {
      return commonsImage;
    }
  } catch (error) {
    console.warn(`Wikimedia Commons fetch failed for ${name}:`, error.message);
  }
  
  // 3. Try Google Custom Search (requires API key, but free tier available)
  try {
    const searchQuery = `${cleanName} ${category} portrait`;
    const googleImage = await fetchImageFromGoogle(searchQuery, maxRetries);
    if (googleImage) {
      return googleImage;
    }
  } catch (error) {
    console.warn(`Google Images fetch failed for ${name}:`, error.message);
  }
  
  // 4. Return null - let the caller handle fallback to placeholder
  return null;
}


// Main function to fetch book cover
// Strategy: ISBN -> Google Books (High Quality) -> Open Library (Search) -> Google Images (Backup)
export async function fetchBookCover(title, author = null, isbn = null) {
  const cleanTitle = cleanQuery(title);
  const cleanAuthor = cleanQuery(author);
  
  // 1. Try ISBN first (Highest Accuracy)
  if (isbn) {
    try {
      // Try Open Library ISBN (returns standard covers)
      const isbnUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      const response = await fetchWithRetry(isbnUrl, { method: 'HEAD' });
      
      // Better: Try Google Books API by ISBN
      const gbIsbnUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
      const gbResponse = await fetchWithRetry(gbIsbnUrl);
      if (gbResponse.ok) {
        const gbData = await gbResponse.json();
        if (gbData.items && gbData.items.length > 0) {
           const img = gbData.items[0].volumeInfo?.imageLinks?.thumbnail;
           if (img) return img.replace('zoom=1', 'zoom=3').replace('&edge=curl', '');
        }
      }

      // If Google Books failed, return the Open Library URL if it seemed valid
      if (response.ok) return isbnUrl;

    } catch (e) {
      console.warn(`ISBN fetch failed for ${title}:`, e.message);
    }
  }

  const searchQuery = author ? `${cleanTitle} ${cleanAuthor}` : cleanTitle;

  // 2. Try Google Books API (Search) - Usually best quality thumbnails
  try {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`;
    const googleResponse = await fetchWithRetry(googleBooksUrl);
    
    if (googleResponse && googleResponse.ok) {
      const googleData = await googleResponse.json();
      if (googleData.items && googleData.items.length > 0) {
        const book = googleData.items[0];
        if (book.volumeInfo?.imageLinks?.thumbnail) {
          // Request higher zoom (zoom=3 is roughly 300-400px width)
          return book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=3').replace('&edge=curl', '');
        }
      }
    }
  } catch (error) {
    console.warn(`Google Books fetch failed for ${title}:`, error.message);
  }

  // 3. Try Open Library Search API
  try {
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=1`;
    const response = await fetchWithRetry(searchUrl);
    
    if (response.ok) {
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
    }
  } catch (error) {
    console.warn(`Open Library search failed for ${title}:`, error.message);
  }

  // 4. Try Google Images (Custom Search) - Final fallback
  try {
    const googleImagesUrl = await fetchBookCoverFromGoogleImages(title, author, 2);
    if (googleImagesUrl) return googleImagesUrl;
  } catch (error) {
    console.warn(`Google Images fetch failed for ${title}:`, error.message);
  }

  return null;
}
