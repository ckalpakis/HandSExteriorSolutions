import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import About from "@/components/About";
import MidPageCTA from "@/components/MidPageCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.business.name}, a firefighter-owned and operated exterior cleaning and lighting business serving ${siteConfig.business.city} and ${siteConfig.business.region}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { business, hero } = siteConfig;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "About", url: `${siteConfig.siteUrl}/about` },
        ])}
      />

      {/* Hero banner — same treatment as every other inner page now.
          About didn't have a dedicated photo field, so this reuses the
          hero poster image rather than going without a banner at all. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <Image src={hero.posterSrc} alt={business.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-paper/60 mb-6">
            <Link href="/" className="hover:text-accent">Home</Link> /{" "}
            <span className="text-paper">About</span>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            About
          </p>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
            {business.name}
          </h1>
          <p className="mt-5 max-w-xl text-paper/85">{business.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {hero.badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-paper/80"
              >
                <span className="h-1.5 w-1.5 bg-accent inline-block shrink-0" aria-hidden />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* headingLevel="h2" here — the hero banner above already supplies
          this page's one H1, so About's own heading is demoted to h2. */}
      <About headingLevel="h2" />

      <section className="bg-ink px-6 py-20 text-paper" aria-labelledby="owner-heading">
        <div className="mx-auto grid max-w-4xl overflow-hidden border border-paper/15 md:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="p-8 sm:p-10 md:p-12">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden />
              Firefighter owned &amp; operated
            </p>
            <h2
              id="owner-heading"
              className="mt-4 max-w-xl font-display text-3xl uppercase leading-tight sm:text-4xl"
            >
              {siteConfig.about.owner.heading}
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-paper/75">
              {siteConfig.about.owner.body}
            </p>
          </div>

          <div className="relative flex min-h-64 flex-col justify-between overflow-hidden border-t border-paper/15 bg-surface p-8 md:min-h-full md:border-l md:border-t-0">
            <svg
              viewBox="0 0 120 120"
              className="absolute -right-5 -top-5 h-40 w-40 text-accent/10"
              aria-hidden="true"
            >
              <path
                d="M60 8 103 25v31c0 27-17 46-43 56C34 102 17 83 17 56V25L60 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
              />
              <path d="M35 58h50M60 33v50" stroke="currentColor" strokeWidth="8" />
            </svg>

            <div className="relative flex h-14 w-14 items-center justify-center border border-accent text-accent">
              <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
                <path
                  d="M12 29v-5c0-7 5-13 12-13s12 6 12 13v5M9 29h30v7H9zM18 11V7h12v4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="relative mt-16">
              <p className="font-display text-2xl uppercase leading-none">
                {siteConfig.about.owner.name}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-paper/55">
                {siteConfig.about.owner.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <MidPageCTA
        heading="Like what you see?"
        subhead="Free estimates, no pressure. Tell us about the project."
      />
    </>
  );
}
