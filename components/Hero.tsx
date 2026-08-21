"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";

export default function Hero() {
  const { hero, business } = siteConfig;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      video.loop = true;
      setContentVisible(true);
      return;
    }

    // If autoplay is blocked, reveal the calls to action instead of
    // leaving the hero unusable behind a paused poster frame.
    void video.play().catch(() => setContentVisible(true));
  }, []);

  function handleFirstPlaythroughEnd() {
    const video = videoRef.current;
    setContentVisible(true);

    // The first playthrough must not use the loop attribute because
    // looping videos do not reliably emit `ended`. Enable looping only
    // after that first `ended` event has revealed the hero content.
    if (video && !video.loop) {
      video.loop = true;
      void video.play();
    }
  }

  const revealClass = contentVisible
    ? "opacity-100 translate-y-0"
    : "pointer-events-none opacity-0 translate-y-3";
  // The seamless loop technique needs exactly two identical halves
  // (track translates 0 -> -50%). With only a handful of short marquee
  // items, two copies can be narrower than a wide monitor, so the loop
  // visibly runs out and shows empty space before repeating. Repeating
  // the base list several times into one "unit" first — then doubling
  // that unit — keeps the same seamless math while guaranteeing the
  // track is wide enough to never run dry on any screen size.
  const unit = Array(6).fill(hero.marqueeItems).flat();
  const marquee = [...unit, ...unit];

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden text-paper">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={hero.videoSrc}
        poster={hero.posterSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleFirstPlaythroughEnd}
        onError={() => setContentVisible(true)}
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${revealClass}`}
      >
        <Image
          src={business.logoSrc}
          alt={business.name}
          width={480}
          height={200}
          className="h-36 md:h-52 w-auto object-contain mb-8"
        />

        {/* This is the one slot that differs from the reference by design:
            the reference puts a plain descriptive line here, this site
            puts the actual page H1 here instead — same position,
            different tag for SEO (one H1 per page, see Hero elsewhere). */}
        <h1 className="max-w-2xl text-2xl md:text-4xl font-medium text-paper leading-snug">
          {hero.headline}
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={hero.ctaPrimary.href}
            className="bg-accent text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={business.phoneHref}
            className="border border-paper/40 text-paper px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-paper/10 transition-colors"
          >
            {business.phone}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {hero.badges.map((b) => (
            <span
              key={b}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-paper/80"
            >
              <span className="h-1.5 w-1.5 bg-accent inline-block shrink-0" aria-hidden />
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className={`absolute bottom-28 right-8 z-10 hidden sm:flex flex-col items-center gap-3 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <span
          className="text-[10px] uppercase tracking-widest text-paper/70"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <span className="h-10 w-px bg-paper/40" aria-hidden />
      </div>

      <div className={`absolute bottom-28 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${contentVisible ? "opacity-100" : "opacity-0"}`} aria-hidden>
        <span className="block h-1 w-6 rounded-full bg-paper/50" />
      </div>

      <div className={`absolute bottom-0 left-0 right-0 z-10 border-t border-accent/30 bg-ink/60 py-5 overflow-hidden transition-opacity duration-1000 ease-out motion-reduce:transition-none ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="marquee-track text-lg md:text-xl font-medium uppercase tracking-wide">
          {marquee.map((item, i) => (
            <span key={i} className="px-8 whitespace-nowrap">
              {item} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
