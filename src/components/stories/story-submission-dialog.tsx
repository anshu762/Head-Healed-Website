"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SUBMISSION_PRIVACY_NOTICE } from "@/lib/safety/disclaimers";
import { detectPii, type PiiCheckResult } from "@/lib/safety/pii";
import { submitStory } from "@/app/actions/submit-story";
import { useEmergency } from "@/components/emergency/emergency-provider";
import {
  Lock,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { EmotionOption } from "@/lib/data/stories-data";

interface StorySubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  emotions: EmotionOption[];
}

export function StorySubmissionDialog({
  isOpen,
  onClose,
  emotions,
}: StorySubmissionDialogProps) {
  const { openEmergency } = useEmergency();

  // Form states
  const [title, setTitle] = React.useState("");
  const [story, setStory] = React.useState("");
  const [emotionSlug, setEmotionSlug] = React.useState("");
  const [authorName, setAuthorName] = React.useState("Anonymous");
  const [agreedToGuidelines, setAgreedToGuidelines] = React.useState(false);

  // Submission & PII states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [piiWarning, setPiiWarning] = React.useState<PiiCheckResult | null>(null);
  const [confirmedPii, setConfirmedPii] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = React.useState(false);

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setStory("");
      setEmotionSlug("");
      setAuthorName("Anonymous");
      setAgreedToGuidelines(false);
      setIsSubmitting(false);
      setPiiWarning(null);
      setConfirmedPii(false);
      setErrorMessage(null);
      setSubmittedSuccess(false);
    }
  }, [isOpen]);

  const charCount = story.length;
  const isTooShort = charCount < 100;
  const isTooLong = charCount > 2500;
  const isValidLength = !isTooShort && !isTooLong;
  const canSubmit = isValidLength && agreedToGuidelines && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Check PII first if not already confirmed
    if (!confirmedPii) {
      const pii = detectPii(story + " " + title);
      if (pii.hasPii) {
        setPiiWarning(pii);
        return;
      }
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitStory({
        title: title || undefined,
        content: story,
        emotionSlug: emotionSlug || undefined,
        authorName: authorName || "Anonymous",
        agreedToGuidelines: true,
      });

      if (!res.success) {
        setErrorMessage(res.message || "An error occurred.");
        setIsSubmitting(false);
        return;
      }

      if (res.escalate) {
        // Critical safety escalation: Close dialog and trigger emergency modal
        onClose();
        openEmergency();
        return;
      }

      // Normal submission succeeded
      setSubmittedSuccess(true);
      setIsSubmitting(false);
    } catch {
      setErrorMessage("Unable to submit right now. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh]">
        {submittedSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hh-sage/25 text-hh-sage-deep">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-hh-ink">
              Thank you for sharing your story
            </DialogTitle>
            <p className="text-sm text-hh-ink-soft leading-relaxed max-w-md mx-auto">
              Every voice matters. To protect our community, every story is
              reviewed with care by our team before appearing publicly.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose}>
                Back to stories
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs font-semibold text-hh-blue-deep uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Safe Community Space</span>
              </div>
              <DialogTitle>Share Your Experience</DialogTitle>
              <DialogDescription>
                Your words can help someone else feel less alone. Take your time,
                share at your own pace, and stay as anonymous as you like.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              {/* Error Message banner */}
              {errorMessage && (
                <div className="rounded-xl border border-hh-coral/40 bg-hh-coral/10 p-3 text-xs font-medium text-hh-ink">
                  {errorMessage}
                </div>
              )}

              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="story-title"
                    className="block text-xs font-bold text-hh-ink mb-1.5"
                  >
                    Title <span className="font-normal text-hh-ink-soft">(Optional)</span>
                  </label>
                  <Input
                    id="story-title"
                    placeholder="e.g. Learning to exhale during exams"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="story-author"
                    className="block text-xs font-bold text-hh-ink mb-1.5"
                  >
                    Display Name <span className="font-normal text-hh-ink-soft">(Default: Anonymous)</span>
                  </label>
                  <Input
                    id="story-author"
                    placeholder="Anonymous (Age 16)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    maxLength={50}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Emotion Selector */}
              <div>
                <label
                  htmlFor="story-emotion"
                  className="block text-xs font-bold text-hh-ink mb-1.5"
                >
                  Primary Emotion / Experience{" "}
                  <span className="font-normal text-hh-ink-soft">(Optional)</span>
                </label>
                <select
                  id="story-emotion"
                  value={emotionSlug}
                  onChange={(e) => setEmotionSlug(e.target.value)}
                  disabled={isSubmitting}
                  className="flex h-11 w-full rounded-xl border border-hh-line bg-white px-4 py-2 text-sm text-hh-ink transition-colors focus:outline-none focus:border-hh-blue-deep focus:ring-2 focus:ring-hh-blue-deep/20"
                >
                  <option value="">Select a related emotion (or leave blank)</option>
                  {emotions.map((em) => (
                    <option key={em.slug} value={em.slug}>
                      {em.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* NON-NEGOTIABLE PRIVACY NOTICE: Rendered above textarea in a prominent tinted card */}
              <div className="rounded-2xl border border-hh-blue/30 bg-hh-blue/10 p-3.5 sm:p-4 text-xs leading-relaxed text-hh-ink">
                <div className="flex items-start gap-2.5">
                  <Lock className="h-4 w-4 shrink-0 text-hh-blue-deep mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-bold text-hh-blue-deep block mb-0.5">
                      Privacy Notice
                    </span>
                    <p className="text-hh-ink-soft">{SUBMISSION_PRIVACY_NOTICE}</p>
                  </div>
                </div>
              </div>

              {/* PII Detection Warning Box (if triggered) */}
              {piiWarning && !confirmedPii && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-800">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Possible identifying detail detected</span>
                  </div>
                  <p>
                    Your story appears to mention {piiWarning.warnings.join(" and ")}.
                    For your safety, we strongly recommend keeping stories completely anonymous.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setPiiWarning(null)}
                      className="px-3 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors"
                    >
                      Edit my story
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmedPii(true);
                        setPiiWarning(null);
                      }}
                      className="px-3 py-1.5 rounded-full bg-amber-200 text-xs font-semibold hover:bg-amber-300 transition-colors"
                    >
                      I’ve checked, submit anyway
                    </button>
                  </div>
                </div>
              )}

              {/* Story Textarea with live character counter */}
              <div>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <label htmlFor="story-content" className="font-bold text-hh-ink">
                    Your Story / Reflections <span className="text-hh-coral">*</span>
                  </label>
                  <span
                    className={
                      isTooShort
                        ? "text-hh-ink-soft"
                        : isTooLong
                        ? "font-semibold text-hh-coral"
                        : "font-semibold text-hh-sage-deep"
                    }
                  >
                    {charCount} / 2,500 characters{" "}
                    {isTooShort && "(min. 100)"}
                  </span>
                </div>
                <Textarea
                  id="story-content"
                  placeholder="What have you been experiencing? What did it feel like, and what helped you through it?"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={7}
                  disabled={isSubmitting}
                />
              </div>

              {/* Required Community Guidelines Checkbox */}
              <div className="flex items-start gap-3 rounded-xl border border-hh-line bg-hh-cream/50 p-3.5">
                <Checkbox
                  id="guidelines-check"
                  checked={agreedToGuidelines}
                  onCheckedChange={(checked) =>
                    setAgreedToGuidelines(checked === true)
                  }
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="guidelines-check"
                  className="text-xs leading-relaxed text-hh-ink cursor-pointer select-none"
                >
                  I have read and agree to the{" "}
                  <Link
                    href="/community-guidelines"
                    target="_blank"
                    className="font-bold text-hh-blue-deep underline hover:text-hh-ink transition-colors"
                  >
                    Community Guidelines
                  </Link>
                  . I understand my story will be reviewed by moderation before publication.
                </label>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-hh-line">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canSubmit}
                  className="min-w-[140px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <HeartHandshake className="h-4 w-4" /> Share Story
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
