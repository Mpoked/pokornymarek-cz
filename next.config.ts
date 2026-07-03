import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Samostatný build pro Docker — server.js + jen potřebné závislosti,
  // výrazně menší image (viz Dockerfile).
  output: "standalone",
};

export default nextConfig;
