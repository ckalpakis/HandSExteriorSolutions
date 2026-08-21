"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";

export default function FAQAccordion({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const Heading = headingLevel;
  const { business } = siteConfig;

  return (
    // bg-surface (not bg-ink) so this doesn't blend into WorkGallery
    // right above it — same alternating-contrast principle used
    // elsewhere on the page.
    <section className="bg-surface text-paper px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto border-t border-accent/30 pt-6 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            FAQ
          </p>
          <Heading className="font-display uppercase text-4xl md:text-5xl leading-none mt-3">
            Straight <span className="text-accent">answers.</span>
          </Heading>
          <p className="mt-4 text-paper/60 text-sm">
            What people ask us most before booking.
          </p>

          <a
            href={business.phoneHref}
            className="mt-6 inline-flex items-center gap-2 bg-accent text-paper px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {business.phone}
          </a>
        </div>

        <div className="divide-y divide-paper/10 border-t border-paper/10">
          {siteConfig.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`border rounded-sm my-2 transition-colors ${
                  isOpen ? "border-accent" : "border-transparent"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 py-4 px-3 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-accent text-sm shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display uppercase text-base md:text-lg leading-snug">
                      {item.q}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 flex items-center justify-center h-8 w-8 border rounded-sm text-sm ${
                      isOpen ? "border-accent text-accent" : "border-paper/30 text-paper/70"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-4 px-3 pl-[3.25rem] text-paper/70 text-sm max-w-xl">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
