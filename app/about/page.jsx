import Section from '../../components/Section';
import Prose from '../../components/Prose';
import ProfilePhoto from '../../components/ProfilePhoto';
import { loadMarkdownAsHtml } from '../../lib/markdown';

export const metadata = {
  title: 'About — Vikash',
  description: 'Polymath entrepreneur, physicist, and AI researcher.',
};

export default async function AboutPage() {
  const html = await loadMarkdownAsHtml('aboutme');
  return (
    <Section title="About" intro="Polymath, Futurist & Founder">
      <div className="mb-8 flex justify-center">
        <ProfilePhoto size={180} />
      </div>
      <Prose html={html} />
    </Section>
  );
}


