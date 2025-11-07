import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
        Vikash — Polymath, Futurist & Founder
      </h1>
      <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
        Building Systems of Infinite Growth
      </p>
      <div className="flex items-center gap-3">
        <a href="/projects/" className="inline-flex items-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-4 py-2">View Projects</a>
        <a href="/contact/" className="inline-flex items-center rounded-md border border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-zinc-900 px-4 py-2">Contact</a>
      </div>

      <Section title="Featured Projects" className="pt-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}


