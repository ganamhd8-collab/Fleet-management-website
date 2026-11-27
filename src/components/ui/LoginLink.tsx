"use client";

import React, { useState } from "react";
import { siteConfig, isDashboardConfigured } from "@/config/site";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  className?: string;
  children: React.ReactNode;
  /**
   * When the dashboard URL isn't set yet: render nothing (default), or stay
   * visible and show a short "coming soon" note on click ("pending").
   */
  whenMissing?: "hide" | "pending";
};

export default function LoginLink({ className = "", children, whenMissing = "hide" }: Props) {
  const { t } = useLanguage();
  const [notice, setNotice] = useState(false);

  if (isDashboardConfigured) {
    return (
      <a href={siteConfig.dashboardUrl} className={className}>
        {children}
      </a>
    );
  }

  if (whenMissing === "hide") return null;

  return (
    <span className={`relative ${className.includes("w-full") ? "flex w-full" : "inline-flex"}`}>
      <button
        type="button"
        className={className}
        aria-describedby="login-pending-note"
        onClick={() => {
          setNotice(true);
          window.setTimeout(() => setNotice(false), 2600);
        }}
      >
        {children}
      </button>
      <span
        id="login-pending-note"
        role="status"
        className={`pointer-events-none absolute end-0 top-full z-50 mt-2 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white shadow-lift transition-opacity duration-300 ${
          notice ? "opacity-100" : "opacity-0"
        }`}
      >
        {notice ? t.nav.loginPending : ""}
      </span>
    </span>
  );
}
