import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionDivider from "../../components/SectionDivider";
import TestimonialCard from "../../components/TestimonialCard";
import SpeakingCard from "../../components/SpeakingCard";
import PublicationCard from "../../components/PublicationCard";
import Image from "next/image";
import { generateOgImageMetadata } from "../../lib/og-images";
import testimonials from "../../data/testimonials";
import speaking from "../../data/speaking";
import publications from "../../data/publications";

export const metadata = {
  title: "Content & Recognition — Vikash",
  description:
    "Testimonials, speaking engagements, publications, and recognition from colleagues and partners.",
  keywords: [
    "testimonials",
    "speaking",
    "publications",
    "talks",
    "podcasts",
    "interviews",
    "papers",
    "essays",
  ],
  openGraph: {
    title: "Content & Recognition — Vikash",
    description: "Testimonials, speaking engagements, and publications.",
    url: "https://vktofly.github.io/content/",
    type: "website",
    images: [generateOgImageMetadata("content", null, "Content & Recognition")],
  },
  alternates: {
    canonical: "/content/",
  },
};

export default function ContentPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Content & Recognition
            </h1>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Testimonials, speaking engagements, publications, and recognition from colleagues and partners.
            </p>
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <>
          <Section
            title="Testimonials"
            intro="Recommendations and feedback from colleagues, partners, and collaborators"
            className="relative overflow-hidden"
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt=""
                fill
                className="object-cover grayscale"
                unoptimized
              />
            </div>
            
            <Container className="relative z-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </Container>
          </Section>

          {speaking.length > 0 && <SectionDivider variant="minimal" />}
        </>
      )}

      {/* Speaking Engagements Section */}
      {speaking.length > 0 && (
        <>
          <Section
            title="Speaking Engagements"
            intro="Talks, podcasts, interviews, and other speaking opportunities"
            className="relative overflow-hidden"
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
              <Image
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt=""
                fill
                className="object-cover grayscale"
                unoptimized
              />
            </div>
            
            <Container className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {speaking.map((engagement) => (
                  <SpeakingCard key={engagement.id} engagement={engagement} />
                ))}
              </div>
            </Container>
          </Section>

          {publications.length > 0 && <SectionDivider variant="geometric" />}
        </>
      )}

      {/* Publications Section */}
      {publications.length > 0 && (
        <Section
          title="Publications"
          intro="Papers, articles, essays, and other published works"
          className="relative overflow-hidden"
        >
          {/* Subtle background image */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt=""
              fill
              className="object-cover grayscale"
              unoptimized
            />
          </div>
          
          <Container className="relative z-10">
            <div className="grid sm:grid-cols-2 gap-6">
              {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

