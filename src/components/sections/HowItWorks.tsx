"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Logo from "@/components/ui/Logo";
import { IconArrow } from "@/components/ui/Icons";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

const TRUCK_IMG = `${BASE_PATH}/assets/how-it-works/truck-topdown.png`;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Desktop SVG coordinate system (1000 x 1980) for the winding S-curve highway */
const ROAD_VIEWBOX_W = 1000;
const ROAD_VIEWBOX_H = 1980;
const ROAD_PATH_D =
  "M 300 0 C 300 120, 270 210, 270 360 C 270 570, 730 780, 730 990 C 730 1200, 270 1410, 270 1620 C 270 1770, 400 1870, 480 1980";

/** Enlarged 56px crisp stroke icons for each How It Works highway signboard */
function HighwayStepIcon({ step }: { step: string }) {
  const common = {
    width: 56,
    height: 56,
    viewBox: "0 0 48 48",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (step === "01") {
    // Connect: vehicle hardware sensors + wireless telemetry link
    return (
      <svg {...common}>
        <rect x="6" y="14" width="14" height="20" rx="3" stroke="#FFFFFF" />
        <rect x="28" y="14" width="14" height="20" rx="3" stroke="#65C2C8" />
        <path d="M20 24h8" stroke="#65C2C8" strokeWidth="2.4" />
        <path d="M13 8v6M35 8v6M13 34v6M35 34v6" stroke="#FFFFFF" opacity="0.7" />
        <circle cx="13" cy="24" r="2.5" fill="#65C2C8" stroke="none" />
        <circle cx="35" cy="24" r="2.5" fill="#FFFFFF" stroke="none" />
      </svg>
    );
  }

  if (step === "02") {
    // Monitor: centralized fleet telemetry dashboard + live pulse
    return (
      <svg {...common}>
        <rect x="5" y="8" width="38" height="25" rx="3.5" stroke="#FFFFFF" />
        <path d="M12 22h6l3.5-7 5 13 3.5-6H36" stroke="#65C2C8" strokeWidth="2.4" />
        <path d="M18 40h12M24 33v7" stroke="#FFFFFF" opacity="0.8" />
        <circle cx="36" cy="22" r="2.2" fill="#65C2C8" stroke="none" />
      </svg>
    );
  }

  // 03 Optimize: efficiency upward trajectory + precision gear cue
  return (
    <svg {...common}>
      <path d="M8 34l9-9 7 5 15-16" stroke="#65C2C8" strokeWidth="2.5" />
      <path d="M30 14h9v9" stroke="#65C2C8" strokeWidth="2.5" />
      <path d="M8 40h32" stroke="#FFFFFF" opacity="0.55" />
      <circle cx="17" cy="25" r="2.4" fill="#FFFFFF" stroke="none" />
      <circle cx="24" cy="30" r="2.4" fill="#FFFFFF" stroke="none" />
    </svg>
  );
}

/** Stylized grass tufts at the base of each highway signpost pole (faithful to reference) */
function GrassTuft({ className = "" }: { className?: string }) {
  return (
    <svg
      width="44"
      height="20"
      viewBox="0 0 44 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 19C22 12 18 7 12 4M22 19C22 11 26 6 32 4M22 19C20 13 14 11 6 11M22 19C24 13 30 11 38 11"
        stroke="#0D1629"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M22 19V5"
        stroke="#65C2C8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

interface HighwaySignboardProps {
  step: { n: string; title: string; text: string };
  active: boolean;
  align?: "left" | "right";
}

function HighwaySignboard({ step, active }: HighwaySignboardProps) {
  return (
    <div
      className={`group relative flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active ? "opacity-100 scale-100" : "opacity-85 scale-[0.97]"
      }`}
    >
      {/* Main Navy Highway Signboard */}
      <div
        className={`relative w-full rounded-2xl border-[3px] bg-[#14213D] px-6 py-6 sm:px-7 sm:py-7 text-white transition-all duration-500 ${
          active
            ? "border-white shadow-[0_0_0_4px_rgba(101,194,200,0.35),0_26px_56px_-14px_rgba(13,22,41,0.6)]"
            : "border-white/80 shadow-[0_18px_40px_-14px_rgba(13,22,41,0.45)]"
        }`}
      >
        {/* Subtle inner highway sign trim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] rounded-[10px] border border-white/15"
        />

        <div className="relative flex flex-col items-center text-center">
          {/* Top Row: Enlarged Icon */}
          <div className="mb-2.5 flex items-center justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white/[0.07] ring-1 ring-white/15">
              <HighwayStepIcon step={step.n} />
            </div>
          </div>

          {/* Highway Sign Directional Cue + Step Number */}
          <div className="mb-1.5 inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-widest text-turquoise">
            <span>{step.n}</span>
            <span aria-hidden="true" className="text-white/50">
              •
            </span>
            <span aria-hidden="true" className="text-base leading-none text-turquoise">
              ↓
            </span>
          </div>

          {/* Enlarged Step Title (Site Font: Rubik) */}
          <h3 className="font-sans text-2xl sm:text-[1.75rem] lg:text-[1.95rem] font-bold tracking-tight text-white leading-tight">
            {step.title}
          </h3>

          {/* Enlarged Step Description (Site Font: Rubik) */}
          <p className="mt-2.5 max-w-[30ch] font-sans text-[15px] sm:text-base lg:text-[17px] leading-relaxed text-white/90">
            {step.text}
          </p>
        </div>
      </div>

      {/* Two White Highway Signpost Poles + Grass Tufts */}
      <div className="relative flex w-[56%] justify-between px-4" aria-hidden="true">
        <div className="relative flex flex-col items-center">
          <div className="h-14 w-3 bg-gradient-to-b from-white via-white/95 to-white/85 shadow-sm" />
          <GrassTuft className="-mt-3.5" />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="h-14 w-3 bg-gradient-to-b from-white via-white/95 to-white/85 shadow-sm" />
          <GrassTuft className="-mt-3.5" />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { t, lang } = useLanguage();

  const desktopStageRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const activeTrailRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  const mobileStageRef = useRef<HTMLDivElement>(null);
  const mobileTruckRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);

  const introText =
    lang === "ar"
      ? "ثلاث خطوات واضحة لتحويل أسطولك إلى منظومة متصلة تمنحك رؤية فورية وتحكماً كاملاً."
      : "Three clear steps to turn your fleet into a connected operation with real-time visibility and control.";

  // Scroll-driven smooth truck navigation along the exact SVG road path
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pathEl = roadPathRef.current;
    const trailEl = activeTrailRef.current;
    const truckEl = truckRef.current;
    const stageEl = desktopStageRef.current;

    let totalLen = 0;
    if (pathEl) {
      totalLen = pathEl.getTotalLength();
      if (trailEl) {
        trailEl.style.strokeDasharray = `${totalLen}`;
        trailEl.style.strokeDashoffset = `${totalLen}`;
      }
    }

    let currentP = reducedMotion ? 0.5 : 0.04;
    let targetP = currentP;
    let rafId = 0;
    let lastActive = 0;

    const placeDesktopTruck = (p: number) => {
      if (!pathEl || !truckEl || !stageEl || totalLen <= 0) return;
      const len = clamp(p, 0.095, 0.94) * totalLen;
      const pt = pathEl.getPointAtLength(len);
      const prev = pathEl.getPointAtLength(Math.max(0, len - 8));
      const next = pathEl.getPointAtLength(Math.min(totalLen, len + 8));

      // truck-topdown.png cab points straight DOWN (+90 deg in screen coords)
      const angleDeg = (Math.atan2(next.y - prev.y, next.x - prev.x) * 180) / Math.PI - 90;

      const stageW = stageEl.clientWidth;
      const stageH = stageEl.clientHeight;
      const px = (pt.x / ROAD_VIEWBOX_W) * stageW;
      const py = (pt.y / ROAD_VIEWBOX_H) * stageH;

      truckEl.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg)`;

      if (trailEl) {
        trailEl.style.strokeDashoffset = `${Math.max(0, totalLen - len)}`;
      }
    };

    const placeMobileTruck = () => {
      const mStage = mobileStageRef.current;
      const mTruck = mobileTruckRef.current;
      if (!mStage || !mTruck) return;
      const rect = mStage.getBoundingClientRect();
      const anchor = window.innerHeight * 0.48;
      const mp = clamp((anchor - rect.top) / Math.max(1, rect.height), 0.08, 0.92);
      const yPx = mp * mStage.clientHeight;
      mTruck.style.transform = `translate3d(0, ${yPx}px, 0) translate(-50%, -50%)`;
    };

    const computeTarget = () => {
      if (stageEl && stageEl.offsetParent !== null) {
        const rect = stageEl.getBoundingClientRect();
        const anchor = window.innerHeight * 0.46;
        targetP = clamp((anchor - rect.top) / Math.max(1, rect.height), 0.095, 0.94);

        const nextStep = targetP < 0.34 ? 0 : targetP < 0.66 ? 1 : 2;
        if (nextStep !== lastActive) {
          lastActive = nextStep;
          setActiveStep(nextStep);
        }
      } else if (mobileStageRef.current) {
        const rect = mobileStageRef.current.getBoundingClientRect();
        const anchor = window.innerHeight * 0.48;
        const mp = clamp((anchor - rect.top) / Math.max(1, rect.height), 0, 1);
        const nextStep = mp < 0.34 ? 0 : mp < 0.66 ? 1 : 2;
        if (nextStep !== lastActive) {
          lastActive = nextStep;
          setActiveStep(nextStep);
        }
      }
    };

    const tick = () => {
      computeTarget();
      if (reducedMotion) {
        placeDesktopTruck(0.48);
        placeMobileTruck();
        rafId = 0;
        return;
      }

      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0004) {
        currentP += diff * 0.16;
        placeDesktopTruck(currentP);
        placeMobileTruck();
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentP = targetP;
        placeDesktopTruck(currentP);
        placeMobileTruck();
        rafId = 0;
      }
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    // Initial placement
    computeTarget();
    currentP = reducedMotion ? 0.48 : targetP;
    placeDesktopTruck(currentP);
    placeMobileTruck();

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  // Alternating signboard coordinates along the 3 desktop S-curves
  // Centered vertically on each curve apex with a clean breathing gap from the road shoulder
  const desktopSignPositions: Array<{
    topPct: string;
    sideClass: string;
  }> = [
    // Step 01: road curves left (x=270, shoulder edge ~378), signboard stands further RIGHT
    { topPct: "18.2%", sideClass: "left-[48%] lg:left-[52%] w-[360px] lg:w-[405px]" },
    // Step 02: road curves right (x=730, shoulder edge ~622), signboard stands further LEFT
    { topPct: "50%", sideClass: "right-[48%] lg:right-[52%] w-[360px] lg:w-[405px]" },
    // Step 03: road curves left (x=270, shoulder edge ~378), signboard stands further RIGHT
    { topPct: "81.8%", sideClass: "left-[48%] lg:left-[52%] w-[360px] lg:w-[405px]" },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#1E6298] via-[#2A7EBD] to-[#174E7A] py-20 sm:py-28 text-white"
    >
      {/* Subtle architectural background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(101, 194, 200, 0.35), transparent 45%), radial-gradient(circle at 80% 75%, rgba(20, 33, 61, 0.45), transparent 50%)",
        }}
      />

      {/* Section Header (No eyebrow pill above heading) */}
      <div className="container relative z-10 text-center">
        <h2
          id="how-heading"
          className="mx-auto max-w-[820px] font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance] leading-[1.15]"
        >
          {t.how.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] font-sans text-base sm:text-lg lg:text-xl leading-relaxed text-white/90 [text-wrap:balance]">
          {introText}
        </p>
      </div>

      {/* DESKTOP & TABLET (md+): Winding S-Curve Highway + Top-Down Scania Truck + Alternating Signboards */}
      <div className="container relative z-10 mt-12 sm:mt-14 hidden md:block">
        <div
          ref={desktopStageRef}
          dir="ltr"
          className="relative mx-auto w-full max-w-[1060px]"
          style={{ height: `${ROAD_VIEWBOX_H}px` }}
        >
          {/* SVG Highway */}
          <svg
            viewBox={`0 0 ${ROAD_VIEWBOX_W} ${ROAD_VIEWBOX_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="roadFadeMaskGrad"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={ROAD_VIEWBOX_H}
              >
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="4.5%" stopColor="white" stopOpacity="1" />
                <stop offset="93.5%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask
                id="roadFadeMask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={ROAD_VIEWBOX_W}
                height={ROAD_VIEWBOX_H}
              >
                <rect x="0" y="0" width={ROAD_VIEWBOX_W} height={ROAD_VIEWBOX_H} fill="url(#roadFadeMaskGrad)" />
              </mask>
            </defs>

            <g mask="url(#roadFadeMask)">
              {/* Outer road shoulder (deeper ocean-blue verge like the reference video) */}
              <path
                d={ROAD_PATH_D}
                fill="none"
                stroke="#154973"
                strokeWidth="216"
                strokeLinecap="round"
              />

              {/* Dark Deep Navy Asphalt Road Surface */}
              <path
                d={ROAD_PATH_D}
                fill="none"
                stroke="#10192A"
                strokeWidth="172"
                strokeLinecap="round"
              />

              {/* Subtle Road Edge Markings */}
              <path
                d={ROAD_PATH_D}
                fill="none"
                stroke="rgba(101, 194, 200, 0.24)"
                strokeWidth="154"
                strokeLinecap="round"
              />
              <path
                d={ROAD_PATH_D}
                fill="none"
                stroke="#10192A"
                strokeWidth="148"
                strokeLinecap="round"
              />

              {/* Dashed Center Lane Line (base) */}
              <path
                ref={roadPathRef}
                d={ROAD_PATH_D}
                fill="none"
                stroke="#2A7EBD"
                strokeOpacity="0.55"
                strokeWidth="6"
                strokeDasharray="30 34"
                strokeLinecap="round"
              />

              {/* Illuminated Turquoise Progress Trail behind the truck */}
              <path
                ref={activeTrailRef}
                d={ROAD_PATH_D}
                fill="none"
                stroke="#65C2C8"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>
          </svg>

          {/* Animated Top-Down AWA FleetGuards Scania Truck (enlarged for balanced scale vs signboards) */}
          <div
            ref={truckRef}
            className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
            style={{ width: "118px", height: "262px" }}
            aria-hidden="true"
          >
            {/* Glowing Red LED Taillights at the rear (top edge) */}
            <div
              className="absolute -top-2.5 left-1/2 h-9 w-24 -translate-x-1/2 rounded-full opacity-95 blur-[12px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 59, 48, 0.95) 0%, rgba(255, 59, 48, 0.35) 55%, transparent 78%)",
              }}
            />

            {/* Soft Cool-White Headlight Beams ahead of the cab (bottom edge) */}
            <div
              className="absolute -bottom-16 left-1/2 h-24 w-32 -translate-x-1/2 opacity-60 blur-[8px]"
              style={{
                background:
                  "conic-gradient(from 160deg at 50% 0%, transparent 0deg, rgba(224, 247, 250, 0.72) 14deg, rgba(101, 194, 200, 0.25) 28deg, transparent 42deg)",
              }}
            />

            {/* Top-Down Truck Sprite */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TRUCK_IMG}
              alt=""
              width={459}
              height={1020}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.68)]"
            />
          </div>

          {/* 3 Alternating Highway Signboards */}
          {t.how.steps.map((step, idx) => {
            const pos = desktopSignPositions[idx] || desktopSignPositions[0];
            return (
              <div
                key={step.n}
                dir={lang === "ar" ? "rtl" : "ltr"}
                className={`absolute z-10 -translate-y-1/2 ${pos.sideClass}`}
                style={{ top: pos.topPct }}
              >
                <HighwaySignboard step={step} active={activeStep >= idx} />
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE (< md): Vertical Highway Lane on the Left + Animated Top-Down Truck + Enlarged Signboards */}
      <div className="container relative z-10 mt-12 md:hidden">
        <div ref={mobileStageRef} dir="ltr" className="relative flex gap-4">
          {/* Vertical Asphalt Road Strip */}
          <div className="relative w-[78px] shrink-0 overflow-hidden rounded-full bg-[#154973] p-[9px]">
            <div className="relative h-full w-full rounded-full bg-[#10192A]">
              {/* Dashed center lane */}
              <div
                aria-hidden="true"
                className="absolute inset-y-4 left-1/2 w-[3px] -translate-x-1/2 opacity-75"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #65C2C8 0px, #65C2C8 18px, transparent 18px, transparent 36px)",
                }}
              />
            </div>

            {/* Animated Top-Down Truck */}
            <div
              ref={mobileTruckRef}
              className="pointer-events-none absolute left-1/2 top-0 z-20 will-change-transform"
              style={{ width: "44px", height: "98px" }}
              aria-hidden="true"
            >
              <div
                className="absolute -top-1.5 left-1/2 h-4 w-10 -translate-x-1/2 rounded-full blur-[6px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 59, 48, 0.95) 0%, transparent 75%)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TRUCK_IMG}
                alt=""
                width={459}
                height={1020}
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>

          {/* Stacked Enlarged Highway Signboards */}
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="flex flex-1 flex-col gap-10 py-4"
          >
            {t.how.steps.map((step, idx) => (
              <HighwaySignboard
                key={step.n}
                step={step}
                active={activeStep >= idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* End-of-Road Brand Reveal (just like the video's logo finish) */}
      <div className="container relative z-10 mt-10 sm:mt-14 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/20 bg-[#14213D]/65 px-8 py-8 sm:px-12 sm:py-10 shadow-lift backdrop-blur-md">
          <Logo tone="light" className="h-[54px] sm:h-[64px] w-auto" />
          <p className="max-w-[46ch] font-sans text-base sm:text-lg text-white/90">
            {lang === "ar"
              ? "جاهز للانطلاق نحو إدارة أسطول أكثر كفاءة وأماناً؟"
              : "Ready to put your entire fleet on a smarter, more efficient road?"}
          </p>
          <Link
            href="/#demo"
            className="btn-primary !min-h-[48px] !px-8 !text-base bg-ocean hover:bg-ocean-strong shadow-lift active:scale-[0.97]"
          >
            <span>{t.nav.demo}</span>
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
