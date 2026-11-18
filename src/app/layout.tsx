import type { Metadata, Viewport } from "next";
import { Rubik, Anton } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FleetIntel — One Integrated Ecosystem. Complete Fleet Intelligence.",
  description:
    "FleetIntel combines dedicated hardware, intelligent software, and fleet operations management for businesses in Egypt, Saudi Arabia, and the GCC.",
  openGraph: {
    title: "FleetIntel — Integrated Fleet Management",
    description: "Connect your vehicles, drivers, and operations through one integrated fleet management ecosystem.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14213D",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${rubik.variable} ${anton.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
