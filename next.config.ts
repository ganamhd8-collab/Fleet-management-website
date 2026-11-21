import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: "export",
    basePath: "/Fleet-management-website",
    assetPrefix: "/Fleet-management-website/",
  }),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
