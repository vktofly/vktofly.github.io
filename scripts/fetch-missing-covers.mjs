#!/usr/bin/env node

/**
 * Script to fetch cover images only for books that are missing covers
 * 
 * Usage:
 *   node scripts/fetch-missing-covers.mjs
 */

import { fetchBookCover } from '../lib/image-fetcher.mjs';
import { readDataFile, saveDataFile } from '../lib/data-utils.mjs';

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
  
  const { data: books } = await readDataFile('books.js');
  
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

  await saveDataFile('books.js', updatedBooks, 'books');
  
  console.log(`\n✅ Updated books.js`);
  console.log(`   ✓ Fetched ${fetchedCount} covers`);
  if (failedCount > 0) {
    console.log(`   ✗ Failed to find ${failedCount} covers`);
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

