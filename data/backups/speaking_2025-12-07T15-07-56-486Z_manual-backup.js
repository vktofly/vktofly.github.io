/**
 * Speaking Engagements Data
 * 
 * Talks, podcasts, interviews, and other speaking engagements.
 */

const speaking = [
  {
    id: 'speaking-1',
    title: 'The Infinite Growth Machine: How Knowledge Compounds',
    type: 'talk', // 'talk' | 'podcast' | 'interview' | 'workshop' | 'panel'
    event: 'AI & Future of Work Conference 2024',
    date: '2024-03-15',
    location: 'San Francisco, CA',
    description: 'Exploring how knowledge creation systems can accelerate civilization-scale progress.',
    url: 'https://example.com/talk', // Optional: link to recording or slides
    // Optional fields:
    // slides: 'https://example.com/slides.pdf',
    // video: 'https://youtube.com/watch?v=...',
    // transcript: 'https://example.com/transcript',
  },
  {
    id: 'speaking-2',
    title: 'Building Self-Evolving Organizations',
    type: 'podcast',
    event: 'The Systems Thinking Podcast',
    date: '2024-02-20',
    location: 'Remote',
    description: 'A deep dive into organizational design principles and the MyPrinciple framework.',
    url: 'https://example.com/podcast',
  },
  {
    id: 'speaking-3',
    title: 'Quantum Epistemology and AI',
    type: 'panel',
    event: 'Quantum Computing Summit',
    date: '2024-01-10',
    location: 'Boston, MA',
    description: 'Panel discussion on the intersection of quantum computing, epistemology, and artificial intelligence.',
    url: 'https://example.com/panel',
  },
  // Add more speaking engagements here
];

export default speaking;

