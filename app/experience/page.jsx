import Section from '../../components/Section';
import { generateOgImageMetadata } from '../../lib/og-images';
import experience from '../../data/experience';

export const metadata = {
  title: 'Experience — Vikash',
  description: 'Selected roles and ventures across two decades of creation. Founded and led 23+ technology companies that shape multi-billion-dollar industries.',
  keywords: [
    'experience',
    'career',
    'ventures',
    'companies',
    'entrepreneurship',
    'founder',
    'leadership',
  ],
  openGraph: {
    title: 'Experience — Vikash',
    description: 'Selected roles and ventures across two decades of creation.',
    url: 'https://vktofly.github.io/experience/',
    images: [generateOgImageMetadata('experience', null, 'Experience — Vikash')],
  },
  alternates: {
    canonical: '/experience/',
  },
};

export default function ExperiencePage() {
  return (
    <Section title="Experience" intro="Selected roles and ventures">
      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />
        <ol className="space-y-8 ml-8">
          {experience.map((item, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-8 mt-1.5 h-3.5 w-3.5 rounded-full bg-brand-500 border border-zinc-300 dark:border-zinc-700" />
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
                  <span className="text-xs text-zinc-500">{item.period}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.company}</p>
                {item.summary && <p className="mt-2 text-sm">{item.summary}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}


