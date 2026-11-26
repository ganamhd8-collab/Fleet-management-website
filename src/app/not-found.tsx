"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { IconArrow } from "@/components/ui/Icons";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar forceTone="dark" />
      <main id="main-content" className="bg-offwhite">
        <section className="container flex min-h-[70dvh] flex-col items-start justify-center gap-6 pb-24 pt-40">
          <p className="eyebrow">{t.notFound.code}</p>
          <h1 className="max-w-2xl text-h2 font-bold text-ink [text-wrap:balance]">{t.notFound.title}</h1>
          <p className="max-w-prose text-lead text-ink-muted [text-wrap:pretty]">{t.notFound.text}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link href="/" className="btn-primary">
              {t.notFound.home}
              <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/#contact" className="btn-ghost-dark">
              {t.notFound.demo}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
