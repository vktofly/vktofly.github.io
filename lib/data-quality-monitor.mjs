/**
 * Data Quality Monitoring and Consistency Checks
 *
 * Monitors data quality over time, checks for inconsistencies,
 * and provides quality metrics and reports.
 */

import { readDataFile, getDataFileStats } from './data-utils.mjs';
import { validateDataFile } from './data-validation.mjs';
import fs from 'fs/promises';
import path from 'path';

const QUALITY_LOG_DIR = path.resolve(process.cwd(), 'data/quality-logs');
const METRICS_FILE = path.join(QUALITY_LOG_DIR, 'metrics.json');

/**
 * Quality metrics for data files
 */
class DataQualityMetrics {
  constructor(filename) {
    this.filename = filename;
    this.timestamp = new Date().toISOString();
    this.metrics = {
      itemCount: 0,
      fileSize: 0,
      validation: {
        valid: false,
        errors: 0,
        warnings: 0
      },
      completeness: {},
      avgCompleteness: 0,
      dataTypes: {},
      uniqueConstraints: {},
      crossReferences: {},
      trends: {}
    };
  }

  /**
   * Calculate completeness percentage for a field
   */
  calculateFieldCompleteness(fieldName, fieldStats) {
    const { filled, percentage } = fieldStats;
    this.metrics.completeness[fieldName] = {
      filled,
      percentage,
      status: percentage >= 90 ? 'excellent' :
              percentage >= 75 ? 'good' :
              percentage >= 50 ? 'fair' : 'poor'
    };
  }

  /**
   * Analyze data types in fields
   */
  analyzeDataTypes(data) {
    if (data.length === 0) return;

    const sample = data[0];
    Object.keys(sample).forEach(field => {
      const types = new Set();
      data.forEach(item => {
        if (item[field] !== undefined && item[field] !== null) {
          types.add(typeof item[field]);
        }
      });
      this.metrics.dataTypes[field] = Array.from(types);
    });
  }

  /**
   * Check unique constraints (slugs, IDs)
   */
  checkUniqueConstraints(data) {
    ['slug', 'id'].forEach(field => {
      const values = data.map(item => item[field]).filter(Boolean);
      const unique = new Set(values);
      this.metrics.uniqueConstraints[field] = {
        total: values.length,
        unique: unique.size,
        duplicates: values.length - unique.size,
        status: values.length === unique.size ? 'valid' : 'has_duplicates'
      };
    });
  }

  /**
   * Analyze cross-references between data files
   */
  async analyzeCrossReferences(data, field, targetFile) {
    try {
      const { data: targetData } = await readDataFile(`${targetFile}.js`);
      const targetSlugs = new Set(targetData.map(item => item.slug || item.id).filter(Boolean));

      let validRefs = 0;
      let invalidRefs = 0;
      let brokenRefs = [];

      data.forEach((item, index) => {
        const refs = item[field];
        if (Array.isArray(refs)) {
          refs.forEach(ref => {
            if (targetSlugs.has(ref)) {
              validRefs++;
            } else {
              invalidRefs++;
              brokenRefs.push({ itemIndex: index, ref });
            }
          });
        }
      });

      this.metrics.crossReferences[field] = {
        total: validRefs + invalidRefs,
        valid: validRefs,
        invalid: invalidRefs,
        brokenRefs: brokenRefs.slice(0, 10), // Limit for storage
        status: invalidRefs === 0 ? 'valid' : 'has_broken_refs'
      };
    } catch (error) {
      this.metrics.crossReferences[field] = {
        error: error.message,
        status: 'error'
      };
    }
  }
}

/**
 * Quality monitoring configuration
 */
const QUALITY_CONFIG = {
  books: {
    crossReferences: {
      influencedProjects: 'projects',
      technologies: 'skills'
    },
    qualityThresholds: {
      minCompleteness: 80,
      maxDuplicates: 0
    }
  },
  projects: {
    crossReferences: {
      skills: 'skills',
      technologies: 'skills'
    },
    qualityThresholds: {
      minCompleteness: 85,
      maxDuplicates: 0
    }
  },
  experience: {
    qualityThresholds: {
      minCompleteness: 90,
      maxDuplicates: 0
    }
  },
  skills: {
    qualityThresholds: {
      minCompleteness: 75,
      maxDuplicates: 0
    }
  }
};

/**
 * Monitor data quality for a specific file
 * @param {string} filename - Data filename (without .js)
 * @returns {object} Quality metrics
 */
export async function monitorDataQuality(filename) {
  const metrics = new DataQualityMetrics(filename);

  try {
    // Get basic file stats
    const stats = await getDataFileStats(`${filename}.js`);
    metrics.metrics.itemCount = stats.itemCount;
    metrics.metrics.fileSize = stats.fileSize;

    // Run validation
    const { data } = await readDataFile(`${filename}.js`);
    const validation = validateDataFile(filename, data);
    metrics.metrics.validation = {
      valid: validation.valid,
      errors: validation.errors.length,
      warnings: validation.warnings.length
    };

    // Calculate completeness
    if (stats.completeness) {
      Object.entries(stats.completeness).forEach(([field, fieldStats]) => {
        metrics.calculateFieldCompleteness(field, fieldStats);
      });

      // Calculate average completeness
      const completenessValues = Object.values(stats.completeness).map(c => c.percentage);
      metrics.metrics.avgCompleteness = completenessValues.length > 0
        ? Math.round(completenessValues.reduce((a, b) => a + b) / completenessValues.length)
        : 0;
    }

    // Analyze data types
    metrics.analyzeDataTypes(data);

    // Check unique constraints
    metrics.checkUniqueConstraints(data);

    // Check cross-references
    const config = QUALITY_CONFIG[filename];
    if (config && config.crossReferences) {
      for (const [field, targetFile] of Object.entries(config.crossReferences)) {
        await metrics.analyzeCrossReferences(data, field, targetFile);
      }
    }

    return metrics;

  } catch (error) {
    metrics.metrics.error = error.message;
    return metrics;
  }
}

/**
 * Generate quality report for all data files
 * @returns {object} Comprehensive quality report
 */
export async function generateQualityReport() {
  console.log('📊 Generating data quality report...\n');

  const report = {
    timestamp: new Date().toISOString(),
    files: {},
    summary: {
      totalFiles: 0,
      validFiles: 0,
      filesWithErrors: 0,
      filesWithWarnings: 0,
      avgCompleteness: 0,
      criticalIssues: 0
    }
  };

  const dataFiles = [
    'books', 'projects', 'experience', 'skills', 'influentialPeople',
    'testimonials', 'publications', 'speaking', 'videos', 'podcasts'
  ];

  report.summary.totalFiles = dataFiles.length;
  let totalCompleteness = 0;
  let completenessCount = 0;

  for (const filename of dataFiles) {
    try {
      const metrics = await monitorDataQuality(filename);
      report.files[filename] = metrics.metrics;

      // Update summary
      if (metrics.metrics.validation.valid) {
        report.summary.validFiles++;
      }
      if (metrics.metrics.validation.errors > 0) {
        report.summary.filesWithErrors++;
      }
      if (metrics.metrics.validation.warnings > 0) {
        report.summary.filesWithWarnings++;
      }

      // Check for critical issues
      const config = QUALITY_CONFIG[filename];
      if (config && config.qualityThresholds) {
        if (metrics.metrics.avgCompleteness < config.qualityThresholds.minCompleteness) {
          report.summary.criticalIssues++;
        }
        Object.values(metrics.metrics.uniqueConstraints).forEach(constraint => {
          if (constraint.duplicates > config.qualityThresholds.maxDuplicates) {
            report.summary.criticalIssues++;
          }
        });
      }

      if (metrics.metrics.avgCompleteness > 0) {
        totalCompleteness += metrics.metrics.avgCompleteness;
        completenessCount++;
      }

      console.log(`✅ ${filename}: ${metrics.metrics.avgCompleteness}% complete, ${metrics.metrics.validation.errors} errors`);

    } catch (error) {
      report.files[filename] = { error: error.message };
      report.summary.filesWithErrors++;
      console.log(`❌ ${filename}: ${error.message}`);
    }
  }

  report.summary.avgCompleteness = completenessCount > 0
    ? Math.round(totalCompleteness / completenessCount)
    : 0;

  return report;
}

/**
 * Save quality metrics to log file
 * @param {object} report - Quality report to save
 */
export async function saveQualityMetrics(report) {
  await fs.mkdir(QUALITY_LOG_DIR, { recursive: true });
  await fs.writeFile(METRICS_FILE, JSON.stringify(report, null, 2));
}

/**
 * Load historical quality metrics
 * @returns {Array} Array of historical reports
 */
export async function loadQualityHistory() {
  try {
    const content = await fs.readFile(METRICS_FILE, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Analyze quality trends over time
 * @param {number} days - Number of days to analyze
 * @returns {object} Trend analysis
 */
export async function analyzeQualityTrends(days = 30) {
  const history = await loadQualityHistory();
  if (!history) {
    return { error: 'No quality history available' };
  }

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const recentReports = history.filter(report =>
    new Date(report.timestamp) >= cutoffDate
  );

  if (recentReports.length < 2) {
    return { error: 'Not enough data for trend analysis' };
  }

  const trends = {
    period: `${days} days`,
    reportsAnalyzed: recentReports.length,
    completenessTrend: [],
    errorTrend: [],
    fileTrends: {}
  };

  // Analyze overall trends
  recentReports.forEach(report => {
    trends.completenessTrend.push({
      date: report.timestamp,
      completeness: report.summary.avgCompleteness
    });
    trends.errorTrend.push({
      date: report.timestamp,
      errors: report.summary.filesWithErrors
    });
  });

  // Analyze per-file trends
  const files = Object.keys(recentReports[0].files);
  files.forEach(filename => {
    trends.fileTrends[filename] = recentReports.map(report => ({
      date: report.timestamp,
      completeness: report.files[filename]?.avgCompleteness || 0,
      errors: report.files[filename]?.validation?.errors || 0
    }));
  });

  return trends;
}

/**
 * Check data consistency rules
 * @returns {object} Consistency check results
 */
export async function checkDataConsistency() {
  console.log('🔍 Checking data consistency...\n');

  const results = {
    timestamp: new Date().toISOString(),
    checks: [],
    passed: 0,
    failed: 0
  };

  // Check 1: All books should have valid categories
  try {
    const { data: books } = await readDataFile('books.js');
    const validCategories = ['epistemology', 'technology', 'business', 'leadership', 'philosophy', 'science'];
    const invalidCategories = books.filter(book => !validCategories.includes(book.category));

    results.checks.push({
      name: 'Book categories validation',
      passed: invalidCategories.length === 0,
      details: invalidCategories.length === 0 ? 'All books have valid categories' :
               `Found ${invalidCategories.length} books with invalid categories: ${invalidCategories.map(b => b.title).join(', ')}`
    });
  } catch (error) {
    results.checks.push({
      name: 'Book categories validation',
      passed: false,
      details: `Error: ${error.message}`
    });
  }

  // Check 2: Skills referenced in projects should exist
  try {
    const { data: projects } = await readDataFile('projects.js');
    const { data: skills } = await readDataFile('skills.js');
    const skillNames = new Set(skills.map(skill => skill.name));

    let missingSkills = [];
    projects.forEach(project => {
      if (project.skills && Array.isArray(project.skills)) {
        project.skills.forEach(skill => {
          if (!skillNames.has(skill)) {
            missingSkills.push(`${skill} (in project: ${project.title})`);
          }
        });
      }
    });

    results.checks.push({
      name: 'Project skills references',
      passed: missingSkills.length === 0,
      details: missingSkills.length === 0 ? 'All project skills exist' :
               `Missing skills: ${missingSkills.join(', ')}`
    });
  } catch (error) {
    results.checks.push({
      name: 'Project skills references',
      passed: false,
      details: `Error: ${error.message}`
    });
  }

  // Check 3: Experience dates should be valid
  try {
    const { data: experience } = await readDataFile('experience.js');
    const invalidDates = experience.filter(exp => {
      const startValid = exp.startDate && !isNaN(new Date(exp.startDate).getTime());
      const endValid = !exp.endDate || !isNaN(new Date(exp.endDate).getTime());
      return !startValid || !endValid;
    });

    results.checks.push({
      name: 'Experience date validation',
      passed: invalidDates.length === 0,
      details: invalidDates.length === 0 ? 'All experience dates are valid' :
               `Found ${invalidDates.length} experiences with invalid dates`
    });
  } catch (error) {
    results.checks.push({
      name: 'Experience date validation',
      passed: false,
      details: `Error: ${error.message}`
    });
  }

  // Update summary
  results.passed = results.checks.filter(check => check.passed).length;
  results.failed = results.checks.filter(check => !check.passed).length;

  // Display results
  results.checks.forEach(check => {
    const icon = check.passed ? '✅' : '❌';
    console.log(`${icon} ${check.name}: ${check.details}`);
  });

  console.log(`\n📊 Consistency Summary: ${results.passed} passed, ${results.failed} failed`);

  return results;
}

/**
 * Generate data quality dashboard
 * @returns {object} Dashboard data
 */
export async function generateQualityDashboard() {
  const report = await generateQualityReport();
  const consistency = await checkDataConsistency();
  const trends = await analyzeQualityTrends(30);

  return {
    generatedAt: new Date().toISOString(),
    quality: report,
    consistency,
    trends: trends.error ? null : trends,
    alerts: generateQualityAlerts(report, consistency)
  };
}

/**
 * Generate quality alerts based on report data
 * @param {object} report - Quality report
 * @param {object} consistency - Consistency check results
 * @returns {Array} Array of alerts
 */
function generateQualityAlerts(report, consistency) {
  const alerts = [];

  // Quality threshold alerts
  if (report.summary.avgCompleteness < 80) {
    alerts.push({
      level: 'critical',
      message: `Overall data completeness is low: ${report.summary.avgCompleteness}%`
    });
  }

  // Validation error alerts
  if (report.summary.filesWithErrors > 0) {
    alerts.push({
      level: 'error',
      message: `${report.summary.filesWithErrors} data files have validation errors`
    });
  }

  // Consistency alerts
  if (consistency.failed > 0) {
    alerts.push({
      level: 'warning',
      message: `${consistency.failed} consistency checks failed`
    });
  }

  // Per-file alerts
  Object.entries(report.files).forEach(([filename, metrics]) => {
    if (metrics.error) {
      alerts.push({
        level: 'error',
        message: `Failed to analyze ${filename}: ${metrics.error}`
      });
    } else if (metrics.avgCompleteness < 70) {
      alerts.push({
        level: 'warning',
        message: `${filename} has low completeness: ${metrics.avgCompleteness}%`
      });
    }
  });

  return alerts;
}
