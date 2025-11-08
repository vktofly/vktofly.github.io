/**
 * Podcasts Data
 * 
 * Curated podcasts that have provided valuable insights, frameworks, and perspectives.
 * Each podcast represents a node in the knowledge compounding system.
 */

const podcasts = [
  {
    id: 1,
    title: "The Tim Ferriss Show - David Deutsch",
    host: "Tim Ferriss",
    category: "epistemology",
    description: "A deep dive into David Deutsch's epistemology, universal constructors, and the nature of knowledge creation.",
    whyItMatters: "This conversation provides an accessible introduction to Deutsch's ideas about better explanations and universal constructors. It helped me understand how to communicate these complex concepts to others.",
    keyTakeaways: [
      "Better explanations drive all progress",
      "Universal constructors can create anything physically possible",
      "Knowledge grows through explanation, not accumulation",
      "Problems are inevitable but soluble",
    ],
    link: "https://tim.blog/podcast/",
    tags: ["Epistemology", "Knowledge Creation", "David Deutsch", "Philosophy"],
    date: "2020-05-15",
  },
  {
    id: 2,
    title: "Lex Fridman Podcast - Ray Kurzweil",
    host: "Lex Fridman",
    category: "ai",
    description: "Discussion on AI, the singularity, exponential growth, and the future of human-AI collaboration.",
    whyItMatters: "Kurzweil's vision of exponential technological growth and human-AI collaboration aligns with my work on AI systems and autonomous knowledge systems. This conversation provided practical insights into building for exponential futures.",
    keyTakeaways: [
      "Technology grows exponentially, not linearly",
      "AI will augment human intelligence, not replace it",
      "Exponential thinking is essential for understanding the future",
      "Human-AI collaboration is the path forward",
    ],
    link: "https://lexfridman.com/podcast/",
    tags: ["AI", "Singularity", "Exponential Growth", "Future"],
    date: "2021-03-20",
  },
  {
    id: 3,
    title: "Naval Ravikant - The Knowledge Project",
    host: "Shane Parrish",
    category: "entrepreneurship",
    description: "Naval discusses leverage, wealth creation, happiness, and building systems that work while you sleep.",
    whyItMatters: "Naval's synthesis of leverage, wealth creation, and happiness provided practical frameworks for building scalable systems. His emphasis on code, media, and capital as forms of leverage directly influenced how I structure my companies.",
    keyTakeaways: [
      "Leverage comes from code, media, and capital",
      "Wealth is about ownership, not income",
      "Happiness is a skill that can be learned",
      "Build systems that work while you sleep",
    ],
    link: "https://fs.blog/knowledge-project/",
    tags: ["Entrepreneurship", "Leverage", "Wealth Creation", "Happiness"],
    date: "2020-11-10",
  },
];

export default podcasts;

