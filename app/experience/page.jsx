import Section from "../../components/Section";
import Container from "../../components/Container";
import Image from "next/image";
import Link from "next/link";
import InteractiveTimelineItem from "../../components/InteractiveTimelineItem";
import JsonLd from "../../components/JsonLd";
import { generateOgImageMetadata } from "../../lib/og-images";
import experience from "../../data/experience";
import skills from "../../data/skills";
import metaSkills from "../../data/metaSkills";
import methodologies from "../../data/methodologies";

export const metadata = {
  title: "My Journey — From Curiosity to Creation",
  description:
    "A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations.",
  keywords: [
    "journey",
    "experience",
    "timeline",
    "growth",
    "curiosity",
    "creation",
    "entrepreneurship",
    "philosophy",
    "transformation",
    "CV",
    "resume",
    "professional history",
    "founder journey",
    "executive career",
  ],
  openGraph: {
    title: "My Journey — From Curiosity to Creation",
    description:
      "A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations.",
    url: "https://vktofly.github.io/experience/",
    images: [
      generateOgImageMetadata(
        "experience",
        null,
        "My Journey — From Curiosity to Creation"
      ),
    ],
  },
  alternates: {
    canonical: "/experience/",
  },
};

export default function ExperiencePage() {
  const journeyPhases = [
    {
      phase: "1995–2005",
      theme: "Discovery",
      shift: "From ignorance to curiosity",
    },
    {
      phase: "2006–2011",
      theme: "Exploration",
      shift: "From learning to questioning",
    },
    {
      phase: "2012–2015",
      theme: "Confrontation",
      shift: "From failure to focus",
    },
    {
      phase: "2016–2020",
      theme: "Creation",
      shift: "From theory to application",
    },
    {
      phase: "2021–2023",
      theme: "Reflection",
      shift: "From intellect to awareness",
    },
    {
      phase: "2024–2025",
      theme: "Integration",
      shift: "From self to civilization",
    },
  ];

  // Helper function to get all skills for linking
  const allSkills = [
    ...skills.flatMap((s) => s.items || []),
    ...metaSkills.flatMap((s) => s.items || []),
    ...methodologies.flatMap((m) => m.items || []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Professional Experience",
          "itemListElement": experience.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Organization",
              "name": item.company,
              "description": item.description
            }
          }))
        }}
      />
      <Section
        title="My Journey"
        intro="From Curiosity to Creation — A timeline of how wonder evolved into purpose. From a village boy fascinated by the stars to an entrepreneur shaping the architecture of future civilizations."
        className="relative overflow-hidden"
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500/30 via-brand-500/20 to-transparent dark:from-brand-400/30 dark:via-brand-400/20 hidden sm:block"
                aria-hidden
              />

              <ol className="space-y-6 sm:space-y-8">
                {experience.map((item, idx) => (
                  <InteractiveTimelineItem
                    key={idx}
                    item={item}
                    index={idx}
                    allSkills={allSkills}
                  />
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        title="Pattern of the Journey"
        intro="The evolution of purpose through distinct phases"
        className="bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-950/30 relative overflow-hidden"
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-6 font-bold text-palette-primary dark:text-zinc-100">
                      Phase
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-palette-primary dark:text-zinc-100">
                      Theme
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-palette-primary dark:text-zinc-100">
                      Shift
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {journeyPhases.map((phase, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-6 font-semibold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {phase.phase}
                      </td>
                      <td className="py-4 px-6 text-palette-secondary dark:text-zinc-400">
                        {phase.theme}
                      </td>
                      <td className="py-4 px-6 text-palette-secondary dark:text-zinc-400">
                        {phase.shift}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-950/30 dark:to-transparent p-8 shadow-soft">
              <h3 className="text-2xl font-bold mb-4 text-palette-primary dark:text-zinc-100">
                Reflection
              </h3>
              <p className="text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed">
                From a child staring at the night sky to a thinker building the
                architecture of intelligence — my journey has always been about
                one thing: transforming curiosity into creation, and creation
                into understanding.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
