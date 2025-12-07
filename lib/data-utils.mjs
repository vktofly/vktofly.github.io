import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
const BACKUP_DIR = path.resolve(__dirname, '../data/backups');

/**
 * Ensure backup directory exists
 */
async function ensureBackupDir() {
  try {
    await fs.access(BACKUP_DIR);
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }
}

/**
 * Generate a hash of the data for integrity checking
 * @param {Array} data - The data to hash
 * @returns {string} SHA-256 hash
 */
function generateDataHash(data) {
  const dataString = JSON.stringify(data, Object.keys(data).sort());
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

/**
 * Create a backup of the current data file
 * @param {string} filename - The filename to backup
 * @param {string} reason - Reason for backup (optional)
 */
export async function createBackup(filename, reason = 'manual') {
  await ensureBackupDir();

  const filePath = path.join(DATA_DIR, filename);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFilename = `${filename.replace('.js', '')}_${timestamp}_${reason}.js`;
  const backupPath = path.join(BACKUP_DIR, backupFilename);

  try {
    await fs.copyFile(filePath, backupPath);
    console.log(`📦 Created backup: ${backupFilename}`);
    return backupPath;
  } catch (error) {
    console.error(`Failed to create backup for ${filename}:`, error);
    throw error;
  }
}

/**
 * List available backups for a file
 * @param {string} filename - The filename to check backups for
 * @returns {Array} Array of backup file info
 */
export async function listBackups(filename) {
  await ensureBackupDir();

  try {
    const files = await fs.readdir(BACKUP_DIR);
    const baseName = filename.replace('.js', '');
    const backups = files
      .filter(file => file.startsWith(baseName + '_'))
      .map(file => {
        const match = file.match(/(.+)_(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z)_(.+)\.js$/);
        if (match) {
          return {
            filename: file,
            path: path.join(BACKUP_DIR, file),
            timestamp: match[2].replace(/-/g, ':').replace('T', 'T').replace(/Z$/, '.000Z'),
            reason: match[3]
          };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return backups;
  } catch (error) {
    console.error(`Failed to list backups for ${filename}:`, error);
    return [];
  }
}

/**
 * Restore from a backup
 * @param {string} filename - The filename to restore
 * @param {string} backupFilename - The backup filename to restore from
 */
export async function restoreFromBackup(filename, backupFilename) {
  const backupPath = path.join(BACKUP_DIR, backupFilename);
  const targetPath = path.join(DATA_DIR, filename);

  try {
    // Create backup of current file before restore
    await createBackup(filename, 'before-restore');

    // Copy backup to data directory
    await fs.copyFile(backupPath, targetPath);
    console.log(`🔄 Restored ${filename} from backup: ${backupFilename}`);
  } catch (error) {
    console.error(`Failed to restore ${filename} from backup:`, error);
    throw error;
  }
}

/**
 * Reads a data file and returns the data and raw content with integrity checking
 * @param {string} filename - e.g. 'books.js'
 * @param {object} options - Options for reading
 * @param {boolean} options.skipValidation - Skip data validation
 * @param {boolean} options.includeHash - Include data hash in result
 */
export async function readDataFile(filename, options = {}) {
  const filePath = path.join(DATA_DIR, filename);

  try {
    const content = await fs.readFile(filePath, 'utf8');

    // Import the data dynamically
    // Using absolute path for import
    const fileUrl = new URL(`file://${filePath}?t=${Date.now()}`);
    const module = await import(fileUrl);
    const data = module.default;

    // Check if data type matches expected schema type
    const baseName = filename.replace('.js', '');
    let expectedArray = true;

    // Simple heuristic: check if filename suggests object structure
    if (['profile', 'socials'].includes(baseName)) {
      expectedArray = false;
    }

    if (expectedArray && !Array.isArray(data)) {
      throw new Error(`Data in ${filename} is not an array`);
    } else if (!expectedArray && (typeof data !== 'object' || Array.isArray(data) || data === null)) {
      throw new Error(`Data in ${filename} is not an object`);
    }

    const result = { data, content, filePath };

    if (options.includeHash) {
      result.hash = generateDataHash(data);
    }

    // Basic integrity checks
    if (Array.isArray(data)) {
      if (data.length === 0) {
        console.warn(`⚠️  Warning: ${filename} contains no data`);
      }

      // Check for duplicate IDs/slugs if they exist
      const slugs = data.map(item => item.slug || item.id).filter(Boolean);
      if (slugs.length > 0) {
        const uniqueSlugs = new Set(slugs);
        if (slugs.length !== uniqueSlugs.size) {
          console.warn(`⚠️  Warning: ${filename} contains duplicate slugs/IDs`);
        }
      }
    } else if (typeof data === 'object' && data !== null) {
      // For objects, basic validation
      if (Object.keys(data).length === 0) {
        console.warn(`⚠️  Warning: ${filename} contains no data`);
      }
    }

    return result;
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    throw new Error(`Failed to read data file '${filename}': ${error.message}`);
  }
}

/**
 * Saves data back to the file with backup creation and integrity verification
 * @param {string} filename - e.g. 'books.js'
 * @param {Array} data - The array of data to save
 * @param {string} variableName - e.g. 'books'
 * @param {object} options - Options for saving
 * @param {boolean} options.skipBackup - Skip creating backup
 * @param {string} options.backupReason - Reason for backup
 * @param {boolean} options.skipValidation - Skip data validation
 */
export async function saveDataFile(filename, data, variableName, options = {}) {
  if (!Array.isArray(data)) {
    throw new Error(`Data must be an array, got ${typeof data}`);
  }

  const filePath = path.join(DATA_DIR, filename);

  try {
    // Create backup before saving (unless skipped)
    if (!options.skipBackup) {
      await createBackup(filename, options.backupReason || 'auto-save');
    }

    // Read current content to get header
    let content = '';
    try {
      content = await fs.readFile(filePath, 'utf8');
    } catch (e) {
      // If file doesn't exist, use default header
      content = '';
    }

    // Extract header (everything before `const ${variableName} =`)
    const regex = new RegExp(`^([\\s\\S]*?)const ${variableName} =`);
    const headerMatch = content.match(regex);
    const header = headerMatch ? headerMatch[1] : `/**
 * ${variableName} Data
 *
 * Last updated: ${new Date().toISOString()}
 */\n\n`;

    // Format data with consistent indentation
    const dataString = JSON.stringify(data, null, 2);
    const newContent = `${header}const ${variableName} = ${dataString};

export default ${variableName};
`;

    // Verify the new content can be parsed
    try {
      const testFileUrl = new URL(`data:text/javascript,${encodeURIComponent(newContent)}`);
      await import(testFileUrl);
    } catch (parseError) {
      throw new Error(`Generated content is not valid JavaScript: ${parseError.message}`);
    }

    // Write the file
    await fs.writeFile(filePath, newContent, 'utf8');

    // Verify file was written correctly
    const verifyContent = await fs.readFile(filePath, 'utf8');
    if (verifyContent !== newContent) {
      throw new Error('File write verification failed');
    }

    console.log(`✅ Saved ${data.length} items to ${filename} (${newContent.length} bytes)`);

    return {
      success: true,
      itemsSaved: data.length,
      filePath,
      backupCreated: !options.skipBackup
    };

  } catch (error) {
    console.error(`❌ Error saving ${filename}:`, error.message);
    throw new Error(`Failed to save data file '${filename}': ${error.message}`);
  }
}

/**
 * Get data file statistics
 * @param {string} filename - The filename to analyze
 * @returns {object} Statistics about the data file
 */
export async function getDataFileStats(filename) {
  try {
    const { data, content } = await readDataFile(filename, { includeHash: true });

    const stats = {
      filename,
      itemCount: data.length,
      fileSize: content.length,
      hash: data.hash,
      lastModified: null
    };

    // Get file modification time
    try {
      const filePath = path.join(DATA_DIR, filename);
      const fileStat = await fs.stat(filePath);
      stats.lastModified = fileStat.mtime.toISOString();
    } catch {
      // Ignore if we can't get file stats
    }

    // Basic data analysis
    if (data.length > 0) {
      const fields = Object.keys(data[0]);
      stats.fields = fields;

      // Check data completeness
      stats.completeness = {};
      fields.forEach(field => {
        const filledCount = data.filter(item => item[field] !== undefined && item[field] !== null && item[field] !== '').length;
        stats.completeness[field] = {
          filled: filledCount,
          percentage: Math.round((filledCount / data.length) * 100)
        };
      });
    }

    return stats;
  } catch (error) {
    throw new Error(`Failed to get stats for ${filename}: ${error.message}`);
  }
}

/**
 * Clean up old backups (keep only the most recent N backups per file)
 * @param {number} keepCount - Number of backups to keep per file (default: 10)
 */
export async function cleanupBackups(keepCount = 10) {
  await ensureBackupDir();

  try {
    const files = await fs.readdir(BACKUP_DIR);
    const fileGroups = {};

    // Group backups by base filename
    files.forEach(file => {
      const match = file.match(/^(.+?)_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z_.+\.js$/);
      if (match) {
        const baseName = match[1];
        if (!fileGroups[baseName]) {
          fileGroups[baseName] = [];
        }
        fileGroups[baseName].push(file);
      }
    });

    let totalRemoved = 0;

    // Clean up each group
    for (const [baseName, fileList] of Object.entries(fileGroups)) {
      if (fileList.length > keepCount) {
        // Sort by timestamp (newest first) and remove old ones
        const sortedFiles = fileList.sort().reverse();
        const filesToRemove = sortedFiles.slice(keepCount);

        for (const file of filesToRemove) {
          await fs.unlink(path.join(BACKUP_DIR, file));
          totalRemoved++;
        }
      }
    }

    if (totalRemoved > 0) {
      console.log(`🧹 Cleaned up ${totalRemoved} old backup files`);
    }

    return { totalRemoved };
  } catch (error) {
    console.error('Failed to cleanup backups:', error);
    throw error;
  }
}

