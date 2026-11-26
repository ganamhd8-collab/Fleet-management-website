import type { Metadata, Viewport } from "next";
import { Rubik, Anton, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

export const metadata: Metadata = {
  metadataBase: new URL("https://www.awafleetguards.com"),
  title: "AWA Fleet Guards — One Integrated Ecosystem. Complete Fleet Intelligence.",
  description:
    "AWA Fleet Guards combines dedicated hardware, intelligent software, and fleet operations management for businesses in Egypt, Saudi Arabia, and the GCC.",
  openGraph: {
    title: "AWA Fleet Guards — Integrated Fleet Management",
    description: "Connect your vehicles, drivers, and operations through one integrated fleet management ecosystem.",
    type: "website",
    siteName: "AWA Fleet Guards",
    images: [
      {
        url: `${BASE_PATH}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AWA Fleet Guards truck connected to a live tracking network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWA Fleet Guards — Integrated Fleet Management",
    description: "Connect your vehicles, drivers, and operations through one integrated fleet management ecosystem.",
    images: [`${BASE_PATH}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" },
      { url: `${BASE_PATH}/logo-dark.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${BASE_PATH}/favicon.svg`,
    apple: `${BASE_PATH}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14213D",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${rubik.variable} ${anton.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon & Web App Icons */}
        <link rel="icon" type="image/svg+xml" href={`${BASE_PATH}/favicon.svg`} />
        <link rel="alternate icon" href={`${BASE_PATH}/logo-dark.svg`} />

        {/* Break network dependency chains: early DNS & TLS handshake preconnects */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://d2ol7oe51mr4n9.cloudfront.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://d2ol7oe51mr4n9.cloudfront.net" />

        {/* LCP: the first frame of the hero sequence is the first thing visitors see */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={`${BASE_PATH}/assets/hero-sequence-v2/frame_0001.webp`}
          fetchPriority="high"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        {/* Non-blocking JS capability marker at end of body to prevent render-blocking head execution */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </body>
    </html>
  );
}
