import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Contact / Free Quote",
  description: `Request a free quote from ${siteConfig.business.name}. Call ${siteConfig.business.phone} or send project details.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { hero } = siteConfig;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Contact", url: `${siteConfig.siteUrl}/contact` },
        ])}
      />
      <div className="px-6 pt-8 max-w-xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-ink/50">
          <Link href="/" className="hover:text-accent">Home</Link> /{" "}
          <span className="text-ink">Contact</span>
        </nav>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {hero.badges.map((b) => (
            <span
              key={b}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink/60"
            >
              <span className="h-1.5 w-1.5 bg-accent inline-block shrink-0" aria-hidden />
              {b}
            </span>
          ))}
        </div>
      </div>
      <QuoteForm headingLevel="h1" />
    </>
  );
}
