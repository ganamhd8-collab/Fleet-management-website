"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/ui/Reveal";

function DynamicCountUp({
  target,
  suffix,
  active,
  delaySeconds = 0,
}: {
  target: number;
  suffix: string;
  active: boolean;
  delaySeconds?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(
    prefersReducedMotion ? target : 0
  );
  const [settled, setSettled] = useState<boolean>(Boolean(prefersReducedMotion));

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      setSettled(true);
      return;
    }

    if (!active) {
      setDisplayValue(0);
      setSettled(false);
      return;
    }

    setSettled(false);
    const controls = animate(0, target, {
      duration: 1.95,
      delay: 0.12 + delaySeconds,
      // Balanced deceleration curve: clearly visible climb from 0 + smooth final ticks
      ease: [0.22, 0.82, 0.28, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
      onComplete: () => {
        setDisplayValue(target);
        setSettled(true);
      },
    });

    return () => controls.stop();
  }, [active, target, delaySeconds, prefersReducedMotion]);

  return (
    <span
      dir="ltr"
      className={`inline-flex items-baseline tabular-nums transition-transform duration-500 ease-out ${
        active || prefersReducedMotion
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0"
      }`}
    >
      <span>{displayValue}</span>
      <span
        className={`ms-0.5 inline-block text-[0.72em] font-bold transition-all duration-500 ease-out ${
          settled || displayValue > target * 0.35
            ? "scale-100 opacity-100"
            : "scale-75 opacity-45"
        }`}
      >
        {suffix}
      </span>
    </span>
  );
}

export default function CompanyStats() {
  const { t } = useLanguage();
  const statsGridRef = useRef<HTMLDivElement>(null);

  // Trigger when the numbers row itself is clearly visible in the viewport,
  // and reset cleanly only when scrolled completely off-screen so re-scrolling replays the dynamic increase.
  const isEntering = useInView(statsGridRef, {
    amount: 0.38,
    margin: "0px 0px -8% 0px",
  });
  const isAnyPartVisible = useInView(statsGridRef, {
    amount: 0,
    margin: "120px 0px 120px 0px",
  });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isEntering) {
      setActive(true);
    } else if (!isAnyPartVisible) {
      setActive(false);
    }
  }, [isEntering, isAnyPartVisible]);

  return (
    <section
      id="company-stats"
      aria-label={t.companyStats.headline}
      className="relative overflow-hidden bg-offwhite py-20 sm:py-24 md:py-28 border-b border-line"
    >
      <div className="container">
        {/* Clean Editorial Header */}
        <Reveal className="max-w-3xl space-y-3">
          <h2 className="text-[clamp(1.85rem,3.2vw,2.85rem)] font-bold tracking-tight text-navy leading-[1.14]">
            {t.companyStats.headline}
          </h2>
        </Reveal>

        {/* Architectural Horizontal Layout with Oversized Dynamic Count-Up Numbers */}
        <div
          ref={statsGridRef}
          className="mt-12 sm:mt-14 border-t border-navy/10 pt-10 sm:pt-12"
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x rtl:md:divide-x-reverse divide-navy/10">
            {t.companyStats.items.map((stat, idx) => (
              <div
                key={stat.id}
                className={
                  idx === 0
                    ? "md:pe-12 lg:pe-20"
                    : "border-t border-navy/10 pt-10 md:border-t-0 md:pt-0 md:ps-12 lg:ps-20"
                }
              >
                <div className="flex flex-col space-y-4">
                  {/* Oversized Corporate Blue Dynamic Count-Up Number */}
                  <div
                    aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                    className="text-[clamp(4.75rem,8.5vw,7.25rem)] font-bold tracking-[-0.03em] leading-none text-ocean"
                  >
                    <DynamicCountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      active={active}
                      delaySeconds={idx * 0.14}
                    />
                  </div>

                  {/* Synchronized Accent Rule + Deep Navy Label */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-3.5">
                      <span className="relative h-[2.5px] w-10 overflow-hidden rounded-full bg-navy/10">
                        <span
                          className="absolute inset-0 origin-left rtl:origin-right rounded-full bg-ocean transition-transform duration-[1900ms] ease-out"
                          style={{
                            transform: active ? "scaleX(1)" : "scaleX(0)",
                            transitionDelay: `${120 + idx * 140}ms`,
                          }}
                        />
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
                        {stat.label}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-[44ch]">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
