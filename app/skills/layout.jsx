import { generateOgImageMetadata } from '../../lib/og-images';

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
  return children;
}

