/**
 * Git Integration for Data Management
 *
 * Automates git operations for data changes, provides commit hooks,
 * and tracks data file changes in version control.
 */

import { execSync, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Check if git is available and repository exists
 */
export async function checkGitStatus() {
  try {
    const { stdout } = await execAsync('git status --porcelain');
    return { available: true, hasChanges: stdout.trim().length > 0 };
  } catch (error) {
    return { available: false, error: error.message };
  }
}

/**
 * Get current git status for data files
 */
export async function getDataGitStatus() {
  const gitStatus = await checkGitStatus();
  if (!gitStatus.available) {
    return { error: 'Git not available' };
  }

  try {
    // Get status of data files
    const { stdout: statusOutput } = await execAsync('git status --porcelain data/');

    // Get recent commits for data files
    const { stdout: logOutput } = await execAsync(
      'git log --oneline -10 -- data/ || echo "No commits found"'
    );

    // Parse status output
    const changes = statusOutput.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const status = line.substring(0, 2);
        const file = line.substring(3);
        return {
          status,
          file: file.replace('data/', ''),
          staged: status[0] !== ' ',
          modified: status[0] === 'M' || status[1] === 'M',
          added: status[0] === 'A' || status[1] === 'A',
          deleted: status[0] === 'D' || status[1] === 'D',
          untracked: status === '??'
        };
      });

    return {
      hasChanges: changes.length > 0,
      changes,
      recentCommits: logOutput.split('\n').filter(line => line.trim())
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Stage data files for commit
 * @param {Array} files - Array of data filenames to stage
 */
export async function stageDataFiles(files) {
  if (files.length === 0) return { staged: 0 };

  const filePaths = files.map(file => `data/${file}`);
  const command = `git add ${filePaths.join(' ')}`;

  try {
    await execAsync(command);
    return { staged: files.length, files };
  } catch (error) {
    throw new Error(`Failed to stage files: ${error.message}`);
  }
}

/**
 * Create a commit for data changes
 * @param {string} message - Commit message
 * @param {Array} files - Files to commit (optional, will commit staged files if empty)
 */
export async function commitDataChanges(message, files = []) {
  try {
    // Stage files if provided
    if (files.length > 0) {
      await stageDataFiles(files);
    }

    // Check if there are staged changes
    const { stdout: diffOutput } = await execAsync('git diff --cached --name-only');
    if (!diffOutput.trim()) {
      return { committed: false, reason: 'No staged changes' };
    }

    // Create commit
    const commitCommand = `git commit -m "${message}"`;
    const { stdout: commitOutput } = await execAsync(commitCommand);

    // Get commit hash
    const { stdout: hashOutput } = await execAsync('git rev-parse HEAD');

    return {
      committed: true,
      hash: hashOutput.trim(),
      message,
      files: diffOutput.trim().split('\n')
    };
  } catch (error) {
    throw new Error(`Failed to commit: ${error.message}`);
  }
}

/**
 * Generate automatic commit message for data changes
 * @param {Array} changes - Array of change descriptions
 * @param {string} operation - The operation that triggered the changes
 */
export function generateCommitMessage(changes, operation = 'update') {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (changes.length === 1) {
    return `data: ${operation} ${changes[0]} (${timestamp})`;
  } else if (changes.length <= 3) {
    return `data: ${operation} ${changes.join(', ')} (${timestamp})`;
  } else {
    return `data: ${operation} ${changes.length} files (${timestamp})`;
  }
}

/**
 * Create a git tag for data version
 * @param {string} version - Version tag (e.g., 'data-v1.2.0')
 * @param {string} message - Tag message
 */
export async function createDataVersionTag(version, message = '') {
  try {
    const tagCommand = `git tag -a ${version} -m "${message || `Data version ${version}`}"`;
    await execAsync(tagCommand);

    return { tagged: true, version };
  } catch (error) {
    throw new Error(`Failed to create tag: ${error.message}`);
  }
}

/**
 * Get data file change history
 * @param {string} filename - Data filename
 * @param {number} limit - Number of commits to show
 */
export async function getDataFileHistory(filename, limit = 10) {
  try {
    const { stdout } = await execAsync(
      `git log --oneline -${limit} -- data/${filename} || echo "No history found"`
    );

    return {
      filename,
      history: stdout.split('\n').filter(line => line.trim())
    };
  } catch (error) {
    return { filename, error: error.message };
  }
}

/**
 * Create a data change summary for commit messages
 * @param {Array} operations - Array of operations performed
 */
export function createChangeSummary(operations) {
  const summary = {
    files: new Set(),
    operations: [],
    totalChanges: 0
  };

  operations.forEach(op => {
    if (op.files) {
      op.files.forEach(file => summary.files.add(file));
    }
    summary.operations.push(op.description || op.type);
    summary.totalChanges += op.changes || 1;
  });

  return {
    files: Array.from(summary.files),
    operations: summary.operations,
    totalChanges: summary.totalChanges,
    summary: `${summary.operations.join(', ')} (${summary.totalChanges} changes)`
  };
}

/**
 * Pre-commit hook for data validation
 * This can be integrated into a git hook
 */
export async function preCommitDataValidation() {
  console.log('🔍 Running pre-commit data validation...');

  try {
    // Import validation functions dynamically to avoid circular dependencies
    const { validateDataFile } = await import('./data-validation.mjs');
    const { readDataFile } = await import('./data-utils.mjs');

    const VALIDATED_FILES = [
      'books.js', 'projects.js', 'experience.js', 'skills.js', 
      'influentialPeople.js', 'testimonials.js', 'profile.js', 'socials.js'
    ];

    console.log('🔍 Validating data files...\n');

    let totalErrors = 0;
    const errors = [];

    for (const filename of VALIDATED_FILES) {
      try {
        const baseName = filename.replace('.js', '');
        const { data } = await readDataFile(filename);
        const validation = validateDataFile(baseName, data);

        if (!validation.valid) {
          totalErrors += validation.errors.length;
          errors.push(...validation.errors);
          console.log(`❌ ${baseName}: ${validation.errors.length} errors`);
          validation.errors.slice(0, 3).forEach(error => console.log(`   ${error}`));
          if (validation.errors.length > 3) {
            console.log(`   ... and ${validation.errors.length - 3} more errors`);
          }
        } else if (validation.warnings.length > 0) {
          console.log(`⚠️  ${baseName}: valid with ${validation.warnings.length} warnings`);
        } else {
          const itemCount = Array.isArray(data) ? data.length : 1;
          console.log(`✅ ${baseName}: valid (${itemCount} items)`);
        }
      } catch (error) {
        totalErrors++;
        errors.push(`Failed to validate ${filename}: ${error.message}`);
        console.log(`❌ ${filename}: ${error.message}`);
      }
    }

    console.log(`\n📊 Validation Summary:`);
    console.log(`   Total files: ${VALIDATED_FILES.length}`);
    console.log(`   Errors: ${totalErrors}`);
    console.log(`   Warnings: 0`);

    if (totalErrors > 0) {
      console.error('❌ Data validation failed. Please fix errors before committing:');
      return { valid: false, errors };
    }

    console.log('✅ All data files are valid!');
    return { valid: true };

  } catch (error) {
    console.error('❌ Pre-commit validation error:', error.message);
    return { valid: false, error: error.message };
  }
}

/**
 * Setup git hooks for data management
 */
export async function setupGitHooks() {
  const hooksDir = path.join(process.cwd(), '.git', 'hooks');
  const preCommitHook = path.join(hooksDir, 'pre-commit');

  try {
    // Check if hooks directory exists
    await fs.access(hooksDir);
  } catch {
    console.log('ℹ️  Git hooks directory not found. Make sure you\'re in a git repository.');
    return { setup: false, reason: 'not a git repository' };
  }

  // Create pre-commit hook content
  const hookContent = `#!/bin/sh
# Data validation pre-commit hook

# Run data validation
node -e "
import('./lib/git-integration.mjs').then(({ preCommitDataValidation }) => {
  preCommitDataValidation().then(result => {
    if (!result.valid) {
      console.error('Data validation failed. Commit aborted.');
      process.exit(1);
    }
  }).catch(error => {
    console.error('Pre-commit hook error:', error);
    process.exit(1);
  });
}).catch(() => {
  console.log('Data validation hook not available, skipping...');
});
"`;

  try {
    await fs.writeFile(preCommitHook, hookContent);
    await fs.chmod(preCommitHook, '755');
    console.log('✅ Pre-commit hook installed for data validation');
    return { setup: true };
  } catch (error) {
    console.error('❌ Failed to setup git hooks:', error.message);
    return { setup: false, error: error.message };
  }
}

/**
 * Automated data commit workflow
 * @param {Array} operations - Operations performed
 * @param {string} operationType - Type of operation (e.g., 'update', 'migrate')
 */
export async function autoCommitDataChanges(operations, operationType = 'update') {
  try {
    const changeSummary = createChangeSummary(operations);
    const commitMessage = generateCommitMessage(changeSummary.operations, operationType);

    const commitResult = await commitDataChanges(commitMessage, changeSummary.files);

    if (commitResult.committed) {
      console.log(`✅ Data changes committed: ${commitResult.hash.substring(0, 8)}`);
      console.log(`   Message: ${commitMessage}`);
      console.log(`   Files: ${commitResult.files.join(', ')}`);
    }

    return commitResult;
  } catch (error) {
    console.warn('⚠️  Auto-commit failed:', error.message);
    console.log('   You can manually commit the changes with: git add data/ && git commit');
    return { committed: false, error: error.message };
  }
}
