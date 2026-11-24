"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import { IconArrow, IconCheck } from "@/components/ui/Icons";

/** Official brand color mapping for the 8 ecosystem capability cards */
const ecosystemCardColors: Record<string, string> = {
  gps: "#14213D",             // 1. Midnight Navy
  maintenance: "#283A88",     // 2. Royal Indigo
  fuel: "#2A7EBD",            // 3. Corporate Blue
  driver: "#329BCF",          // 4. Sky Blue
  documents: "#8493A5",       // 5. Slate Gray
  cargo: "#48B0B8",           // 6. Deep Turquoise
  "ai-assistant": "#65C2C8",  // 7. Turquoise
  cameras: "#7FC4A5",         // 8. Mint Green
};

function ValueIcon({ id }: { id: string }) {
  const baseProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  switch (id) {
    case "innovation":
      return (
        <svg {...baseProps}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "reliability":
      return (
        <svg {...baseProps}>
          <path d="M12 3l7 3.5v5.5c0 4.8-3 8.2-7 9.5-4-1.3-7-4.7-7-9.5V6.5L12 3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "transparency":
      return (
        <svg {...baseProps}>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "efficiency":
    default:
      return (
        <svg {...baseProps}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
  }
}

function PillarIcon({ id }: { id: string }) {
  const baseProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  switch (id) {
    case "hardware":
      return (
        <svg {...baseProps}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );
    case "software":
      return (
        <svg {...baseProps}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M7 20h10M12 16v4M7 11l3-3 2.5 2.5L17 7" />
        </svg>
      );
    default:
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 7.5l3 2.5M17 7.5l-3 2.5M7 16.5l3-2.5M17 16.5l-3-2.5" />
        </svg>
      );
  }
}

export default function AboutPageView() {
  const { t } = useLanguage();
  const ap = t.aboutPage;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.meta.skip}
      </a>

      <Navbar />

      <main id="main-content">
        {/* =========================================================
            SECTION 1: EXECUTIVE SPLIT HERO – WHO WE ARE
            ========================================================= */}
        <section
          aria-label={ap.hero.eyebrow}
          className="relative overflow-hidden bg-[#14213D] pt-28 pb-20 md:pt-36 md:pb-24 text-white"
        >
          {/* Ambient Brand Radial Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 82% 22%, rgba(93, 193, 199, 0.22), transparent 48%), radial-gradient(circle at 12% 85%, rgba(40, 127, 186, 0.30), transparent 52%)",
            }}
          />

          <div className="container relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Left Narrative Column */}
              <div className="lg:col-span-7 space-y-6">
                <h1
                  className="hero-in text-display font-bold tracking-tight text-white leading-[1.1]"
                  style={{ ["--d" as string]: "90ms" }}
                >
                  {ap.hero.headline}
                </h1>

                <p
                  className="hero-in text-lead text-white/85 max-w-2xl leading-relaxed"
                  style={{ ["--d" as string]: "180ms" }}
                >
                  {ap.hero.description}
                </p>

                <div
                  className="hero-in flex flex-wrap items-center gap-4 pt-2"
                  style={{ ["--d" as string]: "260ms" }}
                >
                  <Link href="/#contact" className="btn-primary">
                    <span>{ap.hero.primary}</span>
                    <IconArrow className="h-4 w-4" />
                  </Link>
                  <Link href="/#solutions" className="btn-ghost-light">
                    <span>{ap.hero.secondary}</span>
                  </Link>
                </div>

                {/* Quick Pillar Strip inside Hero */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-xl">
                  {ap.intro.pillars.map((pillar, idx) => (
                    <div key={pillar.id} className="space-y-1">
                      <span className="font-mono text-xs font-bold text-[#5DC1C7]">
                        0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        {pillar.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Framed Fleet Showcase Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[28px] border border-white/15 bg-white/[0.05] p-3 backdrop-blur-md shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#0B192C]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={images.aboutHero}
                      alt={ap.intro.visualAlt}
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(20,33,61,0.10) 0%, rgba(20,33,61,0.85) 100%)",
                      }}
                    />

                    {/* Bottom Card Caption */}
                    <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-[#14213D]/90 p-4 backdrop-blur-md">
                      <p className="text-sm sm:text-base font-bold text-white">
                        {ap.intro.visualStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#14213D] via-[#5DC1C7]/60 to-[#287FBA]" />
        </section>

        {/* =========================================================
            SECTION 2: COMPANY ARCHITECTURE BENTO
            ========================================================= */}
        <section
          id="company-intro"
          aria-label={ap.intro.eyebrow}
          className="section bg-[#F4F6F9] border-b border-line"
        >
          <div className="container space-y-12">
            {/* Top Split Narrative & Visual */}
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-6 space-y-5">
                <h2 className="text-h2 font-bold text-[#14213D] leading-tight">
                  {ap.intro.headline}
                </h2>

                <p className="text-lead text-ink-muted leading-relaxed">
                  {ap.intro.content}
                </p>
              </Reveal>

              <Reveal delay={100} className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-[24px] border border-line bg-[#14213D] p-3 shadow-panel">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={images.aboutIntro}
                      alt={ap.intro.visualAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(20,33,61,0.10) 0%, rgba(20,33,61,0.82) 100%)",
                      }}
                    />

                    {/* Connected Flow Bar inside Visual */}
                    <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-[#14213D]/90 p-4 text-white backdrop-blur-md">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {t.how.flow.map((step, idx) => (
                          <React.Fragment key={step}>
                            <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#5DC1C7]" />
                              {step}
                            </span>
                            {idx < t.how.flow.length - 1 && (
                              <span className="text-[#5DC1C7] text-xs font-bold rtl:rotate-180">
                                →
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bottom 3 Bento Pillar Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {ap.intro.pillars.map((pillar, idx) => (
                <Reveal key={pillar.id} delay={idx * 80}>
                  <div className="group relative flex h-full flex-col justify-between rounded-[24px] border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5DC1C7] hover:shadow-panel">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14213D] text-[#5DC1C7] transition-colors duration-300 group-hover:bg-[#287FBA] group-hover:text-white">
                          <PillarIcon id={pillar.id} />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#14213D]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {pillar.text}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-[#287FBA]">
                      <span>{t.about.core}</span>
                      <span className="h-1.5 w-6 rounded-full bg-[#5DC1C7]" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: MISSION & VISION
            ========================================================= */}
        <section
          id="mission-vision"
          aria-label={ap.missionVision.eyebrow}
          className="section bg-white border-b border-line"
        >
          <div className="container">
            <Reveal className="max-w-3xl space-y-3">
              <h2 className="text-h2 font-bold text-[#14213D]">
                {ap.missionVision.headline}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Card 1: Our Mission (Deep Navy #14213D) */}
              <Reveal delay={60}>
                <article
                  style={{ backgroundColor: "#14213D" }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-8 md:p-11 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5DC1C7]/15 text-[#5DC1C7] border border-[#5DC1C7]/30 transition-transform duration-300 group-hover:scale-105">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.75}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        </svg>
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {ap.missionVision.mission.title}
                      </h3>
                      <p className="text-base md:text-[17px] leading-relaxed text-white/90">
                        {ap.missionVision.mission.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#5DC1C7]">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-6 rounded-full bg-[#5DC1C7]" />
                      <span>AWA Fleet Guards</span>
                    </div>
                    <span className="font-mono opacity-60">01</span>
                  </div>
                </article>
              </Reveal>

              {/* Card 2: Our Vision (Corporate Blue #287FBA) */}
              <Reveal delay={140}>
                <article
                  style={{ backgroundColor: "#287FBA" }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-8 md:p-11 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white border border-white/30 transition-transform duration-300 group-hover:scale-105">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.75}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3.6 9h16.8M3.6 15h16.8" />
                          <path d="M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
                        </svg>
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {ap.missionVision.vision.title}
                      </h3>
                      <p className="text-base md:text-[17px] leading-relaxed text-white/95">
                        {ap.missionVision.vision.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-6 rounded-full bg-white" />
                      <span>AWA Fleet Guards</span>
                    </div>
                    <span className="font-mono opacity-70">02</span>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: WHAT DRIVES US – CORE VALUES
            ========================================================= */}
        <section
          id="core-values"
          aria-label={ap.values.headline}
          className="section bg-[#F4F6F9] border-b border-line"
        >
          <div className="container">
            <Reveal className="max-w-3xl space-y-4">
              <h2 className="text-h2 font-bold text-[#14213D]">
                {ap.values.headline}
              </h2>
              <p className="text-lead text-ink-muted max-w-prose">
                {ap.values.description}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ap.values.items.map((val, idx) => (
                <Reveal key={val.id} delay={idx * 75}>
                  <article className="group relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white p-7 shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:border-[#5DC1C7] hover:shadow-lift">
                    <span className="absolute inset-x-0 top-0 h-1 bg-[#5DC1C7] transition-all duration-300 group-hover:h-1.5" />

                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14213D] text-[#5DC1C7] shadow-sm transition-colors duration-300 group-hover:bg-[#287FBA] group-hover:text-white">
                          <ValueIcon id={val.id} />
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <h3 className="text-xl font-bold text-[#14213D]">
                          {val.title}
                        </h3>
                        <p className="text-[14.5px] leading-relaxed text-ink-muted">
                          {val.text}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5">
                      <span className="inline-block h-1 w-8 rounded-full bg-[#5DC1C7]/50 transition-all duration-300 group-hover:w-14 group-hover:bg-[#5DC1C7]" />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: OUR INTEGRATED ECOSYSTEM
            ========================================================= */}
        <section
          id="integrated-ecosystem"
          aria-label={ap.ecosystem.headline}
          className="section bg-white border-b border-line"
        >
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <Reveal className="max-w-3xl space-y-4">
                <h2 className="text-h2 font-bold text-[#14213D]">
                  {ap.ecosystem.headline}
                </h2>
                <p className="text-lead text-ink-muted max-w-prose">
                  {ap.ecosystem.description}
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="inline-flex flex-wrap items-center gap-2.5 rounded-2xl border border-line bg-[#F4F6F9] px-4 py-3 text-xs font-semibold text-[#14213D]">
                  {t.how.flow.map((node, i) => (
                    <React.Fragment key={node}>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#5DC1C7]" />
                        <span>{node}</span>
                      </span>
                      {i < t.how.flow.length - 1 && (
                        <span className="text-[#287FBA] font-bold rtl:rotate-180">
                          →
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.solutions.items.map((item, idx) => {
                const bg = ecosystemCardColors[item.id] ?? ecosystemCardColors.gps;

                return (
                  <Reveal key={item.id} delay={idx * 65}>
                    <article
                      style={{ backgroundColor: bg }}
                      className="group flex h-full min-h-[290px] flex-col justify-between rounded-[24px] p-7 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift will-change-transform"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 font-mono text-xs font-semibold text-white">
                            0{idx + 1}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-white/60" />
                        </div>

                        <h3 className="text-xl font-bold leading-snug text-white pt-1">
                          {item.title}
                        </h3>

                        <p className="text-[14.5px] leading-relaxed text-white">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-6">
                        <Link
                          href={`/services/${item.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30"
                        >
                          <span>{ap.ecosystem.readMore}</span>
                          <IconArrow className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: WHY CHOOSE AWA FLEET GUARDS?
            ========================================================= */}
        <section
          id="why-choose-awa"
          aria-label={ap.why.headline}
          className="section bg-[#F4F6F9] border-b border-line"
        >
          <div className="container grid items-start gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <h2 className="text-h2 font-bold text-[#14213D]">
                {ap.why.headline}
              </h2>
              <p className="text-lead text-ink-muted max-w-prose">
                {ap.why.description}
              </p>

              <div className="pt-2">
                <Link href="/#contact" className="btn-primary">
                  <span>{ap.cta.primary}</span>
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {ap.why.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 75}>
                  <div className="group flex h-full flex-col justify-between gap-5 rounded-[22px] border border-line bg-white p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#287FBA] hover:shadow-panel">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14213D] font-mono text-sm font-bold text-[#5DC1C7] transition-colors duration-300 group-hover:bg-[#287FBA] group-hover:text-white">
                        0{i + 1}
                      </span>
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5DC1C7]/15 text-[#14213D] transition-colors duration-300 group-hover:bg-[#5DC1C7]">
                        <IconCheck className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-[#14213D]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: CALL TO ACTION & DIRECT CONTACT
            ========================================================= */}
        <section
          id="about-cta"
          aria-label={ap.cta.headline}
          className="relative overflow-hidden bg-[#14213D] py-20 md:py-28 text-white"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 18% 50%, rgba(40, 127, 186, 0.45), transparent 55%), radial-gradient(circle at 85% 30%, rgba(93, 193, 199, 0.35), transparent 50%)",
            }}
          />

          <div className="container relative z-10">
            <Reveal className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-display font-bold text-white">
                {ap.cta.headline}
              </h2>

              <p className="mx-auto max-w-2xl text-lead text-white/85 leading-relaxed">
                {ap.cta.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/#contact" className="btn-primary !min-h-[52px] !px-8">
                  <span>{ap.cta.primary}</span>
                  <IconArrow className="h-4 w-4" />
                </Link>
                <Link href="/#solutions" className="btn-ghost-light !min-h-[52px] !px-8">
                  <span>{ap.cta.secondary}</span>
                </Link>
              </div>

              {/* Direct Contact Mail Pill */}
              <div className="pt-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs sm:text-sm text-white/85 hover:border-[#5DC1C7] hover:text-[#5DC1C7] transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-[#5DC1C7]" />
                  <span dir="ltr">{siteConfig.contact.email}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
