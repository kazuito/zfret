import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
