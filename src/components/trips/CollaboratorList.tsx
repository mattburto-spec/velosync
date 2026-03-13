"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { initials, cn } from "@/lib/utils";
import type { TripMember, User } from "@/types";

interface CollaboratorListProps {
  tripId: string;
  members: (TripMember & { user?: User })[];
  currentUserId: string;
  isOwner: boolean;
  onMemberAdded?: (member: TripMember & { user?: User }) => void;
  onMemberRemoved?: (userId: string) => void;
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

export function CollaboratorList({
  tripId,
  members,
  currentUserId,
  isOwner,
  onMemberAdded,
  onMemberRemoved,
}: CollaboratorListProps) {
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setInviting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId, email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to invite");
      }

      setEmail("");
      setMessage({ type: "success", text: "Rider invited successfully!" });
      onMemberAdded?.(data);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to invite",
      });
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (userId: string) => {
    setRemovingId(userId);
    setMessage(null);

    try {
      const res = await fetch(
        `/api/invite?tripId=${tripId}&userId=${userId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to remove");
      }

      onMemberRemoved?.(userId);
      setMessage({ type: "success", text: "Member removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to remove",
      });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Card padding={false}>
      <div className="border-b border-surface-warm px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-text">
          Trip Members
        </h3>
        <p className="text-xs text-muted mt-0.5">
          {members.length} rider{members.length !== 1 && "s"}
        </p>
      </div>

      {/* Member list */}
      <div className="divide-y divide-gray-100">
        {members.map((member) => {
          const displayName =
            member.user?.display_name ?? "Unknown rider";
          const isCurrentUser = member.user_id === currentUserId;

          return (
            <div
              key={member.id}
              className="flex items-center gap-3 px-5 py-3"
            >
              {/* Avatar */}
              {member.user?.avatar_url ? (
                <img
                  src={member.user.avatar_url}
                  alt={displayName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10 text-xs font-semibold text-copper">
                  {initials(displayName)}
                </div>
              )}

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-text truncate">
                  {displayName}
                  {isCurrentUser && (
                    <span className="text-muted font-normal"> (you)</span>
                  )}
                </p>
              </div>

              {/* Role badge */}
              <Badge
                color={member.role === "owner" ? "forest" : "stone"}
              >
                {member.role === "owner" ? "Owner" : "Member"}
              </Badge>

              {/* Remove button (owner only, can't remove self) */}
              {isOwner && !isCurrentUser && (
                <button
                  onClick={() => handleRemove(member.user_id)}
                  disabled={removingId === member.user_id}
                  className={cn(
                    "rounded-lg p-1.5 text-muted transition-colors",
                    "hover:bg-red-50 hover:text-red-600",
                    removingId === member.user_id && "opacity-50"
                  )}
                  title="Remove member"
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Invite form */}
      <div className="border-t border-surface-warm px-5 py-4">
        <form onSubmit={handleInvite} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="rider@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MailIcon />}
            />
          </div>
          <Button
            type="submit"
            size="md"
            loading={inviting}
            disabled={!email.trim()}
          >
            Invite
          </Button>
        </form>

        {/* Messages */}
        {message && (
          <div
            className={cn(
              "mt-3 rounded-lg px-3 py-2 text-xs",
              message.type === "success"
                ? "bg-copper/10 text-copper"
                : "bg-red-50 text-red-700"
            )}
          >
            {message.text}
          </div>
        )}
      </div>
    </Card>
  );
}
