import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Data sources
import projects from '../data/projects.js';
import skills from '../data/skills.js';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'graph-data.json');

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

function normalizeId(str) {
  return String(str).toLowerCase().trim().replace(/[\s\W_]+/g, '-');
}

async function generateGraphData() {
  console.log('Generating 3D Knowledge Graph Data...');
  
  const nodes = [];
  const links = [];
  const addedNodes = new Set();
  
  function addNode(id, name, group, val = 1) {
    const normalizedId = normalizeId(id);
    if (!addedNodes.has(normalizedId)) {
      nodes.push({ id: normalizedId, name, group, val });
      addedNodes.add(normalizedId);
    }
    return normalizedId;
  }

  function addLink(source, target) {
    const normSource = normalizeId(source);
    const normTarget = normalizeId(target);
    // only link if both nodes exist
    if (addedNodes.has(normSource) && addedNodes.has(normTarget)) {
      links.push({ source: normSource, target: normTarget });
    }
  }

  // 1. Add Skills as Concepts
  skills.forEach(category => {
    category.items.forEach(skill => {
      addNode(skill, skill, 'concept', 2);
    });
  });

  // 2. Add Projects
  projects.forEach(project => {
    const projId = addNode(`proj_${project.slug}`, project.title, 'project', 4);
    
    // Add project tags as concepts and link them
    if (project.tags) {
      project.tags.forEach(tag => {
        const tagId = addNode(tag, tag, 'concept', 2);
        addLink(projId, tagId);
      });
    }
  });

  // 3. Add Blog Posts
  if (fs.existsSync(CONTENT_DIR)) {
    const files = getAllFiles(CONTENT_DIR);
    for (const file of files) {
      const rawContent = fs.readFileSync(file, 'utf8');
      const { data } = matter(rawContent);
      
      const slug = data.slug || path.basename(file, path.extname(file));
      const title = data.title || slug;
      
      const postId = addNode(`blog_${slug}`, title, 'blog', 3);
      
      if (data.tags) {
        data.tags.forEach(tag => {
          const tagId = addNode(tag, tag, 'concept', 2);
          addLink(postId, tagId);
        });
      }
    }
  }

  // Write to public folder
  const graphData = { nodes, links };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(graphData, null, 2));
  
  console.log(`Created graph data with ${nodes.length} nodes and ${links.length} links at ${OUTPUT_FILE}`);
}

generateGraphData().catch(console.error);
