import Section from '../../components/Section';
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

export default function ContactPage() {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const action = id ? `https://formspree.io/f/${id}` : '#';
  return (
    <Section title="Contact" intro="Get in touch">
      <div className="max-w-xl">
        <form action={action} method="POST" className="grid gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" />
          </div>
          <div className="hidden">
            <label>Company</label>
            <input name="company" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea name="message" rows="6" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" />
          </div>
          <div>
            <button type="submit" className="inline-flex items-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-4 py-2">Send</button>
          </div>
        </form>
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">Direct email: <a className="underline" href="mailto:vktofly@gmail.com">vktofly@gmail.com</a></p>
      </div>
    </Section>
  );
}


