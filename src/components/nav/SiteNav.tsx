"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/executive", label: "Leadership" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="shrink-0 text-sm font-semibold tracking-wide text-white">
          Dustin Hartung
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  active ? "text-cyan-300" : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a
          href="mailto:Dustin.Hartung@gmail.com"
          className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 sm:inline-flex"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
