import type { Metadata, Viewport } from "next";
import { Rubik, Anton, JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { images } from "@/content/images";

const rubik = Rubik({
  subsets: ["latin"],
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

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

export const metadata: Metadata = {
  title: "AWA Fleet Guards — One Integrated Ecosystem. Complete Fleet Intelligence.",
  description:
    "AWA Fleet Guards combines dedicated hardware, intelligent software, and fleet operations management for businesses in Egypt, Saudi Arabia, and the GCC.",
  openGraph: {
    title: "AWA Fleet Guards — Integrated Fleet Management",
    description: "Connect your vehicles, drivers, and operations through one integrated fleet management ecosystem.",
    type: "website",
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
      className={`${rubik.variable} ${anton.variable} ${jetbrainsMono.variable} ${archivo.variable}`}
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

        {/* Instant LCP Discovery: High-priority responsive image preload */}
        <link
          rel="preload"
          as="image"
          href={images.hero}
          imageSrcSet={`${images.heroMobile} 640w, ${images.hero} 1080w`}
          imageSizes="(max-width: 768px) 100vw, 100vw"
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
