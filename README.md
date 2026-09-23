# Heard & Healed — Youth Emotional Wellbeing Platform

> **CRITICAL ETHICAL & LEGAL STATEMENT:**  
> **Heard & Healed is a supportive and educational platform designed to help young people understand their emotions, reflect on what they are experiencing, and find helpful resources. It is NOT a therapy service, counselling service, medical diagnostic tool, crisis intervention service, or replacement for a licensed mental-health professional.**

---

## 🌟 Overview

**Heard & Healed** is a production-grade, youth-centered emotional education and reflective safe space tailored for young people aged 13–18. The platform pairs approachable, non-clinical design with an uncompromising two-layer safety contract.

### Core Pillars
1. **Understand & Learn**: 9 data-driven emotion guides featuring evidence-based explanations, physical grounding activities, downloadable official client guide PDFs, and validated external NHS/UNICEF/Mind literature.
2. **Talk & Reflect (Echo AI)**: A calm, reflective AI companion powered by OpenRouter that never diagnoses, prescribes, or claims certainty, strictly validating feelings first and escalating crises deterministically.
3. **Share & Relate**: Moderated anonymous community stories with real-time PII heuristics, character counters, and strict Community Guidelines agreement.
4. **Decode Therapy**: 12 interactive myth-or-fact flip cards debunking common misconceptions about mental health and psychotherapy with official APA citations.
5. **Universal 1-Click Crisis Access**: A persistent warm-coral Emergency Support trigger reachable in 1 click from every route, opening a focus-trapped modal with 24/7 verified helplines.

---

## 🏗️ Architecture

```mermaid
flowchart TD
    Client[Next.js 15 Client Island] -->|Chat Message| API[/api/echo Route Handler]
    Client -->|Story Submission| Action1[submitStory Server Action]
    Client -->|Contact Message| Action2[submitContactMessage Server Action]

    subgraph Layer 1 Server-Only Safety
        API --> AssessRisk1{assessRisk text}
        Action1 --> AssessRisk2{assessRisk content}
        AssessRisk1 -->|Critical| CrisisDeterminism[Zero LLM Call Deterministic Crisis Response]
        AssessRisk1 -->|Elevated / None| OpenRouterStream[OpenRouter Provider: openrouter/free]
        AssessRisk2 -->|Critical| FlagStory[Save status: FLAGGED riskLevel: HIGH]
        AssessRisk2 -->|Elevated / None| SavePending[Save status: PENDING]
    end

    subgraph Persistence Layer
        CrisisDeterminism --> NeonDB[(Neon Serverless Postgres via Prisma)]
        OpenRouterStream --> NeonDB
        FlagStory --> NeonDB
        SavePending --> NeonDB
    end

    subgraph Moderation
        AdminReq[/admin] --> CheckAdminKey{Valid ADMIN_ACCESS_KEY?}
        CheckAdminKey -->|Yes| AdminDash[Approve / Reject / Redact Stories]
    end
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components by default, TypeScript Strict Mode)
- **Styling & Tokens**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables (`@theme` tokens `--hh-*`)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) + [Neon Serverless PostgreSQL](https://neon.tech/)
- **Animations**: [Framer Motion](https://motion.dev/) with `useSafeMotion` reduced-motion safety guards
- **UI Primitives**: Accessible [Radix UI](https://www.radix-ui.com/) (Dialog, Tabs, Checkbox, Accordion)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) + `@openrouter/ai-sdk-provider`
- **Zero-Cost LLM**: Configured with `openrouter/free` (auto-routing to $0.00 cost models with no token bill)
- **Forms & Validation**: [Zod](https://zod.dev/) + React Hook Form

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ installed
- PostgreSQL database (or free Neon serverless instance)
- OpenRouter API key (free tier supported)

### 2. Clone and Install
```bash
git clone https://github.com/anshu762/Head-Healed-Website.git
cd Head-Healed-Website
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure the following variables in `.env`:
```env
# Neon Serverless Postgres connection string
DATABASE_URL="postgresql://neondb_owner:your_password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# OpenRouter (server-side only for Echo AI assistant)
# Set to "openrouter/free" for zero token bill ($0.00 cost)
OPENROUTER_API_KEY="sk-or-v1-your-openrouter-key"
OPENROUTER_MODEL="openrouter/free"

# Public site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Admin Access Key for /admin moderation
ADMIN_ACCESS_KEY="hh_admin_secret_key_change_in_production"

# (Optional) Analytics IDs - leaves no scripts loaded if empty
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_CLARITY_ID=""
```

### 4. Database Setup & Seeding
Push the Prisma schema to your database and seed all canonical data (9 emotions, 12 myths, 25 FAQs, 6 approved teen stories, emergency helplines):
```bash
npx prisma db push
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Safety Verification & Tests

Run our automated verification test suite:

```bash
# Verify legal verbatim integrity of all 5 safety disclaimers
npm run verify

# Run the 64-test risk engine suite (negations, idioms, l33tspeak, crisis)
npm run test:risk

# Run Phase 5 PII & Myth verification
npx tsx scripts/test-phase5.ts

# Run the comprehensive 8-point final safety sweep
npx tsx scripts/final-safety-sweep.ts

# Production build test
npm run build
```

---

## 🤖 Model Swapping Guide

Echo AI defaults to `openrouter/free` to guarantee **zero token charges**:
- **Free Default**: `"openrouter/free"` (automatically routes to available free models like `meta-llama/llama-3.2-3b-instruct:free`, `google/gemini-2.0-flash-lite:free`).
- **Ultra Low-Cost Alternatives**:
  - `OPENROUTER_MODEL="google/gemini-flash-1.5"` (~$0.075 / 1M tokens)
  - `OPENROUTER_MODEL="openai/gpt-4o-mini"` (~$0.15 / 1M tokens)
  - `OPENROUTER_MODEL="anthropic/claude-3.5-haiku"`

---

## 🛡️ Moderation & Administration

Access the moderation dashboard at `/admin`. Enter the `ADMIN_ACCESS_KEY` configured in `.env`.
- **Story Moderation**: Review `PENDING` stories, examine automated `RISK_LEVEL` badges, inspect content, redact identifying details, and approve or reject submissions with instant cache revalidation.
- **Inquiries**: Review incoming contact feedback and takedown requests.

*Note: The current key authentication is an MVP security mechanism. For enterprise multi-user deployments, migrate to NextAuth / Auth.js with role-based access control (RBAC).*

---

## 📄 License
This project is licensed under the MIT License for educational and non-commercial portfolio demonstration.
