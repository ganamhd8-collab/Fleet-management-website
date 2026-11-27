"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Wraps a keyword and draws a hand-drawn style underline under it the first
 * time it scrolls into view. Draws right-to-left on Arabic (RTL) pages.
 */
export default function HandUnderline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.8 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        className="hand-underline pointer-events-none absolute inset-x-0 -bottom-[0.22em] h-[0.36em] w-full overflow-visible rtl:-scale-x-100"
      >
        {/* Two quick strokes, like a marker underline done by hand */}
        <path
          d="M3 9.5 C 38 4.5, 92 3, 150 5.5 S 191 9, 197 7 M 16 13 C 64 9.5, 120 9, 186 11.5"
          pathLength={1}
          className={`hand-underline-path ${drawn ? "is-drawn" : ""}`}
        />
      </svg>
    </span>
  );
}
