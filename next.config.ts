import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reservation.dubaiyachts.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dubaiyachts.com',
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "dubaiyachts.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
