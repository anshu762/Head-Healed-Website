import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Heard & Healed · Youth Emotional Wellbeing";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF7F2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top Brand Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#A8C8B0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAF7F2",
              fontSize: "24px",
            }}
          >
            🌱
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#3B3B3B",
              letterSpacing: "-0.5px",
            }}
          >
            Heard &amp; Healed
          </span>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#3B3B3B",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            You deserve to feel heard.
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#6B6B6B",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            A gentle, youth-focused space to understand emotions, explore reflections with Echo AI, and find supportive resources.
          </p>
        </div>

        {/* Footer Pill Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#7FA9C9",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Explore Feelings
          </div>
          <div
            style={{
              backgroundColor: "#A8C8B0",
              color: "#3B3B3B",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Talk to Echo
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #EAE3DA",
              color: "#6B6B6B",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Free &amp; Confidential
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
