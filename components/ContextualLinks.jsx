import Link from 'next/link';

// Define internal linking opportunities
const INTERNAL_LINKS = {
  // AI/ML related terms
  'artificial intelligence': { href: '/blog/artificial-intelligence-future/', text: 'artificial intelligence' },
  'machine learning': { href: '/blog/machine-learning-fundamentals/', text: 'machine learning' },
  'deep learning': { href: '/blog/deep-learning-neural-networks/', text: 'deep learning' },
  'neural networks': { href: '/blog/neural-networks-explained/', text: 'neural networks' },

  // Philosophy/Knowledge terms
  'epistemology': { href: '/blog/epistemology-knowledge/', text: 'epistemology' },
  'knowledge creation': { href: '/blog/knowledge-creation-process/', text: 'knowledge creation' },
  'beginning of infinity': { href: '/books/the-beginning-of-infinity/', text: 'The Beginning of Infinity' },
  'david deutsch': { href: '/books/the-beginning-of-infinity/', text: 'David Deutsch' },

  // Systems thinking terms
  'systems thinking': { href: '/blog/systems-thinking-approach/', text: 'systems thinking' },
  'infinite growth': { href: '/blog/infinite-growth-principle/', text: 'infinite growth principle' },
  'civilization design': { href: '/blog/civilization-design-systems/', text: 'civilization design' },

  // Entrepreneurship terms
  'entrepreneurship': { href: '/blog/entrepreneurship-knowledge/', text: 'entrepreneurship' },
  'startup': { href: '/blog/startup-knowledge-creation/', text: 'startup ventures' },

  // Quantum/Physics terms
  'quantum computing': { href: '/blog/quantum-computing-future/', text: 'quantum computing' },
  'quantum mechanics': { href: '/blog/quantum-mechanics-fundamentals/', text: 'quantum mechanics' },

  // Robotics/Space terms
  'robotics': { href: '/blog/robotics-automation/', text: 'robotics' },
  'space robotics': { href: '/blog/space-robotics-exploration/', text: 'space robotics' },

  // Books and projects
  'my principle': { href: '/projects/', text: 'MyPrinciple' },
  'rational optimist': { href: '/books/the-rational-optimist/', text: 'The Rational Optimist' },
  'civilization as system': { href: '/blog/civilization-as-system/', text: 'Civilization as System' },
};

export default function ContextualLinks({ content, currentSlug = '' }) {
  if (!content) return null;

  let processedContent = content;

  // Sort by length (longest first) to avoid partial matches
  const sortedLinks = Object.entries(INTERNAL_LINKS)
    .sort((a, b) => b[0].length - a[0].length);

  // Replace terms with internal links
  sortedLinks.forEach(([term, linkData]) => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');

    processedContent = processedContent.replace(regex, (match) => {
      // Don't link if we're already on that page
      if (currentSlug && linkData.href.includes(currentSlug)) {
        return match;
      }

      return `<a href="${linkData.href}" class="contextual-link text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline decoration-1 underline-offset-2 transition-colors" data-internal-link="true">${linkData.text}</a>`;
    });
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: processedContent }}
      className="contextual-content"
    />
  );
}

// Hook for programmatic internal linking
export function useInternalLinking() {
  const findInternalLinks = (text) => {
    const links = [];
    const sortedLinks = Object.entries(INTERNAL_LINKS)
      .sort((a, b) => b[0].length - a[0].length);

    sortedLinks.forEach(([term, linkData]) => {
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      let match;

      while ((match = regex.exec(text)) !== null) {
        links.push({
          term,
          position: match.index,
          length: match[0].length,
          link: linkData
        });
      }
    });

    return links.sort((a, b) => a.position - b.position);
  };

  return { findInternalLinks, INTERNAL_LINKS };
}
