/**
 * Publications Data
 * 
 * Papers, articles, essays, and other published works.
 */

const publications = [
  {
    id: 'pub-1',
    title: 'The Infinite Growth Principle: Knowledge as the Only Infinite Resource',
    type: 'essay', // 'essay' | 'paper' | 'article' | 'book' | 'blog'
    publication: 'Personal Blog',
    date: '2024-03-01',
    description: 'An exploration of how knowledge compounds and creates infinite growth opportunities.',
    url: 'https://vktofly.github.io/blog/infinite-growth-principle',
    // Optional fields:
    // authors: ['Vikash', 'Co-Author Name'],
    // doi: '10.xxxx/xxxxx',
    // citation: 'Vikash (2024). The Infinite Growth Principle...',
    tags: ['Philosophy', 'Systems Thinking', 'Knowledge Creation'],
  },
  {
    id: 'pub-2',
    title: 'MyPrinciple: A Framework for Recursive Knowledge Creation',
    type: 'paper',
    publication: 'Journal of Cognitive Systems',
    date: '2024-02-15',
    description: 'A formal framework for aligning human creativity with systems thinking.',
    url: 'https://example.com/paper',
    tags: ['Cognitive Science', 'Systems Design', 'Philosophy'],
  },
  {
    id: 'pub-3',
    title: 'Building Civilizational Infrastructure: The Role of AI in Knowledge Evolution',
    type: 'article',
    publication: 'AI & Society Journal',
    date: '2024-01-20',
    description: 'Examining how AI systems can accelerate knowledge creation and civilization-scale progress.',
    url: 'https://example.com/article',
    tags: ['AI', 'Philosophy', 'Civilization Design'],
  },
  // Add more publications here
];

export default publications;

