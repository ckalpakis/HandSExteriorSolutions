"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function Header() {
  const { business, nav } = siteConfig;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const links = nav.filter((item) => item.label !== "Locations");

  // Transparent-over-hero only makes sense on the homepage, where the
  // hero's own dark video overlay keeps white nav text readable. Every
  // other page starts directly on a light or dark content section with
  // no hero behind the header, so a transparent header there would be
  // unreadable — those pages always get the solid bar.
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-300 ${
        solid ? "bg-ink" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
        <Link
          href="/"
          className="shrink-0 relative h-10 md:h-12 w-40 md:w-48 overflow-hidden"
          onClick={() => setOpen(false)}
        >
          {/* overflow-hidden + a fixed-size container is the real fix here:
              until a real logo file exists at business.logoSrc, the
              browser renders the alt text as a fallback — without a
              clipped, fixed-height box that text wraps and spills out
              past the header into the page below. This makes the header
              resilient regardless of whether the logo asset is in yet. */}
          <Image
            src={business.logoSrc}
            alt={business.name}
            fill
            className="object-contain object-left"
          />
        </Link>

        {/* Nav + phone + CTA grouped into one right-hand cluster with a
            fixed gap between them, instead of being spread across the
            full header width by justify-between — that's what was
            leaving a large dead gap between the nav links and the
            phone/quote button on wide screens. */}
        <div className="flex items-center gap-8 md:gap-12">
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
            <a
              href={business.phoneHref}
              className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {business.phone}
            </a>
            <Link
              href="/contact"
              className="bg-accent text-paper px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              onClick={() => setOpen(false)}
            >
              Request a Quote
            </Link>

            {/* Mobile menu toggle — only the nav links collapse; phone and
                quote button stay visible so the two highest-intent actions
                are always one tap away, even with the menu closed. */}
            <button
              type="button"
              className="md:hidden p-1 -mr-1"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          // Always solid regardless of scroll/transparency state — an
          // open dropdown over a transparent header would sit directly on
          // top of whatever hero content is behind it and be unreadable.
          className="md:hidden bg-ink border-t border-paper/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium uppercase tracking-widest"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href={business.phoneHref} className="sm:hidden hover:text-accent transition-colors">
            {business.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
