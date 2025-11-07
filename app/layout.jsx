import './globals.css';
import '../styles/globals.css';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata = {
  title: 'Vikash — Polymath, Futurist & Founder',
  description: 'Building Systems of Infinite Growth',
  metadataBase: new URL('https://vktofly.github.io'),
  openGraph: {
    type: 'website',
    title: 'Vikash — Polymath, Futurist & Founder',
    description: 'Building Systems of Infinite Growth',
    url: 'https://vktofly.github.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikash — Polymath, Futurist & Founder',
    description: 'Building Systems of Infinite Growth',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <Providers>
          <Header />
          <main className="py-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


