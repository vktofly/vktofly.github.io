import { generateOgImageMetadata } from '../../lib/og-images';

export const metadata = {
  title: 'Contact — Vikash',
  description: 'Get in touch for collaborations, inquiries, or discussions about AI, quantum computing, robotics, space systems, and civilization-scale thinking.',
  keywords: [
    'contact',
    'collaboration',
    'inquiry',
    'email',
    'reach out',
  ],
  openGraph: {
    title: 'Contact — Vikash',
    description: 'Get in touch for collaborations, inquiries, or discussions.',
    url: 'https://vktofly.github.io/contact/',
    images: [generateOgImageMetadata('contact', null, 'Contact — Vikash')],
  },
  alternates: {
    canonical: '/contact/',
  },
};

export default function ContactLayout({ children }) {
  return children;
}

