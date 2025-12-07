import Link from 'next/link';

// Internal linking structure for SEO
const LINK_SECTIONS = [
  {
    title: 'Core Philosophy',
    links: [
      { href: '/blog/infinite-growth-machine/', text: 'The Infinite Growth Machine' },
      { href: '/blog/civilization-as-system/', text: 'Civilization as System' },
      { href: '/blog/freedom-from-known-algorithm/', text: 'Freedom from Known Algorithm' },
      { href: '/vision/', text: 'Personal Vision & Philosophy' },
    ]
  },
  {
    title: 'Knowledge & Epistemology',
    links: [
      { href: '/books/the-beginning-of-infinity/', text: 'The Beginning of Infinity' },
      { href: '/books/the-rational-optimist/', text: 'The Rational Optimist' },
      { href: '/blog/knowledge-creation-process/', text: 'Knowledge Creation Process' },
      { href: '/blog/epistemology-explained/', text: 'Epistemology Explained' },
    ]
  },
  {
    title: 'Technology & Innovation',
    links: [
      { href: '/projects/', text: 'Technology Projects' },
      { href: '/experience/', text: 'Professional Experience' },
      { href: '/skills/', text: 'Technical Skills' },
      { href: '/blog/artificial-intelligence-future/', text: 'AI & Future Technology' },
    ]
  },
  {
    title: 'Entrepreneurship',
    links: [
      { href: '/about/', text: 'About & Background' },
      { href: '/blog/entrepreneurship-knowledge/', text: 'Entrepreneurship Philosophy' },
      { href: '/blog/startup-knowledge-creation/', text: 'Building Knowledge Companies' },
      { href: '/contact/', text: 'Get In Touch' },
    ]
  }
];

export default function InternalLinkMap({ currentPath = '', maxLinks = 8 }) {
  // Flatten and filter links (exclude current page)
  const allLinks = LINK_SECTIONS.flatMap(section =>
    section.links.map(link => ({
      ...link,
      section: section.title
    }))
  ).filter(link => !currentPath || !link.href.includes(currentPath));

  // Randomly select links for variety
  const shuffled = [...allLinks].sort(() => 0.5 - Math.random());
  const selectedLinks = shuffled.slice(0, maxLinks);

  // Group by section for display
  const groupedLinks = selectedLinks.reduce((acc, link) => {
    if (!acc[link.section]) {
      acc[link.section] = [];
    }
    acc[link.section].push(link);
    return acc;
  }, {});

  return (
    <div className="internal-link-map mt-12 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-palette-primary">
        Explore Related Topics
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(groupedLinks).map(([section, links]) => (
          <div key={section} className="space-y-2">
            <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              {section}
            </h4>
            <ul className="space-y-1">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 hover:underline transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          This page links to {selectedLinks.length} related topics across the site for better navigation and SEO.
        </p>
      </div>
    </div>
  );
}

// SEO-focused footer links component
export function SEOFooterLinks({ currentPath = '' }) {
  const footerLinks = [
    { href: '/about/', text: 'About', description: 'Learn about my background and philosophy' },
    { href: '/blog/', text: 'Blog', description: 'Read essays on knowledge, technology, and systems' },
    { href: '/projects/', text: 'Projects', description: 'Explore technology ventures and experiments' },
    { href: '/books/', text: 'Books', description: 'Discover the knowledge that shaped my thinking' },
    { href: '/contact/', text: 'Contact', description: 'Get in touch for collaborations or discussions' },
  ].filter(link => !currentPath || !link.href.includes(currentPath));

  return (
    <nav aria-label="Site navigation" className="seo-footer-links">
      <ul className="flex flex-wrap gap-6">
        {footerLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="group block"
            >
              <span className="font-medium text-brand-600 group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300 transition-colors">
                {link.text}
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
