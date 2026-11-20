import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Official AWA Fleet Guards palette
        navy: { DEFAULT: "#14213D", 950: "#0D1629", 900: "#14213D", 800: "#1B2B4E" },
        royal: "#283A88",
        ocean: {
          DEFAULT: "#2A7EBD",
          // Darker step of Ocean Blue used behind white button text (5.6:1 contrast).
          strong: "#236CA6",
        },
        sky: "#329BCF",
        turquoise: "#65C2C8",
        mint: "#7FC4A5",
        slate: { DEFAULT: "#8493A5" },
        // Neutrals
        offwhite: "#F5F7FA",
        mist: "#EEF2F6",
        ink: {
          DEFAULT: "#14213D",
          // Accessible body text derived from Deep Navy (7.4:1 on white).
          muted: "#4A5872",
        },
        line: "#DDE3EA",
        warn: "#C98A1B",
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
        arabic: ["var(--font-rubik)", "system-ui", "sans-serif"],
        anton: ["var(--font-anton)", "var(--font-rubik)", "sans-serif"],
        archivo: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.9rem, 1.4rem + 1.9vw, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", { lineHeight: "1.7" }],
      },
      borderRadius: {
        card: "14px",
        panel: "20px",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(20,33,61,0.04), 0 12px 32px -12px rgba(20,33,61,0.18)",
        lift: "0 2px 4px rgba(20,33,61,0.05), 0 24px 48px -20px rgba(20,33,61,0.28)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
