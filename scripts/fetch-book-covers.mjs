#!/usr/bin/env node

/**
 * Script to fetch and update book cover images
 *
 * Uses multiple sources: ISBN -> Google Books -> Open Library -> Google Images (optional)
 *
 * Usage:
 *   node scripts/fetch-book-covers.mjs
 *   node scripts/fetch-book-covers.mjs --force    # Force refresh all covers
 */

import { fetchBookCover } from "../lib/image-fetcher.mjs";
import { readDataFile, saveDataFile } from "../lib/data-utils.mjs";

async function updateBookCovers() {
  console.log("📚 Fetching book cover images...\n");

  const { data: books } = await readDataFile("books.js");
  console.log(`Found ${books.length} books\n`);

  const updatedBooks = [];
  const forceRefresh =
    process.env.FORCE_REFRESH === "true" || process.argv.includes("--force");
  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(
      `[${i + 1}/${books.length}] Processing: ${book.title}${
        book.author ? ` by ${book.author}` : ""
      }...`
    );

    // Fetch if coverImage is missing, is a placeholder, or if force refresh is enabled
    if (
      forceRefresh ||
      !book.coverImage ||
      book.coverImage.includes("unsplash.com/photo-1544947950")
    ) {
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
        console.log(`  ✗ Not found, keeping existing`);
        failedCount++;
      }
    } else {
      updatedBooks.push(book);
      console.log(`  → Already has cover, skipping`);
      skippedCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await saveDataFile("books.js", updatedBooks, "books");

  console.log("\n📊 Summary:");
  console.log(`  ✓ Updated: ${updatedCount}`);
  console.log(`  → Skipped: ${skippedCount}`);
  console.log(`  ✗ Failed: ${failedCount}`);
}

async function main() {
  try {
    await updateBookCovers();
    console.log("\n✨ Done!");
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

main();
