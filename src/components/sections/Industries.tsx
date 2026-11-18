"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import Reveal from "@/components/ui/Reveal";

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
            // First 2 items span 3 cols on lg, next 3 span 2 cols on lg for balanced 5-item editorial grid
            const spanClass = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <Reveal key={item.id} delay={i * 70} className={spanClass}>
                <figure className="group relative aspect-[16/10] overflow-hidden rounded-panel bg-navy">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(180deg, rgba(20,33,61,0.12) 0%, rgba(20,33,61,0.85) 100%)",
                    }}
                  />
                  <figcaption className="absolute bottom-5 inset-x-6">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
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
