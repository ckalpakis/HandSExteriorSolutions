import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import MidPageCTA from "@/components/MidPageCTA";
import { siteConfig } from "@/config/site.config";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `Towns and areas ${siteConfig.business.name} serves across ${siteConfig.business.region}.`,
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  const { hero } = siteConfig;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Locations", url: `${siteConfig.siteUrl}/locations` },
        ])}
      />
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-ink/50 mb-6">
          <Link href="/" className="hover:text-accent">Home</Link> /{" "}
          <span className="text-ink">Locations</span>
        </nav>

        <p className="flex items-center gap-2 text-sm uppercase tracking-widest text-accent">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          Service areas
        </p>
        <h1 className="font-display uppercase text-4xl md:text-5xl mt-3 leading-none">
          Where we <span className="text-accent">work.</span>
        </h1>
        <p className="mt-4 text-ink/70 max-w-xl">
          {siteConfig.business.name} serves the following towns across{" "}
          {siteConfig.business.region}.
        </p>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {siteConfig.locations.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="group block overflow-hidden rounded border border-ink/10 hover:border-accent transition-colors"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={l.imageSrc ?? hero.posterSrc}
                    alt={`${siteConfig.business.name} in ${l.name}, ${l.state}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5">
                  <span className="font-display uppercase text-lg">
                    {l.name}, {l.state}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <MidPageCTA
        heading="Not seeing your town?"
        subhead="Give us a call — we may still be able to help."
      />
    </>
  );
}
