"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import { IconArrow } from "@/components/ui/Icons";

/** Non-uniform shrinking stagger offsets (ms) so the heading reads as an organic wave */
const WORD_DELAYS_MS = [440, 505, 558, 600, 634, 662, 685, 704];

export default function HomeAbout() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setEntered(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const headlineWords = useMemo(
    () => t.homeAbout.headline.trim().split(/\s+/),
    [t.homeAbout.headline]
  );

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      data-entered={entered ? "true" : "false"}
      aria-label={t.homeAbout.headline}
      className="about-stage relative overflow-hidden bg-[#F2F6FA] py-20 sm:py-24 lg:py-32 border-b border-line"
    >
      {/* Restrained Ambient Background Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 24% 50%, rgba(85, 197, 199, 0.10), transparent 52%), radial-gradient(circle at 85% 20%, rgba(20, 33, 63, 0.04), transparent 45%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* =========================================================
              LEFT COLUMN (58% on Desktop, First on Mobile):
              Architectural Geometric Portal with Emerging Scania Truck
              ========================================================= */}
          <div className="lg:col-span-7" dir="ltr">
            <div className="about-truck-hover relative mx-auto w-full max-w-[780px] aspect-[16/10] select-none">
              {/* Layer 1 (z-10): Main Deep Navy (#14213F) Asymmetric Architectural Shape */}
              <div
                aria-hidden="true"
                className="about-anim-portal pointer-events-none absolute top-[10%] bottom-[12%] left-[16%] right-[3%] z-10 overflow-hidden rounded-tl-[110px] rounded-tr-[36px] rounded-br-[130px] rounded-bl-[32px] bg-[#14213F] shadow-[0_22px_44px_-12px_rgba(20,33,63,0.32)]"
              >
                {/* Ambient Turquoise Portal Glow Near the Emergence Point (Upper-Left) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 24% 30%, rgba(85, 197, 199, 0.24), transparent 52%)",
                  }}
                />

                {/* Subtle Architectural Rings Inside the Portal */}
                <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full border border-[#55C5C7]/15" />
                <div className="absolute -left-6 -top-6 h-56 w-56 rounded-full border border-white/[0.06]" />
              </div>

              {/* Layer 2 (z-15): Balanced Ground Contact Shadow Under the Raised Front Cabin */}
              <div
                aria-hidden="true"
                className="about-anim-shadow pointer-events-none absolute bottom-[8.5%] left-[0%] z-[15] w-[42%] h-6 sm:h-7"
              >
                <div className="about-shadow-el h-full w-full rounded-[100%] bg-[#0B1528]/26 blur-lg transition-transform duration-700" />
              </div>

              {/* Layer 3 (z-20): The Transparent AWA FleetGuards Scania Truck Emerging from the Portal */}
              <div className="pointer-events-none absolute top-[-6%] bottom-[4%] left-[-4%] right-[3%] z-20 overflow-hidden rounded-tr-[36px] rounded-br-[130px]">
                <div className="about-anim-truck relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images.homeAbout}
                    alt={t.homeAbout.imageAlt}
                    loading="eager"
                    decoding="async"
                    className="about-truck-img absolute bottom-[8%] left-[2%] w-[99%] max-w-none h-auto object-contain drop-shadow-[-10px_12px_18px_rgba(11,21,40,0.24)] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Layer 4 (z-30): Foreground Geometric Portal Mask + Enlarged Bold White "ABOUT AWA FLEETGUARDS" */}
              <div className="about-anim-portal pointer-events-none absolute top-[10%] bottom-[12%] left-[16%] right-[3%] z-30 overflow-hidden rounded-tl-[110px] rounded-tr-[36px] rounded-br-[130px] rounded-bl-[32px] border border-[#55C5C7]/30">
                {/* Balanced Right-Side & Bottom-Right Navy Shadow Mask */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(270deg, #14213F 0%, #14213F 14%, rgba(20, 33, 63, 0.86) 28%, rgba(20, 33, 63, 0.36) 44%, transparent 60%), radial-gradient(ellipse 56% 48% at 88% 96%, #14213F 0%, rgba(20, 33, 63, 0.85) 38%, rgba(20, 33, 63, 0.35) 68%, transparent 94%)",
                  }}
                />

                {/* Slightly Enlarged Bold White "ABOUT AWA FLEETGUARDS" in the Upper Corner */}
                <div className="absolute top-6 sm:top-7 left-14 sm:left-16 right-8 flex items-center justify-between gap-4">
                  <span className="about-anim-label inline-block text-sm sm:text-base md:text-[18px] lg:text-[19px] font-extrabold uppercase tracking-[0.15em] text-white drop-shadow-sm">
                    {t.homeAbout.eyebrow}
                  </span>

                  <div
                    aria-hidden="true"
                    className="about-anim-accent hidden sm:flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#55C5C7]" />
                    <span className="h-[1.5px] w-12 rounded-full bg-gradient-to-r from-[#55C5C7]/80 to-transparent" />
                  </div>
                </div>

                {/* Subtle Foreground Turquoise Rim Along the Bottom Portal Edge */}
                <div
                  aria-hidden="true"
                  className="about-anim-accent absolute bottom-0 left-[22%] right-[14%] h-[2.5px] rounded-full bg-gradient-to-r from-[#55C5C7] via-[#55C5C7]/60 to-transparent"
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (42% on Desktop, Second on Mobile):
              Coordinated Masked Heading Reveal, Description & CTA
              ========================================================= */}
          <div className="lg:col-span-5">
            <div className="max-w-xl space-y-6 lg:ps-4">
              {/* Main Heading with Progressive Masked Word-by-Word Reveal */}
              <h2
                aria-label={t.homeAbout.headline}
                className="text-[clamp(2rem,3.4vw,3.1rem)] font-bold tracking-tight text-[#14213F] leading-[1.14]"
              >
                {headlineWords.map((word, idx) => {
                  const delayMs =
                    WORD_DELAYS_MS[Math.min(idx, WORD_DELAYS_MS.length - 1)];
                  return (
                    <span
                      key={`${idx}-${word}`}
                      aria-hidden="true"
                      className="inline-block overflow-hidden py-[0.14em] -my-[0.14em] pe-[0.27em] last:pe-0 align-bottom"
                    >
                      <span
                        className="about-anim-word inline-block will-change-transform"
                        style={{ ["--word-delay" as string]: `${delayMs}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </h2>

              {/* Concise Description */}
              <p className="about-anim-desc text-base sm:text-[17.5px] text-[#4A5568] leading-[1.7] max-w-[48ch]">
                {t.homeAbout.description}
              </p>

              {/* Single Minimal CTA */}
              <div className="about-anim-cta pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#14213F] px-7 py-3.5 text-sm sm:text-[15px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(20,33,63,0.35)] transition-all duration-300 hover:bg-[#1D315C] hover:shadow-[0_16px_32px_-8px_rgba(20,33,63,0.45)]"
                >
                  <span>{t.homeAbout.cta}</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#55C5C7]/20 text-[#55C5C7] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <IconArrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
