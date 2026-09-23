import { ImageResponse } from "next/og";
import { getStoryBySlug } from "@/lib/data/stories-data";

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
  const story = await getStoryBySlug(slug);

  const title = story ? story.title : "Community Story";
  const author = story ? story.authorName : "Anonymous";
  const excerpt = story
    ? story.excerpt
    : "Read real experiences from young people who know what it feels like to struggle.";

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
                backgroundColor: "#A8C8B0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FAF7F2",
                fontSize: "22px",
              }}
            >
              📖
            </div>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#3B3B3B" }}>
              Heard &amp; Healed · Community Story
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#7FA9C9",
              color: "#FFFFFF",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Real Perspectives
          </div>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: "20px", fontWeight: 600, color: "#6B6B6B" }}>
            Shared by {author}
          </span>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#3B3B3B",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#6B6B6B",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "920px",
            }}
          >
            {excerpt}
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
            You are not alone in what you feel.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
