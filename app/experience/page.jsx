import Section from '../../components/Section';
import { generateOgImageMetadata } from '../../lib/og-images';
import experience from '../../data/experience';

export const metadata = {
  title: 'My Journey — From Curiosity to Creation',
  description: 'A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations.',
  keywords: [
    'journey',
    'experience',
    'timeline',
    'growth',
    'curiosity',
    'creation',
    'entrepreneurship',
    'philosophy',
    'transformation',
  ],
  openGraph: {
    title: 'My Journey — From Curiosity to Creation',
    description: 'A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations.',
    url: 'https://vktofly.github.io/experience/',
    images: [generateOgImageMetadata('experience', null, 'My Journey — From Curiosity to Creation')],
  },
  alternates: {
    canonical: '/experience/',
  },
};

export default function ExperiencePage() {
  const journeyPhases = [
    { phase: '1995–2005', theme: 'Discovery', shift: 'From ignorance to curiosity' },
    { phase: '2006–2011', theme: 'Exploration', shift: 'From learning to questioning' },
    { phase: '2012–2015', theme: 'Confrontation', shift: 'From failure to focus' },
    { phase: '2016–2020', theme: 'Creation', shift: 'From theory to application' },
    { phase: '2021–2023', theme: 'Reflection', shift: 'From intellect to awareness' },
    { phase: '2024–2025', theme: 'Integration', shift: 'From self to civilization' },
  ];

  return (
    <>
      <Section 
        title="My Journey" 
        intro="From Curiosity to Creation — A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations."
      >
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
                  {item.summary && <p className="mt-2 text-sm text-palette-secondary leading-relaxed">{item.summary}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section title="Pattern of the Journey" intro="The evolution of purpose through distinct phases">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-200 dark:border-zinc-800">
                <th className="text-left py-3 px-4 font-semibold text-palette-primary">Phase</th>
                <th className="text-left py-3 px-4 font-semibold text-palette-primary">Theme</th>
                <th className="text-left py-3 px-4 font-semibold text-palette-primary">Shift</th>
              </tr>
            </thead>
            <tbody>
              {journeyPhases.map((phase, idx) => (
                <tr key={idx} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                  <td className="py-3 px-4 font-medium text-palette-primary">{phase.phase}</td>
                  <td className="py-3 px-4 text-palette-secondary">{phase.theme}</td>
                  <td className="py-3 px-4 text-palette-secondary">{phase.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="py-12">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/30 p-8">
            <h3 className="text-xl font-semibold mb-4 text-palette-primary">Reflection</h3>
            <p className="text-base text-palette-secondary leading-relaxed">
              From a child staring at the night sky to a thinker building the architecture of intelligence — 
              my journey has always been about one thing: transforming curiosity into creation, 
              and creation into understanding.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}


