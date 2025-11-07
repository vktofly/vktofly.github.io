import '../styles/globals.css';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata = {
  title: {
    default: 'Vikash — Polymath, Futurist & Founder',
    template: '%s — Vikash',
  },
  description: 'Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth through knowledge creation, AI, quantum computing, and civilization-scale thinking.',
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
    description: 'Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth through knowledge creation, AI, quantum computing, and civilization-scale thinking.',
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
    description: 'Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth.',
    creator: '@vktofly1',
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
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    // Other verification methods can be added here:
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans min-h-screen bg-[color:var(--tertiary,#F8F8F8)] text-[color:var(--primary,#222222)] dark:bg-black dark:text-zinc-100">
        <Providers>
          <Header />
          <main className="py-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


