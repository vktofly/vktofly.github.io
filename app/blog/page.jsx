import Section from '../../components/Section';
import Container from '../../components/Container';
import Image from 'next/image';
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
    <>
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Blog
            </h1>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Public notebook of ideas about knowledge, systems, and the future. Essays on AI, philosophy, civilization design, and the evolution of intelligence.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>
        
        <Container className="relative z-10">
          <BlogFilter posts={posts} allTags={allTags} />
        </Container>
      </Section>
    </>
  );
}


