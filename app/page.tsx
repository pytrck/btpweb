// Root "/" entry for the static export. There is no middleware on GitHub Pages
// to send "/" to the default locale, so this meta-refresh does it. The URL is
// relative (./cs/) so it works under any basePath. Czech is the default locale.
export default function RootRedirect() {
  return (
    <html lang="cs">
      <head>
        <meta httpEquiv="refresh" content="0; url=./cs/" />
        <link rel="canonical" href="./cs/" />
      </head>
      <body style={{ background: "#050505", color: "#FFFFFF", fontFamily: "sans-serif" }}>
        <a href="./cs/" style={{ color: "#8F02F8" }}>
          Break The Pattern →
        </a>
      </body>
    </html>
  );
}
