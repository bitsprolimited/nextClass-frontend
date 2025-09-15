import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost:5500",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
