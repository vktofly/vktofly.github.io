import Section from '../../components/Section';
import Prose from '../../components/Prose';
import { loadMarkdownAsHtml } from '../../lib/markdown';

export const metadata = {
  title: 'Vision — Vikash',
};

export default async function VisionPage() {
  const html = await loadMarkdownAsHtml('myvision');
  return (
    <Section title="The Infinite Growth Principle" intro="A philosophy of creation and civilization">
      <Prose html={html} />
    </Section>
  );
}


