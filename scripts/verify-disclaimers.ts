import {
  GLOBAL_DISCLAIMER,
  ECHO_DISCLAIMER,
  EMERGENCY_DISCLAIMER,
  ECHO_CAROUSEL_SHORT,
  SUBMISSION_PRIVACY_NOTICE,
} from "../src/lib/safety/disclaimers";

const REQUIRED_DISCLAIMERS = {
  GLOBAL_DISCLAIMER:
    "Heard & Healed is a supportive and educational platform designed to help young people understand their emotions, reflect on what they are experiencing, and find helpful resources. It is not a substitute for therapy, counselling, medical care, diagnosis, or professional mental-health support.",
  ECHO_DISCLAIMER:
    "Echo is not a therapist or doctor. Echo cannot diagnose mental-health conditions or provide medical advice. Echo is designed to help you reflect, put your feelings into words, and explore supportive resources.",
  EMERGENCY_DISCLAIMER:
    "If you are in immediate danger, feel unable to keep yourself safe, or believe someone else may be at immediate risk, do not rely on this website or Echo. Please contact a trusted adult, qualified professional, local emergency service, or an appropriate helpline.",
  ECHO_CAROUSEL_SHORT:
    "Echo isn't a therapist or doctor. It can't diagnose or provide medical advice.",
  SUBMISSION_PRIVACY_NOTICE:
    "Please do not include phone numbers, home addresses, school details, passwords, or any information that could identify you or someone else.",
};

function verifyDisclaimers() {
  console.log("🔒 Verifying safety disclaimer constants integrity...");

  const actuals: Record<string, string> = {
    GLOBAL_DISCLAIMER,
    ECHO_DISCLAIMER,
    EMERGENCY_DISCLAIMER,
    ECHO_CAROUSEL_SHORT,
    SUBMISSION_PRIVACY_NOTICE,
  };

  let failed = false;

  for (const [key, expected] of Object.entries(REQUIRED_DISCLAIMERS)) {
    const actual = actuals[key];
    if (actual !== expected) {
      console.error(`❌ Disclaimer mismatch for ${key}!`);
      console.error(`Expected: "${expected}"`);
      console.error(`Actual:   "${actual}"`);
      failed = true;
    } else {
      console.log(`✅ ${key} matches exact legal/safety specification.`);
    }
  }

  if (failed) {
    console.error("\n❌ SAFETY CONTRACT VIOLATION: One or more disclaimers have been modified or corrupted.");
    process.exit(1);
  }

  console.log("\n✅ All safety disclaimers verified successfully.\n");
}

verifyDisclaimers();
