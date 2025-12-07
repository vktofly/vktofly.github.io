# Data Management Quick Reference

Quick reference guide for all data management commands and workflows.

## 🚀 Quick Commands

### Validation
```bash
# Validate all data files
npm run data:validate

# Quick check (validate + quality)
npm run data:check
```

### Quality Assessment
```bash
# Generate comprehensive quality report
npm run data:quality
```

### Backup Management
```bash
# Create backups of all data files
npm run data:backup

# Create backup with custom reason
node scripts/data-management.mjs backup "before-major-update"
```

### Complete Maintenance
```bash
# Run full maintenance routine (validate + backup + quality + cleanup)
npm run data:maintenance

# With auto-commit
npm run data:maintenance -- --auto-commit
```

### Migration Management
```bash
# Check migration status
npm run data:migrate status

# Run all pending migrations
npm run data:migrate run

# Migrate to specific version
node scripts/data-management.mjs migrate run v1.2.0
```

### Git Integration
```bash
# Show git status for data files
npm run data:git status

# Setup pre-commit hooks for validation
npm run data:git setup-hooks
```

## 📋 Command Reference

### `npm run data:validate`
Validates all data files against their schemas.

**What it does:**
- Checks required fields
- Validates data types and formats
- Verifies unique constraints (slugs, IDs)
- Reports errors and warnings

**Exit codes:**
- `0` - All files valid
- `1` - Validation errors found

**Example output:**
```
✅ books: valid (8 items)
✅ projects: valid (1 items)
✅ experience: valid (13 items)
🎉 All data files are valid and ready for deployment!
```

---

### `npm run data:quality`
Generates comprehensive quality report with metrics and alerts.

**What it does:**
- Completeness analysis (filled vs empty fields)
- Consistency checks (cross-references, formats)
- Quality trend analysis
- Generates alerts and recommendations

**Example output:**
```
Quality Overview:
   Files: 10/10 valid
   Errors: 0 files with errors
   Avg Completeness: 97%
   Critical Issues: 1

🚨 Alerts:
   ⚠️ 2 consistency checks failed
```

---

### `npm run data:backup`
Creates backups of all data files and cleans up old ones.

**What it does:**
- Creates timestamped backups
- Keeps 20 most recent backups per file
- Reports backup status

**Backup location:** `data/backups/`

**Backup naming:** `{filename}_{timestamp}_{reason}.js`

---

### `npm run data:maintenance`
Runs complete maintenance routine.

**Steps:**
1. Validates all data files
2. Creates backups
3. Checks migration status
4. Runs quality monitoring
5. Checks data consistency
6. Cleans up old backups

**Options:**
- `--auto-commit` - Automatically commit changes after maintenance

---

### `npm run data:migrate status`
Shows migration status for all data files.

**Example output:**
```
Migration Status:
   ⬆️ books: 0.0.0 → 1.1.0 (needs update)
   ✅ projects: 1.0.0 → 1.0.0
   ✅ skills: 1.0.0 → 1.0.0
```

---

### `npm run data:migrate run`
Runs all pending migrations.

**What it does:**
- Applies migrations in sequence
- Creates backups before migration
- Validates migrated data
- Updates version tracking

**Safety:**
- Automatic backups before migration
- Validation after migration
- Rollback capability on failure

---

### `npm run data:git status`
Shows git status for data files.

**What it shows:**
- Modified data files
- Staged changes
- Recent commits affecting data files

---

### `npm run data:git setup-hooks`
Installs pre-commit hooks for data validation.

**What it does:**
- Creates `.git/hooks/pre-commit`
- Validates data files before commits
- Prevents commits with validation errors

**Note:** Requires git repository to be initialized.

---

## 🔄 Common Workflows

### Before Deploying
```bash
# 1. Validate data
npm run data:validate

# 2. Check quality
npm run data:quality

# 3. Create backup
npm run data:backup

# 4. Run maintenance (does all of the above)
npm run data:maintenance
```

### Adding New Data
```bash
# 1. Edit data file
# 2. Validate
npm run data:validate

# 3. Check quality
npm run data:quality

# 4. Commit
git add data/ && git commit -m "data: add new items"
```

### Updating Data Schema
```bash
# 1. Create migration
# (Edit lib/data-migration.mjs)

# 2. Check migration status
npm run data:migrate status

# 3. Run migration
npm run data:migrate run

# 4. Validate
npm run data:validate
```

### Regular Maintenance
```bash
# Weekly maintenance
npm run data:maintenance

# Clean up old backups
node scripts/data-management.mjs clean 10
```

## 🛠️ Advanced Usage

### Direct Script Access
```bash
# Use scripts directly for more control
node scripts/data-management.mjs <command> [options]

# Examples:
node scripts/data-management.mjs validate
node scripts/data-management.mjs backup "custom-reason"
node scripts/data-management.mjs migrate run v1.2.0
```

### Legacy Manager
```bash
# Use original data manager for specific operations
npm run data:manager

# Available commands:
# - validate
# - backup
# - stats
# - clean
# - integrity
# - list-backups
# - maintenance
```

## 📊 Understanding Output

### Validation Results
- ✅ **Valid** - File passes all validation checks
- ❌ **Errors** - Validation failures that must be fixed
- ⚠️ **Warnings** - Non-critical issues (missing schemas, etc.)

### Quality Metrics
- **Completeness** - Percentage of fields filled
- **Consistency** - Cross-reference and format validation
- **Critical Issues** - Problems that should be addressed

### Migration Status
- ⬆️ **Needs Update** - Migrations available
- ✅ **Up to Date** - No migrations needed

## 🚨 Troubleshooting

### Validation Errors
```bash
# Get detailed error information
npm run data:validate

# Check specific file
node scripts/data-management.mjs validate books
```

### Backup Issues
```bash
# Check backup directory
ls data/backups/

# Manual backup
node scripts/data-manager.mjs backup books.js
```

### Migration Problems
```bash
# Check migration status
npm run data:migrate status

# Rollback migration
npm run data:migrate run v1.0.0
```

## 💡 Tips

1. **Run validation before commits** - Use pre-commit hooks
2. **Regular backups** - Run `data:backup` before major changes
3. **Quality monitoring** - Check `data:quality` weekly
4. **Maintenance routine** - Run `data:maintenance` before deployments
5. **Migration testing** - Test migrations on backups first

## 📚 Related Documentation

- [Full Data Management Guide](./DATA_MANAGEMENT.md) - Comprehensive documentation
- [Data Structure Guide](./DATA_STRUCTURE_GUIDE.md) - Schema definitions
- [Best Practices](./BEST_PRACTICES.md) - Data management best practices

---

**Last Updated:** December 2024  
**Version:** 1.0.0
