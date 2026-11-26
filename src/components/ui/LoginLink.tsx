"use client";

import React from "react";
import { siteConfig, isDashboardConfigured } from "@/config/site";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Link to the client dashboard. Renders nothing until NEXT_PUBLIC_DASHBOARD_URL
 * is set, so visitors never meet a dead "Login" button.
 */
export default function LoginLink({ className = "", children }: Props) {
  if (!isDashboardConfigured) return null;

  return (
    <a href={siteConfig.dashboardUrl} className={className}>
      {children}
    </a>
  );
}
