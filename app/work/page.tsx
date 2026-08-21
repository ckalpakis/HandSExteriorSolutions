import type { Metadata } from "next";
import Link from "next/link";
import WorkGallery from "@/components/WorkGallery";
import MidPageCTA from "@/components/MidPageCTA";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Our Work",
  description: `Recent projects completed by ${siteConfig.business.name} across ${siteConfig.business.region}.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Work", url: `${siteConfig.siteUrl}/work` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="bg-ink text-xs text-paper/60 px-6 pt-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="hover:text-accent">Home</Link> /{" "}
          <span className="text-paper">Work</span>
        </div>
      </nav>
      <WorkGallery headingLevel="h1" variant="grid" />
      {/* This page used to end on the last photo with nothing to do next
          — someone who scrolled a full portfolio and liked what they saw
          had no obvious way to act on that right here. */}
      <MidPageCTA
        heading="Like what you see?"
        subhead="Free estimates, no pressure. Tell us about the project."
      />
      <QuoteForm headingLevel="h2" />
    </>
  );
}
