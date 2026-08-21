// JSON-LD builders. Kept as plain functions returning objects — render them
// with <JsonLd data={...} /> (components/JsonLd.tsx). Centralizing this
// means every page gets consistent, valid schema instead of hand-rolled
// script tags copy-pasted per page.

import { siteConfig, ServiceEntry, LocationEntry } from "@/config/site.config";

const { business, siteUrl } = siteConfig;

// Sitewide LocalBusiness — render once, in the root layout.
// HomeAndConstructionBusiness is the closest schema.org type for H & S's
// mix of exterior cleaning and permanent or seasonal lighting services.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    "@id": `${siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    priceRange: business.priceRange,
    image: `${siteUrl}${business.logoSrc}`,
    logo: `${siteUrl}${business.logoSrc}`,
    address: {
      "@type": "PostalAddress",
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    areaServed: siteConfig.locations.map((l) => ({
      "@type": "City",
      name: `${l.name}, ${l.state}`,
    })),
    sameAs: Object.values(business.socialLinks).filter(
      (url): url is string => !!url
    ),
  };
}

export function serviceSchema(service: ServiceEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    url: `${siteUrl}/services/${service.slug}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: siteConfig.locations.map((l) => ({
      "@type": "City",
      name: `${l.name}, ${l.state}`,
    })),
  };
}

export function locationServiceSchema(location: LocationEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${business.name} — ${location.name}, ${location.state}`,
    description: location.metaDescription,
    url: `${siteUrl}/locations/${location.slug}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: {
      "@type": "City",
      name: `${location.name}, ${location.state}`,
    },
  };
}

// The service × location combo page — e.g. "Window Cleaning in Tampa, FL"
// at /services/window-cleaning/tampa. This is what directly targets
// "[service] in [town]" searches; the plain service page and plain
// location page alone don't target that specific query as directly.
export function serviceLocationSchema(service: ServiceEntry, location: LocationEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} in ${location.name}, ${location.state}`,
    description: `${service.metaDescription} Serving ${location.name}, ${location.state}.`,
    url: `${siteUrl}/services/${service.slug}/${location.slug}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: {
      "@type": "City",
      name: `${location.name}, ${location.state}`,
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
