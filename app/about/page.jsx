import Section from '../../components/Section';
import Prose from '../../components/Prose';
import { loadMarkdownAsHtml } from '../../lib/markdown';

export const metadata = {
  title: 'About — Vikash',
  description: 'Polymath entrepreneur, physicist, and AI researcher.',
};

export default async function AboutPage() {
  const html = await loadMarkdownAsHtml('aboutme');
  return (
    <Section title="About" intro="Polymath, Futurist & Founder">
      <Prose html={html} />
    </Section>
  );
}


