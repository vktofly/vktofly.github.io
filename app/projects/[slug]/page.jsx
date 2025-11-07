import Section from '../../../components/Section';
import projects from '../../../data/projects';

export function generateStaticParams() {
  const slugs = (projects || [])
    .map((p) => p.slug)
    .filter(Boolean)
    .map((slug) => ({ slug }));
  return slugs;
}

export const dynamicParams = false;

export default function ProjectDetailPage({ params }) {
  const project = (projects || []).find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <Section title="Project" intro="Details coming soon">
        <div className="text-zinc-600 dark:text-zinc-400">This project will be documented here.</div>
      </Section>
    );
  }

  return (
    <Section title={project.title} intro={project.description}>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        <p>Tags: {project.tags?.join(', ') || '—'}</p>
        {project.href ? (
          <p className="mt-2">
            <a href={project.href} className="text-brand-600 hover:underline" target="_blank" rel="noreferrer">Visit</a>
          </p>
        ) : null}
      </div>
    </Section>
  );
}


