"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";

type FieldVideo = (typeof siteConfig.fieldVideos)[number];

function isFacebookEmbed(v: FieldVideo): v is FieldVideo & { facebookUrl: string } {
  return "facebookUrl" in v && !!v.facebookUrl;
}

export default function VideoGallery() {
  const refs = useRef<Array<HTMLVideoElement | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  function play(i: number) {
    refs.current[i]?.play();
    setPlayingIndex(i);
  }

  function stop(i: number) {
    const el = refs.current[i];
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlayingIndex((current) => (current === i ? null : current));
  }

  function handleTap(i: number) {
    // Touch devices get no hover event, so a tap toggles play/pause
    // directly instead of relying on mouseenter/mouseleave.
    if (playingIndex === i) {
      stop(i);
    } else {
      if (playingIndex !== null) stop(playingIndex);
      play(i);
    }
  }

  // H & S has not supplied field-video entries yet. Do not render a
  // generic "real jobsites" section until there is real footage to show.
  if (siteConfig.fieldVideos.length === 0) return null;

  return (
    <section className="bg-surface text-paper px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-accent/30 pt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden />
              On the job
            </p>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-none mt-3">
              In the <span className="text-accent">field.</span>
            </h2>
          </div>
          <p className="text-paper/60 text-sm max-w-xs md:text-right">
            Recent footage from real jobsites across {siteConfig.business.region}. Hover to play — tap on mobile.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {siteConfig.fieldVideos.map((v, i) => {
            if (isFacebookEmbed(v)) {
              // Facebook's embed is a cross-origin iframe — it can't be
              // programmatically played on hover the way a self-hosted
              // <video> can, so this renders Facebook's own player
              // (its own play button/controls) instead of the custom
              // hover-to-play card. The source video/post must be Public
              // on Facebook or the embed will show an error instead.
              const embedSrc = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(
                v.facebookUrl
              )}&show_text=false`;
              return (
                <div key={v.label} className="relative aspect-[3/4] overflow-hidden bg-paper/5">
                  <iframe
                    src={embedSrc}
                    className="absolute inset-0 h-full w-full border-0"
                    title={v.label}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <span className="absolute bottom-3 left-3 z-10 bg-accent text-paper text-xs font-semibold uppercase tracking-wide px-3 py-1.5 pointer-events-none">
                    {v.label}
                  </span>
                </div>
              );
            }

            return (
              <button
                key={v.label}
                type="button"
                aria-label={`Play video: ${v.label}`}
                className="group relative aspect-[3/4] overflow-hidden bg-paper/5 cursor-pointer text-left"
                onMouseEnter={() => play(i)}
                onMouseLeave={() => stop(i)}
                onClick={() => handleTap(i)}
              >
                <video
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  src={v.videoSrc}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Play affordance — visible by default, fades once playing
                    so it doesn't sit on top of the footage the whole time. */}
                <span
                  className={`absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 transition-opacity ${
                    playingIndex === i ? "opacity-0" : "opacity-100"
                  }`}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <span className="absolute bottom-3 left-3 bg-accent text-paper text-xs font-semibold uppercase tracking-wide px-3 py-1.5">
                  {v.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
