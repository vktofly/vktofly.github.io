import Container from './Container';
import profile from '../data/profile';
import socials from '../data/socials';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: socials.github },
    { name: 'X', url: socials.twitter },
    { name: 'LinkedIn', url: socials.linkedin },
  ].filter(link => link.url); // Only show links that exist

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-16">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}


