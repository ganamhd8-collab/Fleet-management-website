"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

/** Clean, flat solid brand colors from FleetIntel's official palette (zero gradients) */
const cardThemes: Record<string, { bg: string }> = {
  gps: { bg: "#14213D" },            // Solid Deep Navy
  maintenance: { bg: "#283A88" },    // Solid Deep Royal Blue
  fuel: { bg: "#2A7EBD" },           // Solid Medium Blue
  driver: { bg: "#65C2C8" },         // Solid Cyan / Turquoise
  documents: { bg: "#7FC4A5" },      // Solid Mint Green
  cargo: { bg: "#329BCF" },          // Solid Sky Blue
  "ai-assistant": { bg: "#1E3A8A" }, // Solid Indigo Blue
  cameras: { bg: "#8493A5" },        // Solid Slate Steel Blue
};

export default function Solutions() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="solutions"
      aria-label={t.solutions.headline}
      className="section bg-offwhite border-b border-line"
    >
      <div className="container">
        {/* Section Header */}
        <Reveal className="max-w-3xl space-y-4">
          <h2 className="text-h2 font-bold text-ink">{t.solutions.headline}</h2>
          <p className="text-lead text-ink-muted max-w-prose">
            {t.solutions.intro}
          </p>
        </Reveal>

        {/* Balanced 4x2 Desktop / 2-Column Tablet / 1-Column Mobile Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.solutions.items.map((item, idx) => {
            const theme = cardThemes[item.id] ?? cardThemes.gps;

            return (
              <Reveal key={item.id} delay={idx * 75}>
                <article
                  style={{ backgroundColor: theme.bg }}
                  className="group flex h-full min-h-[300px] flex-col justify-between rounded-[24px] p-7 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="space-y-3.5">
                    <h3 className="text-xl font-bold leading-snug text-white">
                      {item.title}
                    </h3>

                    <p className="text-[14.5px] leading-relaxed text-white">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-7">
                    <Link
                      href={`/services/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30"
                    >
                      <span>{lang === "ar" ? "اقرأ المزيد" : "Read More"}</span>
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
  );
}
