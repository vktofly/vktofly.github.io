import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');

/**
 * Reads a data file and returns the data and raw content
 * @param {string} filename - e.g. 'books.js'
 */
export async function readDataFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Import the data dynamically
    // Using absolute path for import
    const fileUrl = new URL(`file://${filePath}?t=${Date.now()}`);
    const module = await import(fileUrl);
    const data = module.default;
    
    if (!Array.isArray(data)) {
      throw new Error(`Data in ${filename} is not an array`);
    }

    return { data, content, filePath };
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

/**
 * Saves data back to the file, preserving the header
 * @param {string} filename - e.g. 'books.js'
 * @param {Array} data - The array of data to save
 * @param {string} variableName - e.g. 'books'
 */
export async function saveDataFile(filename, data, variableName) {
  const filePath = path.join(DATA_DIR, filename);
  
  // Read current content to get header
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    // If file doesn't exist (unlikely), use default header
    content = '';
  }

  // Extract header (everything before `const ${variableName} =`)
  const regex = new RegExp(`^([\\s\\S]*?)const ${variableName} =`);
  const headerMatch = content.match(regex);
  const header = headerMatch ? headerMatch[1] : `/**
 * ${variableName} Data
 */\n\n`;

  const newContent = `${header}const ${variableName} = ${JSON.stringify(data, null, 2)};

export default ${variableName};
`;

  await fs.writeFile(filePath, newContent, 'utf8');
  console.log(`✅ Saved ${data.length} items to ${filename}`);
}

