import "server-only";

export type RiskLevel = "none" | "elevated" | "critical";

export interface RiskAssessment {
  level: RiskLevel;
  matchedCategory?: string;
}

/**
 * Normalizes user text to detect obfuscated words (l33t speak, spacing, punctuation insertions).
 */
function normalizeText(input: string): string {
  let text = input.toLowerCase();

  // Common l33tspeak substitutions
  text = text
    .replace(/@/g, "a")
    .replace(/4/g, "a")
    .replace(/3/g, "e")
    .replace(/1/g, "i")
    .replace(/!/g, "i")
    .replace(/\|/g, "i")
    .replace(/0/g, "o")
    .replace(/5/g, "s")
    .replace(/\$/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "b");

  // Collapse spaced-out suicide/kill words (e.g., "s u i c i d e", "k y s", "d i e")
  text = text.replace(/\bs\s+u\s+i\s+c\s+i\s+d\s+e\b/g, "suicide");
  text = text.replace(/\bk\s+y\s+s\b/g, "kys");
  text = text.replace(/\bd\s+i\s+e\b/g, "die");
  text = text.replace(/\bk\s+i\s+l\s+l\b/g, "kill");

  return text;
}

/**
 * Benign figurative expressions and idioms that shouldn't trigger risk flags.
 */
const BENIGN_IDIOMS = [
  /\b(?:dying|dyin)\s+(?:of\s+)?(?:laughter|laughing|boredom|curiosity)\b/i,
  /\b(?:dying|dyin)\s+to\s+(?:know|see|meet|hear|try|watch|play)\b/i,
  /\bkilling\s+it\b/i,
  /\bkilling\s+time\b/i,
  /\b(?:that|this|the)\s+(?:joke|meme|video|pun|line)\s+killed\s+me\b/i,
  /\b(?:test|exam|homework|quiz|assignment|workout|practice|run)\s+killed\s+me\b/i,
  /\b(?:feet|legs|head|back|shoulders|arms)\s+(?:are\s+)?killing\s+me\b/i,
  /\blaughing\s+my\s+(?:head|butt|ass)\s+off\b/i,
];

/**
 * Negation and educational/academic context patterns.
 */
const NEGATION_AND_CONTEXT_PATTERNS = [
  // Direct negations
  /\b(?:not|never|no longer|ain't|aren't|am not)\s+(?:suicidal|going to kill myself|planning to die|wanting to die|trying to hurt myself)\b/i,
  /\bdon'?t\s+(?:want to|wanna|plan to|intend to)\s+(?:die|kill myself|hurt myself|end it all)\b/i,
  /\bdo\s+not\s+(?:want to|wanna|plan to|intend to)\s+(?:die|kill myself|hurt myself|end it all)\b/i,
  /\bwould\s+never\s+(?:hurt myself|kill myself|commit suicide|end my life)\b/i,
  /\bno\s+(?:desire|urge|intention|plan)\s+to\s+(?:hurt myself|die|kill myself)\b/i,

  // Past tense / recovery context
  /\b(?:used to|in the past|years ago|months ago|back then)\s+(?:be suicidal|feel like dying|want to die|have suicidal thoughts)\b.*?\b(?:better|recovered|grown|stopped|past that|happier now)\b/i,
  /\bi\s+was\s+suicidal\s+(?:years ago|in the past|back in)\b/i,

  // Educational or third-party context
  /\b(?:read|reading|wrote|writing|talked|talking|learned|learning|studied|studying)\s+about\s+suicide\s+(?:in|for)\s+(?:class|school|book|article|history|english|project|exam)\b/i,
  /\b(?:a|the)\s+(?:book|novel|movie|film|documentary|poem|story|play)\s+about\s+(?:suicide|self-harm|depression)\b/i,
  /\b(?:friend|brother|sister|peer|classmate)\s+(?:was joking|made a joke)\s+about\s+(?:killing|suicide)\b/i,
];

/**
 * CRITICAL RISK PATTERNS
 * Immediate danger, active suicidal intent, active self-harm, active abuse.
 */
const CRITICAL_PATTERNS: { category: string; regex: RegExp }[] = [
  {
    category: "suicide_intent",
    regex:
      /\b(?:want to|wanna|going to|gonna|plan to|planning to|decided to|ready to|thinking of|thinking about|about to|feel like|considering)\s+(?:kill myself|end my life|commit suicide|take my own life|end it all|die|die tonight|hang myself|shoot myself|swallow all my pills|slit my wrists|jump off)\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:i(?:'m| am)\s+(?:suicidal|going to kill myself|gonna end my life|ready to die tonight|done with living|about to commit suicide))\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:better off dead|wish i was dead|wish i were dead|no reason to live anymore|can'?t go on living|cannot go on living|i don'?t deserve to live)\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:goodbye\s+(?:cruel\s+)?world|leaving this world forever|this is my suicide note|suicide letter|suicide note|saying my final goodbyes?)\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:suicide\s+is\s+(?:my|the)\s+only\s+(?:way|choice|option|exit))\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:thinking\s+(?:about|of)|considering)\s+suicide\b/i,
  },
  {
    category: "suicide_intent",
    regex:
      /\b(?:i(?:'m| am)\s+(?:ending it|ending everything)\s+(?:today|tonight|now|soon))\b/i,
  },
  {
    category: "self_harm_active",
    regex:
      /\b(?:want to|wanna|going to|gonna|need to|about to|urge to)\s+(?:hurt myself|harm myself|cut myself|burn myself|injure myself)\b/i,
  },
  {
    category: "self_harm_active",
    regex:
      /\b(?:i(?:'m| am)\s+(?:hurting myself|cutting myself|harming myself)\s+(?:right now|again))\b/i,
  },
  {
    category: "immediate_danger_abuse",
    regex:
      /\b(?:in immediate danger|someone is hurting me right now|being abused right now|afraid for my life right now|not safe at home right now|someone is attacking me|being beaten right now|hitting me right now)\b/i,
  },
  {
    category: "third_party_immediate_risk",
    regex:
      /\b(?:my friend|my sibling|my brother|my sister|my classmate)\s+(?:is about to kill (?:himself|herself|themselves)|is going to kill (?:himself|herself|themselves)|has a weapon right now|is attempting suicide)\b/i,
  },
];

/**
 * ELEVATED RISK PATTERNS
 * Severe distress, helplessness, hopelessness without active immediate suicidal plan.
 */
const ELEVATED_PATTERNS: { category: string; regex: RegExp }[] = [
  {
    category: "distress_hopelessness",
    regex:
      /\b(?:can'?t take this anymore|cannot take this anymore|everything is falling apart|feel so completely hopeless|completely hopeless|i am a burden to everyone|everyone would be happier without me|trapped with no way out|feel like giving up on everything|can'?t handle anything anymore)\b/i,
  },
  {
    category: "distress_hopelessness",
    regex:
      /\b(?:having dark thoughts|thoughts of not wanting to wake up|wish i could just disappear forever|what if i just didn'?t exist|tired of being alive|hate being alive)\b/i,
  },
  {
    category: "distress_hopelessness",
    regex:
      /\b(?:nobody would care if i (?:was gone|disappeared)|worthless and unlovable|drowning in sadness|drowning in anxiety|completely empty and broken inside)\b/i,
  },
];

/**
 * Assesses the risk level of user input.
 * Layer 1 of the two-layer safety architecture.
 */
export function assessRisk(text: string): RiskAssessment {
  if (!text || typeof text !== "string") {
    return { level: "none" };
  }

  const normalized = normalizeText(text);

  // 1. Check benign idioms
  for (const idiom of BENIGN_IDIOMS) {
    if (idiom.test(text) || idiom.test(normalized)) {
      // If message is purely an idiom without other critical triggers, return none
      const textWithoutIdiom = text.replace(idiom, " ");
      const normalizedWithoutIdiom = normalized.replace(idiom, " ");
      if (
        !hasCriticalMatches(textWithoutIdiom) &&
        !hasCriticalMatches(normalizedWithoutIdiom)
      ) {
        return { level: "none" };
      }
    }
  }

  // 2. Check negation and academic/historical mentions
  for (const negation of NEGATION_AND_CONTEXT_PATTERNS) {
    if (negation.test(text) || negation.test(normalized)) {
      // Check if there are other unrelated explicit critical phrases
      const textWithoutNegation = text.replace(negation, " ");
      const normalizedWithoutNegation = normalized.replace(negation, " ");
      if (
        !hasCriticalMatches(textWithoutNegation) &&
        !hasCriticalMatches(normalizedWithoutNegation)
      ) {
        return { level: "none" };
      }
    }
  }

  // 3. Check Critical Risk
  for (const item of CRITICAL_PATTERNS) {
    if (item.regex.test(text) || item.regex.test(normalized)) {
      return {
        level: "critical",
        matchedCategory: item.category,
      };
    }
  }

  // 4. Check Elevated Risk
  for (const item of ELEVATED_PATTERNS) {
    if (item.regex.test(text) || item.regex.test(normalized)) {
      return {
        level: "elevated",
        matchedCategory: item.category,
      };
    }
  }

  return { level: "none" };
}

function hasCriticalMatches(str: string): boolean {
  for (const item of CRITICAL_PATTERNS) {
    if (item.regex.test(str)) {
      return true;
    }
  }
  return false;
}
