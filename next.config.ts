import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // update to your API endpoint
    NEXT_PUBLIC_API_BASE_URL: "http://localhost:3000",
  },
};

export default nextConfig;
