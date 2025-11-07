import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';

export async function loadMarkdownAsHtml(slugName) {
  const filePath = path.join(process.cwd(), 'content', `${slugName}.md`);
  let source = await fs.readFile(filePath, 'utf8');
  
  // Remove metadata section if present (handles various formats)
  source = source.replace(/^Metadata\s*\n\nKeywords:.*$/m, '');
  source = source.replace(/^Metadata\s*\n\nKeywords:.*$/ms, '');
  
  const processed = await remark().use(slug).use(html).process(source);
  return processed.toString();
}

export async function extractMetadataFromMarkdown(slugName) {
  const filePath = path.join(process.cwd(), 'content', `${slugName}.md`);
  const source = await fs.readFile(filePath, 'utf8');
  
  // Extract keywords from metadata section
  const metadataMatch = source.match(/^Metadata\s*\n\nKeywords:\s*(.+)$/m);
  if (metadataMatch) {
    const keywords = metadataMatch[1].split(',').map(k => k.trim());
    return { keywords };
  }
  
  return { keywords: [] };
}

export async function loadMarkdownFromPath(absoluteOrRelativePath) {
  const filePath = path.isAbsolute(absoluteOrRelativePath)
    ? absoluteOrRelativePath
    : path.join(process.cwd(), absoluteOrRelativePath);
  const source = await fs.readFile(filePath, 'utf8');
  const processed = await remark().use(slug).use(html).process(source);
  return processed.toString();
}


