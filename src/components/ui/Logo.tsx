import React from "react";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

export interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
  height?: number;
}

/**
 * Context-aware brand logo for AWA Fleet Guards:
 * - On Dark Backgrounds (tone="light"): renders the white SVG (logo awa.svg)
 * - On Light Backgrounds (tone="dark"): renders the dark blue SVG (awa logo dark blue.svg)
 */
export default function Logo({
  tone = "dark",
  className = "h-[48px] sm:h-[52px] md:h-[56px] w-auto",
  height,
}: LogoProps) {
  const isWhite = tone === "light";
  const logoSrc = isWhite
    ? `${BASE_PATH}/logo-white.svg`
    : `${BASE_PATH}/logo-dark.svg`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc}
      alt="AWA Fleet Guards Logo"
      className={`object-contain transition-all duration-200 ${className}`}
      style={height ? { height: `${height}px`, width: "auto" } : undefined}
    />
  );
}
