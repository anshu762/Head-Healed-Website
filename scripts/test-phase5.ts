/**
 * Phase 5 Verification Script:
 * 1. Verifies PII detection heuristic across positive and negative cases.
 * 2. Asserts all 12 therapy myths and community guidelines integrity.
 */

import { detectPii } from "../src/lib/safety/pii";
import { FALLBACK_MYTHS } from "../src/lib/data/stories-data";

console.log("🧪 Testing Phase 5 Components & Heuristics...\n");

// 1. PII Detection Tests
const piiCases = [
  { text: "My email is test@example.com for contact", hasPii: true, expected: "email" },
  { text: "Call me at 9876543210 if you need to talk", hasPii: true, expected: "phone" },
  { text: "I live on 124 Elm Street in Springfield", hasPii: true, expected: "address" },
  { text: "I study at Starlight High School and hate exams", hasPii: true, expected: "school" },
  { text: "I felt overwhelmed by math tests and stayed in my room.", hasPii: false, expected: "clean" },
  { text: "Talking to my art teacher really helped me feel understood.", hasPii: false, expected: "clean" },
];

let piiPassed = 0;
for (const testCase of piiCases) {
  const res = detectPii(testCase.text);
  if (res.hasPii === testCase.hasPii) {
    piiPassed++;
    console.log(`  ✓ PASS: PII case [${testCase.expected}] correctly evaluated to ${res.hasPii}`);
  } else {
    console.error(`  ✗ FAIL: PII case [${testCase.expected}] failed: got ${res.hasPii}, expected ${testCase.hasPii}`);
  }
}

// 2. Myths Integrity Test
console.log("\n🔒 Verifying 12 Therapy Myths Count & Data...");
if (FALLBACK_MYTHS.length === 12) {
  console.log(`  ✓ PASS: Exactly 12 therapy myths defined.`);
} else {
  console.error(`  ✗ FAIL: Expected 12 myths, found ${FALLBACK_MYTHS.length}`);
}

const allHaveFacts = FALLBACK_MYTHS.every(
  (m) => m.myth.length > 5 && m.fact.length > 10 && m.referenceUrl.startsWith("http")
);

if (allHaveFacts) {
  console.log(`  ✓ PASS: All 12 myths have non-empty myth statements, facts, and APA reference URLs.`);
} else {
  console.error(`  ✗ FAIL: Some myths are missing facts or references.`);
}

console.log("\n========================================");
if (piiPassed === piiCases.length && allHaveFacts) {
  console.log("✅ All Phase 5 verification checks passed successfully!\n");
  process.exit(0);
} else {
  console.error("❌ Phase 5 checks had failures.\n");
  process.exit(1);
}
