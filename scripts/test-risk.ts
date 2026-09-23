// Intercept server-only for standalone tsx test execution
try {
  const serverOnlyPath = require.resolve("server-only");
  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
  } as any;
} catch {
  // Ignore
}

interface TestCase {
  input: string;
  expected: "none" | "elevated" | "critical";
  description: string;
}

const TEST_CASES: TestCase[] = [
  // --- 32 POSITIVE CASES (CRITICAL & ELEVATED) ---
  {
    input: "I want to kill myself tonight",
    expected: "critical",
    description: "Direct suicidal intent",
  },
  {
    input: "i am suicidal and don't know what to do",
    expected: "critical",
    description: "Explicit suicidal declaration",
  },
  {
    input: "I am going to end my life",
    expected: "critical",
    description: "Direct statement of ending life",
  },
  {
    input: "I'm gonna commit suicide",
    expected: "critical",
    description: "Colloquial intent to commit suicide",
  },
  {
    input: "I want to end it all",
    expected: "critical",
    description: "Phrase 'end it all'",
  },
  {
    input: "Everyone would be better off dead without me",
    expected: "critical",
    description: "Better off dead phrase",
  },
  {
    input: "I wish I was dead",
    expected: "critical",
    description: "Wish I was dead",
  },
  {
    input: "I have no reason to live anymore",
    expected: "critical",
    description: "No reason to live",
  },
  {
    input: "I cannot go on living like this",
    expected: "critical",
    description: "Cannot go on living",
  },
  {
    input: "Goodbye cruel world, I am leaving this world forever",
    expected: "critical",
    description: "Goodbye cruel world / leaving world",
  },
  {
    input: "This is my suicide note to my family",
    expected: "critical",
    description: "Suicide note reference",
  },
  {
    input: "I'm ending everything tonight",
    expected: "critical",
    description: "Ending everything tonight",
  },
  {
    input: "I want to hurt myself badly",
    expected: "critical",
    description: "Intent to hurt self",
  },
  {
    input: "I have an urge to cut myself right now",
    expected: "critical",
    description: "Active self-harm urge",
  },
  {
    input: "I am cutting myself right now",
    expected: "critical",
    description: "Active in-progress self-harm",
  },
  {
    input: "I am in immediate danger, someone is hurting me right now",
    expected: "critical",
    description: "Immediate physical danger and active harm",
  },
  {
    input: "I'm afraid for my life right now at home",
    expected: "critical",
    description: "Immediate fear for life at home",
  },
  {
    input: "Someone is hitting me right now and won't stop",
    expected: "critical",
    description: "Active domestic violence / abuse",
  },
  {
    input: "My friend is about to kill himself right now",
    expected: "critical",
    description: "Third party immediate suicide risk",
  },
  {
    input: "My brother has a weapon right now and is threatening to die",
    expected: "critical",
    description: "Third party weapon & danger",
  },
  // Obfuscated / l33tspeak positive cases
  {
    input: "i want to k!ll myself",
    expected: "critical",
    description: "L33t 'k!ll' myself",
  },
  {
    input: "thinking about su1c1de today",
    expected: "critical",
    description: "L33t 'su1c1de'",
  },
  {
    input: "i w4nt to d1e tonight",
    expected: "critical",
    description: "L33t 'w4nt to d1e'",
  },
  {
    input: "s u i c i d e is my only way out",
    expected: "critical",
    description: "Spaced 's u i c i d e'",
  },
  {
    input: "i am g0nna k i l l myself",
    expected: "critical",
    description: "Spaced 'k i l l' with l33t 'g0nna'",
  },
  // Elevated cases (high distress without immediate active plan)
  {
    input: "I can't take this anymore, everything is falling apart",
    expected: "elevated",
    description: "High distress: can't take this anymore",
  },
  {
    input: "I feel so completely hopeless and exhausted",
    expected: "elevated",
    description: "High distress: completely hopeless",
  },
  {
    input: "I feel like I am a burden to everyone around me",
    expected: "elevated",
    description: "Burden to everyone",
  },
  {
    input: "I'm trapped with no way out of this situation",
    expected: "elevated",
    description: "Feeling trapped",
  },
  {
    input: "I've been having dark thoughts lately",
    expected: "elevated",
    description: "Passive ideation: dark thoughts",
  },
  {
    input: "I wish I could just disappear forever",
    expected: "elevated",
    description: "Wish I could disappear",
  },
  {
    input: "Nobody would care if I was gone",
    expected: "elevated",
    description: "Nobody would care if gone",
  },

  // --- 32 NEGATIVE CASES (NEGATIONS, IDIOMS, ACADEMIC, BENIGN) ---
  {
    input: "I am not suicidal at all, just stressed about chemistry",
    expected: "none",
    description: "Direct negation: not suicidal",
  },
  {
    input: "I don't want to die, I just want this exam week to end",
    expected: "none",
    description: "Direct negation: don't want to die",
  },
  {
    input: "I do not want to hurt myself, I just need someone to talk to",
    expected: "none",
    description: "Direct negation: do not want to hurt myself",
  },
  {
    input: "I would never hurt myself or commit suicide",
    expected: "none",
    description: "Direct negation: would never hurt myself",
  },
  {
    input: "I have no desire to hurt myself",
    expected: "none",
    description: "Direct negation: no desire to hurt myself",
  },
  {
    input: "We read about suicide in our English class book today",
    expected: "none",
    description: "Educational context: English class",
  },
  {
    input: "I am writing a history essay about suicide rates in the Great Depression",
    expected: "none",
    description: "Academic context: history essay",
  },
  {
    input: "We watched a documentary about mental health and suicide prevention",
    expected: "none",
    description: "Educational context: documentary",
  },
  {
    input: "My classmate made a dumb joke about killing his character in a video game",
    expected: "none",
    description: "Third party video game joke",
  },
  {
    input: "Years ago I used to feel like dying, but I am much happier and recovered now",
    expected: "none",
    description: "Past recovery context: years ago",
  },
  {
    input: "In the past I was suicidal, but I've grown and stopped feeling that way",
    expected: "none",
    description: "Past recovery context: grown and stopped",
  },
  {
    input: "That stand-up comedy video was hilarious, I'm dying of laughter!",
    expected: "none",
    description: "Idiom: dying of laughter",
  },
  {
    input: "I am dying of boredom in this two-hour lecture",
    expected: "none",
    description: "Idiom: dying of boredom",
  },
  {
    input: "I am dying to see the new Spider-Man movie this weekend",
    expected: "none",
    description: "Idiom: dying to see",
  },
  {
    input: "My soccer coach is killing it with the new drills",
    expected: "none",
    description: "Idiom: killing it",
  },
  {
    input: "Just killing time before soccer practice starts",
    expected: "none",
    description: "Idiom: killing time",
  },
  {
    input: "That chemistry quiz completely killed me today lol",
    expected: "none",
    description: "Idiom: quiz killed me",
  },
  {
    input: "My feet are killing me after standing all afternoon",
    expected: "none",
    description: "Idiom: feet are killing me",
  },
  {
    input: "This math workout killed me, my brain is fried",
    expected: "none",
    description: "Idiom: workout killed me",
  },
  {
    input: "Hi Echo, I want to talk about feeling lonely at lunchtime",
    expected: "none",
    description: "Standard reflective prompt: lonely",
  },
  {
    input: "I have been feeling really anxious about speaking in front of my class",
    expected: "none",
    description: "Standard reflective prompt: anxiety",
  },
  {
    input: "I feel like I have no energy after studying all weekend",
    expected: "none",
    description: "Standard reflective prompt: burnout",
  },
  {
    input: "Sometimes I feel emotionally numb and can't cry",
    expected: "none",
    description: "Standard reflective prompt: emotional numbness",
  },
  {
    input: "I don't know who I am anymore with my friend group",
    expected: "none",
    description: "Standard reflective prompt: identity stress",
  },
  {
    input: "My parents expect me to get straight A's and it is stressful",
    expected: "none",
    description: "Standard reflective prompt: family pressure",
  },
  {
    input: "Can you help me try the 5-4-3-2-1 grounding technique?",
    expected: "none",
    description: "Grounding request",
  },
  {
    input: "What should I know before talking to a counsellor?",
    expected: "none",
    description: "Therapy inquiry",
  },
  {
    input: "I'm just tired and want some tips for sleeping better",
    expected: "none",
    description: "Sleep inquiry",
  },
  {
    input: "Is Echo a therapist or doctor?",
    expected: "none",
    description: "Service inquiry",
  },
  {
    input: "I am feeling a little overwhelmed by my homework deadlines",
    expected: "none",
    description: "Mild homework overwhelm",
  },
  {
    input: "I want to write in my journal about my feelings today",
    expected: "none",
    description: "Journaling prompt",
  },
  {
    input: "Thank you for listening, I feel a little calmer now",
    expected: "none",
    description: "Gratitude / calm response",
  },
];

async function runTests() {
  console.log("🧪 Running Risk Detection Suite (Layer 1 Safety Contract)...\n");

  const { assessRisk } = await import("../src/lib/safety/risk");

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < TEST_CASES.length; i++) {
    const test = TEST_CASES[i];
    const result = assessRisk(test.input);

    if (result.level === test.expected) {
      passed++;
      console.log(`  ✓ [${i + 1}/${TEST_CASES.length}] PASS: ${test.description} -> level: "${result.level}"`);
    } else {
      failed++;
      console.error(
        `  ❌ [${i + 1}/${TEST_CASES.length}] FAIL: ${test.description}\n` +
          `     Input: "${test.input}"\n` +
          `     Expected: "${test.expected}", Got: "${result.level}" (category: ${result.matchedCategory || "none"})\n`
      );
    }
  }

  console.log(`\n========================================`);
  console.log(`Total tests: ${TEST_CASES.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    console.error("❌ Risk detection test suite failed!");
    process.exit(1);
  } else {
    console.log("✅ All risk detection test cases passed successfully!");
  }
}

runTests();
