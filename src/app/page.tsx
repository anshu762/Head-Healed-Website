import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlobOne, BlobTwo } from "@/components/ui/organic-blobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Heard & Healed",
  description: "A gentle, safe space for youth to understand emotions and find supportive mental health resources.",
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <BlobOne className="absolute -top-24 -left-24 w-96 h-96 opacity-60" />
      <BlobTwo className="absolute top-1/2 -right-24 w-96 h-96 opacity-50" />
      
      <Container className="relative z-10">
        <SectionHeading
          badge="Welcome to Heard & Healed"
          title="You deserve to feel heard."
          description="A safe, youth-friendly space to understand what you're experiencing, explore emotions, reflect, and find supportive resources — without judgment, pressure, or complicated clinical language."
          as="h1"
        />
      </Container>
    </div>
  );
}
