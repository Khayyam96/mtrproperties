import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/styles")],
  },
  experimental: {
    // optimizeCss: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reservation.dubaiyachts.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.dubaiyachts.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dubaiyachts.com",
        pathname: "**",
      },
    ],
    domains: ["cdn.example.com"],
  },
};

export default nextConfig;
