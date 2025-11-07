import Link from 'next/link';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import MobileNav from './MobileNav';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/experience/', label: 'Experience' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/skills/', label: 'Skills' },
  { href: '/vision/', label: 'Vision' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-[#F8F8F8]/75 dark:bg-black/60 border-b border-zinc-200 dark:border-zinc-800">
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
          <a href="/resume.pdf" className="hidden sm:inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Resume</a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}


