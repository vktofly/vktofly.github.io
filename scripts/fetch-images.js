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

// Helper function to fetch book cover
async function fetchBookCover(title, author = null, isbn = null) {
  try {
    // Try ISBN first (most accurate)
    if (isbn) {
      const isbnUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      try {
        const response = await fetch(isbnUrl, { method: 'HEAD' });
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
    
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error('Open Library API error');

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
    const googleResponse = await fetch(googleBooksUrl);
    if (googleResponse.ok) {
      const googleData = await googleResponse.json();
      if (googleData.items && googleData.items.length > 0) {
        const book = googleData.items[0];
        if (book.volumeInfo?.imageLinks?.thumbnail) {
          return book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching book cover:', error.message);
    return null;
  }
}

async function updateBooks() {
  console.log('📚 Fetching book cover images...\n');
  
  const booksPath = path.join(rootDir, 'data', 'books.js');
  
  // Use dynamic import for ES modules
  let books;
  try {
    // For Node.js with ES modules support
    const booksModule = await import('file://' + booksPath);
    books = booksModule.default || booksModule.books;
  } catch (e) {
    // Fallback: read and parse manually
    const booksContent = await fs.readFile(booksPath, 'utf8');
    // Simple extraction - find the array
    const match = booksContent.match(/const books = (\[[\s\S]*?\]);/);
    if (match) {
      // Evaluate safely (in production, use a proper parser)
      books = eval(match[1]);
    } else {
      console.error('Could not parse books.js');
      return;
    }
  }
  
  if (!books || !Array.isArray(books)) {
    console.error('Books data is not an array');
    return;
  }
  
  console.log(`Found ${books.length} books\n`);
  
  const updatedBooks = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(`[${i + 1}/${books.length}] Fetching cover for: ${book.title}...`);
    
    // Only fetch if coverImage is missing or is a placeholder
    if (!book.coverImage || book.coverImage.includes('unsplash.com/photo-1544947950')) {
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

