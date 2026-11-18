"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const VIDEO_1080 =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4";
const VIDEO_720 =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4";
const VIDEO_POSTER =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg";

const A = 2.4; // Viewports dedicated to scrubbing the handling video clip

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Crisp 38px white stroke icons for the 3 How It Works steps */
function StepStrokeIcon({ step }: { step: string }) {
  const common = {
    width: 38,
    height: 38,
    viewBox: "0 0 38 38",
    fill: "none",
    stroke: "#FFFFFF",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (step === "01") {
    return (
      <svg {...common}>
        <rect x="7" y="11" width="10" height="16" rx="2" />
        <rect x="21" y="11" width="10" height="16" rx="2" />
        <path d="M17 19h4M12 7v4M26 7v4" />
      </svg>
    );
  }
  if (step === "02") {
    return (
      <svg {...common}>
        <rect x="5" y="7" width="28" height="19" rx="2.5" />
        <path d="M11 17h4l2.5-5 3.5 9 2.5-4H27M14 31h10M19 26v5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 27l7-7 5 4 11-12" />
      <path d="M23 12h7v7" />
      <path d="M7 31h24" opacity="0.45" />
    </svg>
  );
}

export default function HowItWorks() {
  const { t, lang, dir } = useLanguage();

  const trackRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [videoSrc, setVideoSrc] = useState<string>(VIDEO_1080);
  const [trackHeightVh, setTrackHeightVh] = useState<number>(480);
  const [settled, setSettled] = useState<boolean>(false);
  const [speedKmh, setSpeedKmh] = useState<number>(0);

  const leadLines =
    lang === "ar"
      ? ["من ربط المركبات", "إلى إدارة", "أكثر ذكاءً."]
      : ["FROM CONNECTED VEHICLES", "TO SMARTER", "OPERATIONS."];

  const leadIntro =
    lang === "ar"
      ? "اربط أجهزة أسطولك بمنصتنا المركزية وحوّل بيانات المركبات إلى قرارات تشغيلية دقيقة."
      : "Connect your fleet hardware to our centralized platform and turn raw vehicle telemetry into actionable operational intelligence.";

  useEffect(() => {
    const updateSource = () => {
      setVideoSrc(window.innerWidth <= 900 ? VIDEO_720 : VIDEO_1080);
    };
    updateSource();
    window.addEventListener("resize", updateSource);
    return () => window.removeEventListener("resize", updateSource);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const video = videoRef.current;
    const giant = giantRef.current;
    const band = bandRef.current;
    const strip = stripRef.current;
    if (!track || !scene || !video || !strip) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bFactor = 1.6;
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let stripWidth = strip.scrollWidth;
    let edgePx = Math.round(vh * 0.448);

    const measureLayout = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      stripWidth = strip.scrollWidth || 1400;
      bFactor = ((stripWidth + 0.45 * vw) / Math.max(1, vw)) * 1.1;
      setTrackHeightVh((1 + A + bFactor) * 100);

      const isMobile = vw < 768 || vh > vw;
      if (isMobile) {
        edgePx = Math.round(vh * 0.36);
        scene.style.setProperty("--edge-px", `${edgePx}px`);
      } else {
        const vr = video.getBoundingClientRect();
        const sr = scene.getBoundingClientRect();
        const clipTop = vr.top - sr.top;
        const clipHeight = vr.height || vh;
        const rawEdge = Math.round(clipTop + 0.448 * clipHeight);
        edgePx = clamp(rawEdge, Math.round(vh * 0.3), Math.round(vh * 0.65));
        scene.style.setProperty("--edge-px", `${edgePx}px`);
      }
    };

    measureLayout();
    const ro = new ResizeObserver(measureLayout);
    ro.observe(scene);
    ro.observe(strip);
    ro.observe(video);
    video.addEventListener("loadedmetadata", measureLayout);

    let rafId = 0;
    let inView = false;
    let curTime = 0;
    let lastScrollY = window.scrollY;
    let lastTs = performance.now();
    let smoothedSpeed = 0;
    let lastSettled = false;
    let lastShownSpeed = -1;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "40% 0px" }
    );
    io.observe(track);

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const dt = Math.max(1, now - lastTs);
      lastTs = now;

      const curScrollY = window.scrollY;
      const dy = Math.abs(curScrollY - lastScrollY);
      lastScrollY = curScrollY;

      if (!inView) return;

      const trackRect = track.getBoundingClientRect();
      const sectionScrollY = Math.max(0, -trackRect.top);

      // 1. Video scrub progress q (0..1 across A viewports)
      const q = clamp(sectionScrollY / (A * vh), 0, 1);

      if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = q * Math.min(video.duration, 3.75);
        curTime = reducedMotion ? targetTime : curTime + (targetTime - curTime) * 0.2;
        if (!video.seeking && Math.abs(curTime - video.currentTime) > 1 / 60) {
          video.currentTime = clamp(curTime, 0, Math.max(0, video.duration - 0.02));
        }
      }

      // 2. Settled state (q >= 0.94), band rise (0.55 -> 0.94), & speed readout
      if (band) {
        const bandReveal = reducedMotion ? 1 : clamp((q - 0.55) / 0.39, 0, 1);
        const riseY = Math.round((1 - bandReveal) * Math.max(0, vh - edgePx));
        band.style.transform = `translate3d(0, ${riseY}px, 0)`;
      }

      const isSettledNow = q >= 0.94;
      if (isSettledNow !== lastSettled) {
        lastSettled = isSettledNow;
        setSettled(isSettledNow);
      }

      const rawVel = Math.min(99, Math.round(((dy / dt) * 1000) / 32));
      smoothedSpeed += (rawVel - smoothedSpeed) * 0.15;
      const displaySpeed = Math.min(99, Math.round(smoothedSpeed));
      if (displaySpeed !== lastShownSpeed) {
        lastShownSpeed = displaySpeed;
        setSpeedKmh(displaySpeed);
      }

      // 3. Horizontal strip & Giant background letters progress r (0..1 across B viewports)
      const r = clamp((sectionScrollY - A * vh) / Math.max(1, bFactor * vh), 0, 1);
      const tx = vw - r * (stripWidth + 0.45 * vw);
      strip.style.transform = `translate3d(${dir === "rtl" ? -tx : tx}px, 0, 0)`;

      if (giant) {
        const gx = vw * 0.35 - r * (vw * 0.95);
        giant.style.transform = `translate3d(${dir === "rtl" ? -gx : gx}px, 0, 0)`;
      }

      // 4. Sky-blue to white gradient sweep on each card as it enters
      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        const cr = cardEl.getBoundingClientRect();
        const enterRatio =
          dir === "rtl"
            ? clamp((cr.right - vw * 0.05) / (vw * 0.48), 0, 1)
            : clamp((vw - cr.left) / (vw * 0.48), 0, 1);
        const pWhite = Math.round(enterRatio * 100);
        const pBlue = clamp(pWhite + 16, 0, 100);
        const pEnd = clamp(pWhite + 34, 0, 100);
        cardEl.style.setProperty("--sweep-w", `${pWhite}%`);
        cardEl.style.setProperty("--sweep-b", `${pBlue}%`);
        cardEl.style.setProperty("--sweep-e", `${pEnd}%`);
      });
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      video.removeEventListener("loadedmetadata", measureLayout);
    };
  }, [dir, lang]);

  return (
    <section
      ref={trackRef}
      id="how-it-works"
      aria-label={t.how.headline}
      className="how-it-works-track relative bg-white"
      style={{ height: `${trackHeightVh}vh` }}
    >
      <div
        ref={sceneRef}
        className="how-it-works-scene sticky top-0 h-screen w-full overflow-hidden bg-white"
        style={{ "--edge-px": "44.8vh" } as React.CSSProperties}
      >
        {/* Top-left Speed Readout (fades in once q >= 0.94) */}
        <div
          dir="ltr"
          className={`pointer-events-none absolute top-24 left-6 z-30 font-mono text-xs font-semibold tracking-widest text-navy/75 transition-opacity duration-300 ${
            settled ? "opacity-100" : "opacity-0"
          }`}
        >
          {String(speedKmh).padStart(2, "0")} KM/H
        </div>

        {/* Giant Background Letters ("HOW IT WORKS") in Anton with mix-blend-darken */}
        <div
          ref={giantRef}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 select-none whitespace-nowrap uppercase text-[#e9e9e9] ${
            lang === "ar" ? "font-bold tracking-tight" : "font-anton tracking-normal"
          }`}
          style={{
            bottom: "calc(100vh - var(--edge-px))",
            fontSize: "clamp(140px, 22vw, 330px)",
            lineHeight: 0.8,
            mixBlendMode: "darken",
          }}
        >
          {lang === "ar" ? "كيف نعمل" : "HOW IT WORKS"}
        </div>

        {/* Scrubbed Handling Video Layer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-full items-start justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={VIDEO_POSTER}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="h-auto w-[155vw] max-w-none mt-[calc(36vh-0.448*100%)] md:mt-0 md:w-full md:h-full object-cover object-center"
          />
        </div>

        {/* Lower #2a7ebd Ground Band + Horizontal 3-Step Strip (rises cleanly as scroll progresses) */}
        <div
          ref={bandRef}
          className="absolute inset-x-0 bottom-0 z-20 flex items-center overflow-hidden bg-[#2a7ebd] will-change-transform"
          style={{ top: "var(--edge-px)", transform: "translate3d(0, 100%, 0)" }}
        >
          <div
            ref={stripRef}
            className="flex items-start will-change-transform gap-[56px] md:gap-[120px] px-4"
          >
            {/* Lead Block: 3-line Headline + Intro Paragraph */}
            <div className="flex shrink-0 items-start gap-8 md:gap-12">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-white whitespace-nowrap ${
                  lang === "ar" ? "font-bold tracking-tight" : "font-anton uppercase tracking-wide"
                }`}
              >
                <span className="block">{leadLines[0]}</span>
                <span className="block">{leadLines[1]}</span>
                <span className="block text-[#14213D]">{leadLines[2]}</span>
              </h2>
              <p className="max-w-[260px] text-sm leading-relaxed text-white/85">
                {leadIntro}
              </p>
            </div>

            {/* 3 Horizontal Strip Cards (01 Connect, 02 Monitor, 03 Optimize) */}
            <div className="flex shrink-0 items-stretch">
              {t.how.steps.map((step, idx) => (
                <div
                  key={step.n}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={
                    {
                      "--sweep-w": "100%",
                      "--sweep-b": "100%",
                      "--sweep-e": "100%",
                    } as React.CSSProperties
                  }
                  className={`w-[260px] md:w-[320px] shrink-0 px-[32px] flex flex-col justify-start ${
                    idx > 0 ? "border-s border-white/25" : ""
                  }`}
                >
                  <div className="mb-5">
                    <StepStrokeIcon step={step.n} />
                  </div>

                  <h3
                    className={`text-xl leading-snug ${
                      lang === "ar" ? "font-bold" : "font-anton uppercase tracking-wide"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(${
                        dir === "rtl" ? "270deg" : "90deg"
                      }, #ffffff 0%, #ffffff var(--sweep-w), #14213D var(--sweep-b), transparent var(--sweep-e))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {step.n} — {step.title}
                  </h3>

                  <p
                    className="mt-2.5 text-sm leading-relaxed"
                    style={{
                      backgroundImage: `linear-gradient(${
                        dir === "rtl" ? "270deg" : "90deg"
                      }, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) var(--sweep-w), #14213D var(--sweep-b), transparent var(--sweep-e))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Bottom "How It Works" Outline Pill (36px from bottom) */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-[36px] flex justify-center transition-opacity duration-300 ${
              settled ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="rounded-full border border-white/35 bg-[#2a7ebd]/85 px-5 py-1.5 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
              {lang === "ar" ? "كيف نعمل" : "How It Works"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
