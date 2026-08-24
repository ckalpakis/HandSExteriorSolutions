import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MidPageCTA from "@/components/MidPageCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/config/site.config";
import { serviceLocationSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { serviceAlt } from "@/lib/seo";

// Pre-render one static page per service × location combination — e.g.
// /services/window-cleaning/tampa. This page directly targets
// a "[service] in [town]" search; the plain service page and plain
// location page each cover half of that query on their own.
//
// Scales as services.length × locations.length static pages at build
// time. Fine for the usual local-business scale (a handful of services
// times a handful of towns). If this ever grows into hundreds of
// combinations, switch this route to on-demand ISR instead of full SSG.
export function generateStaticParams() {
  return siteConfig.services.flatMap((s) =>
    siteConfig.locations.map((l) => ({ slug: s.slug, location: l.slug }))
  );
}

function getService(slug: string) {
  return siteConfig.services.find((s) => s.slug === slug);
}

function getLocation(slug: string) {
  return siteConfig.locations.find((l) => l.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug, location: locationSlug } = await params;
  const service = getService(slug);
  const location = getLocation(locationSlug);
  if (!service || !location) return {};
  const title = `${service.title} in ${location.name}, ${location.state}`;
  const description = `${service.metaDescription} Serving ${location.name}, ${location.state}.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}/${location.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.business.name}`,
      description,
      images: [{ url: service.imageSrc }],
    },
  };
}

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug, location: locationSlug } = await params;
  const service = getService(slug);
  const location = getLocation(locationSlug);
  if (!service || !location) notFound();
  const { business } = siteConfig;

  // Prefer the location's own recent project when there is one — more
  // relevant than the service's generic example — falling back to the
  // service's if this location doesn't have one yet.
  const recentProject = location.recentProject ?? service.recentProject;

  return (
    <>
      <JsonLd data={serviceLocationSchema(service, location)} />
      {service.faq.length > 0 && <JsonLd data={faqSchema(service.faq)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Services", url: `${siteConfig.siteUrl}/services` },
          { name: service.title, url: `${siteConfig.siteUrl}/services/${service.slug}` },
          {
            name: `${location.name}, ${location.state}`,
            url: `${siteConfig.siteUrl}/services/${service.slug}/${location.slug}`,
          },
        ])}
      />

      {/* Hero banner — identical treatment to the plain service page. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <Image
            src={service.imageSrc}
            alt={serviceAlt(service)}
            fill
            className="object-cover"
            style={{ objectPosition: service.imagePosition }}
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-paper/60 mb-6">
            <Link href="/" className="hover:text-accent">Home</Link> /{" "}
            <Link href="/services" className="hover:text-accent">Services</Link> /{" "}
            <Link href={`/services/${service.slug}`} className="hover:text-accent">{service.title}</Link> /{" "}
            <span className="text-paper">{location.name}</span>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            Service {service.number} — {location.name}, {location.state}
          </p>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
            {service.title} in {location.name}
          </h1>
          <p className="mt-5 max-w-xl text-paper/85">{service.shortDescription}</p>

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
            {siteConfig.hero.badges.map((b) => (
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

      {/* Description + process — same content as the plain service page. */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="max-w-2xl space-y-4 text-ink/80">
          {service.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {service.process.length > 0 && (
          <div className="mt-12 max-w-2xl">
            <h2 className="font-display text-xl font-semibold">How it works</h2>
            <ol className="mt-4 space-y-4">
              {service.process.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-accent text-sm shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium">{step.step}</p>
                    <p className="text-sm text-ink/70 mt-0.5">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {recentProject && (
          <div className="mt-12 max-w-2xl border-l-2 border-accent pl-6">
            <p className="text-sm uppercase tracking-wide text-accent">Recent project</p>
            <h2 className="font-display text-xl font-semibold mt-1">{recentProject.title}</h2>
            <p className="mt-2 text-ink/70">{recentProject.detail}</p>
          </div>
        )}

        {/* Local conditions, when this location has them — genuine
            location-specific content rather than just a swapped name,
            using data that already exists on the location entry. */}
        {location.localConditions.length > 0 && (
          <div className="mt-12 max-w-2xl">
            <h2 className="font-display text-xl font-semibold">Exterior care in {location.name}</h2>
            <ul className="mt-4 space-y-2 text-ink/80">
              {location.localConditions.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent shrink-0">–</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {(service.signsYouNeedThis.length > 0 || service.costFactors.length > 0) && (
        <section className="bg-ink text-paper px-6 py-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {service.signsYouNeedThis.length > 0 && (
              <div>
                <h2 className="font-display uppercase text-2xl">Signs you might need this</h2>
                <ul className="mt-4 space-y-2 text-paper/80">
                  {service.signsYouNeedThis.map((sign, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent shrink-0">–</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.costFactors.length > 0 && (
              <div>
                <h2 className="font-display uppercase text-2xl">What affects the price</h2>
                <ul className="mt-4 space-y-2 text-paper/80">
                  {service.costFactors.map((factor, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent shrink-0">–</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <MidPageCTA
        heading={`Get a quote for ${service.title.toLowerCase()} in ${location.name}.`}
        subhead="Free estimates, no pressure. We'll walk the site and give you a straight answer."
      />

      <section className="px-6 py-16 max-w-4xl mx-auto">
        {service.faq.length > 0 && (
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold">
              {service.title} in {location.name} — questions people ask
            </h2>
            <div className="mt-4 space-y-6">
              {service.faq.map((item, i) => (
                <div key={i}>
                  <p className="font-medium">{item.q}</p>
                  <p className="mt-1 text-sm text-ink/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-way internal linking, completing the mesh: every other
            location for this same service, and every other service in
            this same location. This is what makes the combo pages
            reachable at all instead of sitting orphaned with no link
            equity flowing to them. */}
        <div className="mt-16 border-t border-accent/20 pt-8">
          <h2 className="font-display text-xl font-semibold">
            {service.title} in other areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {siteConfig.locations
              .filter((l) => l.slug !== location.slug)
              .map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/services/${service.slug}/${l.slug}`}
                    className="inline-block border border-ink/15 rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors"
                  >
                    {service.title} in {l.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="font-display text-xl font-semibold">
            Other services in {location.name}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {siteConfig.services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/${location.slug}`}
                    className="inline-block border border-ink/15 rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors"
                  >
                    {s.title} in {location.name}
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
