"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { SubmissionStatus } from "@prisma/client";

const ADMIN_COOKIE_NAME = "hh_admin_token";

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const expectedKey = process.env.ADMIN_ACCESS_KEY;
  if (!expectedKey || !token) return false;
  return token === expectedKey;
}

export async function loginAdmin(accessKey: string): Promise<{ success: boolean; error?: string }> {
  const expectedKey = process.env.ADMIN_ACCESS_KEY;
  if (!expectedKey) {
    return { success: false, error: "ADMIN_ACCESS_KEY is not configured on the server." };
  }

  if (accessKey.trim() !== expectedKey.trim()) {
    return { success: false, error: "Invalid Admin Access Key." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, expectedKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  revalidatePath("/admin");
  return { success: true };
}

export async function updateStoryStatus(
  storyId: string,
  status: SubmissionStatus,
  editPayload?: { title?: string; content?: string }
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    const updateData: {
      status: SubmissionStatus;
      title?: string;
      content?: string;
      excerpt?: string;
    } = { status };

    if (editPayload?.title) {
      updateData.title = editPayload.title.trim();
    }

    if (editPayload?.content) {
      const cleanContent = editPayload.content.trim();
      updateData.content = cleanContent;
      updateData.excerpt =
        cleanContent.length > 150
          ? cleanContent.slice(0, 147) + "..."
          : cleanContent;
    }

    await db.story.update({
      where: { id: storyId },
      data: updateData,
    });

    revalidatePath("/stories");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to update story status:", err);
    return { success: false, error: "Failed to update story in database." };
  }
}

export async function resolveContactMessage(
  messageId: string
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    await db.contactMessage.update({
      where: { id: messageId },
      data: { status: SubmissionStatus.APPROVED },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Failed to update contact message:", err);
    return { success: false, error: "Failed to update message in database." };
  }
}
