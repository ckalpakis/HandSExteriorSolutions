"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { galleryAlt } from "@/lib/seo";

const HOME_LIMIT = 8;

export default function WorkGallery({
  headingLevel = "h2",
  variant = "scroll",
}: {
  headingLevel?: "h1" | "h2";
  // "scroll": homepage — capped at 8 images, horizontal scroll strip with
  // a sliding progress indicator, links out to the full portfolio.
  // "grid": /work page — every gallery image, full-width grid, no cap.
  variant?: "scroll" | "grid";
}) {
  const Heading = headingLevel;
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });

  const items = variant === "scroll" ? siteConfig.gallery.slice(0, HOME_LIMIT) : siteConfig.gallery;

  function updateThumb() {
    const el = scrollRef.current;
    if (!el) return;
    const trackWidth = el.scrollWidth || 1;
    setThumb({
      left: (el.scrollLeft / trackWidth) * 100,
      width: Math.max((el.clientWidth / trackWidth) * 100, 8),
    });
  }

  // The progress bar used to be purely decorative — it reflected scroll
  // position but had no pointer handlers, so clicking or dragging it did
  // nothing. Combined with the hidden native scrollbar (no-scrollbar),
  // that left no discoverable way to scroll for anyone not already
  // swiping a trackpad. This makes it an actual functional scrollbar:
  // click anywhere on the track to jump there, drag the thumb to scroll.
  function scrollToClientX(clientX: number) {
    const track = trackRef.current;
    const el = scrollRef.current;
    if (!track || !el) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollToClientX(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    scrollToClientX(e.clientX);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function handleTrackKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    if (e.key === "ArrowRight") el.scrollLeft += step;
    if (e.key === "ArrowLeft") el.scrollLeft -= step;
  }

  useEffect(() => {
    if (variant !== "scroll") return;
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <section className="bg-ink text-paper px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-accent/30 pt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden />
              Recent work
            </p>
            <Heading className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
              Our <span className="text-accent">work.</span>
            </Heading>
          </div>
          {variant === "scroll" && (
            <Link
              href="/work"
              className="shrink-0 border border-accent text-accent text-xs font-semibold uppercase tracking-widest px-5 py-3 hover:bg-accent hover:text-paper transition-colors"
            >
              See full portfolio
            </Link>
          )}
        </div>
      </div>

      {variant === "scroll" ? (
        <>
          <div
            ref={scrollRef}
            id="work-gallery-scroll"
            onScroll={updateThumb}
            className="mt-10 flex gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {items.map((g, i) => (
              <div key={i} className="snap-start shrink-0 w-[75vw] sm:w-[45vw] md:w-[22vw]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={g.imageSrc} alt={galleryAlt(g)} fill className="object-cover" />
                </div>
                <div className="pt-3 pr-4">
                  <p className="text-accent text-xs font-semibold uppercase tracking-widest">
                    {g.category}
                  </p>
                  <p className="font-display uppercase text-lg leading-tight mt-1">
                    {g.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Functional scrollbar standing in for the native one — click
              anywhere on the track to jump there, drag the thumb to
              scroll continuously. h-4 gives a comfortable hit target;
              the visible bar inside it stays thin. */}
          <div className="max-w-6xl mx-auto mt-4 px-0">
            <div
              ref={trackRef}
              role="scrollbar"
              aria-orientation="horizontal"
              aria-controls="work-gallery-scroll"
              aria-valuenow={Math.round(thumb.left)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleTrackKeyDown}
              className="relative h-4 flex items-center cursor-pointer touch-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="h-0.5 w-full bg-paper/15 rounded-full" aria-hidden />
              <div
                className="absolute inset-y-0 my-auto h-1.5 rounded-full bg-accent cursor-grab active:cursor-grabbing"
                style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }}
                aria-hidden
              />
            </div>
          </div>
        </>
      ) : (
        // Edge-to-edge, no gaps, no rounding — a filmstrip of real jobsite
        // photos reads as more credible than a padded, rounded gallery grid.
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4">
          {items.map((g, i) => (
            <div key={i}>
              <div className="relative aspect-square overflow-hidden">
                <Image src={g.imageSrc} alt={galleryAlt(g)} fill className="object-cover" />
              </div>
              <div className="pt-3 px-3 pb-6">
                <p className="text-accent text-xs font-semibold uppercase tracking-widest">
                  {g.category}
                </p>
                <p className="font-display uppercase text-lg leading-tight mt-1">
                  {g.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
