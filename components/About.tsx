import { siteConfig } from "@/config/site.config";

export default function About({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const { about, services } = siteConfig;
  const Heading = headingLevel;

  // "Core Services" is computed from the actual services array instead of
  // hardcoded in config, so it never goes stale when a service is added
  // or removed — the stat and the services page can't drift apart.
  const stats = [
    { value: String(services.length), label: "Core Services" },
    ...about.stats,
  ];

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-accent">
        <span className="inline-block h-px w-6 bg-accent" aria-hidden />
        {about.eyebrow}
      </p>
      <Heading className="font-display uppercase text-4xl md:text-5xl leading-tight mt-3">
        {about.heading}
      </Heading>
      <div className="mt-6 space-y-4 text-ink/80">
        {about.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-accent/40 pt-4">
            <div className="font-display text-2xl">{s.value}</div>
            <div className="text-sm text-ink/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
