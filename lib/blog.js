import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import slugPlugin from 'remark-slug';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function computeReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
}

export async function getAllPostFiles() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name)).map((e) => e.name);
  } catch {
    return [];
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

export async function getAllPostsMeta() {
  const files = await getAllPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fileSlug = file.replace(/\.(md|mdx)$/i, '');
      const slug = data.slug 
        ? generateSlug(data.slug)
        : generateSlug(fileSlug);
      const { minutes, words } = computeReadingTime(content);
      return {
        slug,
        title: data.title || fileSlug, // Preserve title exactly as written in frontmatter
        date: data.date || null,
        description: data.description || '',
        tags: data.tags || [],
        readingTime: minutes,
        words,
        featured: data.featured || false, // Support featured flag
      };
    })
  );
  // Sort by date (newest first), posts without dates go to the end
  return posts.sort((a, b) => {
    // If both have dates, sort by date (newest first)
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    // If only one has a date, prioritize it
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    // If neither has a date, maintain original order
    return 0;
  });
}

export async function getPostBySlug(slug) {
  const files = await getAllPostFiles();
  for (const file of files) {
    const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
    const parsed = matter(raw);
    const fileSlug = file.replace(/\.(md|mdx)$/i, '');
    const candidate = parsed.data.slug 
      ? generateSlug(parsed.data.slug)
      : generateSlug(fileSlug);
    if (candidate === slug) {
      const processed = await remark().use(slugPlugin).use(html).process(parsed.content);
      const htmlContent = processed.toString();
      const { minutes, words } = computeReadingTime(parsed.content);
      // Ensure takeaways is always an array
      let takeaways = parsed.data.takeaways || [];
      if (!Array.isArray(takeaways)) {
        // If it's an object, convert to array of values
        if (typeof takeaways === 'object' && takeaways !== null) {
          takeaways = Object.values(takeaways).filter(v => v != null);
        } else {
          takeaways = [];
        }
      }

      return {
        slug,
        html: htmlContent,
        title: parsed.data.title || fileSlug, // Preserve title exactly as written in frontmatter
        date: parsed.data.date || null,
        description: parsed.data.description || '',
        summary: parsed.data.summary || parsed.data.description || '',
        takeaways,
        tags: parsed.data.tags || [],
        readingTime: minutes,
        words,
      };
    }
  }
  return null;
}


