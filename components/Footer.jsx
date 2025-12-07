import Link from 'next/link';
import Container from './Container';
import profile from '../data/profile';
import socials from '../data/socials';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: socials.github },
    { name: 'X (Twitter)', url: socials.twitter },
    { name: 'LinkedIn', url: socials.linkedin },
  ].filter(link => link.url);

  const footerLinks = [
    { label: "About", href: "/about/" },
    { label: "Projects", href: "/projects/" },
    { label: "Blog", href: "/blog/" },
    { label: "Vision", href: "/vision/" },
    { label: "Contact", href: "/contact/" },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-cosmic-950 py-12 mt-20 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
      <Container className="flex flex-col md:flex-row justify-between gap-10 text-sm">
        <div className="flex flex-col gap-4 max-w-sm">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Vikash Kr.</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Architecting systems of understanding. Exploring the intersection of physics, philosophy, and computation.
            </p>
            <div className="flex gap-4">
                 {socialLinks.map((link) => (
                    <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    >
                    {link.name}
                    </a>
                ))}
            </div>
        </div>
        
        <div className="flex flex-col gap-4">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Explore</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {footerLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-cosmic-900 dark:hover:text-white transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
      </Container>
      
      <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <Container>
            <p>© {new Date().getFullYear()} {profile.name}. Designed with entropy & order.</p>
        </Container>
      </div>
    </footer>
  );
}


