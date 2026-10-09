import fs from "fs";
import path from "path";
import { SubmissionStatus, RiskLevel } from "@prisma/client";

export interface LocalStoryRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  isAnonymous: boolean;
  emotionSlug: string | null;
  status: SubmissionStatus;
  riskLevel: RiskLevel;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocalContactRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
}

interface StoreSchema {
  stories: LocalStoryRecord[];
  contacts: LocalContactRecord[];
}

const STORE_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "data",
  "local-submissions.json"
);

function readStore(): StoreSchema {
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        stories: Array.isArray(parsed.stories) ? parsed.stories : [],
        contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      };
    }
  } catch (err) {
    console.error("Failed to read local store file:", err);
  }
  return { stories: [], contacts: [] };
}

function writeStore(data: StoreSchema): boolean {
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write local store file:", err);
    return false;
  }
}

export function saveLocalStory(story: Omit<LocalStoryRecord, "id" | "createdAt" | "updatedAt" | "featured">): LocalStoryRecord {
  const store = readStore();
  const id = `local-story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newRecord: LocalStoryRecord = {
    ...story,
    id,
    featured: false,
    createdAt: now,
    updatedAt: now,
  };

  // Prepend to top
  store.stories.unshift(newRecord);
  writeStore(store);
  return newRecord;
}

export function getLocalStories(): LocalStoryRecord[] {
  return readStore().stories;
}

export function getApprovedLocalStories(): LocalStoryRecord[] {
  return readStore().stories.filter((s) => s.status === SubmissionStatus.APPROVED);
}

export function updateLocalStoryStatus(
  id: string,
  status: SubmissionStatus,
  editPayload?: { title?: string; content?: string }
): boolean {
  const store = readStore();
  const story = store.stories.find((s) => s.id === id || s.slug === id);
  if (!story) return false;

  story.status = status;
  story.updatedAt = new Date().toISOString();

  if (editPayload?.title) {
    story.title = editPayload.title;
  }
  if (editPayload?.content) {
    story.content = editPayload.content;
    story.excerpt =
      editPayload.content.length > 150
        ? editPayload.content.slice(0, 147) + "..."
        : editPayload.content;
  }

  return writeStore(store);
}

export function saveLocalContact(contact: Omit<LocalContactRecord, "id" | "createdAt">): LocalContactRecord {
  const store = readStore();
  const id = `local-contact-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newRecord: LocalContactRecord = {
    ...contact,
    id,
    createdAt: now,
  };

  store.contacts.unshift(newRecord);
  writeStore(store);
  return newRecord;
}

export function getLocalContacts(): LocalContactRecord[] {
  return readStore().contacts;
}

export function resolveLocalContact(id: string): boolean {
  const store = readStore();
  const contact = store.contacts.find((c) => c.id === id);
  if (!contact) return false;

  contact.status = SubmissionStatus.APPROVED;
  return writeStore(store);
}
