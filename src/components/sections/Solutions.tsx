"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

/** Clean, flat solid brand colors from FleetIntel's official palette (zero gradients) */
const cardThemes: Record<string, { bg: string }> = {
  gps: { bg: "#14213D" },         // Solid Deep Navy
  maintenance: { bg: "#283A88" }, // Solid Deep Royal Blue
  fuel: { bg: "#2A7EBD" },        // Solid Medium Blue
  driver: { bg: "#65C2C8" },      // Solid Cyan / Turquoise
  documents: { bg: "#7FC4A5" },   // Solid Mint Green
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

        {/* Responsive Solid Brand-Color Card Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {t.solutions.items.map((item, idx) => {
            const theme = cardThemes[item.id] ?? cardThemes.gps;
            const spanClass = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";

            return (
              <Reveal key={item.id} delay={idx * 90} className={spanClass}>
                <article
                  style={{ backgroundColor: theme.bg }}
                  className="group flex h-full min-h-[280px] flex-col justify-between rounded-[24px] p-8 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold leading-snug text-white">
                      {item.title}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-white">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-8">
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
