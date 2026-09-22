import { db } from "@/lib/db";

export interface EmotionItem {
  id?: string;
  slug: string;
  title: string;
  description: string;
  activityTitle: string;
  activityDescription: string;
  guideUrl?: string | null;
  videoUrl?: string | null;
  iconName: string;
  order?: number;
}

export interface RelatedStoryItem {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  emotionSlug?: string | null;
}

export const CANONICAL_EMOTIONS: EmotionItem[] = [
  {
    slug: "anxiety",
    title: "Anxiety",
    description:
      "When worry, fear, or “what if?” thoughts feel difficult to switch off, even when you’re safe.",
    activityTitle: "“Right Now” Reset",
    activityDescription:
      "Name 5 things you can see, 4 you can feel, 3 you can hear. Then write: “What is actually happening right now?”",
    guideUrl: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/youth-mental-health/",
    iconName: "CloudRain",
    order: 1,
  },
  {
    slug: "loneliness",
    title: "Loneliness",
    description:
      "Feeling disconnected or like nobody truly understands you, even when people are around.",
    activityTitle: "“One Small Connection”",
    activityDescription:
      "Think of one person, place, or community where you feel even slightly safe or understood. What could help you feel 1% more connected today?",
    guideUrl: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness",
    iconName: "Compass",
    order: 2,
  },
  {
    slug: "burnout",
    title: "Burnout",
    description:
      "Feeling emotionally and mentally exhausted after prolonged stress, pressure, or having too much on your plate.",
    activityTitle: "“Battery Check”",
    activityDescription:
      "Rate your energy from 1–10. Identify what is draining you and one thing you can pause, reduce, or ask for help with.",
    guideUrl: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
    iconName: "Flame",
    order: 3,
  },
  {
    slug: "emotional-numbness",
    title: "Emotional Numbness",
    description:
      "When you feel disconnected from your emotions or find it difficult to feel much of anything.",
    activityTitle: "“Name Something”",
    activityDescription:
      "Instead of forcing yourself to feel, notice your surroundings: What do I see? What do I hear? What does my body feel like?",
    guideUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders/",
    iconName: "CloudFog",
    order: 4,
  },
  {
    slug: "identity-stress",
    title: "Identity Stress",
    description:
      "Feeling confused, pressured, or uncertain about who you are, where you fit, or how others see you.",
    activityTitle: "“Beyond Labels”",
    activityDescription:
      "Complete: “People may see me as ___, but I also am ___.” Focus on qualities, interests, values, and experiences.",
    guideUrl: "https://childmind.org/article/helping-teens-develop-a-healthy-identity/",
    iconName: "Sparkles",
    order: 5,
  },
  {
    slug: "feeling-invisible",
    title: "Feeling Invisible / Social Exclusion",
    description:
      "Feeling overlooked, left out, or like your presence doesn’t matter to the people around you.",
    activityTitle: "“I Belong Here”",
    activityDescription:
      "Write down one space where you feel comfortable being yourself and one thing you bring to the people around you.",
    guideUrl: "https://www.unicef.org/topics/adolescent-health",
    iconName: "Ghost",
    order: 6,
  },
  {
    slug: "academic-pressure",
    title: "Academic Pressure & Expectations",
    description:
      "When grades, competition, deadlines, or expectations start feeling heavier than you can comfortably carry.",
    activityTitle: "“My Expectations vs. Mine”",
    activityDescription:
      "Separate expectations into: I want this / Others want this / I’m afraid I’ll disappoint someone.",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/exam-stress/",
    iconName: "BookOpen",
    order: 7,
  },
  {
    slug: "family-pressure",
    title: "Family Pressure",
    description:
      "Feeling overwhelmed by expectations, comparisons, conflict, or pressure from the people closest to you.",
    activityTitle: "“What’s Mine to Carry?”",
    activityDescription:
      "List what you can control, what you can influence, and what is outside your control.",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/",
    iconName: "Home",
    order: 8,
  },
  {
    slug: "self-esteem-confusion",
    title: "Self-Esteem & Confusion",
    description:
      "Questioning your worth, abilities, or place in the world while trying to figure yourself out.",
    activityTitle: "“Evidence, Not Judgment”",
    activityDescription:
      "Write 3 things you’ve handled, learned, or tried recently. No ranking or comparison—just evidence about who you are.",
    guideUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-esteem/",
    iconName: "HeartHandshake",
    order: 9,
  },
];

const CANONICAL_STORIES: RelatedStoryItem[] = [
  {
    slug: "the-pressure-to-always-be-on",
    title: "The Pressure to Always Be \"On\"",
    authorName: "Anonymous (Age 16)",
    emotionSlug: "burnout",
    excerpt:
      "Between mock tests, football practice, and trying to keep up group chats, I felt like I was running on 1% battery for three months straight.",
  },
  {
    slug: "sitting-at-a-table-full-of-friends",
    title: "Sitting at a Table Full of Friends and Still Feeling Alone",
    authorName: "Anonymous (Age 15)",
    emotionSlug: "loneliness",
    excerpt:
      "Everyone was laughing at memes on their phones, and I suddenly felt like I was watching through soundproof glass.",
  },
  {
    slug: "my-chest-felt-tight-over-a-quiz",
    title: "My Chest Felt Tight Over a Simple Quiz",
    authorName: "Anonymous (Age 17)",
    emotionSlug: "anxiety",
    excerpt:
      "My heart raced, my palms sweated, and my brain went blank over a 15-minute quiz that didn't even count for my finals.",
  },
  {
    slug: "when-everything-went-quiet-and-gray",
    title: "When Everything Went Quiet and Gray",
    authorName: "Anonymous (Age 16)",
    emotionSlug: "emotional-numbness",
    excerpt:
      "I wasn't crying or angry. I just felt like someone had turned the volume of my feelings all the way down to zero.",
  },
  {
    slug: "who-am-i-supposed-to-be",
    title: "Who Am I Supposed to Be?",
    authorName: "Anonymous (Age 14)",
    emotionSlug: "identity-stress",
    excerpt:
      "At home I was the quiet responsible one; at school I tried to be the funny one; alone, I didn't know who I actually was.",
  },
  {
    slug: "carrying-everyone-elses-hopes",
    title: "Carrying Everyone Else's Hopes",
    authorName: "Anonymous (Age 17)",
    emotionSlug: "family-pressure",
    excerpt:
      "My parents sacrificed a lot so I could have opportunities they didn't, but that gratitude slowly turned into suffocating guilt.",
  },
];

export async function getAllEmotions(): Promise<EmotionItem[]> {
  try {
    const records = await db.emotion.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        activityTitle: true,
        activityDescription: true,
        guideUrl: true,
        videoUrl: true,
        iconName: true,
        order: true,
      },
    });
    if (records && records.length > 0) return records;
  } catch {
    // Fallback to canonical emotions
  }
  return CANONICAL_EMOTIONS;
}

export async function getEmotionBySlug(slug: string): Promise<EmotionItem | null> {
  try {
    const record = await db.emotion.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        activityTitle: true,
        activityDescription: true,
        guideUrl: true,
        videoUrl: true,
        iconName: true,
        order: true,
      },
    });
    if (record) return record;
  } catch {
    // Fallback
  }
  return CANONICAL_EMOTIONS.find((e) => e.slug === slug) || null;
}

export async function getRelatedStoryForEmotion(
  emotionSlug: string
): Promise<RelatedStoryItem | null> {
  try {
    const record = await db.story.findFirst({
      where: {
        emotionSlug,
        status: "APPROVED",
      },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        authorName: true,
        emotionSlug: true,
      },
    });
    if (record) return record;
  } catch {
    // Fallback
  }
  return CANONICAL_STORIES.find((s) => s.emotionSlug === emotionSlug) || null;
}
