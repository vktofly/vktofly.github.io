import Section from '../../components/Section';
import { generateOgImageMetadata } from '../../lib/og-images';
import { getAllPostsMeta } from '../../lib/blog';
import BlogFilter from './BlogFilter';

export const metadata = {
  title: 'Blog — Vikash',
  description: 'Public notebook of ideas about knowledge, systems, and the future. Essays on AI, philosophy, civilization design, and the evolution of intelligence.',
  keywords: [
    'blog',
    'essays',
    'philosophy',
    'AI',
    'systems thinking',
    'knowledge creation',
    'civilization',
    'writing',
  ],
  openGraph: {
    title: 'Blog — Vikash',
    description: 'Public notebook of ideas about knowledge, systems, and the future.',
    url: 'https://vktofly.github.io/blog/',
    images: [generateOgImageMetadata('blog', null, 'Blog — Vikash')],
  },
  alternates: {
    canonical: '/blog/',
  },
};

export default async function BlogIndex() {
  const posts = await getAllPostsMeta();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort();

  return (
    <Section title="Blog" intro="Public notebook of ideas">
      <BlogFilter posts={posts} allTags={allTags} />
    </Section>
  );
}


