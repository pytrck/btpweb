import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// GitHub Pages serves this repo under /btpweb, so the CI build sets
// GITHUB_PAGES=true to apply the subpath. Local dev stays at the root.
const isPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export - no server, so the whole class of server-side Next.js
  // CVEs (image optimizer, RSC-over-HTTP, middleware, SSRF) doesn't apply.
  output: "export",
  images: { unoptimized: true }, // no image-optimization server on a static host
  trailingSlash: true, // emit /cs/index.html so GitHub Pages resolves folders
  basePath: isPages ? "/btpweb" : undefined,
  assetPrefix: isPages ? "/btpweb/" : undefined,
  poweredByHeader: false,
  // 32-bit ARM (e.g. Raspberry Pi, armv7) has no prebuilt native SWC binary,
  // so fall back to the WASM SWC build there. No-op on x86/arm64 dev machines.
  experimental: {
    useWasmBinary: process.arch === "arm",
  },
};

export default withNextIntl(nextConfig);
