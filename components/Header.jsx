import Link from 'next/link';
import Container from './Container';
import ThemeToggle from './ThemeToggle';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/experience/', label: 'Experience' },
  { href: '/projects/', label: 'Projects' },
  { href: '/skills/', label: 'Skills' },
  { href: '/vision/', label: 'Vision' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/75 dark:bg-black/60 border-b border-zinc-200 dark:border-zinc-800">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Vikash
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}


