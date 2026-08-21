import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  const { business } = siteConfig;
  return (
    <section className="bg-ink text-paper px-6 py-24 md:py-32 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          404
        </p>
        <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
          Page not <span className="text-accent">found.</span>
        </h1>
        <p className="mt-5 text-paper/70 max-w-md mx-auto">
          That page moved or never existed. Here's how to get back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-accent text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
          <a
            href={business.phoneHref}
            className="border border-paper/40 text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-paper/10 transition-colors"
          >
            {business.phone}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/services" className="underline hover:text-accent">Services</Link>
          <Link href="/locations" className="underline hover:text-accent">Service Areas</Link>
          <Link href="/work" className="underline hover:text-accent">Our Work</Link>
          <Link href="/contact" className="underline hover:text-accent">Contact</Link>
        </div>
      </div>
    </section>
  );
}
