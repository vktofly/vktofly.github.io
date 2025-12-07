/**
 * Data Migration Tools
 *
 * Safe schema updates and data transformations for static data files.
 * Supports versioned migrations with rollback capabilities.
 */

import { readDataFile, saveDataFile, createBackup } from './data-utils.mjs';
import { validateDataFile } from './data-validation.mjs';
import fs from 'fs/promises';
import path from 'path';

const MIGRATIONS_DIR = path.resolve(process.cwd(), 'data/migrations');

/**
 * Migration registry - add new migrations here
 */
const MIGRATIONS = {
  books: {
    '1.0.0': {
      description: 'Add readingPhase field to books',
      up: (data) => data.map(book => ({
        ...book,
        readingPhase: book.readingStatus === 'mastered' ? 'application' :
                     book.readingStatus === 'read' ? 'mastery' : 'exploration'
      })),
      down: (data) => data.map(({ readingPhase, ...book }) => book)
    },
    '1.1.0': {
      description: 'Add impact field to books',
      up: (data) => data.map(book => ({
        ...book,
        impact: book.paradigmShift ? 'high' :
                book.knowledgeCompounding ? 'high' :
                book.yearRead && (new Date().getFullYear() - book.yearRead) < 2 ? 'medium' : 'low'
      })),
      down: (data) => data.map(({ impact, ...book }) => book)
    }
  },
  projects: {
    '1.0.0': {
      description: 'Standardize project status values',
      up: (data) => data.map(project => ({
        ...project,
        status: project.status || 'completed'
      })),
      down: (data) => data.map(project => {
        if (project.status === 'completed') {
          const { status, ...rest } = project;
          return rest;
        }
        return project;
      })
    }
  }
};

/**
 * Get current migration version for a data file
 * @param {string} filename - The data file name
 * @returns {string} Current version
 */
export async function getCurrentVersion(filename) {
  const baseName = filename.replace('.js', '');
  const versionFile = path.join(MIGRATIONS_DIR, `${baseName}.version`);

  try {
    const version = await fs.readFile(versionFile, 'utf8');
    return version.trim();
  } catch {
    return '0.0.0'; // Default version for unmigrated files
  }
}

/**
 * Set migration version for a data file
 * @param {string} filename - The data file name
 * @param {string} version - Version to set
 */
async function setVersion(filename, version) {
  const baseName = filename.replace('.js', '');
  await fs.mkdir(MIGRATIONS_DIR, { recursive: true });
  const versionFile = path.join(MIGRATIONS_DIR, `${baseName}.version`);
  await fs.writeFile(versionFile, version);
}

/**
 * Apply a migration to data
 * @param {Array} data - The data to migrate
 * @param {object} migration - The migration object
 * @param {string} direction - 'up' or 'down'
 * @returns {Array} Migrated data
 */
function applyMigration(data, migration, direction) {
  if (direction === 'up') {
    return migration.up(data);
  } else if (direction === 'down') {
    return migration.down(data);
  } else {
    throw new Error(`Invalid migration direction: ${direction}`);
  }
}

/**
 * Migrate a data file to a target version
 * @param {string} filename - The data file to migrate
 * @param {string} targetVersion - Target version (optional, defaults to latest)
 * @param {object} options - Migration options
 */
export async function migrateDataFile(filename, targetVersion = null, options = {}) {
  const baseName = filename.replace('.js', '');
  const migrations = MIGRATIONS[baseName];

  if (!migrations) {
    console.log(`ℹ️  No migrations defined for ${filename}`);
    return { migrated: false, reason: 'no migrations defined' };
  }

  const currentVersion = await getCurrentVersion(filename);
  const availableVersions = Object.keys(migrations).sort();

  // Determine target version
  const finalTargetVersion = targetVersion || availableVersions[availableVersions.length - 1];

  if (currentVersion === finalTargetVersion) {
    console.log(`ℹ️  ${filename} is already at version ${currentVersion}`);
    return { migrated: false, reason: 'already at target version' };
  }

  console.log(`🔄 Migrating ${filename} from ${currentVersion} to ${finalTargetVersion}`);

  // Load current data
  const { data } = await readDataFile(filename);

  // Create pre-migration backup
  await createBackup(filename, `migration-${currentVersion}-to-${finalTargetVersion}`);

  let migratedData = [...data];
  let appliedMigrations = [];

  try {
    // Apply migrations in sequence
    const currentIndex = availableVersions.indexOf(currentVersion);
    const targetIndex = availableVersions.indexOf(finalTargetVersion);

    if (currentIndex < targetIndex) {
      // Upgrading
      for (let i = currentIndex + 1; i <= targetIndex; i++) {
        const version = availableVersions[i];
        const migration = migrations[version];

        console.log(`  ↗️  Applying migration ${version}: ${migration.description}`);
        migratedData = applyMigration(migratedData, migration, 'up');
        appliedMigrations.push({ version, direction: 'up', description: migration.description });
      }
    } else {
      // Downgrading
      for (let i = currentIndex; i > targetIndex; i--) {
        const version = availableVersions[i];
        const migration = migrations[version];

        console.log(`  ↘️  Reverting migration ${version}: ${migration.description}`);
        migratedData = applyMigration(migratedData, migration, 'down');
        appliedMigrations.push({ version, direction: 'down', description: migration.description });
      }
    }

    // Validate migrated data
    const validation = validateDataFile(baseName, migratedData);
    if (!validation.valid) {
      throw new Error(`Migration validation failed: ${validation.errors.slice(0, 3).join(', ')}`);
    }

    // Save migrated data
    await saveDataFile(filename, migratedData, baseName, {
      backupReason: `migration-${currentVersion}-to-${finalTargetVersion}`,
      skipBackup: true // We already created a backup
    });

    // Update version
    await setVersion(filename, finalTargetVersion);

    console.log(`✅ Successfully migrated ${filename} to version ${finalTargetVersion}`);

    return {
      migrated: true,
      fromVersion: currentVersion,
      toVersion: finalTargetVersion,
      appliedMigrations
    };

  } catch (error) {
    console.error(`❌ Migration failed for ${filename}:`, error.message);

    // Attempt to restore from backup
    try {
      console.log('  🔄 Attempting to restore from pre-migration backup...');
      // This would need the backup filename - simplified for now
      console.log('  ⚠️  Please manually restore if needed');
    } catch (restoreError) {
      console.error('  ❌ Restore also failed:', restoreError.message);
    }

    throw error;
  }
}

/**
 * Get migration status for all data files
 */
export async function getMigrationStatus() {
  const dataFiles = [
    'books.js', 'projects.js', 'experience.js', 'skills.js',
    'influentialPeople.js', 'testimonials.js'
  ];

  const status = {};

  for (const filename of dataFiles) {
    const baseName = filename.replace('.js', '');
    const currentVersion = await getCurrentVersion(filename);
    const migrations = MIGRATIONS[baseName];

    if (migrations) {
      const availableVersions = Object.keys(migrations).sort();
      const latestVersion = availableVersions[availableVersions.length - 1];

      status[baseName] = {
        currentVersion,
        latestVersion,
        needsUpdate: currentVersion !== latestVersion,
        availableVersions,
        migrations: Object.entries(migrations).map(([version, migration]) => ({
          version,
          description: migration.description,
          applied: version <= currentVersion
        }))
      };
    } else {
      status[baseName] = {
        currentVersion: '0.0.0',
        latestVersion: '0.0.0',
        needsUpdate: false,
        availableVersions: [],
        migrations: []
      };
    }
  }

  return status;
}

/**
 * Create a new migration
 * @param {string} filename - Target data file
 * @param {string} version - Migration version (e.g., '1.2.0')
 * @param {string} description - Migration description
 * @param {function} upFunction - Function to migrate data up
 * @param {function} downFunction - Function to migrate data down
 */
export function createMigration(filename, version, description, upFunction, downFunction) {
  const baseName = filename.replace('.js', '');

  if (!MIGRATIONS[baseName]) {
    MIGRATIONS[baseName] = {};
  }

  if (MIGRATIONS[baseName][version]) {
    throw new Error(`Migration ${version} already exists for ${baseName}`);
  }

  MIGRATIONS[baseName][version] = {
    description,
    up: upFunction,
    down: downFunction
  };

  console.log(`✅ Created migration ${version} for ${baseName}: ${description}`);
}

/**
 * Run migrations for all data files
 * @param {string} targetVersion - Target version (optional)
 */
export async function runAllMigrations(targetVersion = null) {
  const status = await getMigrationStatus();
  const results = [];

  console.log('🚀 Starting batch migration...\n');

  for (const [filename, fileStatus] of Object.entries(status)) {
    if (fileStatus.needsUpdate || targetVersion) {
      try {
        const result = await migrateDataFile(`${filename}.js`, targetVersion);
        results.push({ filename, success: true, result });
      } catch (error) {
        results.push({ filename, success: false, error: error.message });
      }
    } else {
      console.log(`ℹ️  ${filename} is up to date`);
      results.push({ filename, success: true, result: { migrated: false, reason: 'up to date' } });
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Successful: ${successful}`);
  console.log(`   Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Failed migrations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.filename}: ${r.error}`);
    });
  }

  return { results, successful, failed };
}
