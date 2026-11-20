"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Logo from "@/components/ui/Logo";
import { IconMenu, IconClose } from "@/components/ui/Icons";

export default function Navbar({ forceTone }: { forceTone?: "dark" | "light" } = {}) {
  const { t, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = t.nav.links.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [t.nav.links]);

  const isLightBg = forceTone ? forceTone === "dark" : scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isLightBg
          ? "border-b border-line bg-white/95 text-ink backdrop-blur-md shadow-sm"
          : "bg-navy/40 text-white backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="container flex h-20 md:h-[84px] items-center justify-between gap-4 md:gap-6 lg:gap-8">
        {/* Enlarged Brand Logo */}
        <Link
          href="/#home"
          aria-label="AWA Fleet Guards Home"
          className="flex items-center shrink-0 py-1 transition-opacity hover:opacity-90"
        >
          <Logo
            tone={isLightBg ? "dark" : "light"}
            className="h-[56px] sm:h-[60px] md:h-[64px] w-auto max-w-none"
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
          {t.nav.links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isLightBg
                    ? isActive
                      ? "text-ocean-strong"
                      : "text-ink-muted hover:text-ink"
                    : isActive
                      ? "text-turquoise"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full ${
                      isLightBg ? "bg-ocean-strong" : "bg-turquoise"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.switchLabel}
            className={`min-h-[40px] rounded-full border px-3.5 text-xs font-semibold transition-colors ${
              isLightBg
                ? "border-line text-ink hover:border-ink"
                : "border-white/25 text-white hover:border-white"
            }`}
          >
            {t.nav.switchTo}
          </button>

          <Link href="/#contact" className="btn-primary !min-h-[42px] !px-5 !text-sm">
            {t.nav.demo}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.switchLabel}
            className={`min-h-[40px] rounded-full border px-3 text-xs font-semibold ${
              isLightBg ? "border-line text-ink" : "border-white/25 text-white"
            }`}
          >
            {t.nav.switchTo}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
              isLightBg ? "border-line text-ink" : "border-white/25 text-white"
            }`}
          >
            {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-line bg-white px-5 py-6 text-ink shadow-lift">
          <nav className="flex flex-col gap-1">
            {t.nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  activeId === link.id ? "bg-offwhite text-ocean-strong" : "text-ink hover:bg-offwhite"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              {t.nav.demo}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
