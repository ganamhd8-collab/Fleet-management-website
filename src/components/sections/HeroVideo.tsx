"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/config/site";
import { IconArrow } from "@/components/ui/Icons";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

const V = `${BASE_PATH}/assets/hero-video`;

/** Pure white Apple mark for the enlarged glassmorphic App Store badge */
const WhiteAppleSvg = (
  <svg
    viewBox="0 0 24 28"
    fill="currentColor"
    className="h-[30px] sm:h-[32px] w-auto shrink-0 text-white"
    aria-hidden="true"
  >
    <path d="M19.665 14.832c-.032-3.218 2.628-4.773 2.748-4.847-1.503-2.196-3.838-2.497-4.664-2.528-1.979-.202-3.875 1.171-4.88 1.171-1.012 0-2.564-1.145-4.222-1.114-2.164.032-4.165 1.262-5.278 3.199-2.257 3.914-.576 9.706 1.618 12.88 1.076 1.553 2.352 3.295 4.026 3.233 1.619-.065 2.231-1.044 4.187-1.044 1.954 0 2.508 1.044 4.218 1.009 1.745-.028 2.847-1.581 3.912-3.139 1.237-1.805 1.744-3.556 1.772-3.646-.039-.016-3.399-1.304-3.437-5.174ZM16.453 5.331c.892-1.083 1.495-2.585 1.33-4.081-1.287.053-2.851.858-3.775 1.938-.826.955-1.551 2.486-1.356 3.952 1.436.112 2.908-.729 3.801-1.809Z" />
  </svg>
);

/** Official 4-color Google Play mark for the enlarged glassmorphic Google Play badge */
const ColorGooglePlaySvg = (
  <svg
    viewBox="0 0 26 28"
    fill="none"
    className="h-[29px] sm:h-[30px] w-auto shrink-0"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M1.54 1.03C1.2 1.39 1 1.96 1 2.69v22.62c0 .73.2 1.3.54 1.66l.09.08L14.3 14.38v-.3L1.63.95l-.09.08Z"
    />
    <path
      fill="#FBBC04"
      d="M18.52 18.61l-4.22-4.23v-.3l4.23-4.23.1.06 5.01 2.85c1.43.81 1.43 2.14 0 2.95l-5.01 2.85-.11.05Z"
    />
    <path
      fill="#EA4335"
      d="M18.63 18.55L14.3 14.23 1.54 27.05c.47.5 1.25.56 2.13.06l14.96-8.56Z"
    />
    <path
      fill="#34A853"
      d="M18.63 9.91L3.67 1.35C2.79.85 2.01.91 1.54 1.41L14.3 14.23l4.33-4.32Z"
    />
  </svg>
);

function GlassStoreBadge({
  href,
  topLabel,
  storeName,
  soon,
  icon,
  uppercaseTop = false,
}: {
  href: string;
  topLabel: string;
  storeName: string;
  soon: string;
  icon: React.ReactNode;
  uppercaseTop?: boolean;
}) {
  const [notice, setNotice] = useState(false);

  const badgeCls =
    "group inline-flex h-[56px] sm:h-[60px] min-w-[192px] sm:min-w-[206px] items-center justify-center gap-3.5 rounded-[14px] border border-white/35 bg-white/[0.16] px-5 text-start text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_32px_rgba(2,18,52,0.34)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/[0.24] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  const content = (
    <span dir="ltr" className="inline-flex items-center gap-3.5 drop-shadow-[0_1px_4px_rgba(2,18,52,0.45)]">
      {icon}
      <span className="flex flex-col leading-none">
        <span
          className={`text-[11px] font-normal text-white/90 ${
            uppercaseTop ? "uppercase tracking-[0.06em]" : "tracking-[0.01em]"
          }`}
        >
          {topLabel}
        </span>
        <span className="mt-1.5 text-[19px] sm:text-[20px] font-semibold tracking-[-0.02em] text-white">
          {storeName}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${topLabel} ${storeName}`}
        className={badgeCls}
      >
        {content}
      </a>
    );
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`${topLabel} ${storeName}`}
        className={badgeCls}
        onClick={() => {
          setNotice(true);
          window.setTimeout(() => setNotice(false), 2600);
        }}
      >
        {content}
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-navy/95 px-3 py-1.5 text-xs font-medium text-white shadow-lift backdrop-blur-md transition-opacity duration-300 ${
          notice ? "opacity-100" : "opacity-0"
        }`}
      >
        {notice ? soon : ""}
      </span>
    </span>
  );
}

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
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-start overflow-hidden bg-[#0D1629] pt-24 pb-16 sm:pt-28 text-white"
    >
      {/* Full-Bleed Page-Width Background Video */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10%] -z-20 overflow-hidden">
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
          Darkest behind the centered copy, fading smoothly into full transparency over the video stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #0D1629 0%, #0D1629 12%, rgba(13, 22, 41, 0.88) 24%, rgba(13, 22, 41, 0.48) 38%, rgba(13, 22, 41, 0) 52%, rgba(13, 22, 41, 0) 100%)",
        }}
      />

      {/* Centered Headline, Subtitle, Explore Solutions CTA & Store Badges */}
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

          {/* Sole Primary CTA: Explore Solutions */}
          <div
            className="hero-in mt-5 sm:mt-6 flex items-center justify-center"
            style={{ ["--d" as string]: "120ms" }}
          >
            <Link
              href="/#solutions"
              className="btn-primary !min-h-[45px] !px-7 !text-sm shadow-lift active:scale-[0.97]"
            >
              <span>{copy.secondary}</span>
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          {/* Enlarged Frosted Glassmorphic App Store & Google Play Badges
              Positioned slightly below Explore Solutions (kept outside .hero-in so backdrop-blur-xl blurs the live <video>) */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-4">
            <GlassStoreBadge
              href={siteConfig.appLinks.ios}
              topLabel="Download on the"
              storeName="App Store"
              soon={t.appDownload.soon}
              icon={WhiteAppleSvg}
            />
            <GlassStoreBadge
              href={siteConfig.appLinks.android}
              topLabel="GET IT ON"
              storeName="Google Play"
              soon={t.appDownload.soon}
              icon={ColorGooglePlaySvg}
              uppercaseTop
            />
          </div>
        </div>
      </div>
    </section>
  );
}
