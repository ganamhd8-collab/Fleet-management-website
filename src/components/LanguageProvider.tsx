"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dictionaries, type Dictionary, type Lang } from "@/content/dictionary";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "awafleetguards-lang";

/** Returns the id of the section currently nearest the top of the viewport. */
function currentSectionId(): string | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
  const offset = 96;
  let current: string | null = null;
  for (const s of sections) {
    if (s.getBoundingClientRect().top - offset <= 0) current = s.id;
  }
  return current;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Restore saved preference (or ?lang=ar) after hydration.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial = fromUrl === "ar" || fromUrl === "en" ? fromUrl : saved === "ar" ? "ar" : null;
    if (initial && initial !== "en") setLang(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggle = useCallback(() => {
    // Keep the visitor on the same section: text length differs between
    // languages, so re-anchor to the section after the layout reflows.
    const anchor = currentSectionId();
    const el = anchor ? document.getElementById(anchor) : null;
    const delta = el ? el.getBoundingClientRect().top : 0;
    setLang((l) => (l === "en" ? "ar" : "en"));
    if (el) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - delta;
          window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
        })
      );
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", t: dictionaries[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
