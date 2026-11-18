import React from "react";
import { siteConfig } from "@/config/site";

/** Text wordmark until a real logo is provided via siteConfig.logoSrc. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (siteConfig.logoSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logoSrc} alt={siteConfig.brandName} className="h-8 w-auto" />;
  }
  const color = tone === "light" ? "text-white" : "text-navy";
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2 text-[19px] font-semibold tracking-tight ${color}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <circle cx="7" cy="20" r="3" fill="#65C2C8" />
        <circle cx="21" cy="8" r="3" fill="#329BCF" />
        <circle cx="20" cy="21" r="2.2" fill="#7FC4A5" />
        <path d="M7 20 L21 8 M21 8 L20 21 M7 20 L20 21" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      </svg>
      <span>
        Fleet<span className="font-bold">Intel</span>
      </span>
    </span>
  );
}
