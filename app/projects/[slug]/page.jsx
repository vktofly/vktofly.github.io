import Section from '../../../components/Section';
import projects from '../../../data/projects';
import JsonLd from '../../../components/JsonLd';
import { generateOgImageMetadata } from '../../../lib/og-images';

export function generateStaticParams() {
  const slugs = (projects || [])
    .map((p) => p.slug)
    .filter(Boolean)
    .map((slug) => ({ slug }));
  return slugs;
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const project = (projects || []).find((p) => p.slug === params.slug);
  if (!project) return {};

  const url = `https://vktofly.github.io/projects/${project.slug}`;

  return {
    title: `${project.title} — Projects — Vikash`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} — Projects — Vikash`,
      description: project.description,
      url,
      type: 'article',
      images: [
        generateOgImageMetadata(
          'default',
          null,
          project.title
        ),
      ],
    },
  };
}

export default function ProjectDetailPage({ params }) {
  const project = (projects || []).find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <Section title="Project" intro="Details coming soon">
        <div className="text-zinc-600 dark:text-zinc-400">This project will be documented here.</div>
      </Section>
    );
  }

  const url = `https://vktofly.github.io/projects/${project.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": project.title,
          "description": project.description,
          "applicationCategory": "Technology",
          "url": project.href || url,
          "author": {
              "@type": "Person",
              "name": "Vikash"
          }
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://vktofly.github.io"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://vktofly.github.io/projects"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": url
          }]
        }}
      />
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
    </>
  );
}
