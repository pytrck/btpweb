import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Break The Pattern";

// Matte brand OG card — no real data, no glow. Diacritic-free headline so the
// built-in font renders cleanly. Replace freely later.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#FAFAF8",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, color: "#FF10F0" }}>
          BREAK THE PATTERN
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
          Opravy · Weby · Technika
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              height: 4,
              width: 280,
              background: "linear-gradient(90deg, transparent, #FF10F0 50%, transparent)",
            }}
          />
          <div style={{ fontSize: 28, color: "#6B6B70" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
