import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for testing the app on physical devices via the local network.
  // Without this, Next.js may block HMR/dev runtime requests, causing
  // hydration and React event handlers to fail on mobile browsers.
  allowedDevOrigins: ["192.168.31.169"],
};

export default nextConfig;
