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

export async function getAllPostsMeta() {
  const files = await getAllPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = (data.slug || file.replace(/\.(md|mdx)$/i, '')).toLowerCase();
      const { minutes, words } = computeReadingTime(content);
      return {
        slug,
        title: data.title || slug,
        date: data.date || null,
        description: data.description || '',
        tags: data.tags || [],
        readingTime: minutes,
        words,
      };
    })
  );
  return posts.sort((a, b) => (a.date && b.date ? new Date(b.date) - new Date(a.date) : 0));
}

export async function getPostBySlug(slug) {
  const files = await getAllPostFiles();
  for (const file of files) {
    const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
    const parsed = matter(raw);
    const candidate = (parsed.data.slug || file.replace(/\.(md|mdx)$/i, '')).toLowerCase();
    if (candidate === slug) {
      const processed = await remark().use(slugPlugin).use(html).process(parsed.content);
      const htmlContent = processed.toString();
      const { minutes, words } = computeReadingTime(parsed.content);
      return {
        slug,
        html: htmlContent,
        title: parsed.data.title || slug,
        date: parsed.data.date || null,
        description: parsed.data.description || '',
        summary: parsed.data.summary || parsed.data.description || '',
        takeaways: parsed.data.takeaways || [],
        tags: parsed.data.tags || [],
        readingTime: minutes,
        words,
      };
    }
  }
  return null;
}


