"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/app/actions/admin-actions";
import { Lock, Shield, Loader2 } from "lucide-react";

export function AdminLoginForm() {
  const [accessKey, setAccessKey] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const res = await loginAdmin(accessKey);
    if (!res.success) {
      setError(res.error || "Invalid access key.");
      setIsLoading(false);
      return;
    }

    // Refresh page on success to load admin dashboard
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-md rounded-[28px] border border-hh-line bg-white p-8 shadow-warm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hh-blue/15 text-hh-blue-deep mb-4 mx-auto">
        <Lock className="h-6 w-6" />
      </div>

      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-bold text-hh-ink">
          Moderation Access
        </h1>
        <p className="mt-1 text-xs text-hh-ink-soft leading-relaxed">
          Please enter the platform Admin Access Key to manage submissions and
          safety escalations.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-hh-coral/40 bg-hh-coral/10 p-3 text-xs font-semibold text-hh-ink mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="admin-key"
            className="block text-xs font-bold text-hh-ink mb-1.5"
          >
            Admin Access Key
          </label>
          <Input
            id="admin-key"
            type="password"
            placeholder="Enter key..."
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !accessKey.trim()}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Authenticate
            </span>
          )}
        </Button>
      </form>

      <div className="mt-6 border-t border-hh-line/60 pt-4 text-center">
        <p className="text-[11px] text-hh-ink-soft">
          MVP Security Guard: Session-based cookie verification.
        </p>
      </div>
    </div>
  );
}
