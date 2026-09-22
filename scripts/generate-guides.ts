import * as fs from "fs";
import * as path from "path";

interface PdfSection {
  title: string;
  subtitle?: string;
  explanation: string;
  activityTitle: string;
  activityDescription: string;
  guideUrl?: string;
  disclaimer: string;
}

/**
 * Creates a valid, well-formed single-page PDF (A4 size: 595 x 842 pt)
 * in pure TypeScript without third-party dependencies.
 */
function createBrandedPdf(data: PdfSection): Buffer {
  const sanitize = (text: string) =>
    text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[“”"]/g, '"')
      .replace(/[’']/g, "'")
      .replace(/—/g, " - ")
      .replace(/–/g, " - ");

  // Helper to wrap text lines
  const wrapText = (text: string, maxChars = 75): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + " " + word).trim().length <= maxChars) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Build stream content
  const streamLines: string[] = [
    // Background fill (warm cream #FAF7F2: 0.98 0.968 0.949)
    "0.98 0.968 0.949 rg",
    "0 0 595 842 re",
    "f",

    // Top banner card (#FFFFFF)
    "1 1 1 rg",
    "36 710 523 96 re",
    "f",
    "0.917 0.89 0.855 RG",
    "1.5 w",
    "36 710 523 96 re",
    "S",

    // Brand accent bar (#7FA9C9: 0.5 0.663 0.788)
    "0.5 0.663 0.788 rg",
    "36 800 523 6 re",
    "f",

    // Brand Header Text
    "BT",
    "/F2 11 Tf",
    "0.36 0.533 0.659 rg",
    "56 775 Td",
    "(HEARD & HEALED  -  YOUTH EMOTIONAL WELLBEING GUIDE) Tj",
    "ET",

    // Title
    "BT",
    "/F2 22 Tf",
    "0.23 0.23 0.23 rg",
    "56 742 Td",
    `(${sanitize(data.title)}) Tj`,
    "ET",

    // Subtitle / Kicker
    "BT",
    "/F3 11 Tf",
    "0.42 0.42 0.42 rg",
    "56 724 Td",
    `(${sanitize(data.subtitle || "A gentle reflection and grounding guide for young people")}) Tj`,
    "ET",

    // Section 1: "What It Feels Like" Container (#FFFFFF card)
    "1 1 1 rg",
    "36 575 523 115 re",
    "f",
    "0.917 0.89 0.855 RG",
    "1 w",
    "36 575 523 115 re",
    "S",

    // Section 1 Heading
    "BT",
    "/F2 13 Tf",
    "0.23 0.23 0.23 rg",
    "56 662 Td",
    "(WHAT IT FEELS LIKE) Tj",
    "ET",
  ];

  // Section 1 Body lines
  let currentY = 640;
  for (const line of wrapText(data.explanation, 75)) {
    streamLines.push(
      "BT",
      "/F1 11 Tf",
      "0.35 0.35 0.35 rg",
      `56 ${currentY} Td`,
      `(${sanitize(line)}) Tj`,
      "ET"
    );
    currentY -= 17;
  }

  // Section 2: "Try This" Grounding Activity Box (#A8C8B0 with alpha tint: 0.92 0.96 0.93)
  streamLines.push(
    "0.92 0.96 0.93 rg",
    "36 330 523 225 re",
    "f",
    "0.658 0.784 0.69 RG",
    "1.5 w",
    "36 330 523 225 re",
    "S",

    // Activity Badge
    "0.431 0.608 0.478 rg",
    "56 515 120 22 re",
    "f",
    "BT",
    "/F2 10 Tf",
    "1 1 1 rg",
    "66 522 Td",
    "(GROUNDING RESET) Tj",
    "ET",

    // Activity Title
    "BT",
    "/F2 14 Tf",
    "0.23 0.23 0.23 rg",
    "56 488 Td",
    `(${sanitize(data.activityTitle)}) Tj`,
    "ET"
  );

  // Activity Description lines
  currentY = 462;
  for (const line of wrapText(data.activityDescription, 72)) {
    streamLines.push(
      "BT",
      "/F1 11 Tf",
      "0.25 0.25 0.25 rg",
      `56 ${currentY} Td`,
      `(${sanitize(line)}) Tj`,
      "ET"
    );
    currentY -= 17;
  }

  // Activity Prompt Box inside activity card
  streamLines.push(
    "1 1 1 rg",
    "56 350 483 50 re",
    "f",
    "0.85 0.90 0.87 RG",
    "1 w",
    "56 350 483 50 re",
    "S",
    "BT",
    "/F3 10 Tf",
    "0.42 0.42 0.42 rg",
    "70 376 Td",
    "(Take 3 slow breaths. You do not need to rush or figure everything out at once.) Tj",
    "70 360 Td",
    "(Write your thoughts, pause, or talk to a trusted adult whenever you feel ready.) Tj",
    "ET"
  );

  // Section 3: Professional Support & External Guide
  if (data.guideUrl) {
    streamLines.push(
      "1 1 1 rg",
      "36 215 523 95 re",
      "f",
      "0.917 0.89 0.855 RG",
      "1 w",
      "36 215 523 95 re",
      "S",

      "BT",
      "/F2 12 Tf",
      "0.23 0.23 0.23 rg",
      "56 280 Td",
      "(REPUTABLE RESOURCE & FURTHER READING) Tj",
      "ET",

      "BT",
      "/F1 10 Tf",
      "0.36 0.533 0.659 rg",
      "56 258 Td",
      `(${sanitize(data.guideUrl)}) Tj`,
      "ET",

      "BT",
      "/F3 9.5 Tf",
      "0.45 0.45 0.45 rg",
      "56 235 Td",
      "(Visit this resource online for in-depth adolescent mental health guides and worksheets.) Tj",
      "ET"
    );
  }

  // Bottom Notice: Non-Negotiable Safety Disclaimer
  streamLines.push(
    "1 1 1 rg",
    "36 40 523 155 re",
    "f",
    "0.91 0.51 0.435 RG", // coral outline
    "1.5 w",
    "36 40 523 155 re",
    "S",

    "BT",
    "/F2 10 Tf",
    "0.91 0.51 0.435 rg",
    "56 168 Td",
    "(IMPORTANT SAFETY & EDUCATIONAL NOTICE) Tj",
    "ET"
  );

  currentY = 150;
  for (const line of wrapText(data.disclaimer, 78)) {
    streamLines.push(
      "BT",
      "/F1 9 Tf",
      "0.38 0.38 0.38 rg",
      `56 ${currentY} Td`,
      `(${sanitize(line)}) Tj`,
      "ET"
    );
    currentY -= 14;
  }

  streamLines.push(
    "BT",
    "/F2 9.5 Tf",
    "0.36 0.533 0.659 rg",
    "56 55 Td",
    "(Free 24/7 Helpline: 1098 / 988 / 14416  |  Website: heardandhealed.org) Tj",
    "ET"
  );

  const streamContent = streamLines.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  // Construct PDF Objects
  const objects: string[] = [];

  // Obj 1: Catalog
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");

  // Obj 2: Pages
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj");

  // Obj 3: Page (A4: 595 x 842 pt)
  objects.push(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>\nendobj"
  );

  // Obj 4: Contents Stream
  objects.push(
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`
  );

  // Obj 5: Normal Font (Helvetica)
  objects.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj"
  );

  // Obj 6: Bold Font (Helvetica-Bold)
  objects.push(
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj"
  );

  // Obj 7: Oblique Font (Helvetica-Oblique)
  objects.push(
    "7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj"
  );

  // Calculate xref table offsets
  let offset = 9; // "%PDF-1.4\n" length
  const xrefOffsets: number[] = [0];

  for (const obj of objects) {
    xrefOffsets.push(offset);
    offset += Buffer.byteLength(obj + "\n", "utf-8");
  }

  let pdfOutput = "%PDF-1.4\n";
  for (const obj of objects) {
    pdfOutput += obj + "\n";
  }

  const startxref = offset;
  pdfOutput += "xref\n";
  pdfOutput += `0 ${objects.length + 1}\n`;
  pdfOutput += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i++) {
    const offStr = xrefOffsets[i].toString().padStart(10, "0");
    pdfOutput += `${offStr} 00000 n \n`;
  }

  pdfOutput += "trailer\n";
  pdfOutput += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdfOutput += "startxref\n";
  pdfOutput += `${startxref}\n`;
  pdfOutput += "%%EOF\n";

  return Buffer.from(pdfOutput, "utf-8");
}

const GLOBAL_DISCLAIMER =
  "Heard & Healed is a supportive and educational platform designed to help young people understand their emotions, reflect on what they are experiencing, and find helpful resources. It is not a substitute for therapy, counselling, medical care, diagnosis, or professional mental-health support.";

const EMOTIONS = [
  {
    slug: "anxiety",
    title: "Understanding Anxiety",
    subtitle: "When worry or fear feels difficult to switch off",
    explanation:
      "When worry, fear, or 'what if?' thoughts feel difficult to switch off, even when you're safe. Your nervous system is trying to protect you, but it has sounded a false alarm.",
    activityTitle: "'Right Now' Reset (5-4-3-2-1 Technique)",
    activityDescription:
      "Name 5 things you can see, 4 things you can feel with your hands, 3 things you can hear around you, 2 things you can smell, and 1 thing you like about yourself. Then write: 'What is actually happening right now in this exact moment?'",
    guideUrl: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/youth-mental-health/",
  },
  {
    slug: "loneliness",
    title: "Navigating Loneliness",
    subtitle: "Feeling disconnected or misunderstood, even around others",
    explanation:
      "Feeling disconnected or like nobody truly understands you, even when people are around. Loneliness is not a personal failure; it is a human signal that you crave meaningful belonging.",
    activityTitle: "'One Small Connection' Reflection",
    activityDescription:
      "Think of one person, place, or community where you feel even slightly safe or understood. What is one small step that could help you feel 1% more connected today? Even sending a low-pressure text or taking a walk can shift your state.",
    guideUrl: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness",
  },
  {
    slug: "burnout",
    title: "Recovering From Burnout",
    subtitle: "Mental and emotional exhaustion from chronic overwhelm",
    explanation:
      "Feeling emotionally and mentally exhausted after prolonged stress, academic pressure, or having too much on your plate for too long. Rest is a biological requirement, not a reward you have to earn.",
    activityTitle: "'Battery Check' Self-Audit",
    activityDescription:
      "Rate your current mental energy from 1 to 10. Identify the top 2 things currently draining your battery, and name one non-essential task you can pause, drop, or ask for support with today.",
    guideUrl: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
  },
  {
    slug: "emotional-numbness",
    title: "Understanding Emotional Numbness",
    subtitle: "When you feel detached or unable to feel much of anything",
    explanation:
      "When you feel disconnected from your emotions or find it difficult to feel much of anything. Often, numbness is your brain's protective buffer against sustained overload or distress.",
    activityTitle: "'Name Something' Grounding Exercise",
    activityDescription:
      "Instead of forcing yourself to feel, simply notice physical surroundings without judgment: What do I see? What textures are beneath my fingers? What does temperature feel like on my skin? Gently reconnect through physical senses.",
    guideUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders/",
  },
  {
    slug: "identity-stress",
    title: "Untangling Identity Stress",
    subtitle: "Questions of who you are, where you fit, and expectations",
    explanation:
      "Feeling confused, pressured, or uncertain about who you are, where you fit, or how others see you. Adolescence is a time of exploration; you do not need all the answers today.",
    activityTitle: "'Beyond Labels' Discovery",
    activityDescription:
      "Complete this prompt in your notes: 'People may see me as [___], but I also am [___].' Focus on values, interests, quirky habits, and qualities that make you unique rather than rigid social expectations.",
    guideUrl: "https://childmind.org/article/helping-teens-develop-a-healthy-identity/",
  },
  {
    slug: "feeling-invisible",
    title: "Coping With Social Exclusion",
    subtitle: "When you feel overlooked or like your presence doesn't matter",
    explanation:
      "Feeling overlooked, left out, or like your presence doesn’t matter to the people around you. Rejection sensitivity can sting deeply, but one group's oversight does not define your inherent worth.",
    activityTitle: "'I Belong Here' Reflection",
    activityDescription:
      "Write down one space (online, creative, family, or solo) where you feel completely comfortable being yourself, and name one unique quality or kindness you bring to the world.",
    guideUrl: "https://www.unicef.org/topics/adolescent-health",
  },
  {
    slug: "academic-pressure",
    title: "Handling Academic Pressure",
    subtitle: "When deadlines, grades, and exams feel suffocating",
    explanation:
      "When grades, competition, deadlines, or expectations start feeling heavier than you can comfortably carry. Your worth as a human being is never measured by test marks.",
    activityTitle: "'My Expectations vs. Mine' Separation",
    activityDescription:
      "Draw three columns on a sheet: 1) What I personally want; 2) What other people expect of me; 3) What I'm afraid will happen if I stumble. Separating these relieves the burden of carrying others' expectations.",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/exam-stress/",
  },
  {
    slug: "family-pressure",
    title: "Navigating Family Pressure",
    subtitle: "Expectations, comparisons, and tension at home",
    explanation:
      "Feeling overwhelmed by expectations, comparisons, conflict, or pressure from the people closest to you. Loving your family does not mean sacrificing your emotional wellbeing.",
    activityTitle: "'What's Mine to Carry?' Boundary Check",
    activityDescription:
      "List 3 things you can control (your effort, your breath, your reactions), 3 things you can influence, and 3 things strictly outside your control (other people's moods, opinions, comparisons).",
    guideUrl: "https://www.youngminds.org.uk/young-person/coping-with-life/",
  },
  {
    slug: "self-esteem-confusion",
    title: "Rebuilding Self-Esteem",
    subtitle: "Questioning your worth while trying to figure yourself out",
    explanation:
      "Questioning your worth, abilities, or place in the world while trying to figure yourself out. The inner critic often exaggerates mistakes while ignoring real resilience.",
    activityTitle: "'Evidence, Not Judgment' Inventory",
    activityDescription:
      "Write down 3 real things you have handled, learned, or tried recently. No ranking, no comparison against peers—just factual evidence of your capability and growth.",
    guideUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-esteem/",
  },
];

const DOWNLOADS = [
  {
    filename: "anxiety-grounding.pdf",
    title: "5-4-3-2-1 Sensory Grounding Worksheet",
    subtitle: "A practical reset tool for managing sudden overwhelm and anxiety",
    explanation:
      "Sensory grounding helps bring your attention away from racing 'what-if' thoughts back into the safety and stability of the present physical moment.",
    activityTitle: "The 5-4-3-2-1 Sensory Reset",
    activityDescription:
      "Step 1: Look for 5 things you can see.\nStep 2: Notice 4 things you can touch or feel physically.\nStep 3: Listen for 3 distinct sounds around you.\nStep 4: Identify 2 scents or aromas.\nStep 5: Name 1 kind thing you appreciate about yourself right now.",
    guideUrl: "https://www.nhs.uk/mental-health/self-help/tips-and-support/grounding-techniques/",
  },
  {
    filename: "emotion-wheel.pdf",
    title: "Emotion Wheel & Feeling Vocabulary Guide",
    subtitle: "Putting nuanced words to tangled or heavy feelings",
    explanation:
      "It is hard to process feelings when we only have words like 'fine' or 'bad'. Naming the specific emotion reduces its intensity and helps you communicate clearly.",
    activityTitle: "Naming What's Underneath",
    activityDescription:
      "Start with a core feeling: Sad, Scared, Angry, Overwhelmed. Trace inward to find the nuance: Abandoned? Overlooked? Disappointed? Misunderstood? Write: 'Right now, what I am truly feeling is...'",
    guideUrl: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness",
  },
  {
    filename: "boundary-setting.pdf",
    title: "Boundary Setting & Self-Protection Worksheet",
    subtitle: "Gentle scripts and tools for saying no without guilt",
    explanation:
      "Boundaries are not walls to keep everyone out; they are doors with keys that allow you to protect your peace, time, and emotional energy.",
    activityTitle: "The Gentle 'No' Script Builder",
    activityDescription:
      "Pick a recent situation where you felt pressured. Practice completing: 'I really care about you, but I don't have the capacity for this today.' Remember: you do not owe an over-explanation for protecting your rest.",
    guideUrl: "https://childmind.org/article/helping-teens-develop-a-healthy-identity/",
  },
  {
    filename: "sleep-hygiene.pdf",
    title: "Youth Sleep & Nighttime Mental Reset Guide",
    subtitle: "Calming a busy mind when bedtime feels restless",
    explanation:
      "Late-night overthinking happens when external distractions fade and stored worries surface. Creating an intentional evening wind-down protects both your mood and cognition.",
    activityTitle: "Nighttime Brain-Dump Technique",
    activityDescription:
      "Keep a pad beside your bed. Write down every nagging thought or tomorrow-task for 3 uninterrupted minutes. Tell yourself: 'These thoughts are safe on paper; I will revisit them tomorrow after I rest.'",
    guideUrl: "https://www.nhs.uk/mental-health/children-and-young-people/",
  },
];

function main() {
  const publicDir = path.join(process.cwd(), "public");
  const guidesDir = path.join(publicDir, "guides");
  const downloadsDir = path.join(publicDir, "downloads");

  if (!fs.existsSync(guidesDir)) fs.mkdirSync(guidesDir, { recursive: true });
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  console.log("📄 Generating 9 Emotion Guides in /public/guides/...");
  for (const emotion of EMOTIONS) {
    const pdfBuffer = createBrandedPdf({
      ...emotion,
      disclaimer: GLOBAL_DISCLAIMER,
    });
    const filePath = path.join(guidesDir, `${emotion.slug}.pdf`);
    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`  ✓ Generated: public/guides/${emotion.slug}.pdf (${pdfBuffer.length} bytes)`);
  }

  console.log("📄 Generating 4 Worksheets in /public/downloads/...");
  for (const dl of DOWNLOADS) {
    const pdfBuffer = createBrandedPdf({
      ...dl,
      disclaimer: GLOBAL_DISCLAIMER,
    });
    const filePath = path.join(downloadsDir, dl.filename);
    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`  ✓ Generated: public/downloads/${dl.filename} (${pdfBuffer.length} bytes)`);
  }

  console.log("✅ All PDF guides and worksheets generated successfully!");
}

main();
