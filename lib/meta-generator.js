/**
 * Dynamic Meta Description Generator
 * 
 * Generates optimized meta descriptions using AI or template-based approaches.
 * Supports multiple strategies:
 * 1. AI-generated (using OpenAI API)
 * 2. Template-based (using content analysis)
 * 3. Enhanced existing descriptions
 */

/**
 * Generate meta description using template-based approach
 * This is a fallback when AI API is not available
 */
export function generateMetaDescriptionFromContent(content, title, tags = []) {
  // Extract first meaningful paragraph
  const text = content.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
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
 * Generate meta description using AI (OpenAI API)
 */
export async function generateMetaDescriptionWithAI(content, title, tags = [], existingDescription = '') {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    // Fallback to template-based generation
    return generateMetaDescriptionFromContent(content, title, tags);
  }

  try {
    // Extract plain text from HTML
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const textExcerpt = plainText.substring(0, 1000); // First 1000 chars

    const prompt = `Generate a compelling meta description (150-160 characters) for a blog post with the following details:

Title: ${title}
Tags: ${tags.join(', ')}
Existing description: ${existingDescription || 'None'}
Content excerpt: ${textExcerpt.substring(0, 500)}...

Requirements:
- Exactly 150-160 characters
- Compelling and click-worthy
- Include relevant keywords naturally
- No quotes or special formatting
- Focus on value proposition

Meta description:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO copywriter specializing in meta descriptions. Generate compelling, keyword-rich meta descriptions that are exactly 150-160 characters.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedDescription = data.choices[0]?.message?.content?.trim() || '';

    // Validate length
    if (generatedDescription.length >= 120 && generatedDescription.length <= 165) {
      return generatedDescription.substring(0, 160);
    }

    // If AI result is not optimal, fallback
    return generateMetaDescriptionFromContent(content, title, tags);
  } catch (error) {
    console.warn('AI meta description generation failed:', error.message);
    // Fallback to template-based generation
    return generateMetaDescriptionFromContent(content, title, tags);
  }
}

/**
 * Smart meta description generator
 * Tries AI first, falls back to template-based approach
 */
export async function generateMetaDescription(post, options = {}) {
  const {
    useAI = true,
    minLength = 120,
    maxLength = 160,
    enhanceExisting = true,
  } = options;

  const { title, description: existingDescription, summary, html, tags } = post;

  // If we have a good existing description, enhance it if needed
  if (existingDescription && existingDescription.length >= minLength && existingDescription.length <= maxLength) {
    if (!enhanceExisting) {
      return existingDescription;
    }
    // Could enhance here if needed
  }

  // Try AI generation if enabled
  if (useAI && process.env.OPENAI_API_KEY) {
    try {
      const aiDescription = await generateMetaDescriptionWithAI(
        html || summary || '',
        title,
        tags || [],
        existingDescription
      );
      
      if (aiDescription && aiDescription.length >= minLength) {
        return aiDescription.substring(0, maxLength);
      }
    } catch (error) {
      console.warn('AI generation failed, using fallback:', error.message);
    }
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

