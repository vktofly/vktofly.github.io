#!/usr/bin/env node

/**
 * Book Categorization Script
 * 
 * Automatically categorizes books in data/books.js using AI or keyword matching.
 * 
 * Usage:
 *   node scripts/categorize-books.mjs                    # Preview changes (dry run)
 *   node scripts/categorize-books.mjs --apply            # Apply changes to books.js
 *   node scripts/categorize-books.mjs --keywords-only    # Use keyword matching only
 */

import { categorizeBooks } from '../lib/book-categorizer.mjs';
import { readDataFile, saveDataFile } from '../lib/data-utils.mjs';

// Parse command line arguments
const args = process.argv.slice(2);
const applyChanges = args.includes('--apply');
const keywordsOnly = args.includes('--keywords-only');

console.log('📚 Book Categorization Tool\n');

// Load books using data-utils
const { data: books } = await readDataFile('books.js');
console.log(`Found ${books.length} books to categorize\n`);

if (keywordsOnly) {
  console.log('Using keyword-based categorization (no AI)\n');
} else if (process.env.OPENAI_API_KEY) {
  console.log('Using AI categorization (OpenAI API)\n');
} else {
  console.log('⚠️  OPENAI_API_KEY not found, using keyword-based categorization\n');
}

// Track progress
let processed = 0;
const onProgress = (current, total, result) => {
  processed = current;
  const percentage = Math.round((current / total) * 100);
  process.stdout.write(`\rProgress: ${current}/${total} (${percentage}%) - ${result.title}`);
};

// Categorize books
const results = await categorizeBooks(books, {
  useAI: !keywordsOnly && !!process.env.OPENAI_API_KEY,
  delay: 200, // 200ms delay between API calls
  onProgress,
});

console.log('\n\n📊 Categorization Results:\n');

// Group results
const changed = results.filter(r => r.changed);
const unchanged = results.filter(r => !r.changed);
const errors = results.filter(r => r.error);

if (changed.length > 0) {
  console.log(`🔄 ${changed.length} books would be recategorized:\n`);
  changed.forEach(result => {
    console.log(`  • ${result.title}`);
    console.log(`    ${result.currentCategory} → ${result.suggestedCategory}`);
  });
  console.log();
}

if (unchanged.length > 0) {
  console.log(`✓ ${unchanged.length} books would remain unchanged\n`);
}

if (errors.length > 0) {
  console.log(`⚠️  ${errors.length} books had errors:\n`);
  errors.forEach(result => {
    console.log(`  • ${result.title}: ${result.error}`);
  });
  console.log();
}

// Apply changes if requested
if (applyChanges && changed.length > 0) {
  console.log('Applying changes to data/books.js...\n');
  
  // Create a map of changes
  const changesMap = new Map();
  changed.forEach(result => {
    changesMap.set(result.slug, result.suggestedCategory);
  });

  // Update the books array in memory
  const updatedBooks = books.map(book => {
    if (changesMap.has(book.slug)) {
      return { ...book, category: changesMap.get(book.slug) };
    }
    return book;
  });

  // Save back to file using data-utils
  await saveDataFile('books.js', updatedBooks, 'books');
  
  console.log(`✓ Successfully updated ${changed.length} books in data/books.js\n`);
  console.log('⚠️  Please review the changes and test your site before committing.\n');
} else if (changed.length > 0) {
  console.log('💡 Run with --apply flag to apply these changes\n');
}

// Summary
console.log('Summary:');
console.log(`  Total books: ${books.length}`);
console.log(`  Would change: ${changed.length}`);
console.log(`  Unchanged: ${unchanged.length}`);
if (errors.length > 0) {
  console.log(`  Errors: ${errors.length}`);
}

