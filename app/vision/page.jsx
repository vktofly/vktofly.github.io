import Section from '../../components/Section';
import Prose from '../../components/Prose';
import ReadingProgress from '../../components/ReadingProgress';
import Toc from '../../components/Toc';
import JsonLd from '../../components/JsonLd';
import { generateOgImageMetadata } from '../../lib/og-images';
import { loadMarkdownAsHtml } from '../../lib/markdown';

export const metadata = {
  title: 'Vision — Vikash',
  description: 'The Infinite Growth Principle: A philosophy of creation, civilization, and the future of intelligence. Understanding how knowledge evolves and how humanity can evolve with it.',
  keywords: [
    'vision',
    'philosophy',
    'infinite growth',
    'civilization',
    'knowledge creation',
    'epistemology',
    'systems thinking',
    'MyPrinciple',
  ],
  openGraph: {
    title: 'Vision — The Infinite Growth Principle',
    description: 'A philosophy of creation, civilization, and the future of intelligence.',
    url: 'https://vktofly.github.io/vision/',
    type: 'article',
    images: [generateOgImageMetadata('vision', null, 'Vision — The Infinite Growth Principle')],
  },
  alternates: {
    canonical: '/vision/',
  },
};

export default async function VisionPage() {
  const html = await loadMarkdownAsHtml('myvision');
  const url = 'https://vktofly.github.io/vision/';
  
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Infinite Growth Principle",
          description: "A philosophy of creation, civilization, and the future of intelligence",
          author: {
            "@type": "Person",
            name: "Vikash",
            url: "https://vktofly.github.io/about/",
          },
          publisher: {
            "@type": "Person",
            name: "Vikash",
            url: "https://vktofly.github.io",
          },
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          image: "https://vktofly.github.io/og.png",
          keywords: "infinite growth, philosophy, civilization, knowledge creation, epistemology, systems thinking",
        }}
      />
      <ReadingProgress targetId="article-content" />
      <Section title="The Infinite Growth Principle" intro="A philosophy of creation and civilization">
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block md:sticky md:top-24 self-start">
            <Toc rootId="article-content" />
          </div>
          <div id="article-content">
            <Prose html={html} />
          </div>
        </div>
      </Section>
    </>
  );
}


