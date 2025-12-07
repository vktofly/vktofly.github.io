import { generateOgImageMetadata } from '../../lib/og-images';
import JsonLd from '../../components/JsonLd';

export const metadata = {
  title: 'Skills & Expertise — Vikash',
  description: 'Meta skills, philosophical foundations, methodologies, leadership, research areas, and core domains across epistemology, systems thinking, AI, quantum computing, robotics, and civilization-scale design.',
  keywords: [
    'skills',
    'expertise',
    'meta skills',
    'epistemology',
    'systems thinking',
    'AI',
    'quantum computing',
    'robotics',
    'methodologies',
    'knowledge creation',
  ],
  openGraph: {
    title: 'Skills & Expertise — Vikash',
    description: 'Meta skills, philosophical foundations, methodologies, leadership, research, and core domains across epistemology, systems thinking, AI, and quantum computing.',
    url: 'https://vktofly.github.io/skills/',
    images: [generateOgImageMetadata('skills', null, 'Skills & Expertise — Vikash')],
  },
  alternates: {
    canonical: '/skills/',
  },
};

export default function SkillsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Skills & Expertise",
          "description": "Comprehensive overview of technical and cognitive skills",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Meta Skills"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Methodologies"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Philosophical Foundations"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Leadership & Strategy"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Research & Exploration"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Core Domains"
            }
          ]
        }}
      />
      {children}
    </>
  );
}

