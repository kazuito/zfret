import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("canvas", "perf_hooks");
    }
    return config;
  },
};

export default nextConfig;
