import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MidPageCTA from "@/components/MidPageCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/config/site.config";
import { locationServiceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return siteConfig.locations.map((l) => ({ slug: l.slug }));
}

function getLocation(slug: string) {
  return siteConfig.locations.find((l) => l.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: `Serving ${location.name}, ${location.state}`,
    description: location.metaDescription,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();
  const { business, hero } = siteConfig;
  const bannerImage = location.imageSrc ?? hero.posterSrc;

  return (
    <>
      <JsonLd data={locationServiceSchema(location)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Locations", url: `${siteConfig.siteUrl}/locations` },
          {
            name: `${location.name}, ${location.state}`,
            url: `${siteConfig.siteUrl}/locations/${location.slug}`,
          },
        ])}
      />

      {/* Hero banner — same treatment as the service pages and the
          homepage hero, so a visitor arriving from a "[service] in
          [town]" search doesn't land on a page that looks like a
          different, cheaper site than the one they clicked from. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <Image src={bannerImage} alt={`${business.name} in ${location.name}, ${location.state}`} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-paper/60 mb-6">
            <Link href="/" className="hover:text-accent">Home</Link> /{" "}
            <Link href="/locations" className="hover:text-accent">Locations</Link> /{" "}
            <span className="text-paper">{location.name}</span>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            Service area
          </p>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
            {location.h1}
          </h1>
          <p className="mt-5 max-w-xl text-paper/85">{location.blurb}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-accent text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity text-center"
            >
              Get a Free Quote
            </Link>
            <a
              href={business.phoneHref}
              className="border border-paper/40 text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-paper/10 transition-colors text-center"
            >
              {business.phone}
            </a>
          </div>

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

      {/* Neighborhoods + recent project — light section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        {location.neighborhoods.length > 0 && (
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-ink/60">Areas we work in {location.name}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {location.neighborhoods.map((n) => (
                <li key={n} className="border border-ink/15 rounded-full px-3 py-1">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        {location.recentProject && (
          <div className="mt-10 max-w-2xl border-l-2 border-accent pl-6">
            <p className="text-sm uppercase tracking-wide text-accent">Recent project</p>
            <h2 className="font-display text-xl font-semibold mt-1">
              {location.recentProject.title}
            </h2>
            <p className="mt-2 text-ink/70">{location.recentProject.detail}</p>
          </div>
        )}

        {location.testimonial && (
          <blockquote className="mt-10 max-w-2xl">
            <p className="text-lg italic text-ink/80">"{location.testimonial.quote}"</p>
            <footer className="mt-2 text-sm text-ink/60">
              — {location.testimonial.author}, {location.name}
            </footer>
          </blockquote>
        )}
      </section>

      {/* Local conditions — dark block, breaking the page rhythm the
          same way the service pages do rather than one long white scroll. */}
      {location.localConditions.length > 0 && (
        <section className="bg-ink text-paper px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="font-display uppercase text-2xl">Exterior care in {location.name}</h2>
              <ul className="mt-4 space-y-2 text-paper/80">
                {location.localConditions.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-accent shrink-0">–</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <MidPageCTA
        heading={`Get a quote in ${location.name}.`}
        subhead="Free estimates, no pressure. We'll walk the site and give you a straight answer."
      />

      <section className="px-6 py-16 max-w-4xl mx-auto">
        {/* Internal linking mesh, styled as pill buttons for the same
            reason as the service pages — more obviously clickable. */}
        <div>
          <h2 className="font-display text-xl font-semibold">
            Services available in {location.name}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {siteConfig.services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/${location.slug}`}
                  className="inline-block border border-ink/15 rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteForm headingLevel="h2" />

      <div className="md:hidden h-20" aria-hidden />
      <StickyMobileCTA />
    </>
  );
}
