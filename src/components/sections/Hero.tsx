"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import LoginLink from "@/components/ui/LoginLink";
import { IconArrow } from "@/components/ui/Icons";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

const TOTAL_FRAMES = 370;
const MAX_CACHE_SIZE = 90; // Bounded memory footprint (~7 MB RAM)

const getFrameSrc = (index: number) => {
  const padded = String(index).padStart(4, "0");
  return `${BASE_PATH}/assets/hero-sequence-v2/frame_${padded}.webp`;
};

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [chapterIdx, setChapterIdx] = useState(0);
  const [exitFade, setExitFade] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);

  // Cached frame images
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastDrawnFrame = useRef<number>(1);
  const activeFrameRef = useRef<number>(1);

  // Draw frame with pristine high-DPI aspect ratio scaling
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    let offsetX = 0;
    let offsetY = 0;

    // Cover mode: full-bleed cinematic immersion
    if (canvasRatio > imgRatio) {
      drawW = width;
      drawH = width / imgRatio;
      offsetY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgRatio;
      offsetX = (width - drawW) / 2;
      offsetY = (height - drawH) / 2;
    }

    ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawW, drawH);
  }, []);

  // Preload a specific frame index into cache
  const preloadFrame = useCallback((idx: number) => {
    if (idx < 1 || idx > TOTAL_FRAMES || imagesCache.current.has(idx)) return;
    const img = new Image();
    img.src = getFrameSrc(idx);
    img.onload = () => {
      imagesCache.current.set(idx, img);
      if (activeFrameRef.current === idx) {
        drawFrame(img);
        setCanvasReady(true);
      }
    };
    imagesCache.current.set(idx, img);
  }, [drawFrame]);

  // Prune cache to maintain low memory usage
  const pruneCache = useCallback((currentCenter: number) => {
    if (imagesCache.current.size <= MAX_CACHE_SIZE) return;
    const entries = Array.from(imagesCache.current.keys());
    // Sort by distance from current position descending
    entries.sort((a, b) => Math.abs(b - currentCenter) - Math.abs(a - currentCenter));
    const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    toRemove.forEach((key) => {
      // Never delete frame 1 (poster)
      if (key !== 1) {
        imagesCache.current.delete(key);
      }
    });
  }, []);

  // Render a specific frame index (1..TOTAL_FRAMES)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const clamped = clamp(frameIndex, 1, TOTAL_FRAMES);
      activeFrameRef.current = clamped;

      const cached = imagesCache.current.get(clamped);

      if (cached && cached.complete && cached.naturalWidth > 0) {
        lastDrawnFrame.current = clamped;
        drawFrame(cached);
        setCanvasReady(true);
      } else {
        // Fallback to last drawn frame to guarantee 0 flickering
        const fallback = imagesCache.current.get(lastDrawnFrame.current);
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          drawFrame(fallback);
        }
        preloadFrame(clamped);
      }

      // Preload immediate neighbors for smooth scrub (current ± 8 frames)
      for (let offset = 1; offset <= 8; offset++) {
        preloadFrame(clamped + offset);
        preloadFrame(clamped - offset);
      }

      // Memory management
      if (imagesCache.current.size > MAX_CACHE_SIZE + 20) {
        pruneCache(clamped);
      }
    },
    [drawFrame, preloadFrame, pruneCache]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // High-DPI canvas backing sizing
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      // Re-draw current frame
      const current = imagesCache.current.get(lastDrawnFrame.current);
      if (current && current.complete && current.naturalWidth > 0) {
        drawFrame(current);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Step 1: Preload poster frame (frame 1) immediately
    const posterImg = new Image();
    posterImg.src = getFrameSrc(1);
    posterImg.onload = () => {
      imagesCache.current.set(1, posterImg);
      lastDrawnFrame.current = 1;
      drawFrame(posterImg);
      setCanvasReady(true);
    };

    // Step 2: Preload initial buffer (frames 2 to 25)
    for (let i = 2; i <= Math.min(25, TOTAL_FRAMES); i++) {
      preloadFrame(i);
    }

    // Step 3: Progressive idle preloader in background
    let preloadCancelled = false;
    let nextToPreload = 26;

    const preloadBatch = () => {
      if (preloadCancelled || nextToPreload > TOTAL_FRAMES) return;

      const batchSize = 12;
      const target = Math.min(TOTAL_FRAMES, nextToPreload + batchSize);

      for (let i = nextToPreload; i <= target; i++) {
        preloadFrame(i);
      }

      nextToPreload = target + 1;

      if (nextToPreload <= TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
            () => preloadBatch()
          );
        } else {
          setTimeout(preloadBatch, 40);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        () => preloadBatch()
      );
    } else {
      setTimeout(preloadBatch, 200);
    }

    // Step 4: ScrollTrigger connection for scroll-driven progression
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let trigger: ScrollTrigger | null = null;

    if (!prefersReducedMotion) {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Smooth dampening without lag
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1

          // Map normalized progress to frame index (1 to TOTAL_FRAMES)
          const targetFrame = clamp(Math.round(1 + progress * (TOTAL_FRAMES - 1)), 1, TOTAL_FRAMES);
          renderFrame(targetFrame);

          // Update chapter index (0..4) based on progress
          const nextChapter = Math.min(4, Math.floor(progress * 5));
          setChapterIdx(nextChapter);

          // Exit fade as section meets next section
          const nextExit = progress > 0.88 ? Math.round(((progress - 0.88) / 0.12) * 20) / 20 : 0;
          setExitFade(nextExit);
        },
      });
    }

    return () => {
      preloadCancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      if (trigger) trigger.kill();
    };
  }, [drawFrame, preloadFrame, renderFrame]);

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
        {/* Layer 1 (z-1): High-DPI Canvas Rendering the 370-Frame WebP Sequence */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          {/* Explicit LCP Poster Frame (instant render before canvas init) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFrameSrc(1)}
            alt="AWA Fleet Guards connected fleet commercial vehicle"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              canvasReady ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Full-Bleed Canvas */}
          <canvas
            ref={canvasRef}
            className={`h-full w-full block object-cover transition-opacity duration-300 ${
              canvasReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ display: "block" }}
          />
        </div>

        {/* Layer 2 (z-2): Uniform Full-Coverage Translucent Dark Navy Contrast Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full bg-[#0B192C]/50 backdrop-blur-[0.5px]"
        />

        {/* Subtle Bottom Transition Fade as Hero Meets Next Section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(11, 25, 44, 0.65) 55%, rgba(255, 255, 255, ${(exitFade * 0.95).toFixed(2)}) 100%)`,
          }}
        />

        {/* Layer 3 (z-3): Free-Floating Centered Cinematic Content */}
        <div className="container relative z-[3] flex flex-col items-center bg-transparent border-none shadow-none pt-6 sm:pt-8 md:pt-10 text-center">
          <div key={chapter.id} className="fade-in flex flex-col items-center space-y-4 sm:space-y-5">
            {/* Restored Main Headline */}
            <h1 className="max-w-[min(92vw,1240px)] text-[clamp(1.75rem,3.1vw,3.15rem)] font-bold leading-[1.2] tracking-tight text-white lg:whitespace-nowrap drop-shadow-md">
              {chapter.headline}
            </h1>

            {/* Restored Description */}
            <p className="max-w-[760px] text-[15px] leading-relaxed text-white/90 sm:text-lg drop-shadow-sm">
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
                <p className="text-xs sm:text-sm text-white/80">
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
