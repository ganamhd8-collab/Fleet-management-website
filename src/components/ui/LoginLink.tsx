"use client";

import React, { useState } from "react";
import { siteConfig, isDashboardConfigured } from "@/config/site";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Link to the client dashboard. While no dashboard URL is configured it stays
 * visible (as the brief requires) but explains that the link is coming soon
 * instead of navigating to an invented address.
 */
export default function LoginLink({ className = "", children }: Props) {
  const { t } = useLanguage();
  const [notice, setNotice] = useState(false);

  if (isDashboardConfigured) {
    return (
      <a href={siteConfig.dashboardUrl} className={className}>
        {children}
      </a>
    );
  }

  return (
    <span className="relative inline-flex">
      <a
        href="#"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setNotice(true);
          window.setTimeout(() => setNotice(false), 2600);
        }}
      >
        {children}
      </a>
      <span
        role="status"
        className={`pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white shadow-lift transition-opacity duration-200 start-0 ${
          notice ? "opacity-100" : "opacity-0"
        }`}
      >
        {notice ? t.nav.loginPending : ""}
      </span>
    </span>
  );
}
