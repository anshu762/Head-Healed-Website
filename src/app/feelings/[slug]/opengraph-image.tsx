import { ImageResponse } from "next/og";
import { getEmotionBySlug } from "@/lib/data/feelings-data";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const emotion = await getEmotionBySlug(slug);

  const title = emotion ? emotion.title : "Explore Emotion";
  const description = emotion
    ? emotion.description
    : "Understand what you're experiencing with gentle reflections and grounding activities.";

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
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#7FA9C9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "22px",
              }}
            >
              🌱
            </div>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#3B3B3B" }}>
              Heard &amp; Healed · Emotion Guide
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#A8C8B0",
              color: "#3B3B3B",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Reflect &amp; Learn
          </div>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#5C88A8",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Understanding
          </span>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#3B3B3B",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#6B6B6B",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "920px",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #EAE3DA",
              color: "#3B3B3B",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Includes Grounding Activity &amp; Official Guide PDF
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
