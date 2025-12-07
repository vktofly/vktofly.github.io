#!/usr/bin/env node

/**
 * Script to fetch and update images for books and people
 * 
 * Usage:
 *   node scripts/fetch-images.mjs books
 *   node scripts/fetch-images.mjs people
 *   node scripts/fetch-images.mjs all
 */

import { fetchBookCover, fetchPersonImage } from '../lib/image-fetcher.mjs';
import { readDataFile, saveDataFile } from '../lib/data-utils.mjs';

function getPersonImagePlaceholder(name, category = 'philosopher') {
  const imageMap = {
    philosopher: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    technologist: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
    entrepreneur: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    historical: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  };
  return imageMap[category] || imageMap.philosopher;
}

async function updateBooks() {
  console.log('📚 Fetching book cover images...\n');
  
  const { data: books } = await readDataFile('books.js');
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
  
  await saveDataFile('books.js', updatedBooks, 'books');
}

async function updatePeople() {
  console.log('👤 Fetching people images...\n');
  
  const { data: people } = await readDataFile('influentialPeople.js');
  console.log(`Found ${people.length} people\n`);
  
  const forceRefresh = process.env.FORCE_REFRESH === 'true' || process.argv.includes('--force');
  const updatedPeople = [];

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    console.log(`[${i + 1}/${people.length}] Updating image for: ${person.name}...`);
    
    // Check if we need to fetch a new image
    // Fetch if: force refresh is on, OR image is missing, OR image is a placeholder
    const needsImage = forceRefresh || 
                       !person.image || 
                       person.image.includes('unsplash.com/photo-1507003211169') || // Generic philosopher placeholder
                       person.image.includes('unsplash.com/photo-1506794778202');    // Generic technologist placeholder

    if (needsImage) {
      // Try multiple free sources: Wikipedia -> Wikimedia Commons -> Google Images -> Placeholder
      let imageUrl = await fetchPersonImage(person.name, person.category);

      // Fallback to placeholder if all sources fail
      if (!imageUrl) {
        imageUrl = getPersonImagePlaceholder(person.name, person.category);
        console.log(`  ⚠️  All image sources failed, using placeholder: ${imageUrl}`);
      } else {
        // Determine source from URL for better logging
        let source = 'Unknown';
        if (imageUrl.includes('wikipedia.org') || imageUrl.includes('wikimedia.org')) {
          source = 'Wikipedia/Wikimedia Commons (FREE)';
        } else if (imageUrl.includes('googleusercontent.com') || imageUrl.includes('googleapis.com')) {
          source = 'Google Images';
        }
        console.log(`  ✓ Found on ${source}: ${imageUrl.substring(0, 80)}...`);
      }

      updatedPeople.push({
        ...person,
        image: imageUrl,
      });
    } else {
      updatedPeople.push(person);
      console.log(`  → Already has image, skipping`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  await saveDataFile('influentialPeople.js', updatedPeople, 'influentialPeople');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args.find(arg => !arg.startsWith('--')) || 'all';
  
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
