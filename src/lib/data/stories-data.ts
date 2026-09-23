import { db } from "@/lib/db";
import { SubmissionStatus } from "@prisma/client";

export interface StoryItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  isAnonymous: boolean;
  emotionSlug: string | null;
  status: string;
  createdAt: Date | string;
  readTimeMinutes: number;
}

export interface MythItem {
  id: string;
  slug: string;
  myth: string;
  fact: string;
  referenceTitle: string;
  referenceUrl: string;
  order: number;
}

export interface EmotionOption {
  slug: string;
  title: string;
}

export const FALLBACK_EMOTIONS: EmotionOption[] = [
  { slug: "anxiety", title: "Anxiety" },
  { slug: "loneliness", title: "Loneliness" },
  { slug: "burnout", title: "Burnout" },
  { slug: "emotional-numbness", title: "Emotional Numbness" },
  { slug: "identity-stress", title: "Identity Stress" },
  { slug: "feeling-invisible", title: "Feeling Invisible" },
  { slug: "academic-pressure", title: "Academic Pressure" },
  { slug: "family-pressure", title: "Family Pressure" },
  { slug: "self-esteem-confusion", title: "Self-Esteem & Confusion" },
];

export const FALLBACK_MYTHS: MythItem[] = [
  {
    id: "myth-1",
    slug: "myth-1-something-wrong",
    myth: "“Going to therapy means something is wrong with you.”",
    fact: "Therapy isn’t only for people with mental health conditions. People seek support for stress, relationships, difficult transitions, emotions, and many other parts of everyday life.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 1,
  },
  {
    id: "myth-2",
    slug: "myth-2-really-struggling",
    myth: "“You have to be really struggling to go to therapy.”",
    fact: "You don’t have to wait until things become overwhelming. Therapy can also help you understand yourself, work through challenges, and build healthier ways of coping.",
    referenceTitle: "APA — Understanding psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy/understanding",
    order: 2,
  },
  {
    id: "myth-3",
    slug: "myth-3-just-talking",
    myth: "“Therapy is just talking about your problems.”",
    fact: "Talking is part of therapy, but it can involve learning skills, identifying patterns, setting goals, and working together with a therapist on what you want to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 3,
  },
  {
    id: "myth-4",
    slug: "myth-4-tell-me-what-to-do",
    myth: "“A therapist will tell me exactly what to do.”",
    fact: "Therapy is usually collaborative. A therapist can offer guidance and observations, but you are part of the process of deciding what you want to work on.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 4,
  },
  {
    id: "myth-5",
    slug: "myth-5-need-diagnosis",
    myth: "“I need a diagnosis before I can see a therapist.”",
    fact: "You don’t need to diagnose yourself first. People seek therapy for many reasons, including everyday stress, difficult experiences, relationships, and emotional challenges.",
    referenceTitle: "APA — Understanding psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy/understanding",
    order: 5,
  },
  {
    id: "myth-6",
    slug: "myth-6-talk-about-past-forever",
    myth: "“Therapy will make me talk about my past forever.”",
    fact: "Some therapy may explore past experiences, but not every approach focuses heavily on the past. Therapy can also focus on what you’re experiencing right now and what you want to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 6,
  },
  {
    id: "myth-7",
    slug: "myth-7-takes-forever",
    myth: "“Therapy takes forever.”",
    fact: "There is no single timeline for therapy. How long someone attends depends on their needs, goals, circumstances, and the type of support they receive.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 7,
  },
  {
    id: "myth-8",
    slug: "myth-8-tell-everything-immediately",
    myth: "“I have to tell my therapist everything immediately.”",
    fact: "Trust takes time. You can work with your therapist at a pace that feels manageable and gradually become more comfortable sharing.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 8,
  },
  {
    id: "myth-9",
    slug: "myth-9-therapists-will-judge",
    myth: "“Therapists will judge me.”",
    fact: "Therapy is designed to provide a professional space where you can discuss difficult thoughts and feelings without being shamed. Building trust is an important part of the process.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 9,
  },
  {
    id: "myth-10",
    slug: "myth-10-still-struggling-not-working",
    myth: "“If I’m still struggling, therapy isn’t working.”",
    fact: "Progress isn’t always immediate or perfectly linear. You can talk with your therapist about what feels helpful, what doesn’t, and whether your goals or approach need to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 10,
  },
  {
    id: "myth-11",
    slug: "myth-11-only-for-certain-people",
    myth: "“Therapy is only for certain kinds of people.”",
    fact: "People seek therapy for many different reasons and life circumstances. There isn’t one type of person who “belongs” in therapy.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 11,
  },
  {
    id: "myth-12",
    slug: "myth-12-couldnt-handle-things-myself",
    myth: "“Going to therapy means I couldn’t handle things myself.”",
    fact: "Asking for support isn’t a failure. Sometimes getting help is simply another way of taking care of yourself and working through something difficult.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 12,
  },
];

export const FALLBACK_STORIES: StoryItem[] = [
  {
    id: "seed-story-1",
    slug: "the-pressure-to-always-be-on",
    title: "The Pressure to Always Be \"On\"",
    authorName: "Anonymous (Age 16)",
    isAnonymous: true,
    emotionSlug: "burnout",
    excerpt: "Between mock tests, football practice, and trying to keep up group chats, I felt like I was running on 1% battery for three months straight.",
    content: "Around the middle of term, my alarm would go off and my chest would instantly feel heavy. I wasn't even failing anything—I was doing okay on paper—but every tiny task felt like climbing a mountain. I thought resting meant I was being lazy. It took having an honest chat with my art teacher to realize that needing a pause doesn't mean you've quit. Now I schedule fifteen minutes every evening with my phone in another room just listening to music.",
    status: "APPROVED",
    createdAt: "2026-09-01T00:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "seed-story-2",
    slug: "sitting-at-a-table-full-of-friends",
    title: "Sitting at a Table Full of Friends and Still Feeling Alone",
    authorName: "Anonymous (Age 15)",
    isAnonymous: true,
    emotionSlug: "loneliness",
    excerpt: "Everyone was laughing at memes on their phones, and I suddenly felt like I was watching through soundproof glass.",
    content: "People think being lonely means you're literally in a room by yourself on a Friday night. For me, it was loudest in the school cafeteria. I had people around me, but none of them knew how overwhelmed I felt inside, and I was terrified that if I brought up anything real, the mood would die. It helped when I started being honest with just one friend instead of trying to be fine with the whole group.",
    status: "APPROVED",
    createdAt: "2026-09-03T00:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "seed-story-3",
    slug: "my-chest-felt-tight-over-a-quiz",
    title: "My Chest Felt Tight Over a Simple Quiz",
    authorName: "Anonymous (Age 17)",
    isAnonymous: true,
    emotionSlug: "anxiety",
    excerpt: "My heart raced, my palms sweated, and my brain went blank over a 15-minute quiz that didn't even count for my finals.",
    content: "The hardest part about anxiety for me was feeling embarrassed by it. My rational mind knew a chemistry quiz wasn't life or death, but my nervous system was screaming that danger was everywhere. Learning the 5-4-3-2-1 grounding technique gave me something physical to hold onto when my thoughts started spinning out of control. It didn't cure everything overnight, but it gave me my breath back.",
    status: "APPROVED",
    createdAt: "2026-09-05T00:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "seed-story-4",
    slug: "when-everything-went-quiet-and-gray",
    title: "When Everything Went Quiet and Gray",
    authorName: "Anonymous (Age 16)",
    isAnonymous: true,
    emotionSlug: "emotional-numbness",
    excerpt: "I wasn't crying or angry. I just felt like someone had turned the volume of my feelings all the way down to zero.",
    content: "During exams last year, I stopped feeling nervous or happy or sad. Even when my favorite team won or when someone gave me good news, it felt like it was happening to someone else. I got really scared that something was broken inside me. Reading that emotional numbness is often the mind's way of protecting itself from chronic overwhelm made me stop blaming myself. Gentle routines and walking outside slowly brought things back into color.",
    status: "APPROVED",
    createdAt: "2026-09-07T00:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "seed-story-5",
    slug: "who-am-i-supposed-to-be",
    title: "Who Am I Supposed to Be?",
    authorName: "Anonymous (Age 14)",
    isAnonymous: true,
    emotionSlug: "identity-stress",
    excerpt: "At home I was the quiet responsible one; at school I tried to be the funny one; alone, I didn't know who I actually was.",
    content: "I spent so much time chameleon-shifting to fit whatever group I was standing in front of. By 9th grade, I felt exhausted and fake. What helped was giving myself permission not to have a single fixed aesthetic or label. I like science and poetry and goofy videos, and I don't need to fit into a neat box to be valid.",
    status: "APPROVED",
    createdAt: "2026-09-09T00:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "seed-story-6",
    slug: "carrying-everyone-elses-hopes",
    title: "Carrying Everyone Else's Hopes",
    authorName: "Anonymous (Age 17)",
    isAnonymous: true,
    emotionSlug: "family-pressure",
    excerpt: "My parents sacrificed a lot so I could have opportunities they didn't, but that gratitude slowly turned into suffocating guilt.",
    content: "Every grade report felt like an audition for my family's happiness. If I got an A-, I felt like I had let down my entire lineage. It took breaking down in front of my older cousin to understand that my parents' sacrifices were meant to give me a chance at a good life—not to turn me into an anxiety-ridden robot. Starting to talk about my own dreams instead of just trying to predict theirs was hard, but it opened a door we both needed.",
    status: "APPROVED",
    createdAt: "2026-09-11T00:00:00.000Z",
    readTimeMinutes: 2,
  },
];

function calculateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 150));
}

export async function getApprovedStories(): Promise<StoryItem[]> {
  try {
    const stories = await db.story.findMany({
      where: {
        status: SubmissionStatus.APPROVED,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (stories && stories.length > 0) {
      return stories.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        excerpt: s.excerpt,
        content: s.content,
        authorName: s.authorName,
        isAnonymous: s.isAnonymous,
        emotionSlug: s.emotionSlug,
        status: s.status,
        createdAt: s.createdAt,
        readTimeMinutes: calculateReadTime(s.content),
      }));
    }
  } catch {
    // Database unreachable fallback
  }

  return FALLBACK_STORIES;
}

export async function getStoryBySlug(slug: string): Promise<StoryItem | null> {
  try {
    const story = await db.story.findUnique({
      where: {
        slug,
      },
    });

    if (story && story.status === SubmissionStatus.APPROVED) {
      return {
        id: story.id,
        slug: story.slug,
        title: story.title,
        excerpt: story.excerpt,
        content: story.content,
        authorName: story.authorName,
        isAnonymous: story.isAnonymous,
        emotionSlug: story.emotionSlug,
        status: story.status,
        createdAt: story.createdAt,
        readTimeMinutes: calculateReadTime(story.content),
      };
    }
  } catch {
    // Database unreachable fallback
  }

  const fallback = FALLBACK_STORIES.find((s) => s.slug === slug);
  return fallback || null;
}

export async function getAllMyths(): Promise<MythItem[]> {
  try {
    const myths = await db.myth.findMany({
      orderBy: {
        order: "asc",
      },
    });

    if (myths && myths.length > 0) {
      return myths.map((m) => ({
        id: m.id,
        slug: m.slug,
        myth: m.myth,
        fact: m.fact,
        referenceTitle: m.referenceTitle,
        referenceUrl: m.referenceUrl,
        order: m.order,
      }));
    }
  } catch {
    // Database unreachable fallback
  }

  return FALLBACK_MYTHS;
}

export async function getStoryEmotions(): Promise<EmotionOption[]> {
  try {
    const emotions = await db.emotion.findMany({
      orderBy: { order: "asc" },
      select: { slug: true, title: true },
    });

    if (emotions && emotions.length > 0) {
      return emotions;
    }
  } catch {
    // Fallback
  }

  return FALLBACK_EMOTIONS;
}
