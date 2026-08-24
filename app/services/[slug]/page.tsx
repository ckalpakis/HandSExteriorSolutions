import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MidPageCTA from "@/components/MidPageCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/config/site.config";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { serviceAlt } from "@/lib/seo";

// Pre-render one static page per service at build time.
export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return siteConfig.services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.business.name}`,
      description: service.metaDescription,
      images: [{ url: service.imageSrc }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const { business } = siteConfig;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      {service.faq.length > 0 && <JsonLd data={faqSchema(service.faq)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Services", url: `${siteConfig.siteUrl}/services` },
          { name: service.title, url: `${siteConfig.siteUrl}/services/${service.slug}` },
        ])}
      />

      {/* Hero banner — same visual language as the homepage hero: dark
          overlay on a real photo, condensed uppercase display headline,
          dual CTA, trust badges. This is what makes a service page feel
          like part of the same site instead of a bolted-on info page. */}
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
            <span className="text-paper">{service.title}</span>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            Service {service.number}
          </p>
          <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
            {service.h1}
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

      {/* Description + process — light section */}
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

        {service.recentProject && (
          <div className="mt-12 max-w-2xl border-l-2 border-accent pl-6">
            <p className="text-sm uppercase tracking-wide text-accent">Recent project</p>
            <h2 className="font-display text-xl font-semibold mt-1">
              {service.recentProject.title}
            </h2>
            <p className="mt-2 text-ink/70">{service.recentProject.detail}</p>
          </div>
        )}
      </section>

      {/* Signs you need this + cost factors — dark two-column block,
          breaking up the page rhythm the same way the homepage
          alternates light/dark sections instead of one long scroll of
          identical white panels. */}
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
        heading={`Get a quote for ${service.title.toLowerCase()}.`}
        subhead="Free estimates, no pressure. We'll walk the site and give you a straight answer."
      />

      {/* FAQ + embedded quote form — light section. The form is embedded
          directly here instead of only linking to /contact: every extra
          click between "convinced" and "submitted" loses visitors, and
          this is exactly the moment someone reading a service page is
          most ready to convert. */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        {service.faq.length > 0 && (
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold">
              {service.title} — questions people ask
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

        {/* Internal linking mesh: every service links to the combo page
            for each location we serve (not just the generic location
            page), so a visitor lands directly on the page that actually
            targets "[service] in [town]". Styled as pill buttons rather
            than plain underlines — more obviously clickable. */}
        <div className="mt-16 border-t border-accent/20 pt-8">
          <h2 className="font-display text-xl font-semibold">
            {service.title} across {siteConfig.business.region}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {siteConfig.locations.map((l) => (
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
      </section>

      <QuoteForm headingLevel="h2" />

      {/* Spacer so the sticky mobile bar never covers the last bit of
          content on short viewports. */}
      <div className="md:hidden h-20" aria-hidden />
      <StickyMobileCTA />
    </>
  );
}
