import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for production - no server, so the whole class of
  // server-side Next.js CVEs (image optimizer, RSC-over-HTTP, middleware, SSRF)
  // doesn't apply. In `next dev` we skip export mode so the dev server can honor
  // the rewrites below.
  output: isProd ? "export" : undefined,
  images: { unoptimized: true }, // no image-optimization server on a static host
  trailingSlash: true, // emit /cs/index.html so GitHub Pages resolves folders
  poweredByHeader: false,
  // 32-bit ARM (e.g. Raspberry Pi, armv7) has no prebuilt native SWC binary,
  // so fall back to the WASM SWC build there. No-op on x86/arm64 dev machines.
  experimental: {
    useWasmBinary: process.arch === "arm",
  },
  // Dev only: localePrefix "as-needed" serves the default locale (cs) at the
  // root, but a static export has no middleware to map /sluzby -> /cs/sluzby, so
  // those unprefixed paths 500 under `next dev`. Rewrite them here so nav links
  // work while developing. Production doesn't run rewrites - the postbuild
  // localize-export.mjs lifts /cs/* to the root instead.
  ...(isProd
    ? {}
    : {
        async rewrites() {
          return {
            beforeFiles: ["sluzby", "prace", "o-nas", "kontakt"].map((seg) => ({
              source: `/${seg}/:path*`,
              destination: `/cs/${seg}/:path*`,
            })),
          };
        },
      }),
};

export default withNextIntl(nextConfig);
