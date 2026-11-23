import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: [
    "osintengine.space"
  ],
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
