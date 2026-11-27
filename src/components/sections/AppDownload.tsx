"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
import HandUnderline from "@/components/ui/HandUnderline";

/** Crisp Apple mark for the official black App Store badge style */
const AppleLogoSvg = (
  <svg
    viewBox="0 0 24 28"
    fill="currentColor"
    className="h-[30px] w-auto shrink-0 text-white"
    aria-hidden="true"
  >
    <path d="M19.665 14.832c-.032-3.218 2.628-4.773 2.748-4.847-1.503-2.196-3.838-2.497-4.664-2.528-1.979-.202-3.875 1.171-4.88 1.171-1.012 0-2.564-1.145-4.222-1.114-2.164.032-4.165 1.262-5.278 3.199-2.257 3.914-.576 9.706 1.618 12.88 1.076 1.553 2.352 3.295 4.026 3.233 1.619-.065 2.231-1.044 4.187-1.044 1.954 0 2.508 1.044 4.218 1.009 1.745-.028 2.847-1.581 3.912-3.139 1.237-1.805 1.744-3.556 1.772-3.646-.039-.016-3.399-1.304-3.437-5.174ZM16.453 5.331c.892-1.083 1.495-2.585 1.33-4.081-1.287.053-2.851.858-3.775 1.938-.826.955-1.551 2.486-1.356 3.952 1.436.112 2.908-.729 3.801-1.809Z" />
  </svg>
);

/** Crisp 4-color Google Play triangle mark matching the official black Google Play badge */
const GooglePlayLogoSvg = (
  <svg
    viewBox="0 0 26 28"
    className="h-[29px] w-auto shrink-0"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gp-blue" x1="0.85" y1="0.1" x2="0.1" y2="0.85">
        <stop offset="0%" stopColor="#00A0FF" />
        <stop offset="100%" stopColor="#00D2FF" />
      </linearGradient>
      <linearGradient id="gp-yellow" x1="1" y1="0.5" x2="0" y2="0.5">
        <stop offset="0%" stopColor="#FFE000" />
        <stop offset="100%" stopColor="#FF9C00" />
      </linearGradient>
      <linearGradient id="gp-red" x1="0.8" y1="0.2" x2="0.1" y2="0.95">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="gp-green" x1="0.1" y1="0.05" x2="0.8" y2="0.75">
        <stop offset="0%" stopColor="#32A071" />
        <stop offset="100%" stopColor="#00F076" />
      </linearGradient>
    </defs>
    {/* Left Blue Facet */}
    <path
      fill="url(#gp-blue)"
      d="M1.54 1.03C1.2 1.39 1 1.96 1 2.69v22.62c0 .73.2 1.3.54 1.66l.09.08L14.3 14.38v-.3L1.63.95l-.09.08Z"
    />
    {/* Right Yellow Nose */}
    <path
      fill="url(#gp-yellow)"
      d="M18.52 18.61l-4.22-4.23v-.3l4.23-4.23.1.06 5.01 2.85c1.43.81 1.43 2.14 0 2.95l-5.01 2.85-.11.05Z"
    />
    {/* Bottom Red Facet */}
    <path
      fill="url(#gp-red)"
      d="M18.63 18.55L14.3 14.23 1.54 27.05c.47.5 1.25.56 2.13.06l14.96-8.56Z"
    />
    {/* Top Green Facet */}
    <path
      fill="url(#gp-green)"
      d="M18.63 9.91L3.67 1.35C2.79.85 2.01.91 1.54 1.41L14.3 14.23l4.33-4.32Z"
    />
  </svg>
);

function StoreBadge({
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
    "group inline-flex h-[54px] min-w-[180px] items-center gap-3 rounded-[10px] border border-[#A6A6A6]/70 bg-black px-4 text-start text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/70 hover:bg-[#111111] hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2";

  const content = (
    <span dir="ltr" className="inline-flex items-center gap-3">
      {icon}
      <span className="flex flex-col leading-none">
        <span
          className={`text-[10.5px] font-normal text-white/90 ${
            uppercaseTop ? "uppercase tracking-[0.06em]" : "tracking-[0.01em]"
          }`}
        >
          {topLabel}
        </span>
        <span className="mt-1 text-[19px] font-semibold tracking-[-0.02em] text-white">
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
        className={`pointer-events-none absolute start-0 top-full z-10 mt-2 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white shadow-lift transition-opacity duration-300 ${
          notice ? "opacity-100" : "opacity-0"
        }`}
      >
        {notice ? soon : ""}
      </span>
    </span>
  );
}

/** Simple, brand-colored phone illustration (not a real app screenshot). */
function PhoneIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 260 520" role="img" aria-label={label} className="h-auto w-[200px] drop-shadow-2xl sm:w-[250px]">
      <rect x="4" y="4" width="252" height="512" rx="40" fill="#0D1629" />
      <rect x="16" y="16" width="228" height="488" rx="30" fill="#14213D" />
      <rect x="100" y="26" width="60" height="8" rx="4" fill="#0D1629" />
      {/* map roads */}
      <g stroke="#1B2B4E" strokeWidth="10" strokeLinecap="round" fill="none">
        <path d="M16 150 C 90 140, 150 200, 244 180" />
        <path d="M60 504 C 80 380, 170 320, 200 16" />
        <path d="M16 330 C 100 320, 160 360, 244 340" />
      </g>
      {/* live route */}
      <path d="M48 470 C 70 400, 120 350, 150 300 S 190 200, 205 120" stroke="#329BCF" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" fill="none" />
      {/* trucks as pins */}
      {[
        [205, 120],
        [150, 300],
        [70, 410],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" fill="#2A7EBD" opacity="0.25" />
          <circle cx={x} cy={y} r="8" fill={i === 1 ? "#65C2C8" : "#2A7EBD"} stroke="#fff" strokeWidth="2.5" />
        </g>
      ))}
      {/* alert card */}
      <g>
        <rect x="32" y="56" width="196" height="58" rx="14" fill="#fff" opacity="0.96" />
        <circle cx="58" cy="85" r="12" fill="#2A7EBD" />
        <rect x="80" y="74" width="110" height="8" rx="4" fill="#14213D" opacity="0.85" />
        <rect x="80" y="90" width="80" height="7" rx="3.5" fill="#8493A5" opacity="0.7" />
      </g>
      {/* bottom sheet */}
      <rect x="16" y="430" width="228" height="74" rx="22" fill="#0D1629" opacity="0.92" />
      <rect x="40" y="452" width="90" height="8" rx="4" fill="#fff" opacity="0.85" />
      <rect x="40" y="470" width="140" height="7" rx="3.5" fill="#8493A5" opacity="0.8" />
      <rect x="196" y="450" width="32" height="32" rx="10" fill="#2A7EBD" />
    </svg>
  );
}

export default function AppDownload() {
  const { t } = useLanguage();
  const c = t.appDownload;
  const i = c.highlight ? c.headline.indexOf(c.highlight) : -1;

  return (
    <section id="app" aria-labelledby="app-heading" className="relative overflow-hidden bg-offwhite py-20 md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 overflow-hidden rounded-panel bg-white px-6 py-12 shadow-panel ring-1 ring-line sm:px-10 md:grid-cols-12 md:gap-8 md:py-0 lg:px-16">
          <Reveal className="space-y-5 md:col-span-7 md:py-16">
            <h2 id="app-heading" className="text-h2 font-bold text-ink [text-wrap:balance]">
              {i < 0 ? (
                c.headline
              ) : (
                <>
                  {c.headline.slice(0, i)}
                  <HandUnderline>{c.highlight}</HandUnderline>
                  {c.headline.slice(i + c.highlight.length)}
                </>
              )}
            </h2>
            <p className="max-w-[520px] text-lead text-ink-muted [text-wrap:pretty]">{c.text}</p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <StoreBadge
                href={siteConfig.appLinks.ios}
                topLabel="Download on the"
                storeName="App Store"
                soon={c.soon}
                icon={AppleLogoSvg}
              />
              <StoreBadge
                href={siteConfig.appLinks.android}
                topLabel="GET IT ON"
                storeName="Google Play"
                soon={c.soon}
                icon={GooglePlayLogoSvg}
                uppercaseTop
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="-mb-40 flex justify-center md:col-span-5 md:-mb-24 md:mt-10 md:self-end">
            <PhoneIllustration label={c.phoneLabel} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
