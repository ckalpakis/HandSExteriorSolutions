import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { serviceAlt } from "@/lib/seo";

export default function ServicesGrid({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section className="px-6 py-20 bg-ink text-paper">
      <div className="max-w-5xl mx-auto">
        <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-accent">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          Services
        </p>
        <Heading className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
          What we <span className="text-accent">do.</span>
        </Heading>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10">
          {siteConfig.services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group relative bg-ink p-8 hover:bg-ink/80 transition-colors"
            >
              <div className="relative h-40 w-full overflow-hidden rounded mb-4">
                <Image
                  src={s.imageSrc}
                  alt={serviceAlt(s)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  style={{ objectPosition: s.imagePosition }}
                />
              </div>
              <span className="text-accent text-sm">{s.number}</span>
              <h3 className="font-display text-xl font-semibold mt-1">{s.title}</h3>
              <p className="mt-2 text-paper/70 text-sm">{s.shortDescription}</p>
              <span className="mt-4 inline-block border border-paper/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest group-hover:border-accent group-hover:text-accent transition-colors">
                View service
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
