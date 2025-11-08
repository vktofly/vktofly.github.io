import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import NavDropdown from "./NavDropdown";
import {
  UserIcon,
  BriefcaseIcon,
  RocketIcon,
  LightningIcon,
  BookIcon,
  UsersIcon,
  LibraryIcon,
} from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  {
    type: "dropdown",
    label: "About",
    items: [
      { href: "/about/", label: "About Me", icon: <UserIcon /> },
      { href: "/experience/", label: "Experience", icon: <BriefcaseIcon /> },
    ],
  },
  {
    type: "dropdown",
    label: "Work",
    items: [
      { href: "/projects/", label: "Projects", icon: <RocketIcon /> },
      { href: "/skills/", label: "Skills", icon: <LightningIcon /> },
    ],
  },
  {
    type: "dropdown",
    label: "Resources",
    items: [
      { href: "/books/", label: "Books", icon: <BookIcon /> },
      { href: "/people/", label: "People", icon: <UsersIcon /> },
      { href: "/resources/", label: "All Resources", icon: <LibraryIcon /> },
    ],
  },
  { href: "/blog/", label: "Blog" },
  { href: "/vision/", label: "Vision" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-[#F8F8F8]/75 dark:bg-black/60 border-b border-zinc-200 dark:border-zinc-800">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <Image
            src="/logo/logo.png"
            alt="Vikash Kumar Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>Vikash Kr.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item, index) => {
            if (item.type === "dropdown") {
              return (
                <NavDropdown
                  key={`dropdown-${index}`}
                  label={item.label}
                  icon={item.icon}
                  items={item.items}
                />
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            className="hidden sm:inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Resume
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
