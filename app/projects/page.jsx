import Section from '../../components/Section';
import Container from '../../components/Container';
import SectionDivider from '../../components/SectionDivider';
import Image from 'next/image';
import { generateOgImageMetadata } from '../../lib/og-images';
import projects from '../../data/projects';
import caseStudies from '../../data/caseStudies';
import ProjectsFilter from './ProjectsFilter';
import CaseStudyCard from '../../components/CaseStudyCard';

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
    <>
      <Section 
        title="Projects" 
        intro="Selected work and experiments across AI, quantum computing, robotics, space systems, and cognitive interfaces"
        className="relative overflow-hidden"
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>
        
        <Container className="relative z-10">
          <ProjectsFilter projects={projects} />
        </Container>
      </Section>

      {/* Case Studies Section */}
      {caseStudies.length > 0 && (
        <>
          <SectionDivider variant="geometric" />
          
          <Section
            title="Case Studies"
            intro="Detailed case studies for key projects and ventures"
            className="relative overflow-hidden"
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
              <Image
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt=""
                fill
                className="object-cover grayscale"
                unoptimized
              />
            </div>
            
            <Container className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                ))}
              </div>
            </Container>
          </Section>
        </>
      )}
    </>
  );
}


