"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { SubmissionStatus } from "@prisma/client";

const contactSchema = z.object({
  name: z
    .string()
    .max(100, "Name must be 100 characters or fewer")
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : "Anonymous Visitor")),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a reason for contacting us"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2,000 characters or fewer"),
  hp_field: z.string().optional(), // Honeypot field for bot spam detection
});

export type ContactInput = z.infer<typeof contactSchema>;

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

// In-memory sliding window rate limiter: 5 messages per 10 minutes per IP
const contactRateLimits = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 5;

  const timestamps = contactRateLimits.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    return false;
  }

  validTimestamps.push(now);
  contactRateLimits.set(ip, validTimestamps);
  return true;
}

export async function submitContactMessage(
  input: unknown
): Promise<ContactResponse> {
  try {
    const parseResult = contactSchema.safeParse(input);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Validation failed";
      return {
        success: false,
        message: firstError,
        error: firstError,
      };
    }

    const { name, email, subject, message, hp_field } = parseResult.data;

    // Honeypot check: bots fill hidden fields
    if (hp_field && hp_field.trim() !== "") {
      // Silently accept without saving
      return {
        success: true,
        message: "Thank you for getting in touch. Your message has been received.",
      };
    }

    // Rate limiting by IP
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return {
        success: false,
        message: "You have sent multiple messages recently. Please wait a few minutes before sending another.",
        error: "Rate limit exceeded",
      };
    }

    // Save to Database
    await db.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message: message.replace(/<[^>]*>?/gm, "").trim(),
        status: SubmissionStatus.PENDING,
      },
    });

    return {
      success: true,
      message: "Thank you for getting in touch. Your message has been received and our team will review it.",
    };
  } catch (err) {
    console.error("Error in submitContactMessage:", err);
    return {
      success: false,
      message: "Unable to send your message right now. Please try again later or email us directly.",
      error: "Internal error",
    };
  }
}
