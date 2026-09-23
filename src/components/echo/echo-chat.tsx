"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  ArrowDown,
  Phone,
  HeartHandshake,
} from "lucide-react";
import { useEmergency } from "@/components/emergency/emergency-provider";
import { EchoDisclaimerGate } from "@/components/echo/echo-disclaimer-gate";
import { ResourceChipLinker } from "@/components/echo/resource-chip-linker";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isCrisis?: boolean;
  isElevated?: boolean;
}

interface EchoChatProps {
  initialEmotionSlug?: string;
  initialEmotionTitle?: string;
}

const DEFAULT_STARTER_CHIPS = [
  "I don't know what I'm feeling",
  "I've been really tired lately",
  "Everything feels like too much",
  "I feel left out",
];

export function EchoChat({
  initialEmotionSlug,
  initialEmotionTitle,
}: EchoChatProps) {
  const { openEmergency } = useEmergency();

  // Disclaimer acceptance gate
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);
  useEffect(() => {
    const accepted = sessionStorage.getItem("hh_echo_disclaimer_accepted");
    if (accepted === "true") {
      setIsDisclaimerAccepted(true);
    }
  }, []);

  const handleAcknowledgeDisclaimer = () => {
    sessionStorage.setItem("hh_echo_disclaimer_accepted", "true");
    setIsDisclaimerAccepted(true);
  };

  // Chat state
  const [sessionId, setSessionId] = useState<string>("");
  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComposerPaused, setIsComposerPaused] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Auto-scroll and scroll-to-bottom pill
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [messages, isLoading, scrollToBottom]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsScrolledUp(distanceFromBottom > 120);
  };

  // Initial welcome message from Echo
  useEffect(() => {
    if (messages.length === 0) {
      let initialGreeting =
        "Hi, I'm Echo. 🌱 I'm here to help you put your feelings into words, explore what's going on, and find something that might help.";

      if (initialEmotionTitle) {
        initialGreeting += `\n\nI see you were looking into ${initialEmotionTitle}. Would you like to talk about what's been coming up for you, or something else entirely?`;
      }

      setMessages([
        {
          id: "welcome-msg",
          role: "assistant",
          content: initialGreeting,
        },
      ]);
    }
  }, [initialEmotionTitle, messages.length]);

  // Sending message logic
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading || isComposerPaused || !isDisclaimerAccepted) return;

    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      { id: userMsgId, role: "user", content: text },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          emotionSlug: initialEmotionSlug,
        }),
      });

      // Handle Critical Escalation (JSON response)
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();

        if (data.escalate && data.level === "critical") {
          // 1. Force-open emergency modal
          openEmergency();

          // 2. Render crisis message
          setMessages((prev) => [
            ...prev,
            {
              id: `crisis-${Date.now()}`,
              role: "assistant",
              content: data.message,
              isCrisis: true,
            },
          ]);

          // 3. Pause composer for 3 seconds
          setIsComposerPaused(true);
          setTimeout(() => {
            setIsComposerPaused(false);
          }, 3000);

          setIsLoading(false);
          return;
        }

        // Handle Fallback or Rate Limit
        if (data.fallback || data.error) {
          setMessages((prev) => [
            ...prev,
            {
              id: `fallback-${Date.now()}`,
              role: "assistant",
              content: data.message,
            },
          ]);
          setIsLoading(false);
          return;
        }
      }

      // Check risk header for elevated support card
      const riskHeader = response.headers.get("x-echo-risk");
      const isElevated = riskHeader === "elevated";

      // Stream text from response
      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = "";
      const assistantMsgId = `echo-${Date.now()}`;

      // Insert empty assistant bubble to receive tokens
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          isElevated,
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantReply += chunk;

        // Parse AI SDK stream format if formatted as data stream
        // Standard data streams prefix with 0:"text"\n
        const parsedText = parseAiSdkStreamChunk(assistantReply);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: parsedText } : msg
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I'm having a little trouble connecting right now, but your feelings matter. Take a slow breath, and remember that you can always explore our grounding guides or talk to a trusted adult.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Conversation cleared. Hi, I'm Echo 🌱. What's on your mind today?",
      },
    ]);
    setSessionId(crypto.randomUUID());
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Disclaimer Gate (Expanded Card if unaccepted, cycling strip if accepted) */}
      <EchoDisclaimerGate
        isAcknowledged={isDisclaimerAccepted}
        onAcknowledge={handleAcknowledgeDisclaimer}
      />

      {/* Main Chat Container */}
      <div className="relative flex flex-col h-[650px] sm:h-[700px] rounded-[28px] border border-[var(--hh-line)] bg-white shadow-[0_12px_40px_rgba(59,59,59,0.06)] overflow-hidden">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--hh-line)] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#DFEFE4] text-[#477053] shadow-2xs font-bold text-sm">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[var(--hh-ink)] text-base">
                  Echo
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DFEFE4] px-2.5 py-0.5 text-[10px] font-bold text-[#477053]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#477053] animate-pulse" />
                  <span>Reflective AI</span>
                </span>
              </div>
              <span className="text-xs text-[var(--hh-ink-soft)]">
                Educational emotional reflection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--hh-ink-soft)] hover:text-[var(--hh-ink)] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue)] transition-colors"
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Clear Confirmation Banner */}
        {showClearConfirm && (
          <div className="px-6 py-3 bg-[#FFFBF8] border-b border-[#FADCD5] flex items-center justify-between text-xs text-[var(--hh-ink)]">
            <span>Are you sure you want to clear this conversation?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearConversation}
                className="px-3 py-1 rounded-full bg-[var(--hh-coral)] text-white font-bold hover:bg-[#D66B57]"
              >
                Yes, clear
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 rounded-full bg-white border border-[var(--hh-line)] font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Message Thread Area */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF7F2]/40"
          role="log"
          aria-live="polite"
          aria-label="Echo conversation history"
        >
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex items-start gap-2.5 max-w-[85%] sm:max-w-[78%] ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DFEFE4] text-[#477053] text-xs font-bold mt-1 shadow-2xs">
                      🌱
                    </div>
                  )}

                  <div
                    className={`rounded-3xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed shadow-2xs ${
                      isUser
                        ? "rounded-tr-xs bg-[var(--hh-blue)] text-white"
                        : msg.isCrisis
                        ? "rounded-tl-xs bg-[#FFF5F2] border border-[#FADCD5] text-[var(--hh-ink)]"
                        : "rounded-tl-xs bg-white border border-[var(--hh-line)] text-[var(--hh-ink)]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Emotion Guide Linker */}
                    {!isUser && !msg.isCrisis && (
                      <ResourceChipLinker content={msg.content} />
                    )}
                  </div>
                </div>

                {/* Inline Support Card for Elevated Risk */}
                {!isUser && msg.isElevated && (
                  <div className="mt-3 ml-10 p-4 rounded-2xl bg-[#FFFBF8] border border-[#FADCD5] max-w-[85%] sm:max-w-[78%] space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#C24E39]">
                      <HeartHandshake className="w-4 h-4 text-[var(--hh-coral)]" />
                      <span>Support is available right now</span>
                    </div>
                    <p className="text-[var(--hh-ink-soft)] leading-normal">
                      When things feel heavy, sharing with a trusted adult, family member, or school counsellor can help lighten the load. Free 24/7 helplines are also here whenever you need someone to listen.
                    </p>
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={openEmergency}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--hh-coral)] text-white font-semibold hover:bg-[#D66B57] transition-colors shadow-2xs"
                      >
                        <Phone className="w-3 h-3" />
                        <span>View Helplines</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2.5 pl-10">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 border border-[var(--hh-line)] shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hh-ink-soft)] animate-bounce" />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--hh-ink-soft)] animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--hh-ink-soft)] animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <span className="text-xs text-[var(--hh-ink-soft)] italic">
                Echo is reflecting...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Jump To Latest Floating Button */}
        {isScrolledUp && (
          <button
            type="button"
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--hh-ink)] text-white text-xs font-semibold shadow-md hover:bg-black transition-all"
            aria-label="Jump to latest messages"
          >
            <span>Jump to latest</span>
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}

        {/* Starter Chips (Only visible when conversation is fresh) */}
        {messages.length <= 1 && isDisclaimerAccepted && (
          <div className="px-5 py-3 bg-white/70 border-t border-[var(--hh-line)] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-semibold text-[var(--hh-ink-soft)] shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--hh-blue-deep)]" />
              <span>Ideas:</span>
            </span>

            {initialEmotionTitle && (
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(`I'd like to explore my feelings around ${initialEmotionTitle}`)
                }
                className="shrink-0 px-3 py-1.5 rounded-full bg-[#EBF3F9] text-[var(--hh-blue-deep)] border border-[#D1E3F0] text-xs font-semibold hover:bg-[#DDEBF5] transition-colors"
              >
                Explore {initialEmotionTitle}
              </button>
            )}

            {DEFAULT_STARTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white text-[var(--hh-ink)] border border-[var(--hh-line)] text-xs font-medium hover:border-[var(--hh-blue)] hover:text-[var(--hh-blue-deep)] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Composer Area */}
        <div className="p-4 sm:p-5 border-t border-[var(--hh-line)] bg-white space-y-3">
          {/* Paused Composer Banner (during crisis escalation) */}
          {isComposerPaused ? (
            <div className="py-3 px-4 rounded-2xl bg-[#FFF6F3] border border-[#FADCD5] text-xs text-[#C24E39] font-semibold text-center flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[var(--hh-coral)] animate-pulse" />
              <span>Pausing briefly to prioritize your safety and connect you with help...</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center gap-2"
            >
              <label htmlFor="echo-chat-input" className="sr-only">
                Type your reflection or message to Echo
              </label>

              <textarea
                id="echo-chat-input"
                rows={1}
                value={input}
                disabled={!isDisclaimerAccepted || isLoading || isComposerPaused}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                maxLength={2000}
                placeholder={
                  !isDisclaimerAccepted
                    ? "Please accept the safety notice above to start chatting..."
                    : "Put your thoughts into words here... (Enter to send)"
                }
                className="w-full resize-none rounded-2xl bg-[var(--hh-cream)]/70 px-4 py-3 pr-14 text-sm sm:text-base text-[var(--hh-ink)] placeholder:text-[var(--hh-ink-soft)] border border-[var(--hh-line)] focus:outline-none focus:ring-2 focus:ring-[var(--hh-blue)] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() ||
                  isLoading ||
                  isComposerPaused ||
                  !isDisclaimerAccepted
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--hh-blue-deep)] text-white hover:bg-[var(--hh-blue)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] transition-colors shadow-2xs"
                aria-label="Send message to Echo"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}

          {/* Under-composer safety strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--hh-ink-soft)] pt-1">
            <span>
              Echo may suggest resources. It can&apos;t diagnose or give medical advice.
            </span>

            <button
              type="button"
              onClick={openEmergency}
              className="inline-flex items-center gap-1 font-semibold text-[var(--hh-coral)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--hh-coral)]"
            >
              <ShieldAlert className="w-3 h-3 text-[var(--hh-coral)]" />
              <span>Need immediate help? Open 24/7 Helplines</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Parses raw AI SDK data stream chunks or returns raw text if standard stream.
 */
function parseAiSdkStreamChunk(raw: string): string {
  if (!raw) return "";

  // If text starts with AI SDK data stream protocol (e.g., 0:"...")
  if (/^0:"/.test(raw) || /\n0:"/.test(raw)) {
    const lines = raw.split("\n");
    let accumulated = "";
    for (const line of lines) {
      if (line.startsWith('0:"')) {
        try {
          const str = JSON.parse(line.slice(2));
          accumulated += str;
        } catch {
          // Ignore parse errors on incomplete stream chunks
        }
      }
    }
    return accumulated || raw;
  }

  return raw;
}
