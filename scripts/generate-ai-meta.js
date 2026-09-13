import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GoogleGenAI } from '@google/genai';
import projects from '../data/projects.js';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const META_FILE = path.join(process.cwd(), 'data', 'ai-meta.json');
const ENV_FILE = path.join(process.cwd(), '.env.local');

// Load environment variables manually since this runs before Next.js
if (fs.existsSync(ENV_FILE)) {
  console.log('Found .env.local, parsing...');
  const envContent = fs.readFileSync(ENV_FILE, 'utf-8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
      console.log(`Loaded env var: ${match[1].trim()}`);
    }
  });
} else {
  console.log('No .env.local found at', ENV_FILE);
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

async function generateMetaForContent(title, tags, contentExcerpt, existingDescription = '') {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('No Gemini API key found');
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `You are an expert SEO copywriter. Generate a compelling, click-optimized meta description for a portfolio/blog post.

Title: ${title}
Tags: ${tags.join(', ')}
Content excerpt: ${contentExcerpt.substring(0, 800)}...

Requirements:
- Exactly 120-160 characters long.
- Compelling and click-worthy.
- Include relevant keywords naturally.
- No quotes or special formatting, just the text.
- Return ONLY the meta description text.

Meta description:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });
    const text = (response.text || '').trim();
    if (text.length > 165) return text.substring(0, 160) + '...';
    return text;
  } catch (err) {
    console.error(`Gemini generation failed for ${title}`, err);
    if (err.status === 429 || (err.message && err.message.includes('429'))) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    return null;
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateAIMeta() {
  console.log('Generating AI Meta Descriptions with Gemini...');
  
  let metaCache = {};
  if (fs.existsSync(META_FILE)) {
    metaCache = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
  }

  let updated = false;

  // 1. Process Projects
  try {
    for (const project of projects) {
      const slug = `project-${project.slug}`;
      if (!metaCache[slug] && project.description) {
        console.log(`Generating meta for project: ${project.title}`);
        const aiMeta = await generateMetaForContent(project.title, project.tags || [], project.description);
        if (aiMeta) {
          metaCache[slug] = aiMeta;
          updated = true;
        }
        await sleep(15000); // 15 seconds to respect 5 RPM limit
      }
    }

    // 2. Process Blog Posts
    if (fs.existsSync(CONTENT_DIR)) {
      const files = getAllFiles(CONTENT_DIR);
      for (const file of files) {
        const rawContent = fs.readFileSync(file, 'utf8');
        const { data, content } = matter(rawContent);
        const slug = data.slug || path.basename(file, path.extname(file));
        const cacheKey = `blog-${slug}`;
        
        if (!metaCache[cacheKey]) {
          console.log(`Generating meta for blog post: ${data.title || slug}`);
          const textContent = content.replace(/[#*`_[\]\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
          const aiMeta = await generateMetaForContent(data.title || slug, data.tags || [], textContent);
          if (aiMeta) {
            metaCache[cacheKey] = aiMeta;
            updated = true;
          }
          await sleep(15000); // 15 seconds to respect 5 RPM limit
        }
      }
    }
  } catch (err) {
    if (err.message === 'RATE_LIMIT_EXCEEDED') {
      console.warn('API Rate limit exceeded. Stopping generation for now and saving progress.');
    } else {
      console.error('An unexpected error occurred during generation:', err);
    }
  }

  if (updated) {
    fs.writeFileSync(META_FILE, JSON.stringify(metaCache, null, 2));
    console.log('AI Meta descriptions generated and saved.');
  } else {
    console.log('All items already have AI meta descriptions. No generation needed.');
  }
}

generateAIMeta().catch(console.error);
