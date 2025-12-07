/**
 * FAQ Data for Schema Markup
 * 
 * Comprehensive FAQ collections for different pages and topics.
 * Use with FAQSchema component for better SEO and search result appearance.
 */

// ============================================================================
// GENERAL FAQs (About Page)
// ============================================================================

export const generalFAQs = [
  {
    question: "What is your background?",
    answer: "I am a polymath entrepreneur, physicist, and AI researcher with expertise in quantum computing, systems thinking, and civilization-scale design. I have founded multiple technology companies and focus on building systems of infinite growth."
  },
  {
    question: "What areas do you specialize in?",
    answer: "My core areas of expertise include Artificial Intelligence, Quantum Computing, Systems Thinking, Entrepreneurship, Physics, Philosophy of Progress, Knowledge Creation, and Civilization Design."
  },
  {
    question: "How can I collaborate with you?",
    answer: "I'm open to collaboration on projects related to AI research, quantum computing applications, systems design, and entrepreneurial ventures. You can reach out through the contact form on this website or connect via LinkedIn, Twitter, or email."
  },
  {
    question: "What is the Infinite Growth Principle?",
    answer: "The Infinite Growth Principle is a philosophy that recognizes knowledge as the only infinite resource and the foundation for creating all other resources. It emphasizes truth, systems thinking, and the compounding nature of knowledge creation."
  },
  {
    question: "What companies have you founded?",
    answer: "I have founded 23+ technology companies across various domains including AI, quantum computing, robotics, and space systems. Each venture focuses on creating systems that enable infinite growth through knowledge creation."
  },
  {
    question: "Do you offer consulting or speaking engagements?",
    answer: "Yes, I'm available for consulting on AI strategy, systems design, and deep tech ventures. I also speak at conferences about AI, quantum computing, systems thinking, and the philosophy of progress. Contact me for availability and rates."
  }
];

// ============================================================================
// AI & MACHINE LEARNING FAQs
// ============================================================================

export const aiFAQs = [
  {
    question: "What is Artificial General Intelligence (AGI)?",
    answer: "AGI refers to AI systems that possess the ability to understand, learn, and apply knowledge across a wide range of tasks at a level comparable to human intelligence, rather than being specialized in narrow domains. It represents the next frontier in AI development."
  },
  {
    question: "How is AI different from machine learning?",
    answer: "AI is the broader concept of machines being able to carry out tasks intelligently, while machine learning is a specific approach to achieving AI where systems learn from data without being explicitly programmed. Machine learning is a subset of AI."
  },
  {
    question: "What are the main challenges in AI research today?",
    answer: "Key challenges include achieving true general intelligence, ensuring AI safety and alignment, handling edge cases and uncertainty, creating explainable AI systems, addressing bias and fairness, and developing energy-efficient architectures."
  },
  {
    question: "How can businesses implement AI effectively?",
    answer: "Start by identifying specific problems AI can solve, ensure you have quality data, build or hire the right team, start with pilot projects, measure results rigorously, and scale gradually. Focus on augmenting human capabilities rather than replacing them."
  },
  {
    question: "What is the future of AI?",
    answer: "The future of AI involves more general-purpose systems, better human-AI collaboration, improved reasoning and explanation capabilities, integration with quantum computing, and AI systems that can create new knowledge rather than just pattern matching."
  }
];

// ============================================================================
// QUANTUM COMPUTING FAQs
// ============================================================================

export const quantumFAQs = [
  {
    question: "What is quantum computing?",
    answer: "Quantum computing is a type of computation that harnesses quantum mechanical phenomena like superposition and entanglement to perform calculations that would be impractical for classical computers. It uses qubits instead of traditional bits."
  },
  {
    question: "How does quantum computing differ from classical computing?",
    answer: "Classical computers use bits (0 or 1), while quantum computers use qubits that can exist in superposition of both states simultaneously. This allows quantum computers to process vast amounts of possibilities in parallel, making them exponentially faster for certain problems."
  },
  {
    question: "What problems can quantum computers solve?",
    answer: "Quantum computers excel at optimization problems, cryptography, drug discovery, materials science, financial modeling, and simulating quantum systems. They're particularly useful for problems with exponentially large solution spaces."
  },
  {
    question: "When will quantum computers be practical?",
    answer: "We're in the NISQ (Noisy Intermediate-Scale Quantum) era now. Practical quantum advantage for specific applications is emerging, but general-purpose quantum computing is likely 5-15 years away. The timeline depends on solving error correction and scaling challenges."
  },
  {
    question: "How can I get started with quantum computing?",
    answer: "Start by learning quantum mechanics basics, study quantum algorithms (Shor's, Grover's), use quantum programming frameworks like Qiskit or Cirq, experiment with cloud quantum computers from IBM or Google, and join quantum computing communities."
  }
];

// ============================================================================
// SYSTEMS THINKING FAQs
// ============================================================================

export const systemsThinkingFAQs = [
  {
    question: "What is systems thinking?",
    answer: "Systems thinking is an approach to problem-solving that views problems as parts of an overall system, rather than isolated events. It focuses on understanding relationships, feedback loops, and emergent behaviors within complex systems."
  },
  {
    question: "Why is systems thinking important?",
    answer: "Systems thinking helps solve complex problems by revealing hidden connections, preventing unintended consequences, enabling long-term solutions, and understanding how changes in one part affect the whole. It's essential for tackling civilization-scale challenges."
  },
  {
    question: "How can I develop systems thinking skills?",
    answer: "Practice identifying feedback loops, study complex systems in nature and society, learn causal loop diagrams, read systems thinking literature (Meadows, Senge), apply it to real problems, and always ask 'what else is affected by this?'"
  },
  {
    question: "What are common systems thinking tools?",
    answer: "Key tools include causal loop diagrams, stock and flow diagrams, system archetypes, leverage points analysis, scenario planning, and agent-based modeling. Each helps visualize and understand different aspects of complex systems."
  }
];

// ============================================================================
// ENTREPRENEURSHIP FAQs
// ============================================================================

export const entrepreneurshipFAQs = [
  {
    question: "What makes a successful deep tech startup?",
    answer: "Success requires strong technical foundations, clear market need, patient capital, exceptional team, ability to navigate long development cycles, strategic partnerships, and focus on creating defensible intellectual property."
  },
  {
    question: "How do you validate a deep tech idea?",
    answer: "Validate through technical feasibility studies, early customer conversations, prototype development, academic collaboration, patent landscape analysis, and identifying specific use cases where your technology provides 10x improvement."
  },
  {
    question: "What's the biggest mistake first-time founders make?",
    answer: "Building solutions without validating the problem, hiring too fast, ignoring unit economics, not focusing enough on distribution, underestimating competition, and trying to do everything themselves instead of delegating."
  },
  {
    question: "How do you raise funding for deep tech ventures?",
    answer: "Focus on investors who understand deep tech, demonstrate technical milestones, show clear path to commercialization, build strategic partnerships, consider non-dilutive funding (grants, SBIR), and emphasize the team's technical credibility."
  }
];

// ============================================================================
// PROJECT-SPECIFIC FAQs
// ============================================================================

export const projectFAQs = {
  // Example project FAQ structure
  aiProject: [
    {
      question: "What problem does this AI project solve?",
      answer: "This project addresses the challenge of creating AI systems that can reason and explain their decisions, not just pattern match. It focuses on building transparent, interpretable AI that can collaborate with humans."
    },
    {
      question: "What technologies are used in this project?",
      answer: "The project uses advanced neural architectures, symbolic reasoning systems, knowledge graphs, and hybrid AI approaches. It's built on PyTorch with custom reasoning modules."
    },
    {
      question: "Is this project open source?",
      answer: "Selected components are open source, while core IP remains proprietary. We believe in contributing to the community while protecting commercial innovations."
    }
  ],
  
  quantumProject: [
    {
      question: "What quantum computing platform does this use?",
      answer: "This project is platform-agnostic, with implementations for IBM Qiskit, Google Cirq, and Amazon Braket. It focuses on algorithm design rather than hardware specifics."
    },
    {
      question: "What are the practical applications?",
      answer: "Primary applications include optimization for logistics, drug discovery simulations, cryptographic protocols, and materials science. Each shows quantum advantage over classical approaches."
    }
  ]
};

// ============================================================================
// BLOG POST FAQ TEMPLATES
// ============================================================================

export const blogFAQTemplates = {
  // AI Tutorial FAQs
  aiTutorial: [
    {
      question: "What prerequisites do I need for this tutorial?",
      answer: "You should have basic Python programming knowledge, understanding of linear algebra and calculus, and familiarity with machine learning concepts. No prior deep learning experience required."
    },
    {
      question: "How long will this tutorial take?",
      answer: "The complete tutorial takes approximately 2-3 hours to work through, including hands-on coding exercises. You can complete it in sections at your own pace."
    },
    {
      question: "What tools do I need installed?",
      answer: "You'll need Python 3.8+, PyTorch or TensorFlow, Jupyter Notebook, and standard data science libraries (NumPy, Pandas, Matplotlib). Installation instructions are provided in the setup section."
    }
  ],
  
  // Conceptual Article FAQs
  conceptual: [
    {
      question: "Who is this article for?",
      answer: "This article is for technical professionals, researchers, and entrepreneurs interested in understanding the intersection of AI, systems thinking, and civilization design. No advanced mathematics required."
    },
    {
      question: "What are the key takeaways?",
      answer: "The main insights focus on how knowledge creation compounds, why systems thinking is essential for progress, and how technology can be designed to enable infinite growth."
    }
  ]
};

// ============================================================================
// SKILLS PAGE FAQs (Domain-Specific)
// ============================================================================

export const skillsDomainFAQs = {
  artificialIntelligence: [
    {
      question: "What AI frameworks do you specialize in?",
      answer: "I work extensively with PyTorch, TensorFlow, JAX, and custom frameworks for specialized applications. My focus is on architectures that enable reasoning and explanation, not just prediction."
    },
    {
      question: "What types of AI projects have you built?",
      answer: "I've built systems for natural language understanding, computer vision, reinforcement learning, knowledge graphs, hybrid symbolic-neural systems, and AI safety research."
    }
  ],
  
  quantumComputing: [
    {
      question: "What quantum algorithms do you work with?",
      answer: "I specialize in variational quantum algorithms, quantum optimization (QAOA), quantum machine learning, and quantum simulation algorithms for materials science and chemistry."
    },
    {
      question: "Do you work with specific quantum hardware?",
      answer: "I design algorithms that are hardware-agnostic but have experience with superconducting qubits (IBM, Google), trapped ions (IonQ), and neutral atoms (QuEra)."
    }
  ],
  
  systemsThinking: [
    {
      question: "How do you apply systems thinking to technology?",
      answer: "I use systems thinking to design architectures that are resilient, scalable, and adaptive. This includes understanding feedback loops, emergence, and long-term consequences of technical decisions."
    }
  ]
};
