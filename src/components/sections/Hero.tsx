"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import LoginLink from "@/components/ui/LoginLink";
import { IconArrow } from "@/components/ui/Icons";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const BASE_PATH = process.env.NODE_ENV === "production" ? "/Fleet-management-website" : "";
const HERO_VIDEO_SRC = `${BASE_PATH}/hero.mp4`;

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [chapterIdx, setChapterIdx] = useState(0);
  const [exitFade, setExitFade] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let cancelled = false;
    let blobUrl: string | null = null;
    let rafId = 0;
    let inView = true;
    let lastTime = 0;
    let smoothed = 0;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fetch video into a local blob so scrubbing never stalls on network range requests
    fetch(HERO_VIDEO_SRC)
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (!blob || cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        const current = video.currentTime || 0;
        video.src = blobUrl;
        video.load();
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (!cancelled && Number.isFinite(video.duration)) {
              video.currentTime = clamp(current, 0, Math.max(0, video.duration - 0.05));
            }
          },
          { once: true }
        );
      })
      .catch(() => {
        // Keep direct /hero.mp4 source if blob fetch fails
      });

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "25% 0px" }
    );
    io.observe(section);

    const computeScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      return scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
    };

    let lastUiChapter = -1;
    let lastExit = -1;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const dt = lastTime ? Math.min(0.1, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;

      if (!inView) return;

      const raw = computeScrollProgress();
      const smoothFactor = reducedMotion ? 1 : 0.16;
      smoothed += (raw - smoothed) * (smoothFactor >= 1 ? 1 : 1 - Math.pow(1 - smoothFactor, dt * 60));
      if (Math.abs(raw - smoothed) < 0.001) smoothed = raw;

      if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = clamp(smoothed * (video.duration - 0.04), 0, Math.max(0, video.duration - 0.04));
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.035) {
          video.currentTime = targetTime;
        }
      }

      const nextChapter = Math.min(4, Math.floor(smoothed * 5));
      if (nextChapter !== lastUiChapter) {
        lastUiChapter = nextChapter;
        setChapterIdx(nextChapter);
      }

      const nextExit = smoothed > 0.88 ? Math.round(clamp((smoothed - 0.88) / 0.12, 0, 1) * 20) / 20 : 0;
      if (nextExit !== lastExit) {
        lastExit = nextExit;
        setExitFade(nextExit);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  const chapter = t.hero.chapters[chapterIdx] ?? t.hero.chapters[0];

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label={t.hero.headline}
      className="relative h-[260vh] md:h-[400vh] bg-[#0B192C] pt-20 text-white"
    >
      {/* Pinned Viewport Offset Cleanly Below the 80px Navbar */}
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] w-full flex-col justify-start overflow-hidden bg-[#0B192C]">
        {/* Layer 1 (z-1): Background Video Shifted Downward with Seamless Alpha Mask */}
        <div className="pointer-events-none absolute inset-0 z-[1] translate-y-[120px] sm:translate-y-[140px] md:translate-y-[155px]">
          <video
            ref={videoRef}
            src={HERO_VIDEO_SRC}
            poster={images.hero}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="h-full w-full object-cover object-bottom"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 100%)",
            }}
          />
        </div>

        {/* Layer 2 (z-2): Uniform Full-Coverage Translucent Dark Navy Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          style={{ backgroundColor: "rgba(11, 25, 44, 0.45)" }}
        />

        {/* Subtle Bottom Transition Fade as Hero Meets Next Section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(11, 25, 44, 0.65) 55%, rgba(245, 247, 250, ${(exitFade * 0.95).toFixed(2)}) 100%)`,
          }}
        />

        {/* Layer 3 (z-3): Free-Floating Centered Cinematic Content */}
        <div className="container relative z-[3] flex flex-col items-center bg-transparent border-none shadow-none pt-5 sm:pt-7 md:pt-9 text-center">
          <div key={chapter.id} className="fade-in flex flex-col items-center space-y-4 sm:space-y-5">
            <h1 className="max-w-[min(92vw,1240px)] text-[clamp(1.75rem,3.1vw,3.15rem)] font-bold leading-[1.2] tracking-tight text-white lg:whitespace-nowrap">
              {chapter.headline}
            </h1>

            <p className="max-w-[760px] text-[15px] leading-relaxed text-white/85 sm:text-lg">
              {chapter.description}
            </p>

            {/* Opening Chapter CTAs */}
            {chapterIdx === 0 && (
              <div className="flex flex-col items-center space-y-3.5 pt-2">
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
                  <a href="#contact" className="btn-primary w-full sm:w-auto shadow-lift">
                    {t.hero.primary}
                    <IconArrow className="h-4 w-4" />
                  </a>
                  <a href="#solutions" className="btn-ghost-light w-full sm:w-auto">
                    {t.hero.secondary}
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-white/75">
                  {t.hero.clientPrefix}{" "}
                  <LoginLink className="font-semibold text-turquoise underline underline-offset-4 hover:text-white transition-colors">
                    {t.hero.clientLink}
                  </LoginLink>
                </p>
              </div>
            )}

            {/* Final Chapter Transition CTA */}
            {chapterIdx === 4 && (
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 pt-2">
                <a href="#contact" className="btn-primary w-full sm:w-auto shadow-lift">
                  {t.hero.primary}
                  <IconArrow className="h-4 w-4" />
                </a>
                <a href="#solutions" className="btn-ghost-light w-full sm:w-auto">
                  {t.hero.secondary}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
