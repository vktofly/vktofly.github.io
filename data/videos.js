/**
 * Videos Data
 * 
 * Curated videos including TED talks, university lectures, and documentaries
 * that have provided valuable insights and perspectives.
 */

const videos = [
  {
    id: 1,
    title: "David Deutsch - The Beginning of Infinity",
    speaker: "David Deutsch",
    type: "Lecture",
    category: "epistemology",
    description: "A lecture on epistemology, better explanations, and the nature of knowledge creation.",
    whyItMatters: "This lecture provides a comprehensive overview of Deutsch's epistemology and how better explanations drive progress. It's essential viewing for anyone interested in understanding how knowledge evolves.",
    keyInsights: [
      "Knowledge grows through better explanations, not accumulation of facts",
      "Problems are inevitable but soluble through knowledge creation",
      "The universe is comprehensible through better explanations",
      "Progress is unlimited when we understand how knowledge evolves",
    ],
    link: "https://www.youtube.com/watch?v=example",
    tags: ["Epistemology", "Knowledge Creation", "David Deutsch", "Philosophy"],
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
    date: "2015-06-10",
  },
  {
    id: 2,
    title: "The Future of Intelligence - Ray Kurzweil",
    speaker: "Ray Kurzweil",
    type: "TED",
    category: "ai",
    description: "TED talk on artificial intelligence, the singularity, and how technology will transform human capability.",
    whyItMatters: "Kurzweil's vision of exponential technological growth and the singularity shaped my understanding of how quickly technology can transform civilization. His emphasis on exponential thinking influenced my approach to building AI systems.",
    keyInsights: [
      "Technology grows exponentially, not linearly",
      "The singularity represents a fundamental shift in human capability",
      "AI will augment human intelligence, not replace it",
      "Exponential thinking is essential for understanding the future",
    ],
    link: "https://www.ted.com/talks/ray_kurzweil",
    tags: ["AI", "Singularity", "Technology", "Future"],
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop",
    date: "2016-02-15",
  },
  {
    id: 3,
    title: "Systems Thinking - Donella Meadows",
    speaker: "Donella Meadows",
    type: "Lecture",
    category: "systems",
    description: "Lecture on systems thinking, leverage points, and understanding complex systems.",
    whyItMatters: "Meadows' framework for systems thinking provided the tools to understand complex systems and find leverage points for change. This is essential for anyone building organizations or technologies that need to evolve and adapt.",
    keyInsights: [
      "Systems have structure, behavior, and events",
      "Leverage points are places where small changes create large impacts",
      "Feedback loops drive system behavior",
      "Understanding system structure is key to effective intervention",
    ],
    link: "https://www.youtube.com/watch?v=example",
    tags: ["Systems Thinking", "Complexity", "Leverage Points", "Problem Solving"],
    thumbnail: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80&auto=format&fit=crop",
    date: "2019-08-20",
  },
];

export default videos;

