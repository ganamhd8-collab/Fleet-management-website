/**
 * Central, editable site configuration for AWA Fleet Guards.
 */
export const siteConfig = {
  brandName: "AWA Fleet Guards",

  /** Path to logo files in /public. */
  logoWhiteSrc: "/logo-white.svg",
  logoDarkSrc: "/logo-dark.svg",

  /**
   * Client dashboard destination. The real dashboard is not live yet,
   * so this defaults to "#" and the Login buttons are marked as placeholders.
   * Set NEXT_PUBLIC_DASHBOARD_URL to the real URL when available.
   */
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL || "#",

  /**
   * Demo form endpoint. When empty, the form validates and shows the
   * success state locally without sending data anywhere (frontend-only placeholder).
   * Set NEXT_PUBLIC_DEMO_ENDPOINT to a URL that accepts a JSON POST.
   */
  demoEndpoint: process.env.NEXT_PUBLIC_DEMO_ENDPOINT || "",

  /** Contact placeholders — replace with official details. */
  contact: {
    email: "[official-email@company.com]",
    phone: "[+000 0000 0000]",
  },

  /** Social placeholders — set href to real profiles when available. */
  social: [
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "x", label: "X", href: "#" },
    { id: "instagram", label: "Instagram", href: "#" },
  ],
} as const;

export const isDashboardConfigured = siteConfig.dashboardUrl !== "#";
