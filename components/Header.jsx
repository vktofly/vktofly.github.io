"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import NavDropdown from "./NavDropdown";
import {
  BookIcon,
  UsersIcon,
  LibraryIcon,
  BlogIcon,
} from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About Me" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/skills/", label: "Skills" },
  {
    type: "dropdown",
    label: "Resources",
    items: [
      { href: "/books/", label: "Books", icon: <BookIcon /> },
      { href: "/people/", label: "People", icon: <UsersIcon /> },
      { href: "/blog/", label: "Blog", icon: <BlogIcon /> },
      { href: "/resources/", label: "All Resources", icon: <LibraryIcon /> },
    ],
  },
  { href: "/vision/", label: "Vision" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <motion.div
        layout
        className={cn(
          "flex items-center justify-between px-6 py-2 rounded-full border transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-cosmic-900/80 backdrop-blur-md border-zinc-200 dark:border-white/10 shadow-soft dark:shadow-cosmic w-[90%] max-w-5xl"
            : "bg-transparent border-transparent w-full max-w-7xl"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <Image
            src="/logo/logo.png"
            alt="Vikash Kumar Logo"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-white/10"
          />
          <span className={cn("transition-colors", isScrolled ? "opacity-100" : "opacity-90")}>
            Vikash Kr.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
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
                className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-cosmic-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </motion.div>
    </motion.header>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
