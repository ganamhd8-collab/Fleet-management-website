"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

/** Cohesive 8-shade Navy-to-Teal-Blue scale derived directly from FleetIntel's real brand tokens */
const cardColors: Record<string, string> = {
  // Row 1: Core Fleet & Telemetry — Smooth progression from Deepest Navy to Primary Brand Blue
  gps: "#0B192C",            // Card 1: Deepest Brand Navy (Site Hero & Dark Theme base)
  maintenance: "#133154",    // Card 2: Midnight Navy-Blue
  fuel: "#1B4A72",           // Card 3: Deep Steel-Blue
  driver: "#236CA6",         // Card 4: FleetIntel Primary Blue (Matches "Book a Demo" button)

  // Row 2: Specialized Operations & AI — Complementary oceanic teal & deep cobalt-navy progression
  documents: "#134454",      // Card 5: Dark Oceanic Teal-Blue (Echoes logo teal)
  cargo: "#172F4A",          // Card 6: Deep Slate-Navy
  "ai-assistant": "#1A4372", // Card 7: Rich Cobalt-Navy
  cameras: "#123F4D",        // Card 8: Deep Petrol / Teal-Navy
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
            const bg = cardColors[item.id] ?? cardColors.gps;

            return (
              <Reveal key={item.id} delay={idx * 75}>
                <article
                  style={{ backgroundColor: bg }}
                  className="group flex h-full min-h-[300px] flex-col justify-between rounded-[24px] p-7 text-white shadow-panel transition duration-300 ease-out hover:-translate-y-2 hover:shadow-lift will-change-transform"
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
