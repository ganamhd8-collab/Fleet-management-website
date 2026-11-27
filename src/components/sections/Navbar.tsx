"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import Logo from "@/components/ui/Logo";
import LoginLink from "@/components/ui/LoginLink";
import { IconMenu, IconClose, IconGlobe } from "@/components/ui/Icons";

export default function Navbar({ forceTone }: { forceTone?: "dark" | "light" } = {}) {
  const { t, toggle, lang } = useLanguage();
  // The switch shows the *other* language, written in that language.
  const otherLang = lang === "en" ? "ar" : "en";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const isAboutPage = pathname === "/about" || pathname?.startsWith("/about/");
  const isServicePage = pathname?.startsWith("/services");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isAboutPage || isServicePage) return;
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
  }, [t.nav.links, isAboutPage, isServicePage]);

  const isHomePage = pathname === "/";
  // On pages outside the main sections (e.g. the 404 page) no link is marked active.
  const currentActiveId = isAboutPage ? "about" : isServicePage ? "solutions" : isHomePage ? activeId : "";
  const getLinkHref = (id: string) => (id === "about" ? "/about" : `/#${id}`);
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
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-7">
          {t.nav.links.map((link) => {
            const isActive = currentActiveId === link.id;
            return (
              <Link
                key={link.id}
                href={getLinkHref(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap py-2 text-sm font-medium transition-colors ${
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
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.switchLabel}
            className={`inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold transition-colors ${
              isLightBg ? "text-ink-muted hover:text-ink" : "text-white/85 hover:text-white"
            }`}
          >
            <IconGlobe className="h-5 w-5" />
            <span lang={otherLang}>{t.nav.switchTo}</span>
          </button>

          <LoginLink
            whenMissing="pending"
            className={`btn !min-h-[42px] !px-5 !text-sm bg-[#174E7A] text-white hover:bg-[#123E63] active:scale-[0.97] ${
              isLightBg ? "shadow-sm" : "ring-1 ring-[#329BCF]/35"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
            </svg>
            <span>{t.nav.login}</span>
          </LoginLink>

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
            className={`inline-flex min-h-[40px] items-center gap-1.5 px-2 text-sm font-semibold ${
              isLightBg ? "text-ink" : "text-white"
            }`}
          >
            <IconGlobe className="h-5 w-5" />
            <span lang={otherLang}>{t.nav.switchTo}</span>
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
              <Link
                key={link.id}
                href={getLinkHref(link.id)}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  currentActiveId === link.id ? "bg-offwhite text-ocean-strong" : "text-ink hover:bg-offwhite"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
            <LoginLink
              whenMissing="pending"
              className="btn w-full justify-center !text-sm bg-[#174E7A] text-white hover:bg-[#123E63] active:scale-[0.97]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
              </svg>
              <span>{t.nav.login}</span>
            </LoginLink>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              {t.nav.demo}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
