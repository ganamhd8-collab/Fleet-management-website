"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { images } from "@/content/images";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { IconArrow, IconCheck } from "@/components/ui/Icons";

const detailColors: Record<string, string> = {
  gps: "#102038",            // Row 1: Deep Navy
  maintenance: "#293C82",    // Row 1: Royal/Indigo Blue
  fuel: "#287BBD",           // Row 1: Medium Brand Blue
  driver: "#339CD4",         // Row 1: Bright Sky/Cyan Blue
  documents: "#102038",      // Row 2: Deep Navy
  cargo: "#287BBD",          // Row 2: Medium Brand Blue
  "ai-assistant": "#293C82", // Row 2: Royal/Indigo Blue
  cameras: "#5A6E82",        // Row 2: Slate/Steel Blue
};

export default function ServiceDetailView({ serviceId }: { serviceId: string }) {
  const { t, lang } = useLanguage();

  const idx = t.solutions.items.findIndex((i) => i.id === serviceId);
  const service = idx >= 0 ? t.solutions.items[idx] : t.solutions.items[0];
  const heroBg = detailColors[service.id] ?? detailColors.gps;
  const imgSrc = images.solutions[service.image as keyof typeof images.solutions];
  const fullCopy =
    "detailDescription" in service && service.detailDescription
      ? service.detailDescription
      : service.description;

  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Colored Brand Header */}
        <section
          className="pt-32 pb-16 md:pt-36 md:pb-24 text-white"
          style={{ background: heroBg }}
        >
          <div className="container space-y-6">
            <Link
              href="/#solutions"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-navy"
            >
              <span className="inline-block rotate-180">
                <IconArrow className="h-3.5 w-3.5" />
              </span>
              <span>{lang === "ar" ? "العودة إلى الحلول" : "Back to Solutions"}</span>
            </Link>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-display font-bold text-white">{service.title}</h1>
              <p className="text-lead text-white/90 max-w-prose">{service.description}</p>
            </div>
          </div>
        </section>

        {/* In-Depth Capabilities & Representative Visual */}
        <section className="section bg-offwhite">
          <div className="container grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-h2 font-bold text-ink">
                {lang === "ar" ? "المزايا والقدرات الرئيسية" : "Key Capabilities & Operational Value"}
              </h2>

              <p className="text-base leading-relaxed text-ink-muted max-w-prose">
                {fullCopy}
              </p>

              <ul className="space-y-3 pt-2">
                {service.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 rounded-card border border-line bg-white p-4 text-sm font-semibold text-ink shadow-sm"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/25 text-navy">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/#contact" className="btn-primary">
                  {t.hero.primary}
                  <IconArrow className="h-4 w-4" />
                </Link>
                <Link href="/#solutions" className="btn-ghost-dark">
                  {lang === "ar" ? "تصفح كل الخدمات" : "View All Services"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[24px] border border-line bg-navy shadow-panel">
                <div className="relative aspect-[16/10] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={service.alt}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-4 end-4 rounded-full bg-navy/75 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                    {t.solutions.illustrative}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
