import { PrismaClient, ResourceType, SubmissionStatus, RiskLevel } from "@prisma/client";

const prisma = new PrismaClient();

const emotions = [
  {
    slug: "anxiety",
    title: "Anxiety",
    description: "When worry, fear, or “what if?” thoughts feel difficult to switch off, even when you’re safe.",
    activityTitle: "“Right Now” Reset",
    activityDescription: "Name 5 things you can see, 4 you can feel, 3 you can hear. Then write: “What is actually happening right now?”",
    guideUrl: "https://www.nhs.uk/mental-health/children-and-young-people/anxiety-in-children/",
    iconName: "CloudRain",
    order: 1,
  },
  {
    slug: "loneliness",
    title: "Loneliness",
    description: "Feeling disconnected or like nobody truly understands you, even when people are around.",
    activityTitle: "“One Small Connection”",
    activityDescription: "Think of one person, place, or community where you feel even slightly safe or understood. What could help you feel 1% more connected today?",
    guideUrl: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness",
    iconName: "Compass",
    order: 2,
  },
  {
    slug: "burnout",
    title: "Burnout",
    description: "Feeling emotionally and mentally exhausted after prolonged stress, pressure, or having too much on your plate.",
    activityTitle: "“Battery Check”",
    activityDescription: "Rate your energy from 1–10. Identify what is draining you and one thing you can pause, reduce, or ask for help with.",
    guideUrl: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
    iconName: "Flame",
    order: 3,
  },
  {
    slug: "emotional-numbness",
    title: "Emotional Numbness",
    description: "When you feel disconnected from your emotions or find it difficult to feel much of anything.",
    activityTitle: "“Name Something”",
    activityDescription: "Instead of forcing yourself to feel, notice your surroundings: What do I see? What do I hear? What does my body feel like?",
    guideUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders/",
    iconName: "CloudFog",
    order: 4,
  },
  {
    slug: "identity-stress",
    title: "Identity Stress",
    description: "Feeling confused, pressured, or uncertain about who you are, where you fit, or how others see you.",
    activityTitle: "“Beyond Labels”",
    activityDescription: "Complete: “People may see me as ___, but I also am ___.” Focus on qualities, interests, values, and experiences.",
    guideUrl: "https://childmind.org/article/helping-teens-develop-a-healthy-identity/",
    iconName: "Sparkles",
    order: 5,
  },
  {
    slug: "feeling-invisible",
    title: "Feeling Invisible / Social Exclusion",
    description: "Feeling overlooked, left out, or like your presence doesn’t matter to the people around you.",
    activityTitle: "“I Belong Here”",
    activityDescription: "Write down one space where you feel comfortable being yourself and one thing you bring to the people around you.",
    guideUrl: "https://www.unicef.org/parenting/mental-health/adolescents",
    iconName: "Ghost",
    order: 6,
  },
  {
    slug: "academic-pressure",
    title: "Academic Pressure & Expectations",
    description: "When grades, competition, deadlines, or expectations start feeling heavier than you can comfortably carry.",
    activityTitle: "“My Expectations vs. Mine”",
    activityDescription: "Separate expectations into: I want this / Others want this / I’m afraid I’ll disappoint someone.",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/exam-stress/",
    iconName: "BookOpen",
    order: 7,
  },
  {
    slug: "family-pressure",
    title: "Family Pressure",
    description: "Feeling overwhelmed by expectations, comparisons, conflict, or pressure from the people closest to you.",
    activityTitle: "“What’s Mine to Carry?”",
    activityDescription: "List what you can control, what you can influence, and what is outside your control.",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/family-life/",
    iconName: "Home",
    order: 8,
  },
  {
    slug: "self-esteem-confusion",
    title: "Self-Esteem & Confusion",
    description: "Questioning your worth, abilities, or place in the world while trying to figure yourself out.",
    activityTitle: "“Evidence, Not Judgment”",
    activityDescription: "Write 3 things you’ve handled, learned, or tried recently. No ranking or comparison—just evidence about who you are.",
    guideUrl: "https://www.nhs.uk/mental-health/self-help/tips-and-support/raising-low-self-esteem/",
    iconName: "HeartHandshake",
    order: 9,
  },
];

const myths = [
  {
    slug: "myth-1-something-wrong",
    myth: "Going to therapy means something is wrong with you.",
    fact: "Therapy isn’t only for people with mental health conditions. People seek support for stress, relationships, difficult transitions, emotions, and many other parts of everyday life.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 1,
  },
  {
    slug: "myth-2-really-struggling",
    myth: "You have to be really struggling to go to therapy.",
    fact: "You don’t have to wait until things become overwhelming. Therapy can also help you understand yourself, work through challenges, and build healthier ways of coping.",
    referenceTitle: "APA — Understanding psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy/understanding",
    order: 2,
  },
  {
    slug: "myth-3-just-talking",
    myth: "Therapy is just talking about your problems.",
    fact: "Talking is part of therapy, but it can involve learning skills, identifying patterns, setting goals, and working together with a therapist on what you want to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 3,
  },
  {
    slug: "myth-4-tell-me-what-to-do",
    myth: "A therapist will tell me exactly what to do.",
    fact: "Therapy is usually collaborative. A therapist can offer guidance and observations, but you are part of the process of deciding what you want to work on.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 4,
  },
  {
    slug: "myth-5-need-diagnosis",
    myth: "I need a diagnosis before I can see a therapist.",
    fact: "You don’t need to diagnose yourself first. People seek therapy for many reasons, including everyday stress, difficult experiences, relationships, and emotional challenges.",
    referenceTitle: "APA — Understanding psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy/understanding",
    order: 5,
  },
  {
    slug: "myth-6-talk-about-past-forever",
    myth: "Therapy will make me talk about my past forever.",
    fact: "Some therapy may explore past experiences, but not every approach focuses heavily on the past. Therapy can also focus on what you’re experiencing right now and what you want to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 6,
  },
  {
    slug: "myth-7-takes-forever",
    myth: "Therapy takes forever.",
    fact: "There is no single timeline for therapy. How long someone attends depends on their needs, goals, circumstances, and the type of support they receive.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 7,
  },
  {
    slug: "myth-8-tell-everything-immediately",
    myth: "I have to tell my therapist everything immediately.",
    fact: "Trust takes time. You can work with your therapist at a pace that feels manageable and gradually become more comfortable sharing.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 8,
  },
  {
    slug: "myth-9-therapists-will-judge",
    myth: "Therapists will judge me.",
    fact: "Therapy is designed to provide a professional space where you can discuss difficult thoughts and feelings without being shamed. Building trust is an important part of the process.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 9,
  },
  {
    slug: "myth-10-still-struggling-not-working",
    myth: "If I’m still struggling, therapy isn’t working.",
    fact: "Progress isn’t always immediate or perfectly linear. You can talk with your therapist about what feels helpful, what doesn’t, and whether your goals or approach need to change.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 10,
  },
  {
    slug: "myth-11-only-for-certain-people",
    myth: "Therapy is only for certain kinds of people.",
    fact: "People seek therapy for many different reasons and life circumstances. There isn’t one type of person who “belongs” in therapy.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 11,
  },
  {
    slug: "myth-12-couldnt-handle-things-myself",
    myth: "Going to therapy means I couldn’t handle things myself.",
    fact: "Asking for support isn’t a failure. Sometimes getting help is simply another way of taking care of yourself and working through something difficult.",
    referenceTitle: "APA — Get the facts about psychotherapy",
    referenceUrl: "https://www.apa.org/topics/psychotherapy",
    order: 12,
  },
];

const faqs = [
  // Category: About Heard & Healed
  {
    slug: "faq-1-what-is-heard-healed",
    question: "What is Heard & Healed?",
    answer: "Heard & Healed is a youth-focused space to explore emotions, understand mental health, and feel a little less alone.",
    category: "About Heard & Healed",
    order: 1,
  },
  {
    slug: "faq-2-who-is-it-for",
    question: "Who is Heard & Healed for?",
    answer: "It’s for young people navigating emotions, relationships, identity, expectations, or simply trying to understand themselves better.",
    category: "About Heard & Healed",
    order: 2,
  },
  {
    slug: "faq-3-why-was-it-created",
    question: "Why was Heard & Healed created?",
    answer: "Because understanding what you feel shouldn’t feel confusing, embarrassing, or lonely.",
    category: "About Heard & Healed",
    order: 3,
  },
  {
    slug: "faq-4-struggling-with-serious",
    question: "Do I need to be struggling with something serious to use it?",
    answer: "Not at all. You can use Heard & Healed whenever you want to reflect, learn, or better understand yourself.",
    category: "About Heard & Healed",
    order: 4,
  },
  {
    slug: "faq-5-is-it-therapy",
    question: "Is Heard & Healed a therapy or counselling service?",
    answer: "No. It’s an educational and supportive platform, not a replacement for professional mental health care.",
    category: "About Heard & Healed",
    order: 5,
  },

  // Category: What Are You Feeling?
  {
    slug: "faq-6-dont-know-feeling",
    question: "What can I do if I don’t know what I’m feeling?",
    answer: "Start with “What Are You Feeling?” and explore different experiences until something feels relatable.",
    category: "What Are You Feeling?",
    order: 6,
  },
  {
    slug: "faq-7-kinds-of-feelings",
    question: "What kinds of feelings and experiences can I explore?",
    answer: "You can explore experiences like loneliness, burnout, emotional numbness, identity stress, exclusion, pressure, and more.",
    category: "What Are You Feeling?",
    order: 7,
  },
  {
    slug: "faq-8-how-does-it-work",
    question: "How does “What Are You Feeling?” work?",
    answer: "Choose an experience that resonates with you and explore simple explanations, reflections, and grounding activities.",
    category: "What Are You Feeling?",
    order: 8,
  },
  {
    slug: "faq-9-relate-to-more-than-one",
    question: "What if I relate to more than one feeling?",
    answer: "That’s completely okay. Emotions often overlap, and you can explore as many experiences as feel relevant to you.",
    category: "What Are You Feeling?",
    order: 9,
  },
  {
    slug: "faq-10-help-understand-better",
    question: "Can these activities help me understand my emotions better?",
    answer: "They’re designed to help you pause, reflect, and put your feelings into words.",
    category: "What Are You Feeling?",
    order: 10,
  },

  // Category: Decode Therapy
  {
    slug: "faq-11-what-is-decode-therapy",
    question: "What is “Decode Therapy”?",
    answer: "It’s a space that breaks down therapy, common questions, and misconceptions in a simple, approachable way.",
    category: "Decode Therapy",
    order: 11,
  },
  {
    slug: "faq-12-how-know-therapy-helpful",
    question: "How do I know if therapy might be helpful for me?",
    answer: "If you’re struggling or feel like you need more support, talking to a qualified professional can help you figure out what you need.",
    category: "Decode Therapy",
    order: 12,
  },
  {
    slug: "faq-13-what-happens-session",
    question: "What actually happens during a therapy session?",
    answer: "Therapy is a conversation with a trained professional where you can talk through your thoughts, feelings, and experiences.",
    category: "Decode Therapy",
    order: 13,
  },
  {
    slug: "faq-14-need-diagnosis-first",
    question: "Do I need a diagnosis to see a therapist?",
    answer: "No. You don’t need a diagnosis to seek support or talk to a therapist.",
    category: "Decode Therapy",
    order: 14,
  },
  {
    slug: "faq-15-nervous-about-talking",
    question: "What if I’m nervous about talking to a therapist?",
    answer: "That’s normal. You can take it slowly and share only what you feel comfortable sharing.",
    category: "Decode Therapy",
    order: 15,
  },
  {
    slug: "faq-16-talk-someone-about-therapy",
    question: "How can I talk to someone about wanting therapy?",
    answer: "Try starting with someone you trust and explain what you’ve been experiencing and why you think support could help.",
    category: "Decode Therapy",
    order: 16,
  },
  {
    slug: "faq-17-can-heard-healed-diagnose",
    question: "Can Heard & Healed diagnose me or tell me what’s wrong?",
    answer: "No. Heard & Healed provides information and reflection tools, not diagnoses or treatment.",
    category: "Decode Therapy",
    order: 17,
  },

  // Category: Stories, Identity & Belonging
  {
    slug: "faq-18-share-anonymously",
    question: "Can I share my story anonymously?",
    answer: "Yes. You can choose to share your experience without revealing identifying information.",
    category: "Stories, Identity & Belonging",
    order: 18,
  },
  {
    slug: "faq-19-why-share-story",
    question: "Why should I share my story?",
    answer: "Sharing can help create a sense of connection and remind someone else that they aren’t alone.",
    category: "Stories, Identity & Belonging",
    order: 19,
  },
  {
    slug: "faq-20-explore-identity-without-figuring-out",
    question: "Can I explore identity-related feelings without having everything figured out?",
    answer: "Absolutely. You don’t need a label or all the answers to explore how you feel.",
    category: "Stories, Identity & Belonging",
    order: 20,
  },
  {
    slug: "faq-21-feel-like-dont-belong",
    question: "What if I feel like I don’t belong or nobody understands me?",
    answer: "You’re not alone in feeling that way. Heard & Healed offers reflections and stories designed to help you feel seen and understood.",
    category: "Stories, Identity & Belonging",
    order: 21,
  },

  // Category: Privacy & Safety
  {
    slug: "faq-22-is-information-private",
    question: "Is my information private?",
    answer: "We take privacy seriously. Check our Privacy Policy to understand what information we collect, use, and protect.",
    category: "Privacy & Safety",
    order: 22,
  },
  {
    slug: "faq-23-what-happens-after-submit",
    question: "What happens to a story after I submit it?",
    answer: "Submitted stories may be reviewed before being shared on the platform, with identifying information removed where appropriate.",
    category: "Privacy & Safety",
    order: 23,
  },
  {
    slug: "faq-24-can-i-delete-submission",
    question: "Can I delete something I’ve submitted?",
    answer: "If you’ve submitted a story and want it removed, follow the contact or removal process provided on the website.",
    category: "Privacy & Safety",
    order: 24,
  },
  {
    slug: "faq-25-immediate-support-needed",
    question: "What should I do if I need professional or immediate support?",
    answer: "Heard & Healed isn’t an emergency or treatment service. If you need immediate help, contact a trusted adult, qualified professional, or local emergency service.",
    category: "Privacy & Safety",
    order: 25,
  },
];

const emergencyContacts = [
  {
    slug: "childline-india",
    name: "Childline (National Emergency Helpline)",
    phone: "1098",
    description: "24/7 free, confidential emergency phone service for children and adolescents in need of care and protection.",
    url: "https://childlineindia.org",
    availableHours: "24/7",
    region: "India",
    order: 1,
  },
  {
    slug: "tele-manas",
    name: "Tele-MANAS Mental Health Helpline",
    phone: "14416 / 1800 891 4416",
    description: "National tele-mental health programme providing 24/7 free psychosocial support and psychiatric counselling.",
    url: "https://telemanas.mohfw.gov.in",
    availableHours: "24/7",
    region: "India",
    order: 2,
  },
  {
    slug: "nimhans-helpline",
    name: "NIMHANS Psychological Support",
    phone: "080-46110007",
    description: "National Institute of Mental Health and Neurosciences 24/7 mental health helpline.",
    url: "https://nimhans.ac.in",
    availableHours: "24/7",
    region: "India",
    order: 3,
  },
  {
    slug: "suicide-crisis-lifeline-988",
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 free and confidential crisis support across the US and Canada for individuals in distress.",
    url: "https://988lifeline.org",
    availableHours: "24/7",
    region: "USA / Canada",
    order: 4,
  },
  {
    slug: "crisis-text-line",
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 support via text message connecting you with trained crisis counselors.",
    url: "https://www.crisistextline.org",
    availableHours: "24/7",
    region: "International",
    order: 5,
  },
  {
    slug: "the-trevor-project",
    name: "The Trevor Project",
    phone: "1-866-488-7386",
    description: "Crisis intervention and suicide prevention support for LGBTQ+ youth.",
    url: "https://www.thetrevorproject.org",
    availableHours: "24/7",
    region: "International",
    order: 6,
  },
];

const resources = [
  {
    slug: "understanding-psychotherapy-apa",
    title: "Understanding Psychotherapy",
    description: "Comprehensive guide covering what therapy is, how it works, what to expect, and common misconceptions.",
    url: "https://www.apa.org/topics/psychotherapy/understanding",
    type: ResourceType.ARTICLE,
    category: "Decode Therapy",
    region: "Global",
  },
  {
    slug: "nhs-youth-mental-health",
    title: "NHS Mental Health Support for Children & Young People",
    description: "Guidance on mental health services, talking therapies, and different ways to get professional support.",
    url: "https://www.nhs.uk/mental-health/children-and-young-people/",
    type: ResourceType.GUIDE,
    category: "Find Support",
    region: "UK / Global",
  },
  {
    slug: "mind-dissociation-guide",
    title: "Mind UK: Understanding Dissociation & Emotional Numbness",
    description: "Evidence-based explanations and self-care strategies for dealing with numbness and detachment.",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders/",
    type: ResourceType.ARTICLE,
    category: "Explore Feelings",
    region: "Global",
  },
  {
    slug: "youngminds-exam-stress-guide",
    title: "YoungMinds: Coping with School & Exam Stress",
    description: "Actionable tips for dealing with academic expectations, workload overwhelm, and test anxiety.",
    url: "https://www.youngminds.org.uk/young-person/coping-with-life/exam-stress/",
    type: ResourceType.WORKSHEET,
    category: "Explore Feelings",
    region: "Global",
  },
];

const seedStories = [
  {
    slug: "the-pressure-to-always-be-on",
    title: "The Pressure to Always Be \"On\"",
    authorName: "Anonymous (Age 16)",
    isAnonymous: true,
    emotionSlug: "burnout",
    excerpt: "Between mock tests, football practice, and trying to keep up group chats, I felt like I was running on 1% battery for three months straight.",
    content: "Around the middle of term, my alarm would go off and my chest would instantly feel heavy. I wasn't even failing anything—I was doing okay on paper—but every tiny task felt like climbing a mountain. I thought resting meant I was being lazy. It took having an honest chat with my art teacher to realize that needing a pause doesn't mean you've quit. Now I schedule fifteen minutes every evening with my phone in another room just listening to music.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
  {
    slug: "sitting-at-a-table-full-of-friends",
    title: "Sitting at a Table Full of Friends and Still Feeling Alone",
    authorName: "Anonymous (Age 15)",
    isAnonymous: true,
    emotionSlug: "loneliness",
    excerpt: "Everyone was laughing at memes on their phones, and I suddenly felt like I was watching through soundproof glass.",
    content: "People think being lonely means you're literally in a room by yourself on a Friday night. For me, it was loudest in the school cafeteria. I had people around me, but none of them knew how overwhelmed I felt inside, and I was terrified that if I brought up anything real, the mood would die. It helped when I started being honest with just one friend instead of trying to be fine with the whole group.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
  {
    slug: "my-chest-felt-tight-over-a-quiz",
    title: "My Chest Felt Tight Over a Simple Quiz",
    authorName: "Anonymous (Age 17)",
    isAnonymous: true,
    emotionSlug: "anxiety",
    excerpt: "My heart raced, my palms sweated, and my brain went blank over a 15-minute quiz that didn't even count for my finals.",
    content: "The hardest part about anxiety for me was feeling embarrassed by it. My rational mind knew a chemistry quiz wasn't life or death, but my nervous system was screaming that danger was everywhere. Learning the 5-4-3-2-1 grounding technique gave me something physical to hold onto when my thoughts started spinning out of control. It didn't cure everything overnight, but it gave me my breath back.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
  {
    slug: "when-everything-went-quiet-and-gray",
    title: "When Everything Went Quiet and Gray",
    authorName: "Anonymous (Age 16)",
    isAnonymous: true,
    emotionSlug: "emotional-numbness",
    excerpt: "I wasn't crying or angry. I just felt like someone had turned the volume of my feelings all the way down to zero.",
    content: "During exams last year, I stopped feeling nervous or happy or sad. Even when my favorite team won or when someone gave me good news, it felt like it was happening to someone else. I got really scared that something was broken inside me. Reading that emotional numbness is often the mind's way of protecting itself from chronic overwhelm made me stop blaming myself. Gentle routines and walking outside slowly brought things back into color.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
  {
    slug: "who-am-i-supposed-to-be",
    title: "Who Am I Supposed to Be?",
    authorName: "Anonymous (Age 14)",
    isAnonymous: true,
    emotionSlug: "identity-stress",
    excerpt: "At home I was the quiet responsible one; at school I tried to be the funny one; alone, I didn't know who I actually was.",
    content: "I spent so much time chameleon-shifting to fit whatever group I was standing in front of. By 9th grade, I felt exhausted and fake. What helped was giving myself permission not to have a single fixed aesthetic or label. I like science and poetry and goofy videos, and I don't need to fit into a neat box to be valid.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
  {
    slug: "carrying-everyone-elses-hopes",
    title: "Carrying Everyone Else's Hopes",
    authorName: "Anonymous (Age 17)",
    isAnonymous: true,
    emotionSlug: "family-pressure",
    excerpt: "My parents sacrificed a lot so I could have opportunities they didn't, but that gratitude slowly turned into suffocating guilt.",
    content: "Every grade report felt like an audition for my family's happiness. If I got an A-, I felt like I had let down my entire lineage. It took breaking down in front of my older cousin to understand that my parents' sacrifices were meant to give me a chance at a good life—not to turn me into an anxiety-ridden robot. Starting to talk about my own dreams instead of just trying to predict theirs was hard, but it opened a door we both needed.",
    status: SubmissionStatus.APPROVED,
    featured: true,
    riskLevel: RiskLevel.NONE,
  },
];

async function main() {
  console.log("🌱 Seeding Heard & Healed database with canonical content...");

  // 1. Seed Emotions
  console.log("-> Seeding 9 Emotions...");
  const emotionMap = new Map<string, string>();
  for (const emotion of emotions) {
    const created = await prisma.emotion.upsert({
      where: { slug: emotion.slug },
      update: emotion,
      create: emotion,
    });
    emotionMap.set(created.slug, created.id);
  }

  // 2. Seed Myths
  console.log("-> Seeding 12 Therapy Myths...");
  for (const myth of myths) {
    await prisma.myth.upsert({
      where: { slug: myth.slug },
      update: myth,
      create: myth,
    });
  }

  // 3. Seed FAQs
  console.log("-> Seeding 25 FAQs across 5 Categories...");
  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { slug: faq.slug },
      update: faq,
      create: faq,
    });
  }

  // 4. Seed Emergency Contacts
  console.log("-> Seeding Emergency Contacts & Helplines...");
  for (const contact of emergencyContacts) {
    await prisma.emergencyContact.upsert({
      where: { slug: contact.slug },
      update: contact,
      create: contact,
    });
  }

  // 5. Seed Resources
  console.log("-> Seeding Psychoeducational Resources...");
  for (const res of resources) {
    await prisma.resource.upsert({
      where: { slug: res.slug },
      update: res,
      create: res,
    });
  }

  // 6. Seed Approved Stories
  console.log("-> Seeding 6 Approved Teen Stories...");
  for (const story of seedStories) {
    const emotionId = story.emotionSlug ? emotionMap.get(story.emotionSlug) : null;
    await prisma.story.upsert({
      where: { slug: story.slug },
      update: {
        title: story.title,
        excerpt: story.excerpt,
        content: story.content,
        authorName: story.authorName,
        isAnonymous: story.isAnonymous,
        status: story.status,
        featured: story.featured,
        riskLevel: story.riskLevel,
        emotionSlug: story.emotionSlug,
        emotionId: emotionId || null,
      },
      create: {
        slug: story.slug,
        title: story.title,
        excerpt: story.excerpt,
        content: story.content,
        authorName: story.authorName,
        isAnonymous: story.isAnonymous,
        status: story.status,
        featured: story.featured,
        riskLevel: story.riskLevel,
        emotionSlug: story.emotionSlug,
        emotionId: emotionId || null,
      },
    });
  }

  console.log("✅ Seeding completed idempotently and successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
