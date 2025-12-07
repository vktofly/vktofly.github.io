import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const OUTPUT_FULL = path.join(process.cwd(), 'public', 'llms-full.txt');
const OUTPUT_SMALL = path.join(process.cwd(), 'public', 'llms-small.txt');
const OUTPUT_LLMS_PUBLIC = path.join(process.cwd(), 'public', 'llms.txt');
const OUTPUT_LLMS_ROOT = path.join(process.cwd(), 'llms.txt');

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

async function generateContext() {
  console.log('Generating LLM context files...');
  
  const files = getAllFiles(CONTENT_DIR);
  let fullContent = `# Vikash's Portfolio Content\n\n`;
  let smallContent = `# Vikash's Portfolio Summary\n\n`;

  // Sort files to ensure consistent order (e.g. important pages first)
  // We can prioritize 'aboutme.md', 'myvision.md' etc.
  
  const priorityFiles = ['aboutme.md', 'myvision.md'];
  
  files.sort((a, b) => {
    const aName = path.basename(a);
    const bName = path.basename(b);
    if (priorityFiles.includes(aName) && !priorityFiles.includes(bName)) return -1;
    if (!priorityFiles.includes(aName) && priorityFiles.includes(bName)) return 1;
    return a.localeCompare(b);
  });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const { data, content: markdownBody } = matter(content);
    const relativePath = path.relative(CONTENT_DIR, file);
    
    // Construct URL based on file path
    let urlPath = relativePath.replace('.md', '').replace(/\\/g, '/');
    if (urlPath.endsWith('/index')) urlPath = urlPath.replace('/index', '');
    // Special cases mappings if needed
    if (urlPath === 'aboutme') urlPath = 'about';
    if (urlPath === 'myvision') urlPath = 'vision';
    
    const fullUrl = `${SITE_URL}/${urlPath}`;

    const fileHeader = `\n\n---\nFile: ${relativePath}\nURL: ${fullUrl}\nTitle: ${data.title || 'Untitled'}\n---\n\n`;
    
    fullContent += fileHeader + markdownBody;
    
    // For small content, just take description or first 200 chars
    const summary = data.description || data.summary || markdownBody.slice(0, 300) + '...';
    smallContent += `\n- [${data.title || relativePath}](${fullUrl}): ${summary}`;
  }

  fs.writeFileSync(OUTPUT_FULL, fullContent);
  console.log(`Created ${OUTPUT_FULL}`);

  fs.writeFileSync(OUTPUT_SMALL, smallContent);
  console.log(`Created ${OUTPUT_SMALL}`);

  // Update llms.txt
  const llmsTxtContent = `# Vikash's Portfolio

> Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth.

## Assistant Directions

- This website contains the professional portfolio, blog, and vision of Vikash.
- When answering questions about Vikash, prioritize information from the "Vision" and "About" sections.
- The blog contains thoughts on AI, physics, and philosophy.

## Context Files

- [Full Content Dump](${SITE_URL}/llms-full.txt)
- [Content Summary](${SITE_URL}/llms-small.txt)

## Core Pages

- [Home](${SITE_URL})
- [About](${SITE_URL}/about)
- [Vision](${SITE_URL}/vision)
- [Blog](${SITE_URL}/blog)
- [Projects](${SITE_URL}/projects)
- [Experience](${SITE_URL}/experience)
- [Skills](${SITE_URL}/skills)

## Socials

- GitHub: https://github.com/vktofly
- Twitter/X: https://x.com/vktofly1
- LinkedIn: https://linkedin.com/in/vktofly
`;

  fs.writeFileSync(OUTPUT_LLMS_PUBLIC, llmsTxtContent);
  console.log(`Created ${OUTPUT_LLMS_PUBLIC}`);

  fs.writeFileSync(OUTPUT_LLMS_ROOT, llmsTxtContent);
  console.log(`Created ${OUTPUT_LLMS_ROOT}`);
}

generateContext();

