import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Default Blog Post Image";
export const size = {
  width: 1200,
  height: 630,
};

export default function DefaultImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(45deg, #1a1a1a, #2a2a2a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 40%)",
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: "linear-gradient(90deg, #60A5FA, #34D399)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          GYUN-DEV
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#9CA3AF",
          }}
        >
          뭉균의 개발기록
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
