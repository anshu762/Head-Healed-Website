import { cookies } from "next/headers";
import { Container } from "@/components/ui/container";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminDashboard, type AdminStory, type AdminContactMessage } from "@/components/admin/admin-dashboard";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Moderation | Heard & Healed",
  description: "Moderation dashboard for reviewing stories, flags, and contact messages.",
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

  // Fetch all stories across all statuses
  let stories: AdminStory[] = [];
  let contactMessages: AdminContactMessage[] = [];

  try {
    const rawStories = await db.story.findMany({
      orderBy: { createdAt: "desc" },
    });

    stories = rawStories.map((s) => ({
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

    contactMessages = rawMessages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      status: m.status,
      createdAt: m.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Failed to fetch admin data from database:", err);
  }

  return (
    <div className="py-12 sm:py-20">
      <Container>
        <AdminDashboard
          stories={stories}
          contactMessages={contactMessages}
        />
      </Container>
    </div>
  );
}
