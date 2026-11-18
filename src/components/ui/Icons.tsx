import React from "react";

type IconProps = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

export const IconDowntime = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M3 12h3l2-5 4 10 2-5h7" />
  </svg>
);
export const IconFuel = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M4 20h11M5 10h9M14 8l3 2v7a1.5 1.5 0 0 0 3 0V9l-3-3" />
  </svg>
);
export const IconDriver = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 14v6.5M10 12H3.5M14 12h6.5" />
  </svg>
);
export const IconCompliance = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4M10 13l2 2 3.5-4" />
  </svg>
);
export const IconArrow = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={1.8} className={`${className ?? ""} rtl:-scale-x-100`}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconCheck = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
export const IconMenu = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const IconClose = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconUser = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
  </svg>
);

export const challengeIcons = {
  downtime: IconDowntime,
  fuel: IconFuel,
  driver: IconDriver,
  compliance: IconCompliance,
} as const;
