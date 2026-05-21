import { ImageResponse } from "next/og";
import { cv } from "@/lib/cv-data";

export const alt = "Igor Govtvian — Frontend Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #050510 0%, #1a1035 50%, #050510 100%)",
          color: "#ede9fe",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ fontSize: 28, color: "#67e8f9", marginBottom: 16, letterSpacing: 4 }}>
          PORTFOLIO
        </p>
        <h1 style={{ fontSize: 64, fontWeight: 700, margin: 0 }}>{cv.name}</h1>
        <p style={{ fontSize: 32, color: "#c4b5fd", marginTop: 16 }}>{cv.role}</p>
        <p style={{ fontSize: 22, color: "#a78bfa", marginTop: 32 }}>
          CV · Projects · Cosmic Arcade
        </p>
      </div>
    ),
    { ...size }
  );
}
