import { notFound } from "next/navigation";
import {
  getEmotionBySlug,
  getRelatedStoryForEmotion,
} from "@/lib/data/feelings-data";
import { EmotionModalDialog } from "@/components/feelings/emotion-modal-dialog";

export default async function EmotionModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const emotion = await getEmotionBySlug(slug);

  if (!emotion) {
    notFound();
  }

  const relatedStory = await getRelatedStoryForEmotion(slug);

  return <EmotionModalDialog emotion={emotion} relatedStory={relatedStory} />;
}
