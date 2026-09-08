import Section from "../../components/Section";
import Container from "../../components/Container";
import { generateOgImageMetadata } from "../../lib/og-images";
import { glossaryTerms } from "../../data/glossary";

export const metadata = {
  title: "Glossary",
  description:
    "A digital garden and glossary defining the core concepts, frameworks, and philosophies that underpin my work in Epistemic Engineering and Infinite Growth.",
  keywords: [
    "glossary",
    "definitions",
    "infinite growth",
    "epistemic engineering",
    "quantum epistemology",
    "cognitive architecture",
    "polymath",
    "philosophy",
  ],
  openGraph: {
    title: "Glossary — Vikash",
    description:
      "A digital garden and glossary defining the core concepts and philosophies underpinning my work.",
    url: "https://vktofly.github.io/glossary/",
    type: "website",
    images: [generateOgImageMetadata("glossary", null, "Glossary — Vikash")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary — Vikash",
    description:
      "A digital garden and glossary defining the core concepts and philosophies underpinning my work.",
    creator: "@vktofly1",
    site: "@vktofly1",
    images: [generateOgImageMetadata("glossary", null, "Glossary — Vikash").url],
  },
  alternates: {
    canonical: "/glossary/",
  },
};

export default function GlossaryPage() {
  return (
    <div className="bg-zinc-50 dark:bg-[#050505] min-h-screen text-zinc-900 dark:text-zinc-300 font-sans selection:bg-palette-accent selection:text-black transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10 dark:opacity-20" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Hero Section */}
      <Section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800/50">
        <Container className="relative z-10">
          <div className="max-w-5xl">
            {/* Telemetry Block */}
            <div className="font-mono text-xs tracking-widest text-blue-600 dark:text-palette-accent mb-8 uppercase flex flex-wrap gap-6 items-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-palette-accent rounded-full animate-pulse-slow"></span>
                SYS: ACTIVE
              </span>
              <span>MODULE: GLOSSARY</span>
              <span>ENTRIES: {glossaryTerms.length}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-black dark:text-white leading-[1.1] tracking-tight mb-8">
              The Digital <br className="hidden sm:block" />
              <span className="italic text-zinc-500 dark:text-zinc-400">Garden.</span>
            </h1>

            {/* Sub-headline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16">
              <div>
                <p className="text-xl sm:text-2xl font-light text-zinc-700 dark:text-zinc-400 leading-relaxed">
                  Words shape reality. This glossary defines the core concepts, frameworks, and philosophies that underpin my work and worldview.
                </p>
              </div>
              <div className="font-mono text-sm text-zinc-500 leading-loose">
                <div>[STATUS] Growing</div>
                <div>[PURPOSE] Precision of Thought</div>
                <div>[AUTHOR] Vikash</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Glossary List */}
      <Section className="py-16 sm:py-24 relative z-10">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {glossaryTerms.map((item) => (
              <div key={item.id} id={item.id} className="group scroll-mt-24">
                <div className="font-mono text-xs tracking-widest text-zinc-500 mb-4 uppercase flex items-center gap-4">
                  <span>[TERM_{item.id.replace(/-/g, '_').toUpperCase()}]</span>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow"></div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-serif text-black dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-palette-accent transition-colors duration-300">
                  {item.term}
                </h2>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-lg font-light leading-relaxed mb-6 bg-white/50 dark:bg-black/20 p-6 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm">
                  {item.definition}
                </div>
                
                {item.related && item.related.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
                    <span className="text-zinc-500">Related:</span>
                    {item.related.map((rel, idx) => (
                      <span key={idx} className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                        {rel}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
