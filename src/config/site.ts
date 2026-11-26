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

  /** Official contact details. */
  contact: {
    email: "info@awafleetguards.com",
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

/** Placeholder values (like "[+000 0000 0000]") are hidden until real ones are set. */
export const isPhoneConfigured = !/^\[|0000/.test(siteConfig.contact.phone);

/** Only social profiles with a real URL are shown. */
export const activeSocial = siteConfig.social.filter((s) => s.href !== "#");

/** Footer "Privacy Policy" / "Terms" links stay hidden until these pages exist. Set the paths when ready. */
export const legalLinks = {
  privacy: "",
  terms: "",
};
