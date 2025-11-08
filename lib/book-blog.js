/**
 * Book Blog Utilities
 * 
 * Handles reading and processing book blog post Markdown files.
 * Book blogs are stored in content/books/ directory and are separate from regular blog posts.
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import slugPlugin from 'remark-slug';

const BOOK_BLOGS_DIR = path.join(process.cwd(), 'content', 'books');

function computeReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
}

export async function getAllBookBlogFiles() {
  try {
    const entries = await fs.readdir(BOOK_BLOGS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name)).map((e) => e.name);
  } catch {
    return [];
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function getAllBookBlogsMeta() {
  const files = await getAllBookBlogFiles();
  const blogs = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BOOK_BLOGS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fileSlug = file.replace(/\.(md|mdx)$/i, '');
      const slug = data.slug 
        ? generateSlug(data.slug)
        : generateSlug(fileSlug);
      const { minutes, words } = computeReadingTime(content);
      return {
        slug,
        bookSlug: data.bookSlug || slug, // Link to book
        title: data.title || fileSlug,
        date: data.date || null,
        description: data.description || '',
        tags: data.tags || [],
        readingTime: minutes,
        words,
        recommendedBooks: data.recommendedBooks || [], // Array of book slugs
      };
    })
  );
  // Sort by date (newest first)
  return blogs.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return 0;
  });
}

export async function getBookBlogBySlug(slug) {
  const files = await getAllBookBlogFiles();
  for (const file of files) {
    const raw = await fs.readFile(path.join(BOOK_BLOGS_DIR, file), 'utf8');
    const parsed = matter(raw);
    const fileSlug = file.replace(/\.(md|mdx)$/i, '');
    const candidate = parsed.data.slug 
      ? generateSlug(parsed.data.slug)
      : generateSlug(fileSlug);
    if (candidate === slug) {
      const processed = await remark().use(slugPlugin).use(html).process(parsed.content);
      const htmlContent = processed.toString();
      const { minutes, words } = computeReadingTime(parsed.content);
      
      return {
        slug,
        bookSlug: parsed.data.bookSlug || slug,
        html: htmlContent,
        title: parsed.data.title || fileSlug,
        date: parsed.data.date || null,
        description: parsed.data.description || '',
        summary: parsed.data.summary || parsed.data.description || '',
        tags: parsed.data.tags || [],
        readingTime: minutes,
        words,
        recommendedBooks: parsed.data.recommendedBooks || [],
      };
    }
  }
  return null;
}

