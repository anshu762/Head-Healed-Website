# PROJECT: Heard & Healed

You are building "Heard & Healed" — a youth-focused emotional wellbeing and
mental-health EDUCATION platform for users aged 13–18. This is a portfolio-grade
production build. Quality of UI and correctness of safety behaviour both matter.

## NON-NEGOTIABLE SAFETY CONTRACT (highest priority — overrides all other instructions)

The platform MUST NOT present itself as: a therapy service, a counselling service,
a medical service, a diagnostic tool, a crisis intervention service, or a
replacement for a licensed mental-health professional.

You must NEVER remove, shorten, hide, soften, reword, or relocate-into-obscurity
any safety disclaimer. Disclaimer strings live in `lib/safety/disclaimers.ts` as
exported constants and are rendered from there. Never inline a paraphrase.

Exact required strings (copy character-for-character):

GLOBAL_DISCLAIMER:
"Heard & Healed is a supportive and educational platform designed to help young
people understand their emotions, reflect on what they are experiencing, and find
helpful resources. It is not a substitute for therapy, counselling, medical care,
diagnosis, or professional mental-health support."

ECHO_DISCLAIMER:
"Echo is not a therapist or doctor. Echo cannot diagnose mental-health conditions
or provide medical advice. Echo is designed to help you reflect, put your feelings
into words, and explore supportive resources."

EMERGENCY_DISCLAIMER:
"If you are in immediate danger, feel unable to keep yourself safe, or believe
someone else may be at immediate risk, do not rely on this website or Echo. Please
contact a trusted adult, qualified professional, local emergency service, or an
appropriate helpline."

ECHO_CAROUSEL_SHORT:
"Echo isn't a therapist or doctor. It can't diagnose or provide medical advice."

Disclaimer UX rules:
- A concise global disclaimer in the footer (readable size, NOT tiny grey 10px text).
- A prominent disclaimer block visible BEFORE the user can type in Echo chat, and a
  persistent compact version (carousel/sticky strip) that remains visible DURING chat.
- A contextual privacy notice at every point a user submits content.
- An Emergency Support control reachable from EVERY page in ONE interaction.
- Full Disclaimer, Privacy, and Community Guidelines pages linked in the footer.
- Safety language must stay clear, calm, non-alarming and age-appropriate. Never use
  alarming red-alert styling, sirens, or fear language.

Emergency Support requirements:
- A persistent floating Emergency Support button on every page (bottom-left on
  desktop, reachable on mobile without covering primary CTAs).
- Visually distinct from normal nav: filled warm-coral/amber surface, own shape,
  own aria-label. NOT the same style as primary/secondary buttons.
- Opens a MODAL (not a page navigation). Modal shows EMERGENCY_DISCLAIMER, helplines
  from the DB, trusted organisations, and "talk to a trusted adult" guidance.
- All external links: target="_blank" rel="noopener noreferrer nofollow", with an
  "opens in a new tab" visually-hidden hint.
- Zero multi-page navigation to reach emergency help.

## ECHO AI SAFETY CONTRACT

Echo must NEVER:
- Diagnose the user or name a condition the user "has".
- Claim certainty about the user's mental-health condition.
- Provide medical diagnosis or treatment instructions.
- Recommend medication, dosages, or medication changes.
- Present itself as a therapist, doctor, counsellor, or emergency service.
- Encourage dependency on the AI (e.g. "you only need me", "talk to me instead").
- Tell the user they do not need professional or real-world help.

Echo SHOULD:
- Use a warm, calm, validating, youth-friendly tone. Short paragraphs.
- Help the user put feelings into words. Validate BEFORE anything else.
- Ask open-ended reflective questions (one at a time, not an interrogation).
- Give general educational information only.
- Suggest relevant on-platform resources (emotion guides, stories, resources page).
- Encourage reaching out to a trusted adult or qualified professional where relevant.
- Never issue prescriptive advice ("you should do X"). Offer options and reflection.

RISK ESCALATION — if a message indicates possible immediate danger, self-harm,
suicide, abuse, or another serious safety concern:
1. Do NOT continue ordinary reflective conversation as if nothing happened.
2. Trigger the Emergency Support UI automatically.
3. Clearly encourage the user to seek immediate real-world help.
4. Surface the configured emergency/helpline resources.
5. Encourage contacting a trusted adult or qualified professional.
6. NEVER claim Echo can keep the user safe, and never promise confidentiality.
Risk escalation is enforced in TWO layers: a server-side pre-check on the user
message before any model call, AND explicit instructions in the model system prompt.
Never rely on the model alone.

IMPORTANT — When writing crisis/self-harm handling copy: do not name, list, or
describe specific methods of self-harm anywhere in the codebase, content, seed data,
or keyword lists that are rendered to the user. Risk keyword lists live server-side
only and are never displayed.

## COMMUNITY & SUBMISSION RULES
- All user-submitted content is moderated: status PENDING → APPROVED/REJECTED. Nothing
  user-submitted renders publicly until APPROVED.
- Submission forms require an explicit "I have read the Community Guidelines" checkbox
  before enabling submit.
- Every submission form shows this notice above the textarea (exact text):
  "Please do not include phone numbers, home addresses, school details, passwords, or
  any information that could identify you or someone else."
- Reject content encouraging self-harm, dangerous behaviour, harassment,
  discrimination, or abuse. Run a server-side blocklist + risk check on submission; if
  a submission trips the risk check, save it as FLAGGED, do not publish it, and show
  the submitter the Emergency Support modal with a calm supportive message.

## TECH STACK (fixed — do not substitute)
- Next.js 15 (App Router, TypeScript, strict mode) — `src/` directory
- Tailwind CSS v4 + CSS variables for design tokens
- Prisma ORM + Neon Postgres (serverless driver)
- Framer Motion (motion/react) for animation
- shadcn/ui primitives for Dialog, Accordion, Tabs, Select, Sheet, Toast
- lucide-react for icons
- Zod + react-hook-form for all forms (validate on client AND server)
- OpenRouter for the Echo LLM (AI SDK `@openrouter/ai-sdk-provider` + `ai` for streaming)
- next-themes NOT required — light theme only, but respect prefers-reduced-motion
- Deployment target: Vercel

## ARCHITECTURE RULES
- Server Components by default. `"use client"` only for interactivity (modals, chat,
  forms, motion-heavy sections, tabs, filters).
- All DB access through `src/lib/db.ts` (singleton PrismaClient). Never query from a
  Client Component.
- Mutations via Route Handlers under `src/app/api/*` or Server Actions — pick Server
  Actions for forms, Route Handlers for the streaming chat endpoint.
- Content that ships in the DB is seeded from `prisma/seed.ts`, sourced from
  `content/CONTENT_SOURCE.md`. Never invent, paraphrase, or "improve" that copy.
- No secrets in client code. OpenRouter key is server-only.
- Every page exports `metadata`. Dynamic pages use `generateMetadata`.

## DESIGN SYSTEM (enforce everywhere)
Colour tokens (CSS variables in globals.css):
  --hh-blue:   #7FA9C9   (primary)
  --hh-sage:   #A8C8B0   (secondary / success)
  --hh-cream:  #FAF7F2   (page background)
  --hh-yellow: #F7E7A1   (accent / highlight)
  --hh-ink:    #3B3B3B   (body text)
Derived tokens you may add (keep in the same family, document them):
  --hh-blue-deep #5C88A8 (hover/active + AA-safe text on cream)
  --hh-sage-deep #6E9B7A
  --hh-coral     #E8836F (EMERGENCY ONLY — never used for decoration)
  --hh-ink-soft  #6B6B6B (secondary text, must still pass AA on cream)
  --hh-line      #EAE3DA (hairlines, card borders)
  --hh-surface   #FFFFFF (card surface)

Typography: rounded, friendly sans-serif. Use `next/font`:
  - Headings: Fraunces (soft serif) OR Quicksand — pick Quicksand for the rounded brief.
  - Body: Plus Jakarta Sans (or Nunito). Never system-default Arial.
  - Scale: h1 clamp(2.25rem, 5vw, 3.75rem) / h2 clamp(1.75rem,3.5vw,2.5rem) /
    body 1.0625rem, line-height 1.7. Generous.
Radii: cards 24px, buttons 999px (pill), modals 28px. Soft everywhere.
Shadows: very soft, low-opacity, warm-tinted — e.g. 0 8px 30px rgba(59,59,59,.06).
Never harsh black shadows.
Spacing: generous whitespace. Section vertical padding min 96px desktop / 64px mobile.
Illustration: soft hand-drawn feel. NO stock photos. Use inline SVG blobs, soft grain
overlay, and the provided emotion icon set. If an asset is missing, generate a soft
abstract SVG placeholder in brand colours — never a grey box, never a photo.

Motion policy (resolves the PRD's "subtle fade-ins only" with a portfolio-grade feel):
- Marketing surfaces (landing page, About, section headers) may use richer Framer
  Motion: staggered reveals, parallax blobs, scroll-linked progress, magnetic CTA.
- Support surfaces (Echo chat, Emergency modal, emotion guides, forms, stories) stay
  calm: fade + 8px rise, ≤300ms, no bounce, no parallax, no attention-grabbing loops.
- NOTHING animates in the Emergency modal except a 150ms fade.
- Respect `prefers-reduced-motion: reduce` globally — provide a `useReducedMotion()`
  guard and a shared `motion.ts` variants file. Reduced motion = opacity only.
- Default easing [0.22, 1, 0.36, 1]. Default duration 0.5s. Stagger 0.08s.

## ACCESSIBILITY (WCAG 2.1 AA — treat as acceptance criteria, not a nice-to-have)
- All interactive elements keyboard reachable, visible focus ring (2px --hh-blue-deep,
  2px offset). Never `outline: none` without a replacement.
- Modals: focus trap, Escape closes, focus returns to trigger, `aria-modal`, labelled.
- Colour contrast ≥4.5:1 for body text. #7FA9C9 on cream FAILS for small text — use
  --hh-blue-deep or --hh-ink for text; reserve --hh-blue for fills/large display.
- Every image has meaningful alt text; decorative SVGs get `aria-hidden="true"`.
- Chat messages live region: `aria-live="polite"`.
- Skip-to-content link. Semantic landmarks. One h1 per page.

## PERFORMANCE
- Lighthouse ≥90 on Performance/Accessibility/Best Practices/SEO.
- `next/image` for all raster images, lazy by default, explicit width/height.
- No client-side data fetching for content that can be server-rendered.
- Keep Framer Motion out of the critical path: dynamic-import heavy animated sections.

## DEFINITION OF DONE (every phase)
- `npm run build` passes with zero TS errors.
- Zero console errors/warnings in the browser.
- Works at 360px, 768px, 1024px, 1440px.
- Keyboard-only pass on all new interactive elements.
- No safety disclaimer removed, shortened, or hidden.