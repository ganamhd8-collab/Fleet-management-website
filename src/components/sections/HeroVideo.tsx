"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { IconArrow } from "@/components/ui/Icons";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

const V = `${BASE_PATH}/assets/hero-video`;

export default function HeroVideo() {
  const { t } = useLanguage();
  const copy = t.hero.showcase;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <section
      id="home"
      aria-label={copy.headline}
      className="relative isolate flex min-h-[96svh] sm:min-h-[108svh] lg:min-h-[114svh] w-full flex-col justify-start overflow-hidden bg-[#0D1629] pt-24 sm:pt-28 lg:pt-32 text-white"
    >
      {/* Full-Bleed Page-Width Background Video
          Offset slightly from the very top (top-[12%]) so the main 16:9 action frame
          opens cleanly in the transparent zone right beneath the text while still sitting behind the copy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[12%] -z-20 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={`${V}/hero-poster.webp`}
          aria-label={copy.videoLabel}
        >
          <source src={`${V}/hero-video-mobile.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`${V}/hero-video-desktop.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* Graduated Deep Navy Overlay:
          - Darkest behind the Navbar, Headline, Subtitle & Buttons (0% -> 36%)
          - Melts smoothly to 100% transparent right where the main video frame begins (46% -> 100%) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #0D1629 0%, #0D1629 14%, rgba(13, 22, 41, 0.90) 24%, rgba(13, 22, 41, 0.62) 35%, rgba(13, 22, 41, 0.18) 44%, rgba(13, 22, 41, 0) 52%)",
        }}
      />

      {/* Centered Editorial Copy Over the Upper Dark-Graduated Zone */}
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[780px] flex-col items-center text-center">
          <h1 className="hero-in text-3xl sm:text-4xl lg:text-5xl xl:text-[3.35rem] font-bold tracking-tight text-white [text-wrap:balance] leading-[1.15] drop-shadow-[0_4px_20px_rgba(13,22,41,0.65)]">
            <span className="block">{copy.headlineLine1}</span>
            <span className="mt-1 block">
              <span className="text-turquoise">{copy.headlineAccent}</span>{" "}
              <span>{copy.headlineLine2End}</span>
            </span>
          </h1>

          <p
            className="hero-in mt-3.5 max-w-[660px] text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed [text-wrap:balance] drop-shadow-[0_2px_12px_rgba(13,22,41,0.65)]"
            style={{ ["--d" as string]: "70ms" }}
          >
            {copy.description}
          </p>

          <div
            className="hero-in mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3"
            style={{ ["--d" as string]: "130ms" }}
          >
            <Link
              href="/#contact"
              className="btn-primary !min-h-[45px] !px-6 !text-sm shadow-lift active:scale-[0.97]"
            >
              <span>{copy.primary}</span>
              <IconArrow className="h-4 w-4" />
            </Link>
            <Link
              href="/#solutions"
              className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/55 hover:bg-white/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
            >
              <span>{copy.secondary}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
