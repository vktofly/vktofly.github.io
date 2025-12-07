/**
 * Data Validation Utilities
 *
 * Comprehensive validation for all data files to ensure data integrity and consistency.
 * Used by scripts and can be integrated into build process.
 */

import { readDataFile } from './data-utils.mjs';

/**
 * Validation rules for different data types
 */
const VALIDATION_RULES = {
  // Common validation functions
  required: (value, field) => {
    if (value === null || value === undefined || value === '') {
      throw new Error(`Required field '${field}' is missing or empty`);
    }
  },

  string: (value, field) => {
    if (typeof value !== 'string') {
      throw new Error(`Field '${field}' must be a string, got ${typeof value}`);
    }
  },

  number: (value, field) => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Field '${field}' must be a valid number, got ${value}`);
    }
  },

  boolean: (value, field) => {
    if (typeof value !== 'boolean') {
      throw new Error(`Field '${field}' must be a boolean, got ${typeof value}`);
    }
  },

  array: (value, field) => {
    if (!Array.isArray(value)) {
      throw new Error(`Field '${field}' must be an array, got ${typeof value}`);
    }
  },

  object: (value, field) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error(`Field '${field}' must be an object, got ${typeof value}`);
    }
  },

  url: (value, field) => {
    if (typeof value !== 'string') return;
    // Allow both absolute URLs and relative paths starting with /
    if (!value.startsWith('/') && !value.startsWith('http')) {
      try {
        new URL(value);
      } catch {
        throw new Error(`Field '${field}' must be a valid URL or relative path, got '${value}'`);
      }
    }
  },

  email: (value, field) => {
    if (typeof value !== 'string') return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error(`Field '${field}' must be a valid email, got '${value}'`);
    }
  },

  slug: (value, field) => {
    if (typeof value !== 'string') return;
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(value)) {
      throw new Error(`Field '${field}' must be a valid slug (lowercase, numbers, hyphens only), got '${value}'`);
    }
  },

  year: (value, field) => {
    if (typeof value !== 'number') return;
    const currentYear = new Date().getFullYear();
    if (value < 1800 || value > currentYear + 10) {
      throw new Error(`Field '${field}' must be a valid year between 1800 and ${currentYear + 10}, got ${value}`);
    }
  },

  enum: (allowedValues) => (value, field) => {
    if (!allowedValues.includes(value)) {
      throw new Error(`Field '${field}' must be one of [${allowedValues.join(', ')}], got '${value}'`);
    }
  }
};

/**
 * Schema definitions for each data file
 */
const DATA_SCHEMAS = {
  books: {
    required: ['slug', 'title', 'author', 'category'],
    fields: {
      slug: [VALIDATION_RULES.required, VALIDATION_RULES.string, VALIDATION_RULES.slug],
      title: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      author: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      category: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      tags: [VALIDATION_RULES.array],
      year: [VALIDATION_RULES.number, VALIDATION_RULES.year],
      yearRead: [VALIDATION_RULES.number, VALIDATION_RULES.year],
      readingStatus: [VALIDATION_RULES.enum(['want-to-read', 'currently-reading', 'read', 'mastered', 're-reading'])],
      impact: [VALIDATION_RULES.enum(['low', 'medium', 'high'])],
      paradigmShift: [VALIDATION_RULES.boolean],
      knowledgeCompounding: [VALIDATION_RULES.boolean],
      readingPhase: [VALIDATION_RULES.enum(['exploration', 'mastery', 'application', 'discovery', 'integration'])],
      recommendedBy: [VALIDATION_RULES.string],
      keyQuote: [VALIDATION_RULES.string],
      whyItMatters: [VALIDATION_RULES.string],
      keyInsights: [VALIDATION_RULES.array],
      beforeAfter: [VALIDATION_RULES.object],
      connectionToWork: [VALIDATION_RULES.string],
      influencedProjects: [VALIDATION_RULES.array],
      coverImage: [VALIDATION_RULES.url],
      isbn: [VALIDATION_RULES.string],
      goodreadsUrl: [VALIDATION_RULES.url],
      amazonUrl: [VALIDATION_RULES.url],
      notes: [VALIDATION_RULES.string]
    }
  },

  profile: {
    type: 'object', // Not an array
    required: ['name', 'role', 'headline', 'location', 'email', 'summary'],
    fields: {
      name: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      role: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      headline: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      location: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
      summary: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      website: [VALIDATION_RULES.url],
      bio: [VALIDATION_RULES.string],
      currentFocus: [VALIDATION_RULES.string],
      availableFor: [VALIDATION_RULES.array],
      timezone: [VALIDATION_RULES.string],
      languages: [VALIDATION_RULES.array]
    }
  },

  socials: {
    type: 'object', // Not an array
    required: [], // No required fields for socials
    fields: {
      twitter: [VALIDATION_RULES.url],
      linkedin: [VALIDATION_RULES.url],
      github: [VALIDATION_RULES.url],
      youtube: [VALIDATION_RULES.url],
      instagram: [VALIDATION_RULES.url],
      medium: [VALIDATION_RULES.url],
      substack: [VALIDATION_RULES.url]
    }
  },

  projects: {
    required: ['slug', 'title', 'description', 'category'],
    fields: {
      slug: [VALIDATION_RULES.required, VALIDATION_RULES.string, VALIDATION_RULES.slug],
      title: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      description: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      category: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      tags: [VALIDATION_RULES.array],
      status: [VALIDATION_RULES.enum(['active', 'completed', 'archived', 'concept'])],
      year: [VALIDATION_RULES.number, VALIDATION_RULES.year],
      impact: [VALIDATION_RULES.enum(['low', 'medium', 'high'])],
      technologies: [VALIDATION_RULES.array],
      url: [VALIDATION_RULES.url],
      githubUrl: [VALIDATION_RULES.url],
      image: [VALIDATION_RULES.url],
      featured: [VALIDATION_RULES.boolean],
      caseStudy: [VALIDATION_RULES.string],
      outcomes: [VALIDATION_RULES.array],
      challenges: [VALIDATION_RULES.array],
      lessons: [VALIDATION_RULES.array]
    }
  },

  experience: {
    required: ['company', 'role', 'period'],
    fields: {
      company: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      role: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      period: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      location: [VALIDATION_RULES.string],
      summary: [VALIDATION_RULES.string],
      achievements: [VALIDATION_RULES.array],
      technologies: [VALIDATION_RULES.array],
      impact: [VALIDATION_RULES.string],
      category: [VALIDATION_RULES.string],
      url: [VALIDATION_RULES.url]
    }
  },

  skills: {
    required: ['name', 'items'],
    fields: {
      name: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      items: [VALIDATION_RULES.required, VALIDATION_RULES.array],
      level: [VALIDATION_RULES.enum(['beginner', 'intermediate', 'advanced', 'expert'])],
      years: [VALIDATION_RULES.number]
    }
  },

  influentialPeople: {
    required: ['name'],
    fields: {
      name: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      category: [VALIDATION_RULES.string],
      description: [VALIDATION_RULES.string],
      influence: [VALIDATION_RULES.string],
      connection: [VALIDATION_RULES.string],
      image: [VALIDATION_RULES.url],
      website: [VALIDATION_RULES.url],
      twitter: [VALIDATION_RULES.string],
      linkedin: [VALIDATION_RULES.url],
      books: [VALIDATION_RULES.array],
      keyIdeas: [VALIDATION_RULES.array],
      meetings: [VALIDATION_RULES.array]
    }
  },

  testimonials: {
    required: ['id', 'quote', 'author'],
    fields: {
      id: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      quote: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      author: [VALIDATION_RULES.required, VALIDATION_RULES.string],
      role: [VALIDATION_RULES.string],
      company: [VALIDATION_RULES.string],
      avatar: [VALIDATION_RULES.url],
      linkedin: [VALIDATION_RULES.url]
    }
  }
};

/**
 * Validate a single item against a schema
 * @param {object} item - The data item to validate
 * @param {object} schema - The validation schema
 * @param {number} index - Index in array for error reporting
 * @returns {Array} Array of validation errors
 */
function validateItem(item, schema, index) {
  const errors = [];

  // Check required fields
  for (const field of schema.required) {
    try {
      VALIDATION_RULES.required(item[field], field);
    } catch (error) {
      errors.push(`Item ${index}: ${error.message}`);
    }
  }

  // Validate each field
  for (const [field, validators] of Object.entries(schema.fields)) {
    if (item[field] !== undefined && item[field] !== null) {
      for (const validator of validators) {
        try {
          validator(item[field], field);
        } catch (error) {
          errors.push(`Item ${index}, field '${field}': ${error.message}`);
        }
      }
    }
  }

  return errors;
}

/**
 * Validate an entire data file
 * @param {string} filename - Name of the data file (without .js extension)
 * @param {Array} data - The data array to validate
 * @returns {object} Validation results
 */
export function validateDataFile(filename, data) {
  const schema = DATA_SCHEMAS[filename];
  if (!schema) {
    // Skip validation for files without schemas - they may not need validation
    return {
      valid: true,
      errors: [],
      warnings: [`No validation schema defined for '${filename}' - validation skipped`]
    };
  }

  const errors = [];
  const warnings = [];

  // Check if data is an array or object based on schema
  const dataSchema = DATA_SCHEMAS[filename];
  if (dataSchema && dataSchema.type === 'object') {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
      return {
        valid: false,
        errors: [`Data in '${filename}' must be an object, got ${typeof data}`],
        warnings: []
      };
    }
  } else if (!Array.isArray(data)) {
    return {
      valid: false,
      errors: [`Data in '${filename}' must be an array, got ${typeof data}`],
      warnings: []
    };
  }

  // Check for empty data
  if (data.length === 0) {
    warnings.push(`Data file '${filename}' is empty`);
  }

  // Validate data based on type
  if (dataSchema && dataSchema.type === 'object') {
    // For objects, validate the object itself
    const itemErrors = validateItem(data, dataSchema, 0);
    errors.push(...itemErrors);
  } else {
    // For arrays, validate each item
    data.forEach((item, index) => {
      const itemErrors = validateItem(item, schema, index);
      errors.push(...itemErrors);
    });
  }

  // Check for duplicate slugs (if applicable)
  if (schema.fields.slug) {
    const slugs = data.map(item => item.slug).filter(Boolean);
    const uniqueSlugs = new Set(slugs);
    if (slugs.length !== uniqueSlugs.size) {
      const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
      errors.push(`Duplicate slugs found: ${[...new Set(duplicates)].join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    totalItems: data.length
  };
}

/**
 * Validate all data files
 * @returns {object} Validation results for all files
 */
export async function validateAllDataFiles() {
  const dataFiles = [
    'books', 'projects', 'experience', 'skills', 'influentialPeople',
    'testimonials', 'publications', 'speaking', 'videos', 'podcasts',
    'faqs', 'howtos', 'caseStudies', 'metaSkills', 'methodologies',
    'philosophicalFoundations', 'leadershipStrategy', 'researchExploration',
    'profile', 'socials'
  ];

  const results = {};
  let totalErrors = 0;
  let totalWarnings = 0;

  console.log('🔍 Validating data files...\n');

  for (const filename of dataFiles) {
    try {
      const { data } = await readDataFile(`${filename}.js`);
      const validation = validateDataFile(filename, data);

      results[filename] = validation;
      totalErrors += validation.errors.length;
      totalWarnings += validation.warnings.length;

      if (!validation.valid) {
        console.log(`❌ ${filename}: ${validation.errors.length} errors`);
        validation.errors.slice(0, 5).forEach(error => console.log(`   ${error}`));
        if (validation.errors.length > 5) {
          console.log(`   ... and ${validation.errors.length - 5} more errors`);
        }
      } else if (validation.warnings.length > 0) {
        console.log(`⚠️  ${filename}: valid with ${validation.warnings.length} warnings`);
      } else {
        console.log(`✅ ${filename}: valid (${validation.totalItems} items)`);
      }
    } catch (error) {
      results[filename] = {
        valid: false,
        errors: [`Failed to read file: ${error.message}`],
        warnings: []
      };
      totalErrors++;
      console.log(`❌ ${filename}: failed to read - ${error.message}`);
    }
  }

  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total files: ${dataFiles.length}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  return {
    results,
    summary: {
      totalFiles: dataFiles.length,
      totalErrors,
      totalWarnings,
      allValid: totalErrors === 0
    }
  };
}

/**
 * Get validation schema for a specific data file
 * @param {string} filename - Name of the data file
 * @returns {object|null} Schema or null if not found
 */
export function getSchema(filename) {
  return DATA_SCHEMAS[filename] || null;
}

/**
 * List all available data file schemas
 * @returns {Array} Array of schema names
 */
export function listSchemas() {
  return Object.keys(DATA_SCHEMAS);
}
