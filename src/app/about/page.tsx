import type { Metadata } from "next";
import React from "react";
import AboutPageView from "@/components/sections/AboutPageView";

export const metadata: Metadata = {
  title: "About Us — AWA Fleet Guards | Driving Smarter Fleet Operations",
  description:
    "At AWA Fleet Guards, we bring vehicles, drivers, and fleet operations together through intelligent technology, connected systems, and actionable insights.",
  openGraph: {
    title: "About Us — AWA Fleet Guards",
    description:
      "More Than Fleet Management. A Smarter Way Forward. Discover AWA Fleet Guards' mission, vision, core values, and integrated fleet ecosystem.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageView />;
}
