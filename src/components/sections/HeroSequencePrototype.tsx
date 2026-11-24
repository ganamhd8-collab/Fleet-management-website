"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

const TOTAL_FRAMES = 150;
const FRAME_ASPECT_RATIO = 16 / 9; // 1280x720 video source

const getFrameSrc = (index: number) => {
  const padded = String(index).padStart(4, "0");
  return `${BASE_PATH}/assets/hero-sequence/frame_${padded}.webp`;
};

export default function HeroSequencePrototype() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached HTMLImageElement instances
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastDrawnFrame = useRef<number>(1);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Helper to draw an image onto the canvas respecting aspect ratio without distortion
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Calculate 'contain' / 'cover' scaling preserving aspect ratio
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    let offsetX = 0;
    let offsetY = 0;

    // Use cover scaling on landscape viewports for full cinematic immersion,
    // and contain scaling on tall portrait viewports to prevent cropping the truck
    const isPortrait = canvasRatio < 1.0;

    if (isPortrait) {
      // Contain mode: entire truck and road remain fully in view
      if (canvasRatio > imgRatio) {
        drawW = height * imgRatio;
        offsetX = (width - drawW) / 2;
      } else {
        drawH = width / imgRatio;
        offsetY = (height - drawH) / 2;
      }
    } else {
      // Cover mode: perfectly centered full-bleed cinematic immersion
      if (canvasRatio > imgRatio) {
        drawH = width / imgRatio;
        offsetY = (height - drawH) / 2;
      } else {
        drawW = height * imgRatio;
        offsetX = (width - drawW) / 2;
        offsetY = (height - drawH) / 2;
      }
    }

    ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawW, drawH);
  }, []);

  // Render a specific frame index (1..TOTAL_FRAMES)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex));
      const cached = imagesCache.current.get(clamped);

      if (cached && cached.complete && cached.naturalWidth > 0) {
        lastDrawnFrame.current = clamped;
        drawFrame(cached);
      } else {
        // Fallback to the last successfully drawn frame to eliminate flickering
        const fallback = imagesCache.current.get(lastDrawnFrame.current);
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          drawFrame(fallback);
        }

        // High priority on-demand load for the requested frame
        if (!cached) {
          const img = new Image();
          img.src = getFrameSrc(clamped);
          img.onload = () => {
            imagesCache.current.set(clamped, img);
            if (lastDrawnFrame.current === clamped) {
              drawFrame(img);
            }
          };
          imagesCache.current.set(clamped, img);
        }
      }
    },
    [drawFrame]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!canvas || !container || !pin) return;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      // Re-render current frame after resize
      renderFrame(lastDrawnFrame.current);
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
      setInitialLoaded(true);
    };

    // Step 2: Preload initial buffer (frames 2 to 20) with high priority
    for (let i = 2; i <= Math.min(20, TOTAL_FRAMES); i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => imagesCache.current.set(i, img);
      imagesCache.current.set(i, img);
    }

    // Step 3: Progressively preload remaining frames in idle time
    let preloadCancelled = false;
    let nextToPreload = 21;

    const preloadBatch = () => {
      if (preloadCancelled || nextToPreload > TOTAL_FRAMES) return;

      const batchSize = 10;
      const target = Math.min(TOTAL_FRAMES, nextToPreload + batchSize);

      for (let i = nextToPreload; i <= target; i++) {
        if (!imagesCache.current.has(i)) {
          const img = new Image();
          img.src = getFrameSrc(i);
          img.onload = () => imagesCache.current.set(i, img);
          imagesCache.current.set(i, img);
        }
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

    // Step 4: Setup GSAP ScrollTrigger for smooth frame scrubbing
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let trigger: ScrollTrigger | null = null;

    if (!prefersReducedMotion) {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=2600", // Pinned scroll track (~17px per frame for buttery control)
        pin: pin,
        pinSpacing: true,
        scrub: 0.1, // Smooth dampening without lag
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map normalized progress (0 to 1) to frame (1 to TOTAL_FRAMES)
          const targetFrame = Math.round(1 + self.progress * (TOTAL_FRAMES - 1));
          renderFrame(targetFrame);
        },
      });
    }

    return () => {
      preloadCancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      if (trigger) trigger.kill();
    };
  }, [drawFrame, renderFrame]);

  return (
    <section
      ref={containerRef}
      id="hero-sequence-prototype"
      className="relative w-full bg-[#0a0f1d] text-white overflow-hidden"
      aria-label="AWA Fleet Guards Hero Image Sequence Scrollytelling Prototype"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#0a0f1d] overflow-hidden"
      >
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="h-full w-full block object-contain"
          style={{ display: "block" }}
        />

        {/* Fallback Static Poster for Reduced Motion or Slow Networks */}
        {!initialLoaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getFrameSrc(1)}
            alt="AWA Fleet Guards Commercial Fleet in Motion"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        )}
      </div>
    </section>
  );
}
