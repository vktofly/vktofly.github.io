import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';

export async function loadMarkdownAsHtml(slugName) {
  const filePath = path.join(process.cwd(), 'content', `${slugName}.md`);
  const source = await fs.readFile(filePath, 'utf8');
  const processed = await remark().use(slug).use(html).process(source);
  return processed.toString();
}

export async function loadMarkdownFromPath(absoluteOrRelativePath) {
  const filePath = path.isAbsolute(absoluteOrRelativePath)
    ? absoluteOrRelativePath
    : path.join(process.cwd(), absoluteOrRelativePath);
  const source = await fs.readFile(filePath, 'utf8');
  const processed = await remark().use(slug).use(html).process(source);
  return processed.toString();
}


