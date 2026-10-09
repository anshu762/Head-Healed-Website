import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/container";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import type { AdminStory, AdminContactMessage } from "@/components/admin/admin-dashboard";
import { db, isDbConfigured } from "@/lib/db";
import { getLocalStories, getLocalContacts } from "@/lib/data/local-store";
import type { Metadata } from "next";

const AdminDashboard = dynamic(
  () => import("@/components/admin/admin-dashboard").then((mod) => mod.AdminDashboard),
  {
    loading: () => (
      <div className="w-full h-96 rounded-[28px] border border-hh-line bg-white/70 animate-pulse flex items-center justify-center text-sm text-hh-ink-soft">
        Loading moderation dashboard...
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Admin Moderation | Heard & Healed",
  description: "Moderation dashboard for reviewing stories, flags, and contact messages.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const ADMIN_COOKIE_NAME = "hh_admin_token";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const expectedKey = process.env.ADMIN_ACCESS_KEY;

  const isAuthenticated = Boolean(
    expectedKey && token && token.trim() === expectedKey.trim()
  );

  if (!isAuthenticated) {
    return (
      <div className="py-16 sm:py-24">
        <Container size="narrow">
          <AdminLoginForm />
        </Container>
      </div>
    );
  }

  // Fetch all stories across all statuses (Database + Local Store)
  let dbStories: AdminStory[] = [];
  let dbContactMessages: AdminContactMessage[] = [];

  if (isDbConfigured()) {
    try {
      const rawStoriesPromise = db.story.findMany({
        orderBy: { createdAt: "desc" },
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB Timeout")), 2000)
      );
      const rawStories = (await Promise.race([
        rawStoriesPromise,
        timeoutPromise,
      ])) as Awaited<typeof rawStoriesPromise>;

      dbStories = rawStories.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        excerpt: s.excerpt,
        content: s.content,
        authorName: s.authorName,
        emotionSlug: s.emotionSlug,
        status: s.status,
        riskLevel: s.riskLevel,
        createdAt: s.createdAt.toISOString(),
      }));

      const rawMessages = await db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });

      dbContactMessages = rawMessages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        status: m.status,
        createdAt: m.createdAt.toISOString(),
      }));
    } catch (err) {
      console.warn("Database not reachable in admin, falling back to local submissions:", err);
    }
  }

  // Load local store submissions
  const localStories: AdminStory[] = getLocalStories().map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    content: s.content,
    authorName: s.authorName,
    emotionSlug: s.emotionSlug,
    status: s.status,
    riskLevel: s.riskLevel,
    createdAt: s.createdAt,
  }));

  const localContacts: AdminContactMessage[] = getLocalContacts().map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    status: m.status,
    createdAt: m.createdAt,
  }));

  // Merge unique by ID/Slug
  const existingStorySlugs = new Set(dbStories.map((s) => s.slug));
  const mergedStories = [
    ...localStories.filter((s) => !existingStorySlugs.has(s.slug)),
    ...dbStories,
  ];

  const existingContactIds = new Set(dbContactMessages.map((c) => c.id));
  const mergedContacts = [
    ...localContacts.filter((c) => !existingContactIds.has(c.id)),
    ...dbContactMessages,
  ];

  return (
    <div className="py-12 sm:py-20">
      <Container>
        <AdminDashboard
          stories={mergedStories}
          contactMessages={mergedContacts}
        />
      </Container>
    </div>
  );
}
