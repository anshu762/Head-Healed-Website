import { db } from "@/lib/db";

export interface FaqItem {
  slug: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface FaqCategoryGroup {
  category: string;
  title: string;
  faqs: FaqItem[];
}

export const ALL_CANONICAL_FAQS: FaqItem[] = [
  // 🌱 About Heard & Healed
  {
    slug: "faq-1-what-is-heard-healed",
    question: "What is Heard & Healed?",
    answer: "Heard & Healed is a youth-focused space to explore emotions, understand mental health, and feel a little less alone.",
    category: "🌱 About Heard & Healed",
    order: 1,
  },
  {
    slug: "faq-2-who-is-it-for",
    question: "Who is Heard & Healed for?",
    answer: "It’s for young people navigating emotions, relationships, identity, expectations, or simply trying to understand themselves better.",
    category: "🌱 About Heard & Healed",
    order: 2,
  },
  {
    slug: "faq-3-why-was-it-created",
    question: "Why was Heard & Healed created?",
    answer: "Because understanding what you feel shouldn’t feel confusing, embarrassing, or lonely.",
    category: "🌱 About Heard & Healed",
    order: 3,
  },
  {
    slug: "faq-4-struggling-with-serious",
    question: "Do I need to be struggling with something serious to use it?",
    answer: "Not at all. You can use Heard & Healed whenever you want to reflect, learn, or better understand yourself.",
    category: "🌱 About Heard & Healed",
    order: 4,
  },
  {
    slug: "faq-5-is-it-therapy",
    question: "Is Heard & Healed a therapy or counselling service?",
    answer: "No. It’s an educational and supportive platform, not a replacement for professional mental health care.",
    category: "🌱 About Heard & Healed",
    order: 5,
  },

  // 💭 What Are You Feeling?
  {
    slug: "faq-6-dont-know-feeling",
    question: "What can I do if I don’t know what I’m feeling?",
    answer: "Start with “What Are You Feeling?” and explore different experiences until something feels relatable.",
    category: "💭 What Are You Feeling?",
    order: 6,
  },
  {
    slug: "faq-7-kinds-of-feelings",
    question: "What kinds of feelings and experiences can I explore?",
    answer: "You can explore experiences like loneliness, burnout, emotional numbness, identity stress, exclusion, pressure, and more.",
    category: "💭 What Are You Feeling?",
    order: 7,
  },
  {
    slug: "faq-8-how-does-it-work",
    question: "How does “What Are You Feeling?” work?",
    answer: "Choose an experience that resonates with you and explore simple explanations, reflections, and grounding activities.",
    category: "💭 What Are You Feeling?",
    order: 8,
  },
  {
    slug: "faq-9-relate-to-more-than-one",
    question: "What if I relate to more than one feeling?",
    answer: "That’s completely okay. Emotions often overlap, and you can explore as many experiences as feel relevant to you.",
    category: "💭 What Are You Feeling?",
    order: 9,
  },
  {
    slug: "faq-10-help-understand-better",
    question: "Can these activities help me understand my emotions better?",
    answer: "They’re designed to help you pause, reflect, and put your feelings into words.",
    category: "💭 What Are You Feeling?",
    order: 10,
  },

  // 🧠 Decode Therapy
  {
    slug: "faq-11-what-is-decode-therapy",
    question: "What is “Decode Therapy”?",
    answer: "It’s a space that breaks down therapy, common questions, and misconceptions in a simple, approachable way.",
    category: "🧠 Decode Therapy",
    order: 11,
  },
  {
    slug: "faq-12-how-know-therapy-helpful",
    question: "How do I know if therapy might be helpful for me?",
    answer: "If you’re struggling or feel like you need more support, talking to a qualified professional can help you figure out what you need.",
    category: "🧠 Decode Therapy",
    order: 12,
  },
  {
    slug: "faq-13-what-happens-session",
    question: "What actually happens during a therapy session?",
    answer: "Therapy is a conversation with a trained professional where you can talk through your thoughts, feelings, and experiences.",
    category: "🧠 Decode Therapy",
    order: 13,
  },
  {
    slug: "faq-14-need-diagnosis-first",
    question: "Do I need a diagnosis to see a therapist?",
    answer: "No. You don’t need a diagnosis to seek support or talk to a therapist.",
    category: "🧠 Decode Therapy",
    order: 14,
  },
  {
    slug: "faq-15-nervous-about-talking",
    question: "What if I’m nervous about talking to a therapist?",
    answer: "That’s normal. You can take it slowly and share only what you feel comfortable sharing.",
    category: "🧠 Decode Therapy",
    order: 15,
  },
  {
    slug: "faq-16-talk-someone-about-therapy",
    question: "How can I talk to someone about wanting therapy?",
    answer: "Try starting with someone you trust and explain what you’ve been experiencing and why you think support could help.",
    category: "🧠 Decode Therapy",
    order: 16,
  },
  {
    slug: "faq-17-can-heard-healed-diagnose",
    question: "Can Heard & Healed diagnose me or tell me what’s wrong?",
    answer: "No. Heard & Healed provides information and reflection tools, not diagnoses or treatment.",
    category: "🧠 Decode Therapy",
    order: 17,
  },

  // 🫂 Stories, Identity & Belonging
  {
    slug: "faq-18-share-anonymously",
    question: "Can I share my story anonymously?",
    answer: "Yes. You can choose to share your experience without revealing identifying information.",
    category: "🫂 Stories, Identity & Belonging",
    order: 18,
  },
  {
    slug: "faq-19-why-share-story",
    question: "Why should I share my story?",
    answer: "Sharing can help create a sense of connection and remind someone else that they aren’t alone.",
    category: "🫂 Stories, Identity & Belonging",
    order: 19,
  },
  {
    slug: "faq-20-explore-identity-without-figuring-out",
    question: "Can I explore identity-related feelings without having everything figured out?",
    answer: "Absolutely. You don’t need a label or all the answers to explore how you feel.",
    category: "🫂 Stories, Identity & Belonging",
    order: 20,
  },
  {
    slug: "faq-21-feel-like-dont-belong",
    question: "What if I feel like I don’t belong or nobody understands me?",
    answer: "You’re not alone in feeling that way. Heard & Healed offers reflections and stories designed to help you feel seen and understood.",
    category: "🫂 Stories, Identity & Belonging",
    order: 21,
  },

  // 🔒 Privacy & Safety
  {
    slug: "faq-22-is-information-private",
    question: "Is my information private?",
    answer: "We take privacy seriously. Check our Privacy Policy to understand what information we collect, use, and protect.",
    category: "🔒 Privacy & Safety",
    order: 22,
  },
  {
    slug: "faq-23-what-happens-after-submit",
    question: "What happens to a story after I submit it?",
    answer: "Submitted stories may be reviewed before being shared on the platform, with identifying information removed where appropriate.",
    category: "🔒 Privacy & Safety",
    order: 23,
  },
  {
    slug: "faq-24-can-i-delete-submission",
    question: "Can I delete something I’ve submitted?",
    answer: "If you’ve submitted a story and want it removed, follow the contact or removal process provided on the website.",
    category: "🔒 Privacy & Safety",
    order: 24,
  },
  {
    slug: "faq-25-immediate-support-needed",
    question: "What should I do if I need professional or immediate support?",
    answer: "Heard & Healed isn’t an emergency or treatment service. If you need immediate help, contact a trusted adult, qualified professional, or local emergency service.",
    category: "🔒 Privacy & Safety",
    order: 25,
  },
];

export async function getAllFaqs(): Promise<FaqItem[]> {
  try {
    const records = await db.faq.findMany({
      orderBy: { order: "asc" },
      select: {
        slug: true,
        question: true,
        answer: true,
        category: true,
        order: true,
      },
    });
    if (records && records.length === 25) {
      // Ensure category emojis are preserved as requested
      return records.map((r) => {
        let category = r.category;
        if (category === "About Heard & Healed") category = "🌱 About Heard & Healed";
        else if (category === "What Are You Feeling?") category = "💭 What Are You Feeling?";
        else if (category === "Decode Therapy") category = "🧠 Decode Therapy";
        else if (category === "Stories, Identity & Belonging") category = "🫂 Stories, Identity & Belonging";
        else if (category === "Privacy & Safety") category = "🔒 Privacy & Safety";
        return { ...r, category };
      });
    }
  } catch {
    // Fallback to all 25 canonical FAQs
  }
  return ALL_CANONICAL_FAQS;
}
