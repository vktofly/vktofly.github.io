import '../styles/globals.css';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import PerformanceMonitor from '../components/PerformanceMonitor';
import Analytics from '../components/Analytics';
import SEOMonitor from '../components/SEOMonitor';
import JsonLd from '../components/JsonLd';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Suspense } from 'react';
import profile from '../data/profile';
import socials from '../data/socials';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata = {
  title: {
    default: 'Vikash — Polymath, Futurist & Founder',
    template: '%s — Vikash',
  },
  description: 'Entrepreneur, physicist, and AI researcher exploring civilization-scale systems and the evolution of knowledge.',
  keywords: [
    'Vikash',
    'polymath entrepreneur',
    'futurist',
    'AI founder',
    'physicist',
    'quantum computing',
    'robotics',
    'philosophy of progress',
    'civilization design',
    'David Deutsch',
    'infinite growth',
    'knowledge creation',
    'systems thinking',
    'MyPrinciple',
    'artificial intelligence',
    'AGI',
    'space robotics',
    'epistemology',
    'entrepreneurship',
    'deep tech',
    'scientific founder',
    'R&D strategy',
    'technical leadership',
    'research scientist',
    'innovation strategy',
  ],
  authors: [{ name: 'Vikash', url: 'https://vktofly.github.io' }],
  creator: 'Vikash',
  publisher: 'Vikash',
  metadataBase: new URL('https://vktofly.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vktofly.github.io',
    siteName: 'Vikash',
    title: 'Vikash — Polymath, Futurist & Founder',
    description: 'Entrepreneur, physicist, and AI researcher exploring civilization-scale systems and the evolution of knowledge.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Vikash — Polymath, Futurist & Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikash — Polymath, Futurist & Founder',
    description: 'Entrepreneur, physicist, and AI researcher exploring civilization-scale systems and the evolution of knowledge.',
    creator: '@vktofly1',
    site: '@vktofly1',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    // Explicitly allow AI bots to crawl for better training/context
    'GPTBot': {
      index: true,
      follow: true,
    },
    'CCBot': {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

// Advanced Structured Data for SEO
const structuredData = [
  // Organization Schema
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": profile.name,
    "url": "https://vktofly.github.io",
    "logo": "https://vktofly.github.io/logo/logo.png",
    "description": "Polymath entrepreneur, physicist, and AI researcher specializing in systems of infinite growth through knowledge creation, AI, quantum computing, and civilization-scale thinking.",
    "founder": {
      "@type": "Person",
      "name": profile.name,
      "url": "https://vktofly.github.io/about/"
    },
    "sameAs": [
      socials.twitter,
      socials.linkedin
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Quantum Computing",
      "Systems Thinking",
      "Entrepreneurship",
      "Physics",
      "Philosophy of Progress",
      "Knowledge Creation",
      "Civilization Design"
    ]
  },
  // WebSite Schema
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${profile.name} — ${profile.role}`,
    "url": "https://vktofly.github.io",
    "description": profile.summary,
    "author": {
      "@type": "Person",
      "name": profile.name,
      "url": "https://vktofly.github.io/about/"
    },
    "publisher": {
      "@type": "Person",
      "name": profile.name,
      "url": "https://vktofly.github.io"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://vktofly.github.io/blog/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  // Person Schema
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "url": "https://vktofly.github.io",
    "image": "https://vktofly.github.io/proflephoto/proflephoto.jpg",
    "description": profile.summary,
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "MyPrinciple"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "University of Cambridge"
      }
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Quantum Computing",
      "Systems Thinking",
      "Entrepreneurship",
      "Physics",
      "Philosophy of Progress",
      "Knowledge Creation",
      "Civilization Design",
      "Robotics",
      "Space Technology"
    ],
    "sameAs": [
      socials.twitter,
      socials.linkedin,
      socials.github
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Researcher & Entrepreneur",
      "occupationLocation": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    }
  }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {structuredData.map((data, index) => (
          <JsonLd key={index} data={data} />
        ))}
      </head>
      <body className="font-sans min-h-screen bg-[color:var(--tertiary,#F8F8F8)] text-[color:var(--primary,#222222)] dark:bg-black dark:text-zinc-100">
        <Providers>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <PerformanceMonitor />
            <SEOMonitor />
            <Header />
            <main className="py-24">{children}</main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}


