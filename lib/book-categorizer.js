/**
 * Book Categorization using AI
 * 
 * Automatically categorizes books based on their content using OpenAI API.
 * Falls back to keyword-based categorization if API is unavailable.
 */

const CATEGORIES = [
  {
    id: "epistemology",
    label: "Epistemology",
    description: "The theory of how knowledge grows and evolves",
    keywords: ["knowledge", "epistemology", "explanation", "understanding", "learning", "education", "theory", "comprehension"]
  },
  {
    id: "philosophy",
    label: "Philosophy",
    description: "Deep questions about consciousness, freedom, and meaning",
    keywords: ["philosophy", "consciousness", "meaning", "existence", "ethics", "morality", "wisdom", "truth", "reality", "metaphysics"]
  },
  {
    id: "ai",
    label: "AI & Technology",
    description: "Artificial intelligence, singularity, and the future of technology",
    keywords: ["artificial intelligence", "ai", "machine learning", "technology", "singularity", "robotics", "automation", "computing", "digital"]
  },
  {
    id: "systems",
    label: "Systems Thinking",
    description: "Understanding complexity, leverage points, and system design",
    keywords: ["systems", "complexity", "leverage", "design", "architecture", "structure", "organization", "network", "interconnected"]
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    description: "Leverage, wealth creation, and building scalable systems",
    keywords: ["entrepreneurship", "business", "startup", "wealth", "leverage", "scalable", "venture", "founder", "company", "enterprise"]
  },
  {
    id: "physics",
    label: "Physics",
    description: "Quantum theory, computation, and the fabric of reality",
    keywords: ["physics", "quantum", "universe", "reality", "matter", "energy", "cosmos", "space", "time", "relativity"]
  }
];

/**
 * Categorize a book using AI (OpenAI API)
 */
export async function categorizeBookWithAI(book) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    // Fallback to keyword-based categorization
    return categorizeBookByKeywords(book);
  }

  try {
    // Build content string from book data
    const content = [
      `Title: ${book.title}`,
      `Author: ${book.author || 'Unknown'}`,
      book.whyItMatters ? `Description: ${book.whyItMatters}` : '',
      book.keyInsights ? `Key Insights: ${book.keyInsights.join('; ')}` : '',
      book.tags ? `Tags: ${book.tags.join(', ')}` : '',
    ].filter(Boolean).join('\n\n');

    const categoriesList = CATEGORIES.map(cat => 
      `- ${cat.id}: ${cat.label} - ${cat.description}`
    ).join('\n');

    const prompt = `Analyze the following book and categorize it into ONE of these categories:

${categoriesList}

Book Information:
${content}

Requirements:
- Return ONLY the category ID (one of: ${CATEGORIES.map(c => c.id).join(', ')})
- Choose the category that best matches the book's primary focus
- If the book spans multiple categories, choose the most prominent one
- Be precise and consistent

Category ID:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using cheaper model for categorization
        messages: [
          {
            role: 'system',
            content: 'You are an expert librarian who categorizes books accurately. Always respond with only the category ID, nothing else.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 10,
        temperature: 0.3, // Lower temperature for more consistent categorization
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const categoryId = data.choices[0]?.message?.content?.trim().toLowerCase() || '';
    
    // Validate category ID
    const validCategory = CATEGORIES.find(cat => cat.id === categoryId);
    if (validCategory) {
      return categoryId;
    } else {
      console.warn(`Invalid category returned: ${categoryId}, falling back to keyword matching`);
      return categorizeBookByKeywords(book);
    }
  } catch (error) {
    console.error(`Error categorizing book "${book.title}" with AI:`, error.message);
    // Fallback to keyword-based categorization
    return categorizeBookByKeywords(book);
  }
}

/**
 * Categorize a book using keyword matching (fallback method)
 */
export function categorizeBookByKeywords(book) {
  const content = [
    book.title || '',
    book.author || '',
    book.whyItMatters || '',
    book.keyInsights?.join(' ') || '',
    book.tags?.join(' ') || '',
    book.description || '',
  ].join(' ').toLowerCase();

  // Score each category based on keyword matches
  const scores = CATEGORIES.map(category => {
    const matches = category.keywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    ).length;
    return { categoryId: category.id, score: matches };
  });

  // Find category with highest score
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  , { categoryId: 'epistemology', score: 0 }); // Default to epistemology

  return bestMatch.categoryId;
}

/**
 * Batch categorize multiple books
 */
export async function categorizeBooks(books, options = {}) {
  const {
    useAI = true,
    delay = 100, // Delay between API calls to avoid rate limits
    onProgress = null,
  } = options;

  const results = [];
  
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    
    try {
      const category = useAI 
        ? await categorizeBookWithAI(book)
        : categorizeBookByKeywords(book);
      
      results.push({
        slug: book.slug,
        title: book.title,
        currentCategory: book.category,
        suggestedCategory: category,
        changed: book.category !== category,
      });

      if (onProgress) {
        onProgress(i + 1, books.length, results[results.length - 1]);
      }

      // Add delay to avoid rate limits
      if (useAI && i < books.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`Error processing book "${book.title}":`, error);
      results.push({
        slug: book.slug,
        title: book.title,
        currentCategory: book.category,
        suggestedCategory: book.category, // Keep current on error
        changed: false,
        error: error.message,
      });
    }
  }

  return results;
}

