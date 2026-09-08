import Section from "../../components/Section";
import Container from "../../components/Container";
import Prose from "../../components/Prose";
import JsonLd from "../../components/JsonLd";
import FAQSchema from "../../components/FAQSchema";
import ReadingProgress from "../../components/ReadingProgress";
import Toc from "../../components/Toc";
import BackToTop from "../../components/BackToTop";
import { generateOgImageMetadata } from "../../lib/og-images";
import profile from "../../data/profile";
import { generalFAQs } from "../../data/faqs";
import { loadMarkdownAsHtml } from "../../lib/markdown";

export const metadata = {
  title: "About",
  description:
    "Polymath entrepreneur, physicist, and AI researcher. Across two decades, I've founded 23+ technology ventures across AI, quantum computing, robotics, and space systems. Exploring how knowledge evolves and how humanity can evolve with it.",
  keywords: [
    "Vikash",
    "about",
    "polymath",
    "entrepreneur",
    "physicist",
    "AI researcher",
    "founder",
    "quantum computing",
    "robotics",
    "space systems",
    "epistemology",
    "infinite growth",
    "civilization design",
    "architect of understanding",
    "deep tech founder",
    "scientific leadership",
    "cognitive architecture",
  ],
  openGraph: {
    title: "About — Vikash",
    description:
      "Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth.",
    url: "https://vktofly.github.io/about/",
    type: "profile",
    images: [generateOgImageMetadata("about", null, "About — Vikash")],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Vikash",
    description:
      "Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth.",
    creator: "@vktofly1",
    site: "@vktofly1",
    images: [generateOgImageMetadata("about", null, "About — Vikash").url],
  },
  alternates: {
    canonical: "/about/",
  },
};

export default async function AboutPage() {
  const html = await loadMarkdownAsHtml("aboutme");
  return (
    <div className="bg-zinc-50 dark:bg-[#050505] min-h-screen text-zinc-900 dark:text-zinc-300 font-sans selection:bg-palette-accent selection:text-black transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10 dark:opacity-20" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <FAQSchema faqs={generalFAQs} />
      <ReadingProgress targetId="about-content" />
      <BackToTop />

      {/* Hero Section: The Architect's Ledger */}
      <Section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800/50">
        <Container className="relative z-10">
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              description: profile.summary,
              url: "https://vktofly.github.io/about/",
              email: profile.email,
              image: "https://vktofly.github.io/proflephoto/profile%20photo.jpg",
              sameAs: [
                "https://github.com/vktofly",
                "https://x.com/vktofly1",
                "https://linkedin.com/in/vktofly",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Quantum Computing",
                "Robotics",
                "Space Systems",
                "Epistemology",
                "Systems Thinking",
                "Entrepreneurship",
                "Physics",
                "Cognitive Science",
              ],
              alumniOf: "Multiple ventures and research institutions",
              founder: "23+ technology companies",
            }}
          />

          <div className="max-w-5xl">
            {/* Telemetry Block */}
            <div className="font-mono text-xs tracking-widest text-blue-600 dark:text-palette-accent mb-8 uppercase flex flex-wrap gap-6 items-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-palette-accent rounded-full animate-pulse-slow"></span>
                SYS: ACTIVE
              </span>
              <span>LOC: EAST DELHI, IN</span>
              <span>T: {new Date().getFullYear()}</span>
            </div>

            {/* Thesis Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-black dark:text-white leading-[1.1] tracking-tight mb-8">
              Building systems of <br className="hidden sm:block" />
              <span className="italic text-zinc-500 dark:text-zinc-400">infinite growth.</span>
            </h1>

            {/* Sub-headline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16">
              <div>
                <p className="text-xl sm:text-2xl font-light text-zinc-700 dark:text-zinc-400 leading-relaxed">
                  I believe civilization is a self-evolving system of explanations — and progress is the acceleration of that evolution.
                </p>
              </div>
              <div className="font-mono text-sm text-zinc-500 leading-loose">
                <div>[ROLE] Polymath / Founder / AI Researcher</div>
                <div>[FOCUS] Epistemology & Cognitive Systems</div>
                <div>[STATUS] Orchestrating MyPrinciple</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Structured Ledger Section */}
      <Section className="py-16 sm:py-24 relative z-10 border-b border-zinc-200 dark:border-zinc-800/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Core Directives */}
            <div className="lg:col-span-5">
              <div className="font-mono text-xs tracking-widest text-zinc-500 mb-6 uppercase border-b border-zinc-200 dark:border-zinc-800 pb-4">
                [01] Core Directives
              </div>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-lg font-light leading-relaxed">
                <p>
                  Knowledge, not capital, is the only resource that compounds infinitely. Every company, algorithm, or philosophy that deepens understanding becomes part of civilization&apos;s codebase.
                </p>
                <p>
                  My work explores how technology — especially AI, quantum computation, and cognitive systems — can be designed to make knowledge create more knowledge, enabling human and machine intelligence to co-evolve toward open-ended growth.
                </p>
                <p className="text-black dark:text-white font-serif text-2xl italic mt-8 border-l-2 border-blue-600 dark:border-palette-accent pl-6">
                  &quot;The ultimate goal: to make civilization self-improving, self-correcting, and self-aware.&quot;
                </p>
              </div>
            </div>

            {/* Active Vectors */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="font-mono text-xs tracking-widest text-zinc-500 mb-6 uppercase border-b border-zinc-200 dark:border-zinc-800 pb-4">
                [02] Active Vectors
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    id: "V_01",
                    title: "AI as Civilizational Infrastructure",
                    desc: "Designing autonomous cognitive systems that learn, reason, and explain — not just predict."
                  },
                  {
                    id: "V_02",
                    title: "Quantum Epistemology",
                    desc: "Exploring how computation, probability, and explanation intersect at the quantum scale."
                  },
                  {
                    id: "V_03",
                    title: "Cognitive Architecture",
                    desc: "Developing MyPrinciple, a recursive framework for aligning human creativity with systems thinking."
                  },
                  {
                    id: "V_04",
                    title: "Autonomous Space Systems",
                    desc: "Engineering self-replicating robotic and AI ecosystems for off-world industry."
                  },
                  {
                    id: "V_05",
                    title: "Integrative Civilization Design",
                    desc: "Synthesizing philosophy, systems theory, and engineering into a unified science of progress."
                  }
                ].map((vector) => (
                  <div key={vector.id} className="group relative pl-8">
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-600 dark:group-hover:bg-palette-accent transition-colors duration-300 rounded-sm"></div>
                    <div className="absolute left-[3px] top-3 bottom-[-24px] w-px bg-zinc-200 dark:bg-zinc-800 group-last:hidden"></div>
                    <div className="font-mono text-xs text-blue-600 dark:text-palette-accent mb-1">{vector.id}</div>
                    <h3 className="text-black dark:text-white font-medium text-lg mb-2">{vector.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">{vector.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* Main Content & Connections */}
      <Section className="py-16 sm:py-24 relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Sticky TOC */}
            <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-32 self-start">
              <div className="font-mono text-xs tracking-widest text-zinc-500 mb-6 uppercase border-b border-zinc-200 dark:border-zinc-800 pb-4">
                [03] Index
              </div>
              <Toc rootId="about-content" />
              
              <div className="mt-16 font-mono text-xs tracking-widest text-zinc-500 mb-6 uppercase border-b border-zinc-200 dark:border-zinc-800 pb-4">
                [04] Interface
              </div>
              <div className="flex flex-col gap-4 font-mono text-sm">
                <a href={`mailto:${profile.email}`} className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-palette-accent transition-colors flex justify-between">
                  <span>EMAIL</span> <span>↗</span>
                </a>
                <a href="https://github.com/vktofly" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-palette-accent transition-colors flex justify-between">
                  <span>GITHUB</span> <span>↗</span>
                </a>
                <a href="https://x.com/vktofly1" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-palette-accent transition-colors flex justify-between">
                  <span>X (TWITTER)</span> <span>↗</span>
                </a>
                <a href="https://linkedin.com/in/vktofly" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-palette-accent transition-colors flex justify-between">
                  <span>LINKEDIN</span> <span>↗</span>
                </a>
              </div>
            </div>

            {/* Markdown Content */}
            <div id="about-content" className="lg:col-span-8 lg:col-start-5">
              <div className="prose prose-zinc dark:prose-invert max-w-none 
                              prose-headings:font-serif prose-headings:font-normal prose-headings:text-black dark:prose-headings:text-white
                              prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg
                              prose-a:text-blue-600 dark:prose-a:text-palette-accent prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-black dark:prose-strong:text-white prose-strong:font-medium
                              prose-blockquote:border-blue-600 dark:prose-blockquote:border-palette-accent prose-blockquote:bg-zinc-100 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-200">
                <Prose html={html} />
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
