import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { db } from "@/lib/db";
import { assessRisk } from "@/lib/safety/risk";
import {
  openrouter,
  DEFAULT_ECHO_MODEL,
  ECHO_MODEL_SETTINGS,
} from "@/lib/ai/openrouter";
import {
  buildEchoSystemPrompt,
  CRISIS_RESPONSE_TEXT,
  CALM_FALLBACK_TEXT,
} from "@/lib/ai/echo-prompt";
import { DEFAULT_EMERGENCY_CONTACTS } from "@/components/emergency/emergency-provider";

// Rate limiting: 20 messages per 10 minutes per IP/session
interface RateLimitEntry {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_MESSAGES_PER_WINDOW = 20;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key) || { timestamps: [] };
  // Filter out timestamps outside window
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (entry.timestamps.length >= MAX_MESSAGES_PER_WINDOW) {
    return false;
  }

  entry.timestamps.push(now);
  rateLimitMap.set(key, entry);
  return true;
}

// Request Schema
const ChatRequestSchema = z.object({
  sessionId: z.string().optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1),
  emotionSlug: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Identify session and IP for rate limiting
    const cookieSessionId = req.cookies.get("hh_session_id")?.value;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimitKey = `${cookieSessionId || "anon"}:${ip}`;

    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        {
          error: "rate_limit",
          message:
            "You’ve sent quite a few messages in a short time. Echo is here to help you pause and reflect at a calm pace. Please take a gentle breather and try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    // 2. Validate input body
    const body = await req.json();
    const parseResult = ChatRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "invalid_input", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { messages, emotionSlug } = parseResult.data;
    const clientSessionId = parseResult.data.sessionId || cookieSessionId || crypto.randomUUID();

    // Cap history to last 12 messages
    const cappedMessages = messages.slice(-12);
    const latestUserMessage = cappedMessages
      .slice()
      .reverse()
      .find((m) => m.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "no_user_message", message: "A user message is required." },
        { status: 400 }
      );
    }

    // 3. LAYER 1: Server-side Risk Assessment
    const risk = assessRisk(latestUserMessage.content);

    // CRITICAL RISK: Model call is completely bypassed!
    if (risk.level === "critical") {
      // Asynchronously log to database without blocking response
      persistMessageAsync({
        sessionId: clientSessionId,
        userContent: latestUserMessage.content,
        assistantContent: CRISIS_RESPONSE_TEXT,
        riskFlagged: true,
        riskLevel: "HIGH",
      });

      // Fetch emergency contacts
      let contacts = DEFAULT_EMERGENCY_CONTACTS;
      try {
        const dbContacts = await db.emergencyContact.findMany({
          orderBy: { order: "asc" },
          take: 4,
        });
        if (dbContacts.length > 0) {
          contacts = dbContacts.map((c) => ({
            name: c.name,
            phone: c.phone,
            description: c.description,
            url: c.url,
            availableHours: c.availableHours,
            region: c.region,
          }));
        }
      } catch {
        // Fallback to default emergency contacts
      }

      const res = NextResponse.json(
        {
          escalate: true,
          level: "critical",
          message: CRISIS_RESPONSE_TEXT,
          contacts,
        },
        { status: 200 }
      );

      // Set anonymous session cookie if not present
      if (!cookieSessionId) {
        res.cookies.set("hh_session_id", clientSessionId, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }

      return res;
    }

    // ELEVATED OR NONE: Proceed with model streaming
    const isElevated = risk.level === "elevated";
    const systemPrompt = buildEchoSystemPrompt({
      emotionContext: emotionSlug,
      isElevatedRisk: isElevated,
    });

    // Check if OpenRouter API Key is available
    if (!process.env.OPENROUTER_API_KEY) {
      console.warn("⚠️ OPENROUTER_API_KEY not configured. Returning supportive fallback message.");
      const res = NextResponse.json(
        {
          fallback: true,
          level: isElevated ? "elevated" : "none",
          message: isElevated
            ? `${CALM_FALLBACK_TEXT}\n\nIf you're carrying something really heavy right now, please remember you can always open the Emergency Support button below to find free, confidential helplines.`
            : CALM_FALLBACK_TEXT,
        },
        { status: 200 }
      );
      if (!cookieSessionId) {
        res.cookies.set("hh_session_id", clientSessionId, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      return res;
    }

    // Call OpenRouter streamText via AI SDK
    const result = streamText({
      model: openrouter(DEFAULT_ECHO_MODEL),
      system: systemPrompt,
      messages: cappedMessages,
      temperature: ECHO_MODEL_SETTINGS.temperature,
      maxOutputTokens: ECHO_MODEL_SETTINGS.maxOutputTokens,
      onFinish: async ({ text }) => {
        // Persist session and messages asynchronously
        persistMessageAsync({
          sessionId: clientSessionId,
          userContent: latestUserMessage.content,
          assistantContent: text,
          riskFlagged: isElevated,
          riskLevel: isElevated ? "MEDIUM" : "NONE",
        });
      },
    });

    const response = result.toTextStreamResponse({
      headers: {
        "x-echo-risk": risk.level,
      },
    });

    if (!cookieSessionId) {
      response.headers.append(
        "Set-Cookie",
        `hh_session_id=${clientSessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
      );
    }

    return response;
  } catch (err: unknown) {
    console.error("Echo Route Handler error:", err);
    return NextResponse.json(
      {
        fallback: true,
        message: CALM_FALLBACK_TEXT,
      },
      { status: 200 }
    );
  }
}

interface PersistMessageParams {
  sessionId: string;
  userContent: string;
  assistantContent: string;
  riskFlagged: boolean;
  riskLevel: "NONE" | "LOW" | "MEDIUM" | "HIGH";
}

async function persistMessageAsync({
  sessionId,
  userContent,
  assistantContent,
  riskFlagged,
  riskLevel,
}: PersistMessageParams) {
  try {
    // Upsert anonymous chat session
    await db.chatSession.upsert({
      where: { id: sessionId },
      create: {
        id: sessionId,
        riskLevel,
      },
      update: {
        riskLevel,
        updatedAt: new Date(),
      },
    });

    // Save user message
    await db.chatMessage.create({
      data: {
        sessionId,
        role: "user",
        content: userContent,
        riskFlagged,
      },
    });

    // Save assistant message
    await db.chatMessage.create({
      data: {
        sessionId,
        role: "assistant",
        content: assistantContent,
        riskFlagged: false,
      },
    });
  } catch (err) {
    // Never fail the user's request if logging fails
    console.error("Failed to persist anonymous chat session:", err);
  }
}
