const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Fleet-management-website" : "");

/**
 * Brand-curated commercial fleet & operations photography.
 */
export const images = {
  hero: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1080&q=75",
  heroMobile: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=640&q=75",
  aboutHero: `${BASE_PATH}/assets/industries/logistics.jpg`,
  aboutIntro: `${BASE_PATH}/assets/industries/distribution-2.jpg`,
  homeAbout: `${BASE_PATH}/assets/about/awa-scania-truck.png`,
  solutions: {
    gps: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=75",
    maintenance: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=75",
    fuel: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=600&q=75",
    driver: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=75",
    documents: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=75",
    cargo: `${BASE_PATH}/assets/industries/distribution-2.jpg`,
    "ai-assistant": "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=600&q=75",
    cameras: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=75",
  },
  industries: {
    logistics: `${BASE_PATH}/assets/industries/logistics.jpg`,
    distribution: `${BASE_PATH}/assets/industries/distribution.jpg`,
    construction: `${BASE_PATH}/assets/industries/construction.jpg`,
    rental: `${BASE_PATH}/assets/industries/rental.jpg`,
    corporate: `${BASE_PATH}/assets/industries/corporate.jpg`,
  },
} as const;
