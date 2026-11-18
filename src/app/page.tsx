"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import HowItWorks from "@/components/sections/HowItWorks";
import Industries from "@/components/sections/Industries";
import WhyFleetIntel from "@/components/sections/WhyFleetIntel";
import BookDemo from "@/components/sections/BookDemo";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.meta.skip}
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Solutions />
        <HowItWorks />
        <Industries />
        <WhyFleetIntel />
        <BookDemo />
      </main>

      <Footer />
    </>
  );
}
