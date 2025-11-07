import Section from '../../components/Section';
import skills from '../../data/skills';

export const metadata = {
  title: 'Skills — Vikash',
};

export default function SkillsPage() {
  return (
    <Section title="Skills" intro="Core domains and tools">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {skills.map((group) => (
          <div key={group.name} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="font-semibold mb-2">{group.name}</h3>
            <ul className="space-y-1 list-disc list-inside text-zinc-600 dark:text-zinc-400">
              {group.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}


