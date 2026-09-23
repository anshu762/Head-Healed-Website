"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/app/actions/contact-action";
import { Send, CheckCircle2, Loader2, Mail } from "lucide-react";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("General Feedback");
  const [message, setMessage] = React.useState("");
  const [hpField, setHpField] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (message.trim().length < 10) {
      setErrorMessage("Please enter a message of at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitContactMessage({
        name: name || undefined,
        email,
        subject,
        message,
        hp_field: hpField,
      });

      if (!res.success) {
        setErrorMessage(res.message || "An error occurred.");
        setIsSubmitting(false);
        return;
      }

      setSubmittedSuccess(true);
      setIsSubmitting(false);
    } catch {
      setErrorMessage("Unable to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="rounded-[24px] border border-hh-line bg-white p-8 text-center space-y-4 shadow-warm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-hh-sage/20 text-hh-sage-deep">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl font-bold text-hh-ink">
          Message Sent Successfully
        </h3>
        <p className="text-sm text-hh-ink-soft max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to us. We will review your message and reply
          as soon as possible.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSubmittedSuccess(false);
            setMessage("");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-5"
    >
      {errorMessage && (
        <div className="rounded-xl border border-hh-coral/40 bg-hh-coral/10 p-3.5 text-xs font-semibold text-hh-ink">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this</label>
        <input
          id="hp_field"
          type="text"
          value={hpField}
          onChange={(e) => setHpField(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold text-hh-ink mb-1.5"
          >
            Your Name <span className="font-normal text-hh-ink-soft">(Optional)</span>
          </label>
          <Input
            id="contact-name"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold text-hh-ink mb-1.5"
          >
            Email Address <span className="text-hh-coral">*</span>
          </label>
          <Input
            id="contact-email"
            type="email"
            placeholder="your-email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-xs font-bold text-hh-ink mb-1.5"
        >
          Reason for Contact <span className="text-hh-coral">*</span>
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSubmitting}
          className="flex h-11 w-full rounded-xl border border-hh-line bg-white px-4 py-2 text-sm text-hh-ink transition-colors focus:outline-none focus:border-hh-blue-deep focus:ring-2 focus:ring-hh-blue-deep/20"
        >
          <option value="General Feedback">General Feedback &amp; Suggestions</option>
          <option value="Story Takedown Request">Story Takedown / Deletion Request</option>
          <option value="Report Content">Report Content or Safety Concern</option>
          <option value="Question about Heard & Healed">Question about Heard &amp; Healed</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <label
            htmlFor="contact-message"
            className="font-bold text-hh-ink"
          >
            Message <span className="text-hh-coral">*</span>
          </label>
          <span className="text-hh-ink-soft">
            {message.length} / 2,000 characters
          </span>
        </div>
        <Textarea
          id="contact-message"
          placeholder="How can we help or what thoughts would you like to share?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
          rows={6}
          maxLength={2000}
          required
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || message.trim().length < 10}
          className="w-full sm:w-auto min-w-[140px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" /> Send Message
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
