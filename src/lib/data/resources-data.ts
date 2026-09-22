import { db } from "@/lib/db";
import { DEFAULT_EMERGENCY_CONTACTS, type EmergencyContactItem } from "@/components/emergency/emergency-provider";

export interface ResourceItem {
  id?: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  type: "ARTICLE" | "GUIDE" | "WORKSHEET" | "HELPLINE" | "VIDEO" | "OTHER";
  category: "Counsellors & services" | "Organisations" | "Helplines" | "Articles";
  region?: string | null;
  fileSize?: string;
}

export interface DownloadItem {
  slug: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  category: string;
}

export const CANONICAL_DOWNLOADS: DownloadItem[] = [
  {
    slug: "anxiety-grounding",
    title: "5-4-3-2-1 Sensory Grounding Worksheet",
    description: "Step-by-step physical sensory grounding technique for calming sudden waves of worry or anxiety.",
    fileUrl: "/downloads/anxiety-grounding.pdf",
    fileSize: "PDF • ~200 KB",
    category: "Grounding",
  },
  {
    slug: "emotion-wheel",
    title: "Emotion Wheel & Feelings Vocabulary Guide",
    description: "A nuanced emotion reference tool to help put honest, accurate words to complex internal experiences.",
    fileUrl: "/downloads/emotion-wheel.pdf",
    fileSize: "PDF • ~200 KB",
    category: "Reflection",
  },
  {
    slug: "boundary-setting",
    title: "Boundary Setting & Self-Protection Worksheet",
    description: "Approachable prompts and gentle scripts to protect your personal energy without shame or guilt.",
    fileUrl: "/downloads/boundary-setting.pdf",
    fileSize: "PDF • ~200 KB",
    category: "Boundaries",
  },
  {
    slug: "sleep-hygiene",
    title: "Youth Sleep & Nighttime Reset Guide",
    description: "Practical habits and non-judgmental wind-down routines for evenings when racing thoughts make rest elusive.",
    fileUrl: "/downloads/sleep-hygiene.pdf",
    fileSize: "PDF • ~200 KB",
    category: "Rest & Care",
  },
];

export const CANONICAL_RESOURCES: ResourceItem[] = [
  {
    slug: "understanding-psychotherapy-apa",
    title: "Understanding Psychotherapy",
    description: "Comprehensive guide covering what therapy is, how it works, what to expect, and common misconceptions.",
    url: "https://www.apa.org/topics/psychotherapy/understanding",
    type: "ARTICLE",
    category: "Articles",
    region: "Global",
  },
  {
    slug: "nhs-youth-mental-health",
    title: "NHS Mental Health Support for Children & Young People",
    description: "Guidance on mental health services, talking therapies, and different ways to get professional support.",
    url: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/youth-mental-health/",
    type: "GUIDE",
    category: "Counsellors & services",
    region: "UK / Global",
  },
  {
    slug: "mind-dissociation-guide",
    title: "Mind UK: Understanding Dissociation & Emotional Numbness",
    description: "Evidence-based explanations and self-care strategies for dealing with numbness and detachment.",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders/",
    type: "ARTICLE",
    category: "Articles",
    region: "Global",
  },
  {
    slug: "youngminds-exam-stress-guide",
    title: "YoungMinds: Coping with School & Exam Stress",
    description: "Actionable tips for dealing with academic expectations, workload overwhelm, and test anxiety.",
    url: "https://www.youngminds.org.uk/young-person/coping-with-life/exam-stress/",
    type: "WORKSHEET",
    category: "Organisations",
    region: "Global",
  },
  {
    slug: "childline-india-service",
    title: "Childline 1098 Emergency Service",
    description: "India's 24/7 emergency toll-free service dedicated to children and teenagers in need of aid and protection.",
    url: "https://childlineindia.org",
    type: "HELPLINE",
    category: "Helplines",
    region: "India",
  },
  {
    slug: "tele-manas-counselling",
    title: "Tele-MANAS National Tele-Mental Health Programme",
    description: "Government of India 24/7 free mental health counselling service available nationwide across multiple languages.",
    url: "https://telemanas.mohfw.gov.in",
    type: "HELPLINE",
    category: "Counsellors & services",
    region: "India",
  },
  {
    slug: "trevor-project-lgbtq",
    title: "The Trevor Project Youth Support",
    description: "Crisis intervention and educational resources designed specifically for LGBTQ+ young people.",
    url: "https://www.thetrevorproject.org",
    type: "OTHER",
    category: "Organisations",
    region: "International",
  },
  {
    slug: "nimhans-centre",
    title: "NIMHANS Adolescent Wellbeing Centre",
    description: "National Institute of Mental Health and Neurosciences youth psychological services and guidance.",
    url: "https://nimhans.ac.in",
    type: "OTHER",
    category: "Counsellors & services",
    region: "India",
  },
  {
    slug: "mental-health-foundation-loneliness",
    title: "Mental Health Foundation: Loneliness & Connection",
    description: "Insights on loneliness in young people and ways to build small, meaningful connections.",
    url: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness",
    type: "ARTICLE",
    category: "Articles",
    region: "UK / Global",
  },
  {
    slug: "unicef-adolescent-mental-health",
    title: "UNICEF Adolescent Mental Health Resources",
    description: "Global insights and supportive guidance on navigating adolescent emotional growth, identity, and social dynamics.",
    url: "https://www.unicef.org/topics/adolescent-health",
    type: "GUIDE",
    category: "Organisations",
    region: "Global",
  },
  {
    slug: "lifeline-988",
    title: "988 Suicide & Crisis Lifeline",
    description: "24/7 free, confidential crisis support via call or text for anyone experiencing emotional distress.",
    url: "https://988lifeline.org",
    type: "HELPLINE",
    category: "Helplines",
    region: "USA / Canada",
  },
  {
    slug: "crisis-text-line",
    title: "Crisis Text Line",
    description: "Free, 24/7 support via text message with a trained crisis volunteer (Text HOME to 741741).",
    url: "https://www.crisistextline.org",
    type: "HELPLINE",
    category: "Helplines",
    region: "US / UK / Canada",
  },
];

export async function getAllResources(): Promise<ResourceItem[]> {
  try {
    const records = await db.resource.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        url: true,
        type: true,
        category: true,
        region: true,
      },
    });
    if (records && records.length > 0) {
      return records as ResourceItem[];
    }
  } catch {
    // Fallback
  }
  return CANONICAL_RESOURCES;
}

export async function getEmergencyHelplines(): Promise<EmergencyContactItem[]> {
  try {
    const records = await db.emergencyContact.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        phone: true,
        description: true,
        url: true,
        availableHours: true,
        region: true,
      },
    });
    if (records && records.length > 0) return records;
  } catch {
    // Fallback
  }
  return DEFAULT_EMERGENCY_CONTACTS;
}
