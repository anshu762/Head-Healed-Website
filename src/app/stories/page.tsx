import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoriesHub } from "@/components/stories/stories-hub";
import {
  getApprovedStories,
  getAllMyths,
  getStoryEmotions,
} from "@/lib/data/stories-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories & Myths | Heard & Healed",
  description:
    "Explore anonymous stories from young people navigating emotions, and debunk common therapy myths with evidence-based facts.",
};

export default async function StoriesPage() {
  const [stories, myths, emotions] = await Promise.all([
    getApprovedStories(),
    getAllMyths(),
    getStoryEmotions(),
  ]);

  return (
    <div className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          badge="Community &amp; Perspectives"
          title="Stories &amp; Therapy Myths"
          description="Read real experiences from young people who know what it’s like to feel overwhelmed, and debunk 12 common myths about therapy and getting support."
          as="h1"
        />

        <div className="mt-10 sm:mt-12">
          <Suspense
            fallback={
              <div className="py-12 text-center text-sm text-hh-ink-soft">
                Loading stories and reflections...
              </div>
            }
          >
            <StoriesHub stories={stories} myths={myths} emotions={emotions} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
