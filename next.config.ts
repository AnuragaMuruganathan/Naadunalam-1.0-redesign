import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Serve /public images as-is: no /_next/image requests, so no Vercel Image
    // Optimization usage. Files are pre-sized WebP from scripts/optimize-images.mjs.
    unoptimized: true,
  },
};

export default nextConfig;
