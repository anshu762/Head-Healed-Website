"use client";

import * as React from "react";
import {
  updateStoryStatus,
  resolveContactMessage,
  logoutAdmin,
} from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Edit3,
  LogOut,
  Mail,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { SubmissionStatus } from "@prisma/client";

export interface AdminStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  emotionSlug: string | null;
  status: SubmissionStatus;
  riskLevel: string;
  createdAt: Date | string;
}

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  createdAt: Date | string;
}

interface AdminDashboardProps {
  stories: AdminStory[];
  contactMessages: AdminContactMessage[];
}

export function AdminDashboard({
  stories: initialStories,
  contactMessages: initialMessages,
}: AdminDashboardProps) {
  const [stories, setStories] = React.useState(initialStories);
  const [messages, setMessages] = React.useState(initialMessages);

  // Active section tab: "stories" vs "contacts"
  const [activeTab, setActiveTab] = React.useState<"stories" | "contacts">("stories");

  // Status filter for stories
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");

  // Story detail/edit dialog
  const [editingStory, setEditingStory] = React.useState<AdminStory | null>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editContent, setEditContent] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleOpenEdit = (story: AdminStory) => {
    setEditingStory(story);
    setEditTitle(story.title);
    setEditContent(story.content);
  };

  const handleUpdateStatus = async (
    storyId: string,
    newStatus: SubmissionStatus,
    editPayload?: { title?: string; content?: string }
  ) => {
    setIsProcessing(true);
    const res = await updateStoryStatus(storyId, newStatus, editPayload);
    setIsProcessing(false);

    if (res.success) {
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId
            ? {
                ...s,
                status: newStatus,
                title: editPayload?.title || s.title,
                content: editPayload?.content || s.content,
              }
            : s
        )
      );
      setEditingStory(null);
    }
  };

  const handleResolveMessage = async (msgId: string) => {
    setIsProcessing(true);
    const res = await resolveContactMessage(msgId);
    setIsProcessing(false);

    if (res.success) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, status: SubmissionStatus.APPROVED } : m
        )
      );
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.reload();
  };

  const filteredStories = React.useMemo(() => {
    if (statusFilter === "ALL") return stories;
    return stories.filter((s) => s.status === statusFilter);
  }, [stories, statusFilter]);

  const pendingCount = stories.filter((s) => s.status === SubmissionStatus.PENDING).length;
  const flaggedCount = stories.filter((s) => s.status === SubmissionStatus.FLAGGED).length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-hh-line">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-hh-ink">
            Moderation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-hh-ink-soft">
            Review community stories, monitor safety flags, and respond to inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1.5" /> Log Out
          </Button>
        </div>
      </div>

      {/* Main Tabs: Stories vs Inquiries */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("stories")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === "stories"
              ? "bg-hh-ink text-white shadow-xs"
              : "bg-white border border-hh-line text-hh-ink-soft hover:text-hh-ink"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Story Submissions ({stories.length})</span>
          {pendingCount > 0 && (
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-hh-ink">
              {pendingCount} Pending
            </span>
          )}
          {flaggedCount > 0 && (
            <span className="rounded-full bg-hh-coral px-2 py-0.5 text-[10px] font-bold text-white">
              {flaggedCount} Flagged
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === "contacts"
              ? "bg-hh-ink text-white shadow-xs"
              : "bg-white border border-hh-line text-hh-ink-soft hover:text-hh-ink"
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>Contact Messages ({messages.length})</span>
        </button>
      </div>

      {activeTab === "stories" ? (
        <div className="space-y-6">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-hh-line bg-white/70 p-3 shadow-warm-sm">
            <span className="text-xs font-bold text-hh-ink-soft flex items-center gap-1.5 px-2">
              <Filter className="h-3.5 w-3.5" /> Filter by:
            </span>
            {(["ALL", "PENDING", "FLAGGED", "APPROVED", "REJECTED"] as const).map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-hh-blue-deep text-white shadow-xs"
                      : "bg-white border border-hh-line text-hh-ink-soft hover:text-hh-ink"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {/* Stories Table */}
          <div className="rounded-[28px] border border-hh-line bg-white overflow-hidden shadow-warm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-hh-cream/70 border-b border-hh-line text-hh-ink font-bold">
                  <tr>
                    <th className="p-4">Title &amp; Author</th>
                    <th className="p-4">Emotion</th>
                    <th className="p-4">Risk Level</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hh-line/60">
                  {filteredStories.map((story) => (
                    <tr
                      key={story.id}
                      className={`hover:bg-hh-cream/30 transition-colors ${
                        story.status === "FLAGGED"
                          ? "bg-red-50/50"
                          : story.status === "PENDING"
                          ? "bg-amber-50/30"
                          : ""
                      }`}
                    >
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-hh-ink truncate">
                          {story.title}
                        </div>
                        <div className="text-xs text-hh-ink-soft">
                          by {story.authorName}
                        </div>
                      </td>
                      <td className="p-4 capitalize text-hh-ink-soft">
                        {story.emotionSlug?.replace(/-/g, " ") || "—"}
                      </td>
                      <td className="p-4">
                        {story.riskLevel === "HIGH" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-800 px-2.5 py-0.5 text-xs font-bold">
                            <ShieldAlert className="h-3 w-3" /> CRITICAL
                          </span>
                        ) : story.riskLevel === "MEDIUM" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-bold">
                            <AlertTriangle className="h-3 w-3" /> ELEVATED
                          </span>
                        ) : (
                          <span className="rounded-full bg-hh-sage/20 text-hh-sage-deep px-2.5 py-0.5 text-xs font-semibold">
                            NONE
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {story.status === "APPROVED" && (
                          <span className="rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-bold">
                            APPROVED
                          </span>
                        )}
                        {story.status === "PENDING" && (
                          <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-bold">
                            PENDING
                          </span>
                        )}
                        {story.status === "FLAGGED" && (
                          <span className="rounded-full bg-red-100 text-red-800 px-2.5 py-0.5 text-xs font-bold">
                            FLAGGED
                          </span>
                        )}
                        {story.status === "REJECTED" && (
                          <span className="rounded-full bg-gray-100 text-gray-700 px-2.5 py-0.5 text-xs font-semibold">
                            REJECTED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-xs text-hh-ink-soft whitespace-nowrap">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(story)}
                            title="Inspect & Edit"
                          >
                            <Eye className="h-4 w-4 text-hh-ink" />
                          </Button>

                          {story.status !== "APPROVED" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={isProcessing}
                              onClick={() =>
                                handleUpdateStatus(story.id, SubmissionStatus.APPROVED)
                              }
                              className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                          )}

                          {story.status !== "REJECTED" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={isProcessing}
                              onClick={() =>
                                handleUpdateStatus(story.id, SubmissionStatus.REJECTED)
                              }
                              className="text-xs text-hh-coral hover:bg-hh-coral/10"
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredStories.length === 0 && (
                <div className="py-12 text-center text-sm text-hh-ink-soft">
                  No stories found in this filter.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Contact Messages List */
        <div className="rounded-[28px] border border-hh-line bg-white overflow-hidden shadow-warm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-hh-cream/70 border-b border-hh-line text-hh-ink font-bold">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hh-line/60">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-hh-cream/30">
                    <td className="p-4">
                      <div className="font-bold text-hh-ink">{msg.name}</div>
                      <div className="text-xs text-hh-blue-deep">{msg.email}</div>
                    </td>
                    <td className="p-4 font-semibold text-hh-ink max-w-xs truncate">
                      {msg.subject}
                    </td>
                    <td className="p-4 max-w-md text-xs text-hh-ink-soft leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </td>
                    <td className="p-4 text-xs text-hh-ink-soft whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {msg.status === "APPROVED" ? (
                        <span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs font-bold">
                          Resolved
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-bold">
                          New
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {msg.status !== "APPROVED" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={isProcessing}
                          onClick={() => handleResolveMessage(msg.id)}
                          className="text-xs"
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {messages.length === 0 && (
              <div className="py-12 text-center text-sm text-hh-ink-soft">
                No contact inquiries yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit & Inspect Dialog Modal */}
      {editingStory && (
        <Dialog open={!!editingStory} onOpenChange={() => setEditingStory(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Review &amp; Edit Story</DialogTitle>
              <DialogDescription>
                You can redact identifying details or correct formatting before approving.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-bold text-hh-ink mb-1">
                  Title
                </label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-hh-ink mb-1">
                  Story Content
                </label>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={8}
                />
              </div>

              <div className="rounded-xl border border-hh-line bg-hh-cream p-3 text-xs space-y-1">
                <div>
                  <strong>Author:</strong> {editingStory.authorName}
                </div>
                <div>
                  <strong>Risk Assessment:</strong> {editingStory.riskLevel}
                </div>
                <div>
                  <strong>Current Status:</strong> {editingStory.status}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-hh-line">
              <Button
                variant="ghost"
                onClick={() => setEditingStory(null)}
                disabled={isProcessing}
              >
                Close
              </Button>
              <Button
                variant="primary"
                disabled={isProcessing}
                onClick={() =>
                  handleUpdateStatus(editingStory.id, SubmissionStatus.APPROVED, {
                    title: editTitle,
                    content: editContent,
                  })
                }
              >
                Save &amp; Approve
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
