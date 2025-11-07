import Section from '../../../components/Section';
import Prose from '../../../components/Prose';
import { loadMarkdownFromPath } from '../../../lib/markdown';

export const metadata = {
  title: 'About this Project — Docs',
  robots: { index: false, follow: false },
};

export default async function AboutProjectDocsPage() {
  const html = await loadMarkdownFromPath('forai/about project.md');
  return (
    <Section title="About this Project" intro="Internal documentation">
      <Prose html={html} />
    </Section>
  );
}


