import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kendhikulhudhoo.gov.mv",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "7048",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
