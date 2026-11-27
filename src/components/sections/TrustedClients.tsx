"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import HandUnderline from "@/components/ui/HandUnderline";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

export type ClientLogo = {
  id: string;
  name: string;
  src: string;
};

const rowOneClients: ClientLogo[] = [
  { id: "gobus", name: "Go Bus", src: `${BASE_PATH}/assets/clients/gobus.png` },
  { id: "elsewedy", name: "Elsewedy Electric", src: `${BASE_PATH}/assets/clients/elsewedy-electric.png` },
  { id: "arab-contractors", name: "The Arab Contractors", src: `${BASE_PATH}/assets/clients/arab-contractors.png` },
  { id: "mobica", name: "Mobica", src: `${BASE_PATH}/assets/clients/mobica.png` },
  { id: "morshedy", name: "Morshedy Group", src: `${BASE_PATH}/assets/clients/morshedy-group.png` },
  { id: "cic", name: "Canadian International College", src: `${BASE_PATH}/assets/clients/cic.png` },
  { id: "continental", name: "The Continental School of Cairo", src: `${BASE_PATH}/assets/clients/continental-school.png` },
  { id: "suez-cement", name: "Suez Cement", src: `${BASE_PATH}/assets/clients/suez-cement.png` },
];

const rowTwoClients: ClientLogo[] = [
  { id: "elarosa", name: "El Arosa Tea", src: `${BASE_PATH}/assets/clients/elarosa-tea.png` },
  { id: "fox", name: "Fox", src: `${BASE_PATH}/assets/clients/fox.png` },
  { id: "el-masreen", name: "Kheir El Masreen", src: `${BASE_PATH}/assets/clients/el-masreen.png` },
  { id: "el-raey", name: "El Raey Company", src: `${BASE_PATH}/assets/clients/el-raey.png` },
  { id: "royal", name: "Royal", src: `${BASE_PATH}/assets/clients/royal.png` },
  { id: "el-nile", name: "El Nile Cables", src: `${BASE_PATH}/assets/clients/el-nile-cables.png` },
  { id: "ferchem", name: "Ferchem Misr", src: `${BASE_PATH}/assets/clients/ferchem-misr.png` },
  { id: "rhodes", name: "Rhodes", src: `${BASE_PATH}/assets/clients/rhodes.png` },
];

function MarqueeRow({
  logos,
  direction,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
}) {
  const trackClass = direction === "left" ? "marquee-track-left" : "marquee-track-right";

  return (
    <div className="marquee-row marquee-mask relative w-full overflow-hidden py-1.5" dir="ltr">
      <div className={`flex w-max items-center ${trackClass}`}>
        {[0, 1].map((dupIdx) => (
          <div
            key={dupIdx}
            aria-hidden={dupIdx === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-5 pr-5 sm:gap-6 sm:pr-6"
          >
            {logos.map((client) => (
              <div
                key={`${dupIdx}-${client.id}`}
                title={client.name}
                className="group/logo flex h-[84px] w-[178px] sm:h-[94px] sm:w-[210px] shrink-0 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white px-6 py-3.5 shadow-[0_2px_10px_rgba(20,33,61,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-turquoise/60 hover:shadow-[0_12px_28px_-10px_rgba(20,33,61,0.12)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.src}
                  alt={client.name}
                  loading="eager"
                  decoding="async"
                  className="max-h-[54px] sm:max-h-[62px] max-w-[136px] sm:max-w-[158px] w-auto h-auto object-contain grayscale opacity-65 transition-all duration-300 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedClients() {
  const { t } = useLanguage();

  return (
    <section
      id="trusted-clients"
      aria-label={t.trustedClients.headline}
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 border-b border-line"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center space-y-3">
          <h2 className="text-[clamp(1.75rem,3vw,2.6rem)] font-bold tracking-tight text-navy leading-tight">
            {(() => {
              const { headline, highlight } = t.trustedClients;
              const i = highlight ? headline.indexOf(highlight) : -1;
              if (i < 0) return headline;
              return (
                <>
                  {headline.slice(0, i)}
                  <HandUnderline>{highlight}</HandUnderline>
                  {headline.slice(i + highlight.length)}
                </>
              );
            })()}
          </h2>

          {t.trustedClients.subtitle && (
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {t.trustedClients.subtitle}
            </p>
          )}
        </Reveal>
      </div>

      {/* Dual Opposite-Direction Infinite Marquee Rows */}
      <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-5">
        <MarqueeRow logos={rowOneClients} direction="left" />
        <MarqueeRow logos={rowTwoClients} direction="right" />
      </div>
    </section>
  );
}
