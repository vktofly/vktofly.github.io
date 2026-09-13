import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { create, insertMultiple } from '@orama/orama';
import { persistToFile } from '@orama/plugin-data-persistence/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const OUTPUT_INDEX = path.join(process.cwd(), 'public', 'search-index.json');
const SITE_URL = 'https://vktofly.github.io';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

async function generateSearchIndex() {
  console.log('Generating Orama search index...');
  
  // 1. Create Orama database instance
  const db = await create({
    schema: {
      title: 'string',
      content: 'string',
      url: 'string',
      type: 'string', // e.g. 'blog', 'about', 'project'
    }
  });

  const files = getAllFiles(CONTENT_DIR);
  const documents = [];

  // 2. Extract content
  for (const file of files) {
    const rawContent = fs.readFileSync(file, 'utf8');
    const { data, content: markdownBody } = matter(rawContent);
    const relativePath = path.relative(CONTENT_DIR, file);
    
    // Construct URL based on file path
    let urlPath = relativePath.replace('.md', '').replace(/\\/g, '/');
    if (urlPath.endsWith('/index')) urlPath = urlPath.replace('/index', '');
    if (urlPath === 'aboutme') urlPath = 'about';
    if (urlPath === 'myvision') urlPath = 'vision';
    
    const fullUrl = `/${urlPath}`;

    // Clean markdown loosely for better indexing
    const cleanContent = markdownBody.replace(/[#*`_[\]\n\r]/g, ' ').replace(/\s+/g, ' ').trim();

    let type = 'page';
    if (urlPath.startsWith('blog/')) type = 'blog';
    else if (urlPath.startsWith('projects/')) type = 'project';
    else if (urlPath.startsWith('books/')) type = 'book';

    documents.push({
      title: data.title || urlPath,
      content: cleanContent,
      url: fullUrl,
      type: type,
    });
  }

  // 3. Insert documents into DB
  await insertMultiple(db, documents);

  // 4. Persist to public folder so client can fetch it
  await persistToFile(db, 'json', OUTPUT_INDEX);
  
  console.log(`Created search index at ${OUTPUT_INDEX} with ${documents.length} records.`);
}

generateSearchIndex().catch(console.error);
