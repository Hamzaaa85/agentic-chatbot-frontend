/* ═══════════════════════════════════════════════════════════
   Home Page — Main Assembly Point
   Composes Sidebar + ChatArea with all hooks wired up.
   This is a client component — all interactivity lives here.
   ═══════════════════════════════════════════════════════════ */

"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import { ChatArea } from "@/components/chat";
import { useSession } from "@/hooks/useSession";
import { useChat } from "@/hooks/useChat";
import { useSessions } from "@/hooks/useSessions";
import { UI } from "@/lib/constants";
import type { ChatSession } from "@/lib/types";

export default function Home() {
  // ── State Management ────────────────────────────────────
  const { sessionId } = useSession();
  const { messages, isStreaming, error, sendMessage, clearChat } =
    useChat(sessionId);
  const { sessions, addSession, clearSessions } = useSessions();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Handlers ────────────────────────────────────────────

  /**
   * Send a message and track the session in recent searches.
   */
  const handleSendMessage = useCallback(
    async (text: string) => {
      // Start the chat
      await sendMessage(text);

      // Track in recent sessions
      addSession({
        id: sessionId,
        title: text.slice(0, UI.SESSION_TITLE_MAX_LENGTH),
        description: "Searching for results...",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },
    [sendMessage, addSession, sessionId]
  );

  /**
   * Handle suggestion chip click — sends the suggestion as a message.
   */
  const handleSuggestionClick = useCallback(
    (text: string) => {
      handleSendMessage(text);
    },
    [handleSendMessage]
  );

  /**
   * Handle clicking a past session — for now this is a no-op, it just highlights in the sidebar
   * but does not trigger a query since we only show history here.
   */
  const handleSessionClick = useCallback((session: ChatSession) => {
    // Intentionally left blank: "is pey click krny py query nhi chalni"
    // The backend uses a 10 min TTL for these sessions.
  }, []);

  // ── Render ──────────────────────────────────────────────

  return (
    <div className="relative h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSuggestionClick={handleSuggestionClick}
        sessions={sessions}
        currentSessionId={sessionId}
        onSessionClick={handleSessionClick}
        onClearSessions={clearSessions}
      />

      <ChatArea
        messages={messages}
        isStreaming={isStreaming}
        error={error}
        onSendMessage={handleSendMessage}
        onToggleSidebar={() => setSidebarOpen(true)}
      />
    </div>
  );
}
