/**
 * Script to reset all book cover images and then fetch new ones
 * 
 * Usage:
 *   node scripts/reset-and-fetch-images.js
 * 
 * This script will:
 * 1. Remove all coverImage properties from books in data/books.js
 * 2. Run the fetch-images.js script to fetch new covers
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const rootDir = path.resolve(__dirname, '..');

async function resetBookCovers() {
  console.log('🔄 Resetting all book cover images...\n');
  
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
      // Evaluate the array (in production, use a proper parser)
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

  console.log(`Found ${books.length} books\n`);

  // Remove all coverImage properties
  const resetBooks = books.map((book, index) => {
    const { coverImage, ...bookWithoutCover } = book;
    console.log(`[${index + 1}/${books.length}] Removed cover for: ${book.title}`);
    return bookWithoutCover;
  });

  // Reconstruct the file content
  // Try to preserve the original format (comments, etc.)
  const headerMatch = booksContent.match(/(\/\*\*[\s\S]*?\*\/)/);
  const header = headerMatch ? headerMatch[1] : `/**
 * Books Data
 * 
 * A curated collection of books that have shaped thinking, philosophy, and work.
 * Each book represents a node in the knowledge compounding system.
 * 
 * Images are automatically fetched from Open Library or Google Books API.
 */`;

  // Determine if it's ES module or CommonJS
  const isESModule = booksContent.includes('export default');
  
  const updatedContent = `${header}

const books = ${JSON.stringify(resetBooks, null, 2)};

${isESModule ? 'export default books;' : 'module.exports = books;'}
`;

  // Write the updated content
  try {
    await fs.writeFile(booksPath, updatedContent, 'utf8');
    console.log(`\n✅ Reset ${books.length} book covers in ${booksPath}\n`);
  } catch (error) {
    console.error('Error writing books.js:', error);
    process.exit(1);
  }

  return resetBooks.length;
}

async function fetchNewCovers() {
  console.log('📚 Fetching new book cover images...\n');
  
  try {
    // Use --force flag to fetch covers for all books (since we just removed them)
    const { stdout, stderr } = await execAsync('node scripts/fetch-images.js books --force', {
      cwd: rootDir,
      env: { ...process.env, FORCE_REFRESH: 'true' }
    });
    
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error('Error running fetch-images.js:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
  }
}

async function main() {
  try {
    // Step 1: Reset all covers
    const bookCount = await resetBookCovers();
    
    // Step 2: Fetch new covers
    await fetchNewCovers();
    
    console.log(`\n✨ Done! Reset and fetched covers for ${bookCount} books.`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

