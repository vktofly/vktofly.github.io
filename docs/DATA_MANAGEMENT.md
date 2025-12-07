# Data Management System

A comprehensive, GitHub Pages-compatible data management system for static JSON data files. This system provides validation, backup, migration, quality monitoring, and git integration capabilities.

## Features

### ✅ Data Validation
- **Schema-based validation** for all data files
- **Type checking** (string, number, boolean, array, object)
- **Format validation** (URLs, emails, slugs, dates)
- **Required field checking**
- **Unique constraint validation** (slugs, IDs)
- **Cross-reference validation**

### ✅ Backup & Recovery
- **Automatic backups** before data changes
- **Versioned backups** with timestamps and reasons
- **Backup cleanup** with configurable retention
- **Restore functionality** from backup files
- **Backup integrity verification**

### ✅ Data Migration
- **Schema versioning** with safe migration paths
- **Up/down migrations** with rollback capability
- **Migration status tracking**
- **Batch migration execution**
- **Migration validation**

### ✅ Quality Monitoring
- **Completeness analysis** (filled vs empty fields)
- **Data consistency checks**
- **Cross-reference validation**
- **Quality trend analysis**
- **Automated alerts and warnings**
- **Quality dashboards and reports**

### ✅ Git Integration
- **Pre-commit hooks** for data validation
- **Automatic commit generation** for data changes
- **Git status monitoring** for data files
- **Change tracking and history**
- **Commit message generation**

### ✅ Maintenance Automation
- **One-command maintenance** routine
- **Automated validation, backup, and cleanup**
- **Quality monitoring integration**
- **Git integration**
- **Maintenance scheduling support**

## Quick Start

### Installation
All tools are included in the project. No additional dependencies required.

### Basic Usage

```bash
# Validate all data files
npm run data:validate

# Create backups and cleanup old ones
npm run data:backup

# Generate quality report
npm run data:quality

# Run full maintenance routine
npm run data:maintenance

# Check everything at once
npm run data:check
```

## Commands Reference

### Core Commands

#### `npm run data:validate`
Validates all data files against their schemas.
- Checks required fields
- Validates data types and formats
- Verifies unique constraints
- Reports errors and warnings

#### `npm run data:backup`
Creates backups of all data files and cleans up old backups.
- Creates timestamped backups
- Keeps configurable number of recent backups
- Reports backup status

#### `npm run data:quality`
Generates comprehensive quality report.
- Completeness analysis
- Consistency checks
- Quality trends
- Alerts and recommendations

#### `npm run data:maintenance`
Runs complete maintenance routine including:
- Validation
- Backup creation
- Migration checks
- Quality monitoring
- Cleanup

### Advanced Commands

#### Migration Management
```bash
# Check migration status
npm run data:migrate status

# Run all pending migrations
npm run data:migrate run

# Migrate to specific version
node scripts/data-management.mjs migrate run v1.2.0
```

#### Git Integration
```bash
# Show git status for data files
npm run data:git status

# Setup pre-commit hooks
npm run data:git setup-hooks
```

#### Legacy Manager
```bash
# Use the original data manager (for specific operations)
npm run data:manager
```

## Data File Schemas

### Books (`data/books.js`)
```javascript
{
  slug: "string (required, unique)",
  title: "string (required)",
  author: "string (required)",
  category: "enum: epistemology|technology|business|leadership|philosophy|science",
  tags: "string[]",
  year: "number (1900-2025)",
  yearRead: "number (1900-2025)",
  readingStatus: "enum: want-to-read|currently-reading|read|mastered",
  impact: "enum: low|medium|high",
  paradigmShift: "boolean",
  knowledgeCompounding: "boolean",
  readingPhase: "enum: exploration|mastery|application",
  recommendedBy: "string",
  keyQuote: "string",
  whyItMatters: "string",
  keyInsights: "string[]",
  beforeAfter: "object",
  connectionToWork: "string",
  influencedProjects: "string[]",
  coverImage: "url",
  isbn: "string",
  goodreadsUrl: "url",
  amazonUrl: "url",
  notes: "string"
}
```

### Projects (`data/projects.js`)
```javascript
{
  slug: "string (required, unique)",
  title: "string (required)",
  description: "string (required)",
  category: "string (required)",
  tags: "string[]",
  status: "enum: active|completed|archived|concept",
  year: "number (1900-2025)",
  impact: "enum: low|medium|high",
  technologies: "string[]",
  url: "url",
  githubUrl: "url",
  image: "url",
  featured: "boolean",
  caseStudy: "string",
  outcomes: "string[]",
  challenges: "string[]",
  lessons: "string[]"
}
```

### Experience (`data/experience.js`)
```javascript
{
  title: "string (required)",
  company: "string (required)",
  location: "string",
  startDate: "string (required)",
  endDate: "string",
  current: "boolean",
  description: "string",
  achievements: "string[]",
  technologies: "string[]",
  category: "string",
  impact: "enum: low|medium|high",
  url: "url"
}
```

### Skills (`data/skills.js`)
```javascript
{
  name: "string (required)",
  category: "string (required)",
  proficiency: "enum: beginner|intermediate|advanced|expert",
  yearsExperience: "number",
  description: "string",
  projects: "string[]",
  certifications: "string[]",
  featured: "boolean"
}
```

## Quality Metrics

The system tracks various quality metrics:

### Completeness
- Percentage of filled fields per file
- Average completeness across all files
- Field-by-field completeness analysis

### Validation Status
- Files with validation errors
- Files with validation warnings
- Critical vs non-critical issues

### Consistency
- Cross-reference validation
- Data type consistency
- Format consistency

### Trends
- Quality changes over time
- Error rate trends
- Completeness improvements

## Backup System

### Backup Structure
```
data/backups/
├── books_2024-12-07T10-30-00-000Z_manual-backup.js
├── projects_2024-12-07T10-30-00-000Z_migration-1.0.0-to-1.1.0.js
└── ...
```

### Backup Retention
- Keeps 20 most recent backups per file by default
- Automatic cleanup during maintenance
- Manual cleanup with `npm run data:backup`

### Restore Process
```javascript
import { restoreFromBackup } from './lib/data-utils.mjs';
await restoreFromBackup('books.js', 'books_2024-12-07T10-30-00-000Z_backup.js');
```

## Migration System

### Creating Migrations
```javascript
import { createMigration } from './lib/data-migration.mjs';

createMigration('books', '1.2.0', 'Add reading time field',
  (data) => data.map(book => ({ ...book, readingTime: null })),
  (data) => data.map(({ readingTime, ...book }) => book)
);
```

### Migration Status
```bash
$ npm run data:migrate status
Migration Status:
   ✅ books: 1.0.0 → 1.1.0
   ⬆️  projects: 1.0.0 → 1.1.0 (needs update)
   ✅ skills: 1.0.0 → 1.0.0
```

## Git Integration

### Pre-commit Hooks
The system can install pre-commit hooks to validate data before commits:

```bash
npm run data:git setup-hooks
```

### Automatic Commits
Data changes can be automatically committed:

```bash
npm run data:maintenance -- --auto-commit
```

## Quality Alerts

The system generates alerts for:

### Critical Issues
- Validation errors that prevent deployment
- Missing required fields
- Broken cross-references

### Warnings
- Low completeness (< 80%)
- Duplicate values
- Format inconsistencies

### Recommendations
- Suggested improvements
- Maintenance reminders
- Optimization opportunities

## Integration with Build Process

### Pre-build Validation
Add to `package.json` build script:

```json
{
  "scripts": {
    "build": "npm run data:check && node scripts/generate-llms-context.js && next build && next-sitemap"
  }
}
```

### CI/CD Integration
```yaml
# .github/workflows/deploy.yml
- name: Validate Data
  run: npm run data:validate

- name: Check Data Quality
  run: npm run data:quality

- name: Backup Data
  run: npm run data:backup
```

## Troubleshooting

### Common Issues

#### Validation Errors
```bash
# Get detailed error information
npm run data:validate

# Check specific file
node scripts/data-management.mjs validate books
```

#### Backup Failures
```bash
# Check backup directory permissions
ls -la data/backups/

# Manual backup creation
node scripts/data-manager.mjs backup books.js
```

#### Migration Issues
```bash
# Check migration status
npm run data:migrate status

# Manual migration
node scripts/data-management.mjs migrate run books 1.1.0
```

### Recovery Procedures

#### Restore from Backup
```javascript
import { restoreFromBackup } from './lib/data-utils.mjs';
await restoreFromBackup('books.js', 'books_backup_filename.js');
```

#### Rollback Migration
```bash
npm run data:migrate run v1.0.0  # Rollback to specific version
```

#### Emergency Data Fix
```bash
# Create backup first
npm run data:backup

# Fix data manually, then validate
npm run data:validate

# Commit fixes
git add data/ && git commit -m "fix: correct data validation errors"
```

## Performance Considerations

### File Size Limits
- Individual data files should stay under 1MB
- Backup retention should be monitored
- Quality logs are automatically cleaned

### Memory Usage
- Large datasets are processed in streams
- Validation runs in parallel where possible
- Quality monitoring is cached

### Build Impact
- Validation adds ~5-10 seconds to build time
- Quality checks add ~2-3 seconds
- Maintenance routine takes ~15-30 seconds

## Future Enhancements

### Planned Features
- **Data Import/Export**: CSV, JSON, YAML support
- **Visual Dashboard**: Web-based data management interface
- **Automated Fixes**: AI-powered data correction suggestions
- **Change Tracking**: Detailed audit logs of data modifications
- **Performance Monitoring**: Data access pattern analysis

### Extensibility
- Custom validation rules
- Plugin system for data sources
- Webhook integrations for external systems
- Multi-environment data management

## Contributing

### Adding New Data Types
1. Define schema in `lib/data-validation.mjs`
2. Add quality config in `lib/data-quality-monitor.mjs`
3. Update DATA_FILES array in scripts
4. Add migration support if needed

### Custom Validation Rules
```javascript
// Add to VALIDATION_RULES in data-validation.mjs
customField: (value, field) => {
  // Custom validation logic
  if (value !== 'expected') {
    throw new Error(`Field '${field}' must be 'expected'`);
  }
}
```

## Support

For issues and questions:
1. Check this documentation
2. Run diagnostic commands
3. Check existing issues
4. Create detailed bug reports with validation output

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Compatibility**: GitHub Pages, Static Hosting
