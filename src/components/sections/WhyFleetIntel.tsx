"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";

export default function WhyFleetIntel() {
  const { t } = useLanguage();

  return (
    <section id="why-fleetintel" className="section bg-white border-b border-line">
      <div className="container grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
          <h2 className="text-h2 font-bold text-ink">{t.why.headline}</h2>
          <p className="text-lead text-ink-muted max-w-prose">{t.why.copy}</p>
        </Reveal>

        <div className="lg:col-span-7 divide-y divide-line border-t border-b border-line">
          {t.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline">
                <span className="sm:col-span-2 text-xs font-semibold tracking-widest text-ocean-strong">
                  0{i + 1}
                </span>
                <h3 className="sm:col-span-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="sm:col-span-5 text-[15px] leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
