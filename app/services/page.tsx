import type { Metadata } from "next";
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";
import MidPageCTA from "@/components/MidPageCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Services",
  description: `All services offered by ${siteConfig.business.name} across ${siteConfig.business.region}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Services", url: `${siteConfig.siteUrl}/services` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="bg-ink text-xs text-paper/60 px-6 pt-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="hover:text-accent">Home</Link> /{" "}
          <span className="text-paper">Services</span>
        </div>
      </nav>
      <ServicesGrid headingLevel="h1" />
      <MidPageCTA
        heading="Don't see exactly what you need?"
        subhead="Tell us about the project — free estimates, no pressure."
      />
    </>
  );
}
