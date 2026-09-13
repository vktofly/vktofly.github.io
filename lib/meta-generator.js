/**
 * Dynamic Meta Description Generator
 * 
 * Uses the pre-generated AI descriptions from `data/ai-meta.json` 
 * created by `scripts/generate-ai-meta.js`.
 */

import fs from 'fs';
import path from 'path';

let aiMetaCache = null;

function loadAiMetaCache() {
  if (aiMetaCache) return aiMetaCache;
  try {
    const metaFile = path.join(process.cwd(), 'data', 'ai-meta.json');
    if (fs.existsSync(metaFile)) {
      aiMetaCache = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
    } else {
      aiMetaCache = {};
    }
  } catch (e) {
    console.warn('Could not load ai-meta.json', e);
    aiMetaCache = {};
  }
  return aiMetaCache;
}

export function generateMetaDescriptionFromContent(content, title, tags = []) {
  const text = content.replace(/<[^>]*>/g, '').trim();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  if (sentences.length === 0) {
    return `Read ${title} - ${tags.slice(0, 3).join(', ')}`;
  }

  // Take first 2-3 sentences, aim for 150-160 characters
  let description = '';
  for (const sentence of sentences) {
    const candidate = description 
      ? `${description} ${sentence.trim()}`.trim()
      : sentence.trim();
    
    if (candidate.length > 160) break;
    description = candidate;
  }

  // Ensure it's within optimal length
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  // Ensure minimum length
  if (description.length < 120) {
    const tagSuffix = tags.length > 0 ? ` | ${tags.slice(0, 2).join(', ')}` : '';
    description = description + tagSuffix;
  }

  return description;
}

/**
 * Smart meta description generator
 * Uses pre-generated AI descriptions from ai-meta.json if available.
 * Falls back to template-based extraction.
 */
export async function generateMetaDescription(post, options = {}) {
  const {
    minLength = 120,
    maxLength = 160,
  } = options;

  const { title, description: existingDescription, summary, html, tags, slug } = post;

  // Try to find an AI-generated description in the static cache
  if (slug) {
    const cache = loadAiMetaCache();
    // Check both blog and project prefixes in case it's not clear from context
    const aiDescription = cache[`blog-${slug}`] || cache[`project-${slug}`] || cache[slug];
    
    if (aiDescription && aiDescription.length >= minLength) {
      return aiDescription.substring(0, maxLength);
    }
  }

  // If we have a good existing description, use it
  if (existingDescription && existingDescription.length >= minLength && existingDescription.length <= maxLength) {
    return existingDescription;
  }

  // Fallback to template-based generation
  const content = html || summary || existingDescription || '';
  return generateMetaDescriptionFromContent(content, title, tags || []);
}

/**
 * Generate title variations for A/B testing
 */
export function generateTitleVariations(title, tags = []) {
  const variations = [title]; // Original title

  // Add tag-based variations
  if (tags.length > 0) {
    const primaryTag = tags[0];
    variations.push(`${title} | ${primaryTag}`);
  }

  // Add "Guide" or "Complete" variations if appropriate
  if (title.toLowerCase().includes('how') || title.toLowerCase().includes('guide')) {
    variations.push(`Complete Guide: ${title}`);
  }

  return variations;
}

/**
 * Generate optimized keywords from content
 */
export function extractKeywords(content, title, tags = [], maxKeywords = 10) {
  const allText = `${title} ${content}`.toLowerCase();
  
  // Common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
  ]);

  // Extract words
  const words = allText.match(/\b[a-z]{3,}\b/g) || [];
  
  // Count word frequency
  const wordCount = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  // Sort by frequency
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);

  // Combine with tags
  const allKeywords = [...new Set([...tags.map(t => t.toLowerCase()), ...sortedWords])];
  
  return allKeywords.slice(0, maxKeywords);
}

