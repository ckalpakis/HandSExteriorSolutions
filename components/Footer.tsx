import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const { business, nav, services, locations } = siteConfig;
  return (
    <footer className="bg-ink text-paper px-6 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Visible NAP (name/address/phone) — Google cross-checks this
            on-page text against your Google Business Profile and other
            citations, so it needs to be readable HTML, not just JSON-LD.
            itemScope/itemProp mirror the LocalBusiness schema so search
            engines can also pick it up as inline microdata as a backup
            to the JSON-LD in the layout. */}
        <div className="col-span-2" itemScope itemType="https://schema.org/LocalBusiness">
          <p className="font-display text-lg font-semibold" itemProp="name">
            {business.name}
          </p>
          <p className="mt-2 text-paper/60">
            Owner-operated since {business.foundedYear}. Serving{" "}
            {business.city} and {business.region}.
          </p>
          <div className="mt-4 space-y-1 text-paper/70">
            {business.streetAddress && (
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{business.streetAddress}</span>,{" "}
                <span itemProp="addressLocality">{business.city}</span>,{" "}
                <span itemProp="addressRegion">{business.state}</span>{" "}
                <span itemProp="postalCode">{business.postalCode}</span>
              </p>
            )}
            <a href={business.phoneHref} itemProp="telephone" className="block hover:text-paper">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} itemProp="email" className="block hover:text-paper">
              {business.email}
            </a>
          </div>
          {/* Only renders if at least one social URL is set in config —
              a client with no socials yet just doesn't show this row. */}
          <SocialLinks className="mt-5" />
        </div>
        <div>
          <p className="font-medium mb-3">Site</p>
          <ul className="space-y-2 text-paper/70">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium mb-3">Services</p>
          <ul className="space-y-2 text-paper/70">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="hover:text-paper">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium mb-3">Service Areas</p>
          <ul className="space-y-2 text-paper/70">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-paper">
                  {l.name}, {l.state}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-accent/25 text-xs text-paper/50">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
