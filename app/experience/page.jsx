import Section from '../../components/Section';
import ExperienceItem from '../../components/ExperienceItem';
import experience from '../../data/experience';

export const metadata = {
  title: 'Experience — Vikash',
};

export default function ExperiencePage() {
  return (
    <Section title="Experience" intro="Selected roles and ventures">
      <div className="grid gap-6">
        {experience.map((item, idx) => (
          <ExperienceItem key={idx} item={item} />
        ))}
      </div>
    </Section>
  );
}


