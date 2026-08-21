import Link from "next/link";
import { siteConfig } from "@/config/site.config";

/**
 * A high-contrast conversion push dropped partway down a long page — the
 * single CTA at the very bottom of a service/location page only reaches
 * visitors who read the whole thing. This catches the rest.
 */
export default function MidPageCTA({
  heading = "Ready to get started?",
  subhead = "Free estimates, no pressure. Tell us about the project.",
}: {
  heading?: string;
  subhead?: string;
}) {
  const { business } = siteConfig;
  return (
    <section className="bg-accent text-paper px-6 py-14">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="font-display uppercase text-2xl md:text-3xl leading-tight">
            {heading}
          </h2>
          <p className="mt-2 text-paper/85 text-sm max-w-md">{subhead}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/contact"
            className="bg-ink text-paper px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity text-center"
          >
            Get a Free Quote
          </Link>
          <a
            href={business.phoneHref}
            className="border border-paper text-paper px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-paper/10 transition-colors text-center"
          >
            {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
