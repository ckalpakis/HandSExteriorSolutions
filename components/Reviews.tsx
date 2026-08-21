import { siteConfig } from "@/config/site.config";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={i < rating ? "text-accent" : "text-ink/20"}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  // Homepage shows a clean, scannable set rather than every review on
  // file — same capping principle used for the homepage work gallery.
  const featured = siteConfig.reviews.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="bg-paper px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-accent/40 pt-6">
          <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-accent">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            Reviews
          </p>
          <Heading className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
            What people are <span className="text-accent">saying.</span>
          </Heading>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((review, i) => (
            <div
              key={i}
              className="border border-ink/10 rounded-sm p-6 flex flex-col hover:border-accent transition-colors"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-ink/80 flex-1">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-sm">
                <span className="font-medium">{review.author}</span>
                <span className="text-ink/50 text-xs uppercase tracking-wide">
                  {[review.source, review.location].filter(Boolean).join(" — ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
