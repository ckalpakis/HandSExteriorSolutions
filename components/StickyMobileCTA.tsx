import Link from "next/link";
import { siteConfig } from "@/config/site.config";

/**
 * Fixed to the bottom of the viewport on mobile only. Service and
 * location pages are long — this keeps the two highest-intent actions
 * (call, request quote) reachable without scrolling back up, instead of
 * relying on a visitor to find the header or a CTA buried in the page.
 * pb-16 spacer classes should be added by the page itself if content
 * would otherwise sit underneath this bar at the very bottom of the page.
 */
export default function StickyMobileCTA() {
  const { business } = siteConfig;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t border-accent/30 px-4 py-3 flex gap-3">
      <a
        href={business.phoneHref}
        className="flex-1 border border-paper/40 text-paper text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm"
      >
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex-1 bg-accent text-paper text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm"
      >
        Get a Quote
      </Link>
    </div>
  );
}
