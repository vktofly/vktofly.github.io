import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import projects from '../../data/projects';

export const metadata = {
  title: 'Projects — Vikash',
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


