"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import Reveal from "@/components/ui/Reveal";

/**
 * Individualized visual treatments for each industry card to achieve
 * a cohesive, cinematic, and brand-aligned corporate look (#14213D / #287FBA / #5DC1C7).
 */
const industryTreatments: Record<
  string,
  {
    gradient: string;
    accentColor: string;
  }
> = {
  logistics: {
    gradient:
      "linear-gradient(180deg, rgba(20, 33, 61, 0.0) 0%, rgba(20, 33, 61, 0.15) 55%, rgba(20, 33, 61, 0.82) 100%)",
    accentColor: "#5DC1C7",
  },
  distribution: {
    gradient:
      "linear-gradient(180deg, rgba(20, 33, 61, 0.0) 0%, rgba(20, 33, 61, 0.18) 55%, rgba(20, 33, 61, 0.85) 100%)",
    accentColor: "#2D9BD0",
  },
  construction: {
    gradient:
      "linear-gradient(180deg, rgba(20, 33, 61, 0.0) 0%, rgba(20, 33, 61, 0.22) 55%, rgba(20, 33, 61, 0.86) 100%)",
    accentColor: "#287FBA",
  },
  rental: {
    gradient:
      "linear-gradient(180deg, rgba(20, 33, 61, 0.0) 0%, rgba(20, 33, 61, 0.15) 55%, rgba(20, 33, 61, 0.82) 100%)",
    accentColor: "#5DC1C7",
  },
  corporate: {
    gradient:
      "linear-gradient(180deg, rgba(20, 33, 61, 0.0) 0%, rgba(20, 33, 61, 0.15) 55%, rgba(20, 33, 61, 0.82) 100%)",
    accentColor: "#2D9BD0",
  },
};

export default function Industries() {
  const { t } = useLanguage();

  return (
    <section id="industries" className="section bg-offwhite border-b border-line">
      <div className="container">
        <Reveal className="max-w-3xl space-y-4">
          <h2 className="text-h2 font-bold text-ink">{t.industries.headline}</h2>
          <p className="text-lead text-ink-muted max-w-prose">{t.industries.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.industries.items.map((item, i) => {
            const src = images.industries[item.id as keyof typeof images.industries];
            const treatment = industryTreatments[item.id] || industryTreatments.logistics;
            // First 2 items span 3 cols on lg, next 3 span 2 cols on lg for balanced 5-item editorial grid
            const spanClass = i < 2 ? "lg:col-span-3" : "lg:col-span-2";

            return (
              <Reveal key={item.id} delay={i * 70} className={spanClass}>
                <figure className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy border border-navy/10 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-navy/15 hover:border-turquoise/35">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle Bottom Legibility Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: treatment.gradient,
                    }}
                  />

                  {/* Subtle interactive accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${treatment.accentColor}25 0%, transparent 70%)`,
                    }}
                  />

                  {/* Card Content */}
                  <figcaption className="absolute bottom-5 inset-x-6 z-10">
                    <span
                      className="block h-0.5 w-6 rounded-full transition-all duration-300 group-hover:w-10 mb-2"
                      style={{ backgroundColor: treatment.accentColor }}
                    />
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-sm">
                      {item.title}
                    </h3>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
