#!/usr/bin/env node

/**
 * Script to reset all book cover images and then fetch new ones
 *
 * Usage:
 *   node scripts/reset-and-fetch-covers.mjs
 */

import { readDataFile, saveDataFile } from "../lib/data-utils.mjs";
import { fetchBookCover } from "../lib/image-fetcher.mjs";

async function resetBookCovers() {
  console.log("🔄 Resetting all book cover images...\n");

  const { data: books } = await readDataFile("books.js");
  console.log(`Found ${books.length} books\n`);

  // Remove all coverImage properties
  const resetBooks = books.map((book, index) => {
    const { coverImage, ...bookWithoutCover } = book;
    console.log(
      `[${index + 1}/${books.length}] Removed cover for: ${book.title}`
    );
    return bookWithoutCover;
  });

  await saveDataFile("books.js", resetBooks, "books");

  return resetBooks.length;
}

async function fetchNewCovers() {
  console.log("📚 Fetching new book cover images...\n");

  const { data: books } = await readDataFile("books.js");
  console.log(`Found ${books.length} books\n`);

  const updatedBooks = [];
  let updatedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(
      `[${i + 1}/${books.length}] Processing: ${book.title}${
        book.author ? ` by ${book.author}` : ""
      }...`
    );

    const imageUrl = await fetchBookCover(book.title, book.author, book.isbn);

    if (imageUrl) {
      updatedBooks.push({
        ...book,
        coverImage: imageUrl,
      });

      // Determine source from URL for better logging
      let source = "Unknown";
      if (imageUrl.includes("openlibrary.org")) {
        source = "Open Library";
      } else if (imageUrl.includes("books.google.com")) {
        source = "Google Books";
      } else if (
        imageUrl.includes("googleapis.com") ||
        imageUrl.includes("googleusercontent.com")
      ) {
        source = "Google Images";
      }
      console.log(`  ✓ Found on ${source}`);
      updatedCount++;
    } else {
      updatedBooks.push(book);
      console.log(`  ✗ Not found`);
      failedCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await saveDataFile("books.js", updatedBooks, "books");

  console.log("\n📊 Summary:");
  console.log(`  ✓ Updated: ${updatedCount}`);
  console.log(`  ✗ Failed: ${failedCount}`);
}

async function main() {
  try {
    // Step 1: Reset all covers
    const bookCount = await resetBookCovers();

    // Step 2: Fetch new covers
    await fetchNewCovers();

    console.log(`\n✨ Done! Reset and fetched covers for ${bookCount} books.`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
