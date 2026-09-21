import { db } from "@/lib/db";

export interface HomeEmotionItem {
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

export interface HomeStoryItem {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  emotionSlug: string | null;
}

export interface HomeFaqItem {
  slug: string;
  question: string;
  answer: string;
  category: string;
}

const FALLBACK_EMOTIONS: HomeEmotionItem[] = [
  {
    slug: "anxiety",
    title: "Anxiety",
    description: "When worry, fear, or “what if?” thoughts feel difficult to switch off, even when you’re safe.",
    iconName: "CloudRain",
  },
  {
    slug: "loneliness",
    title: "Loneliness",
    description: "Feeling disconnected or like nobody truly understands you, even when people are around.",
    iconName: "Compass",
  },
  {
    slug: "burnout",
    title: "Burnout",
    description: "Feeling emotionally and mentally exhausted after prolonged stress, pressure, or having too much on your plate.",
    iconName: "Flame",
  },
  {
    slug: "emotional-numbness",
    title: "Emotional Numbness",
    description: "When you feel disconnected from your emotions or find it difficult to feel much of anything.",
    iconName: "CloudFog",
  },
  {
    slug: "identity-stress",
    title: "Identity Stress",
    description: "Feeling confused, pressured, or uncertain about who you are, where you fit, or how others see you.",
    iconName: "Sparkles",
  },
  {
    slug: "feeling-invisible",
    title: "Feeling Invisible",
    description: "Feeling overlooked, left out, or like your presence doesn’t matter to the people around you.",
    iconName: "Ghost",
  },
];

const FALLBACK_STORIES: HomeStoryItem[] = [
  {
    slug: "the-pressure-to-always-be-on",
    title: "The Pressure to Always Be \"On\"",
    authorName: "Anonymous (Age 16)",
    emotionSlug: "burnout",
    excerpt: "Between mock tests, football practice, and trying to keep up group chats, I felt like I was running on 1% battery for three months straight.",
  },
  {
    slug: "sitting-at-a-table-full-of-friends",
    title: "Sitting at a Table Full of Friends and Still Feeling Alone",
    authorName: "Anonymous (Age 15)",
    emotionSlug: "loneliness",
    excerpt: "Everyone was laughing at memes on their phones, and I suddenly felt like I was watching through soundproof glass.",
  },
  {
    slug: "my-chest-felt-tight-over-a-quiz",
    title: "My Chest Felt Tight Over a Simple Quiz",
    authorName: "Anonymous (Age 17)",
    emotionSlug: "anxiety",
    excerpt: "My heart raced, my palms sweated, and my brain went blank over a 15-minute quiz that didn't even count for my finals.",
  },
];

const FALLBACK_FAQS: HomeFaqItem[] = [
  {
    slug: "faq-1-what-is-heard-healed",
    question: "What is Heard & Healed?",
    answer: "Heard & Healed is a youth-focused space to explore emotions, understand mental health, and feel a little less alone.",
    category: "About Heard & Healed",
  },
  {
    slug: "faq-2-who-is-it-for",
    question: "Who is Heard & Healed for?",
    answer: "It’s for young people navigating emotions, relationships, identity, expectations, or simply trying to understand themselves better.",
    category: "About Heard & Healed",
  },
  {
    slug: "faq-5-is-it-therapy",
    question: "Is Heard & Healed a therapy or counselling service?",
    answer: "No. It’s an educational and supportive platform, not a replacement for professional mental health care.",
    category: "About Heard & Healed",
  },
  {
    slug: "faq-22-is-information-private",
    question: "Is my information private?",
    answer: "We take privacy seriously. Check our Privacy Policy to understand what information we collect, use, and protect.",
    category: "Privacy & Safety",
  },
  {
    slug: "faq-23-what-happens-after-submit",
    question: "What happens to a story after I submit it?",
    answer: "Submitted stories may be reviewed before being shared on the platform, with identifying information removed where appropriate.",
    category: "Privacy & Safety",
  },
  {
    slug: "faq-25-immediate-support-needed",
    question: "What should I do if I need professional or immediate support?",
    answer: "Heard & Healed isn’t an emergency or treatment service. If you need immediate help, contact a trusted adult, qualified professional, or local emergency service.",
    category: "Privacy & Safety",
  },
];

export async function getHomeEmotions(): Promise<HomeEmotionItem[]> {
  try {
    const records = await db.emotion.findMany({
      take: 6,
      orderBy: { order: "asc" },
      select: {
        slug: true,
        title: true,
        description: true,
        iconName: true,
      },
    });
    if (records && records.length > 0) return records;
  } catch {
    // Database connecting/offline; return fallback
  }
  return FALLBACK_EMOTIONS;
}

export async function getHomeStories(): Promise<HomeStoryItem[]> {
  try {
    const records = await db.story.findMany({
      where: { status: "APPROVED" },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        authorName: true,
        emotionSlug: true,
      },
    });
    if (records && records.length > 0) return records;
  } catch {
    // Fallback
  }
  return FALLBACK_STORIES;
}

export async function getHomeFaqs(): Promise<HomeFaqItem[]> {
  try {
    const records = await db.faq.findMany({
      where: {
        category: { in: ["About Heard & Healed", "Privacy & Safety"] },
      },
      take: 6,
      orderBy: { order: "asc" },
      select: {
        slug: true,
        question: true,
        answer: true,
        category: true,
      },
    });
    if (records && records.length > 0) return records;
  } catch {
    // Fallback
  }
  return FALLBACK_FAQS;
}
