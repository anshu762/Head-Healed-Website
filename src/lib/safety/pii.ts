/**
 * Client and server utility for detecting Personally Identifiable Information (PII)
 * in youth story submissions.
 *
 * Checks for:
 * 1. Phone numbers (domestic & international patterns, 7-15 digits)
 * 2. Email addresses
 * 3. Street/Physical addresses
 * 4. School/Institution names
 */

export interface PiiCheckResult {
  hasPii: boolean;
  warnings: string[];
}

// Common patterns for identifying details
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;

// Catches phone numbers like: +1 555-123-4567, 9876543210, 080-12345678, (123) 456-7890
const PHONE_REGEX =
  /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}\b/;

// Catches common street address indicators
const ADDRESS_REGEX =
  /\b\d{1,5}\s+[A-Za-z0-9\s.,]{2,25}\s+(?:Street|St\.?|Avenue|Ave\.?|Road|Rd\.?|Lane|Ln\.?|Drive|Dr\.?|Boulevard|Blvd\.?|Court|Ct\.?|Sector\s+\d+|Block\s+[A-Za-z0-9]+|Apartment|Apt\.?|Flat\s+\d+)\b/i;

// Catches school names
const SCHOOL_REGEX =
  /\b(?:[A-Z][a-z0-9'-]+\s+){1,4}(?:High\s+School|Middle\s+School|Elementary\s+School|Public\s+School|Grammar\s+School|Secondary\s+School|Prep\s+School|Academy|Vidyalaya|Convent|College)\b/i;

export function detectPii(text: string): PiiCheckResult {
  const warnings: string[] = [];

  if (EMAIL_REGEX.test(text)) {
    warnings.push("an email address");
  }

  // Filter out simple small numbers that are obviously not phone numbers
  const phoneMatch = text.match(PHONE_REGEX);
  if (phoneMatch) {
    const digitsOnly = phoneMatch[0].replace(/\D/g, "");
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
      warnings.push("a phone number");
    }
  }

  if (ADDRESS_REGEX.test(text)) {
    warnings.push("a street or home address");
  }

  if (SCHOOL_REGEX.test(text)) {
    warnings.push("a specific school or academy name");
  }

  return {
    hasPii: warnings.length > 0,
    warnings,
  };
}
