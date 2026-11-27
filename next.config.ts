import type { NextConfig } from "next";

/**
 * Static export: the whole site is pre-rendered to `out/` and served by
 * Cloudflare (Workers static assets or Pages). The only dynamic piece — the
 * contact form — is handled by `worker/index.ts` (Workers) or
 * `functions/api/contact.ts` (Pages).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Pre-generated responsive WebP files in public/images/opt (no runtime optimizer needed).
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  poweredByHeader: false,
};

export default nextConfig;
