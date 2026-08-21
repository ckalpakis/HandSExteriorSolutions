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
  description: `Learn about ${siteConfig.business.name}, an owner-operated exterior cleaning and lighting business serving ${siteConfig.business.city} and ${siteConfig.business.region}.`,
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

      <MidPageCTA
        heading="Like what you see?"
        subhead="Free estimates, no pressure. Tell us about the project."
      />
    </>
  );
}
