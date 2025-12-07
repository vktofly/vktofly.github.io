/**
 * Books Data
 * 
 * A curated collection of books that have shaped thinking, philosophy, and work.
 * Each book represents a node in the knowledge compounding system.
 * 
 * Images are automatically fetched from Open Library or Google Books API.
 */

const books = [
  {
    "slug": "the-beginning-of-infinity",
    "title": "The Beginning of Infinity",
    "author": "David Deutsch",
    "category": "epistemology",
    "tags": [
      "Epistemology",
      "Knowledge Creation",
      "Physics",
      "Philosophy of Science"
    ],
    "year": 2011,
    "yearRead": 2015,
    "readingStatus": "mastered",
    "impact": "high",
    "paradigmShift": true,
    "knowledgeCompounding": true,
    "readingPhase": "exploration",
    "recommendedBy": "David Deutsch",
    "keyQuote": "Problems are inevitable, but problems are soluble.",
    "whyItMatters": "This book fundamentally changed how I understand knowledge creation and the nature of progress. Deutsch's epistemology of \"better explanations\" became the foundation for my Infinite Growth Principle. It showed me that knowledge compounds infinitely when we focus on creating better explanations rather than just accumulating facts.",
    "keyInsights": [
      "Knowledge grows through better explanations, not accumulation of facts",
      "Problems are inevitable but soluble through knowledge creation",
      "The universe is comprehensible, and we are universal constructors",
      "Progress is unlimited when we understand how knowledge evolves"
    ],
    "beforeAfter": {
      "before": "I thought knowledge was about accumulating information and facts.",
      "after": "I understand that knowledge is about creating better explanations that solve problems and enable further creation."
    },
    "connectionToWork": "This book directly influenced my approach to building 23+ companies. Each company is an experiment in creating better explanations—testing whether ideas deserve to exist. The concept of universal constructors shaped my view of entrepreneurship as epistemology in motion.",
    "influencedProjects": [
      "All 23+ companies",
      "Infinite Growth Principle framework"
    ],
    "influencedSkills": [
      "Epistemology",
      "Systems Thinking",
      "Knowledge Compounding"
    ],
    "relatedBooks": [
      "the-fabric-of-reality"
    ],
    "relatedPosts": [
      "what-is-a-hero"
    ],
    "link": "https://www.amazon.com/Beginning-Infinity-Explanations-Transform-World/dp/0143121359"
  },
  {
    "slug": "the-fabric-of-reality",
    "title": "The Fabric of Reality",
    "author": "David Deutsch",
    "category": "epistemology",
    "tags": [
      "Epistemology",
      "Physics",
      "Quantum Theory",
      "Multiverse"
    ],
    "year": 1997,
    "yearRead": 2014,
    "readingStatus": "mastered",
    "impact": "high",
    "paradigmShift": true,
    "knowledgeCompounding": true,
    "readingPhase": "discovery",
    "recommendedBy": "David Deutsch",
    "keyQuote": "The fabric of reality is a pattern in the multiverse.",
    "whyItMatters": "Deutsch's integration of quantum theory, computation, evolution, and epistemology into a unified framework showed me how to think across disciplines. This book laid the groundwork for understanding how knowledge systems work at the most fundamental level.",
    "keyInsights": [
      "Reality is computational at its core",
      "Quantum theory, computation, evolution, and epistemology are unified",
      "Understanding requires seeing patterns across scales"
    ],
    "connectionToWork": "Influenced my cross-disciplinary approach to building companies. The idea that computation is fundamental to reality shaped my work in AI and quantum computing.",
    "influencedProjects": [
      "Quantum computing ventures",
      "AI architecture research"
    ],
    "influencedSkills": [
      "Quantum Epistemology",
      "Cross-Disciplinary Integration"
    ],
    "relatedBooks": [
      "the-beginning-of-infinity"
    ],
    "link": "https://www.amazon.com/Fabric-Reality-Science-Parallel-Universes/dp/014027541X"
  },
  {
    "slug": "freedom-from-the-known",
    "title": "Freedom from the Known",
    "author": "Jiddu Krishnamurti",
    "category": "philosophy",
    "tags": [
      "Philosophy",
      "Consciousness",
      "Freedom",
      "Awareness"
    ],
    "year": 1969,
    "yearRead": 2018,
    "readingStatus": "re-reading",
    "impact": "high",
    "paradigmShift": true,
    "knowledgeCompounding": true,
    "readingPhase": "integration",
    "recommendedBy": "Jiddu Krishnamurti",
    "keyQuote": "Freedom is not a reaction; freedom is not a choice. It is man's pretence that because he has choice he is free.",
    "whyItMatters": "This book challenged my deepest assumptions about freedom, knowledge, and the nature of thought itself. Krishnamurti's emphasis on \"freedom from the known\" became central to my philosophy of innovation. You cannot create the future while being unconsciously shaped by the past.",
    "keyInsights": [
      "True freedom comes from awareness, not choice",
      "The known limits creativity and innovation",
      "Observation without identification enables real understanding",
      "The mind must be free to see clearly"
    ],
    "beforeAfter": {
      "before": "I thought freedom was about having more choices and options.",
      "after": "I understand that true freedom is the clarity that comes from seeing without the distortion of accumulated knowledge and conditioning."
    },
    "connectionToWork": "This philosophy directly influences how I approach problem-solving and innovation. Every breakthrough comes from seeing beyond what is known. This book shaped my \"Freedom from the Known\" framework for designing AI systems and building companies.",
    "influencedProjects": [
      "Cognitive Architecture research",
      "MyPrinciple Framework"
    ],
    "influencedSkills": [
      "Consciousness",
      "Innovation Systems",
      "Freedom from the Known"
    ],
    "relatedBooks": [
      "the-first-and-last-freedom"
    ],
    "relatedPosts": [
      "what-is-a-hero"
    ],
    "link": "https://www.amazon.com/Freedom-Known-J-Krishnamurti/dp/0060648084"
  },
  {
    "slug": "thus-spoke-zarathustra",
    "title": "Thus Spoke Zarathustra",
    "author": "Friedrich Nietzsche",
    "category": "philosophy",
    "tags": [
      "Philosophy",
      "Self-Overcoming",
      "Creation",
      "Will to Power"
    ],
    "year": 1883,
    "yearRead": 2017,
    "readingStatus": "read",
    "impact": "high",
    "paradigmShift": true,
    "knowledgeCompounding": true,
    "readingPhase": "exploration",
    "recommendedBy": "Friedrich Nietzsche",
    "keyQuote": "Man is a rope stretched between the animal and the Übermensch—a rope over an abyss.",
    "whyItMatters": "Nietzsche's concept of self-overcoming and the will to create resonated deeply with my entrepreneurial journey. The idea that we must overcome ourselves to create something new became central to my understanding of growth and transformation.",
    "keyInsights": [
      "Self-overcoming is the path to creation",
      "The will to create is more powerful than the will to power",
      "We must overcome ourselves to become creators",
      "The Übermensch creates new values, not just follows existing ones"
    ],
    "connectionToWork": "Influenced my approach to personal growth and company building. The concept of self-overcoming is essential for innovation—you must transcend current limitations to create something truly new.",
    "influencedProjects": [
      "Personal development frameworks",
      "Innovation systems"
    ],
    "influencedSkills": [
      "Self-Overcoming",
      "Creative Will",
      "Value Creation"
    ],
    "relatedBooks": [],
    "relatedPosts": [
      "what-is-a-hero"
    ],
    "link": "https://www.amazon.com/Thus-Spoke-Zarathustra-Friedrich-Nietzsche/dp/0140441182"
  },
  {
    "slug": "the-almanack-of-naval-ravikant",
    "title": "The Almanack of Naval Ravikant",
    "author": "Eric Jorgenson (compilation of Naval's wisdom)",
    "category": "entrepreneurship",
    "tags": [
      "Entrepreneurship",
      "Leverage",
      "Happiness",
      "Wealth Creation"
    ],
    "year": 2020,
    "yearRead": 2021,
    "readingStatus": "read",
    "impact": "high",
    "paradigmShift": false,
    "knowledgeCompounding": true,
    "readingPhase": "integration",
    "recommendedBy": "Naval Ravikant",
    "keyQuote": "Wealth is assets that earn while you sleep. Wealth is the factory, the robots, the code, the money that works for you.",
    "whyItMatters": "Naval's synthesis of leverage, wealth creation, and happiness provided practical frameworks for building scalable systems. His emphasis on code, media, and capital as forms of leverage directly influenced how I structure my companies.",
    "keyInsights": [
      "Leverage comes from code, media, and capital",
      "Wealth is about ownership, not income",
      "Happiness is a skill that can be learned",
      "Specific knowledge + accountability + leverage = wealth"
    ],
    "connectionToWork": "Directly influenced my approach to building scalable technology companies. The focus on leverage and ownership shaped how I structure ventures for long-term value creation.",
    "influencedProjects": [
      "Multiple technology ventures",
      "Scalable system design"
    ],
    "influencedSkills": [
      "Leverage",
      "Wealth Creation",
      "System Design"
    ],
    "relatedBooks": [],
    "link": "https://www.navalmanack.com/"
  },
  {
    "slug": "the-singularity-is-near",
    "title": "The Singularity Is Near",
    "author": "Ray Kurzweil",
    "category": "ai",
    "tags": [
      "AI",
      "Singularity",
      "Technology",
      "Future"
    ],
    "year": 2005,
    "yearRead": 2016,
    "readingStatus": "read",
    "impact": "medium",
    "paradigmShift": false,
    "knowledgeCompounding": true,
    "readingPhase": "exploration",
    "recommendedBy": "Ray Kurzweil",
    "keyQuote": "We won't experience 100 years of progress in the 21st century—it will be more like 20,000 years of progress.",
    "whyItMatters": "Kurzweil's vision of exponential technological growth and the singularity shaped my understanding of how quickly technology can transform civilization. His emphasis on exponential thinking influenced my approach to building AI systems.",
    "keyInsights": [
      "Technology grows exponentially, not linearly",
      "The singularity represents a fundamental shift in human capability",
      "AI will augment human intelligence, not replace it",
      "Exponential thinking is essential for understanding the future"
    ],
    "connectionToWork": "Influenced my work in AI and autonomous systems. The concept of exponential growth shaped how I think about building systems that scale and evolve rapidly.",
    "influencedProjects": [
      "AI architecture research",
      "Autonomous systems"
    ],
    "influencedSkills": [
      "Exponential Thinking",
      "AI Systems",
      "Future Vision"
    ],
    "relatedBooks": [],
    "link": "https://www.amazon.com/Singularity-Near-Humans-Transcend-Biology/dp/0143037889"
  },
  {
    "slug": "thinking-in-systems",
    "title": "Thinking in Systems: A Primer",
    "author": "Donella H. Meadows",
    "category": "systems",
    "tags": [
      "Systems Thinking",
      "Complexity",
      "Problem Solving",
      "Leverage Points"
    ],
    "year": 2008,
    "yearRead": 2019,
    "readingStatus": "read",
    "impact": "high",
    "paradigmShift": false,
    "knowledgeCompounding": true,
    "readingPhase": "integration",
    "recommendedBy": "Systems Thinking",
    "keyQuote": "You can't navigate well in an interconnected, feedback-dominated world unless you take your eyes off short-term events and look for long-term behavior and structure.",
    "whyItMatters": "Meadows' framework for systems thinking provided the tools to understand complex systems and find leverage points for change. This book is essential for anyone building organizations or technologies that need to evolve and adapt.",
    "keyInsights": [
      "Systems have structure, behavior, and events",
      "Leverage points are places where small changes create large impacts",
      "Feedback loops drive system behavior",
      "Understanding system structure is key to effective intervention"
    ],
    "connectionToWork": "Fundamental to how I design organizations and technologies. Systems thinking is essential for building companies that can evolve and adapt. This book influenced my approach to organizational design and venture architecture.",
    "influencedProjects": [
      "Organizational design",
      "Venture architecture",
      "System design"
    ],
    "influencedSkills": [
      "Systems Thinking",
      "Leverage Points",
      "Complexity"
    ],
    "relatedBooks": [],
    "link": "https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557"
  },
  {
    "slug": "the-rational-optimist",
    "title": "The Rational Optimist",
    "author": "Matt Ridley",
    "category": "systems",
    "tags": [
      "Systems Thinking",
      "Optimism",
      "Progress",
      "Economics",
      "Evolution"
    ],
    "year": 2010,
    "yearRead": 2016,
    "readingStatus": "mastered",
    "impact": "high",
    "paradigmShift": false,
    "knowledgeCompounding": true,
    "readingPhase": "integration",
    "recommendedBy": "Matt Ridley",
    "keyQuote": "The story of human progress is the story of exchange and specialization.",
    "whyItMatters": "Ridley's argument that progress comes from exchange and specialization, not from individual genius, aligns with my understanding of how knowledge compounds. The book shows how trade and cooperation create prosperity—a systems-level view of human progress that complements my work on knowledge systems.",
    "keyInsights": [
      "Progress comes from exchange and specialization, not individual genius",
      "Trade creates prosperity by enabling specialization",
      "Optimism is rational when we understand how progress works",
      "Human progress is a story of cooperation, not competition"
    ],
    "connectionToWork": "Influenced my understanding of how systems create value through exchange and specialization. This perspective shaped how I think about building companies that enable knowledge exchange and create compounding value.",
    "influencedProjects": [
      "Venture architecture",
      "Knowledge exchange systems"
    ],
    "influencedSkills": [
      "Systems Thinking",
      "Economic Systems",
      "Progress Theory"
    ],
    "relatedBooks": [
      "the-beginning-of-infinity"
    ],
    "link": "https://www.amazon.com/Rational-Optimist-How-Prosperity-Evolves/dp/0061452068"
  }
];

export default books;
