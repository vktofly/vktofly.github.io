import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import { generateOgImageMetadata } from '../../lib/og-images';
import projects from '../../data/projects';

export const metadata = {
  title: 'Projects — Vikash',
  description: 'Selected work and experiments across AI, quantum computing, robotics, space systems, and cognitive interfaces. Technology ventures that shape multi-billion-dollar industries.',
  keywords: [
    'projects',
    'ventures',
    'AI',
    'quantum computing',
    'robotics',
    'space systems',
    'technology',
    'startups',
  ],
  openGraph: {
    title: 'Projects — Vikash',
    description: 'Selected work and experiments across AI, quantum computing, robotics, and space systems.',
    url: 'https://vktofly.github.io/projects/',
    images: [generateOgImageMetadata('projects', null, 'Projects — Vikash')],
  },
  alternates: {
    canonical: '/projects/',
  },
};

export default function ProjectsPage() {
  return (
    <Section title="Projects" intro="Selected work and experiments">
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}


