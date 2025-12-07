#!/usr/bin/env node

/**
 * Unified Data Management Script
 *
 * Comprehensive data management for static files including:
 * - Validation, backup, migration, quality monitoring, git integration
 *
 * Usage:
 *   node scripts/data-management.mjs validate
 *   node scripts/data-management.mjs backup
 *   node scripts/data-management.mjs quality
 *   node scripts/data-management.mjs migrate
 *   node scripts/data-management.mjs maintenance
 */

import { validateDataFile } from '../lib/data-validation.mjs';
import { createBackup, cleanupBackups, getDataFileStats, readDataFile } from '../lib/data-utils.mjs';
import { runAllMigrations, getMigrationStatus } from '../lib/data-migration.mjs';
import { generateQualityDashboard, checkDataConsistency } from '../lib/data-quality-monitor.mjs';
import { getDataGitStatus, setupGitHooks, autoCommitDataChanges } from '../lib/git-integration.mjs';

// Files that have validation schemas defined
const VALIDATED_DATA_FILES = [
  'books.js', 'projects.js', 'experience.js', 'skills.js', 'influentialPeople.js',
  'testimonials.js', 'profile.js', 'socials.js'
];

// All data files (for backup and maintenance operations)
const ALL_DATA_FILES = [
  'books.js', 'projects.js', 'experience.js', 'skills.js', 'influentialPeople.js',
  'testimonials.js', 'publications.js', 'speaking.js', 'videos.js', 'podcasts.js',
  'faqs.js', 'howtos.js', 'caseStudies.js', 'metaSkills.js', 'methodologies.js',
  'philosophicalFoundations.js', 'leadershipStrategy.js', 'researchExploration.js',
  'profile.js', 'socials.js'
];

/**
 * Validate all data files
 */
async function validateCommand() {
  console.log('🔍 Comprehensive Data Validation\n');

  const startTime = Date.now();
  // Only validate files that have schemas defined
  const results = { summary: { allValid: true, errors: [], totalErrors: 0 } };

  console.log('🔍 Validating data files...\n');

  for (const filename of VALIDATED_DATA_FILES) {
    try {
      const baseName = filename.replace('.js', '');
      const { data } = await readDataFile(filename);
      const validation = validateDataFile(baseName, data);

      if (!validation.valid) {
        results.summary.allValid = false;
        results.summary.errors.push(...validation.errors);
        results.summary.totalErrors += validation.errors.length;
        console.log(`❌ ${baseName}: ${validation.errors.length} errors`);
        validation.errors.slice(0, 3).forEach(error => console.log(`   ${error}`));
        if (validation.errors.length > 3) {
          console.log(`   ... and ${validation.errors.length - 3} more errors`);
        }
      } else if (validation.warnings.length > 0) {
        console.log(`⚠️  ${baseName}: valid with ${validation.warnings.length} warnings`);
      } else {
        console.log(`✅ ${baseName}: valid (${Array.isArray(data) ? data.length : 1} items)`);
      }
    } catch (error) {
      results.summary.allValid = false;
      results.summary.totalErrors++;
      console.log(`❌ ${filename}: ${error.message}`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n⏱️  Validation completed in ${duration}s`);

  if (results.summary.allValid) {
    console.log('🎉 All data files are valid and ready for deployment!');
    process.exit(0);
  } else {
    console.log('\n❌ Validation failed. Please review and fix the issues above.');
    console.log('\n💡 Tips:');
    console.log('   - Check for missing required fields');
    console.log('   - Verify slug uniqueness');
    console.log('   - Ensure URLs are properly formatted');
    console.log('   - Validate date formats');
    process.exit(1);
  }
}

/**
 * Create backups and show backup status
 */
async function backupCommand() {
  console.log('📦 Data Backup Management\n');

  const reason = process.argv[3] || 'manual-backup';

  console.log('Creating backups...');
  let successCount = 0;
  let errorCount = 0;

  for (const filename of ALL_DATA_FILES) {
    try {
      await createBackup(filename, reason);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to backup ${filename}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n✅ Created ${successCount} backups`);

  if (errorCount > 0) {
    console.log(`❌ ${errorCount} backups failed`);
  }

  // Cleanup old backups
  console.log('\n🧹 Cleaning up old backups...');
  try {
    const cleanupResult = await cleanupBackups(20);
    console.log(`✅ Removed ${cleanupResult.totalRemoved} old backup files`);
  } catch (error) {
    console.log(`⚠️  Backup cleanup failed: ${error.message}`);
  }
}

/**
 * Quality monitoring and reporting
 */
async function qualityCommand() {
  console.log('📊 Data Quality Dashboard\n');

  const startTime = Date.now();
  const dashboard = await generateQualityDashboard();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Display summary
  const q = dashboard.quality.summary;
  console.log('Quality Overview:');
  console.log(`   Files: ${q.validFiles}/${q.totalFiles} valid`);
  console.log(`   Errors: ${q.filesWithErrors} files with errors`);
  console.log(`   Warnings: ${q.filesWithWarnings} files with warnings`);
  console.log(`   Avg Completeness: ${q.avgCompleteness}%`);
  console.log(`   Critical Issues: ${q.criticalIssues}`);

  // Display consistency results
  const c = dashboard.consistency;
  console.log('\nConsistency Checks:');
  console.log(`   Passed: ${c.passed}/${c.passed + c.failed} checks`);

  // Display alerts
  if (dashboard.alerts.length > 0) {
    console.log('\n🚨 Alerts:');
    dashboard.alerts.forEach(alert => {
      const icon = alert.level === 'critical' ? '🔴' :
                   alert.level === 'error' ? '❌' : '⚠️';
      console.log(`   ${icon} ${alert.message}`);
    });
  } else {
    console.log('\n✅ No critical issues found');
  }

  console.log(`\n⏱️  Quality analysis completed in ${duration}s`);

  // Provide recommendations
  if (q.avgCompleteness < 80 || q.filesWithErrors > 0) {
    console.log('\n💡 Recommendations:');
    if (q.avgCompleteness < 80) {
      console.log('   - Review data completeness, especially for optional fields');
    }
    if (q.filesWithErrors > 0) {
      console.log('   - Fix validation errors before deployment');
    }
    console.log('   - Run detailed quality reports for specific files');
  }
}

/**
 * Migration management
 */
async function migrateCommand() {
  console.log('🔄 Data Migration Management\n');

  const subCommand = process.argv[3];
  const targetVersion = process.argv[4];

  if (subCommand === 'status') {
    // Show migration status
    const status = await getMigrationStatus();

    console.log('Migration Status:');
    Object.entries(status).forEach(([filename, fileStatus]) => {
      const icon = fileStatus.needsUpdate ? '⬆️' : '✅';
      console.log(`   ${icon} ${filename}: ${fileStatus.currentVersion} → ${fileStatus.latestVersion}`);
    });

  } else if (subCommand === 'run') {
    // Run migrations
    console.log('Running migrations...');
    const result = await runAllMigrations(targetVersion);

    console.log(`\n📊 Migration Results:`);
    console.log(`   Successful: ${result.successful}`);
    console.log(`   Failed: ${result.failed}`);

    if (result.successful > 0) {
      console.log('\n✅ Consider committing these changes:');
      console.log('   git add data/ && git commit -m "data: migrate schemas"');
    }

  } else {
    console.log('Migration commands:');
    console.log('   status    Show current migration status');
    console.log('   run       Run all pending migrations');
    console.log('   run v1.2.0  Run migrations to specific version');
  }
}

/**
 * Git integration
 */
async function gitCommand() {
  console.log('🔗 Git Integration\n');

  const subCommand = process.argv[3];

  if (subCommand === 'status') {
    // Show git status for data files
    const status = await getDataGitStatus();

    if (status.error) {
      console.log(`❌ Git status error: ${status.error}`);
      return;
    }

    console.log('Data Files Git Status:');
    if (status.changes.length > 0) {
      status.changes.forEach(change => {
        const statusIcon = change.untracked ? '➕' :
                          change.added ? '🟢' :
                          change.modified ? '🔵' : '⚪';
        console.log(`   ${statusIcon} ${change.file}`);
      });
    } else {
      console.log('   ✅ No changes to data files');
    }

    if (status.recentCommits.length > 0) {
      console.log('\nRecent Data Commits:');
      status.recentCommits.slice(0, 5).forEach(commit => {
        console.log(`   ${commit}`);
      });
    }

  } else if (subCommand === 'setup-hooks') {
    // Setup git hooks
    console.log('Setting up git hooks for data validation...');
    const result = await setupGitHooks();

    if (result.setup) {
      console.log('✅ Git hooks installed successfully');
    } else {
      console.log(`❌ Git hooks setup failed: ${result.error || result.reason}`);
    }

  } else {
    console.log('Git commands:');
    console.log('   status       Show git status for data files');
    console.log('   setup-hooks  Install pre-commit hooks for data validation');
  }
}

/**
 * Full maintenance routine
 */
async function maintenanceCommand() {
  console.log('🔧 Complete Data Maintenance Routine\n');
  console.log('This will run validation, backup, quality checks, and cleanup...\n');

  const startTime = Date.now();
  const operations = [];

  try {
    // Step 1: Validate data files
    console.log('Step 1/6: Validating data files...');
    let validationErrors = 0;
    for (const filename of VALIDATED_DATA_FILES) {
      try {
        const baseName = filename.replace('.js', '');
        const { data } = await readDataFile(filename);
        const validation = validateDataFile(baseName, data);
        if (!validation.valid) {
          validationErrors += validation.errors.length;
        }
      } catch (error) {
        validationErrors++;
      }
    }
    operations.push({
      type: 'validation',
      description: 'data validation',
      success: validationErrors === 0,
      changes: validationErrors
    });

    // Step 2: Create backups
    console.log('Step 2/6: Creating backups...');
    let backupCount = 0;
    for (const filename of ALL_DATA_FILES) {
      try {
        await createBackup(filename, 'maintenance');
        backupCount++;
      } catch (error) {
        console.warn(`Backup failed for ${filename}: ${error.message}`);
      }
    }
    operations.push({
      type: 'backup',
      description: 'backup creation',
      success: true,
      changes: backupCount
    });

    // Step 3: Check migrations
    console.log('Step 3/6: Checking migrations...');
    const migrationStatus = await getMigrationStatus();
    const needsMigration = Object.values(migrationStatus).some(s => s.needsUpdate);
    operations.push({
      type: 'migration-check',
      description: 'migration status check',
      success: true,
      changes: needsMigration ? 1 : 0
    });

    // Step 4: Quality monitoring
    console.log('Step 4/6: Running quality checks...');
    const dashboard = await generateQualityDashboard();
    operations.push({
      type: 'quality',
      description: 'quality monitoring',
      success: dashboard.alerts.filter(a => a.level === 'critical').length === 0,
      changes: dashboard.quality.summary.criticalIssues
    });

    // Step 5: Consistency checks
    console.log('Step 5/6: Checking data consistency...');
    const consistency = await checkDataConsistency();
    operations.push({
      type: 'consistency',
      description: 'consistency validation',
      success: consistency.failed === 0,
      changes: consistency.failed
    });

    // Step 6: Cleanup
    console.log('Step 6/6: Cleaning up...');
    const cleanupResult = await cleanupBackups(20);
    operations.push({
      type: 'cleanup',
      description: 'backup cleanup',
      success: true,
      changes: cleanupResult.totalRemoved
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Maintenance completed in ${duration}s`);

    // Summary
    const successful = operations.filter(op => op.success).length;
    const failed = operations.filter(op => !op.success).length;
    const totalChanges = operations.reduce((sum, op) => sum + op.changes, 0);

    console.log(`\n📊 Maintenance Summary:`);
    console.log(`   Operations: ${successful}/${successful + failed} successful`);
    console.log(`   Total Changes: ${totalChanges}`);

    if (totalChanges > 0) {
      console.log('\n💡 Consider committing the changes:');
      console.log('   git add data/ && git commit -m "data: maintenance updates"');
    }

    // Auto-commit option
    if (process.argv.includes('--auto-commit') && totalChanges > 0) {
      console.log('\n🔄 Auto-committing changes...');
      await autoCommitDataChanges(operations, 'maintenance');
    }

  } catch (error) {
    console.error(`❌ Maintenance failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
📊 Data Management Suite - GitHub Pages Compatible

Comprehensive data management for static JSON files with validation,
backup, migration, quality monitoring, and git integration.

Usage: node scripts/data-management.mjs <command> [subcommand] [options]

Core Commands:
  validate          Validate all data files for consistency and correctness
  backup           Create backups of all data files and cleanup old ones
  quality          Generate comprehensive quality report and alerts
  migrate          Manage data schema migrations
  git              Git integration for data files
  maintenance      Run complete maintenance routine

Migration Commands:
  migrate status            Show migration status for all files
  migrate run              Run all pending migrations
  migrate run v1.2.0       Run migrations to specific version

Git Commands:
  git status               Show git status for data files
  git setup-hooks          Install pre-commit hooks for validation

Maintenance Options:
  maintenance --auto-commit  Automatically commit changes after maintenance

Examples:
  node scripts/data-management.mjs validate
  node scripts/data-management.mjs quality
  node scripts/data-management.mjs maintenance --auto-commit
  node scripts/data-management.mjs migrate status
  node scripts/data-management.mjs git setup-hooks

Data Files Managed:
  ${ALL_DATA_FILES.slice(0, 10).join(', ')}
  ${ALL_DATA_FILES.slice(10).join(', ')}

For detailed help on any command, run: <command> --help
`);
}

// Main command dispatcher
async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case 'validate':
        await validateCommand();
        break;
      case 'backup':
        await backupCommand();
        break;
      case 'quality':
        await qualityCommand();
        break;
      case 'migrate':
        await migrateCommand();
        break;
      case 'git':
        await gitCommand();
        break;
      case 'maintenance':
        await maintenanceCommand();
        break;
      case 'help':
      case '--help':
      case '-h':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error('❌ Command failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
