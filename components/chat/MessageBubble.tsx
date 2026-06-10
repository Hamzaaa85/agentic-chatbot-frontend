/* ═══════════════════════════════════════════════════════════
   MessageBubble — Individual Chat Message
   Renders user and assistant messages with distinct styles.
   ═══════════════════════════════════════════════════════════ */

"use client";

import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`
          max-w-[80%] px-4 py-3 text-sm leading-relaxed
          ${
            isUser
              ? "bg-[var(--color-primary)] text-white rounded-2xl rounded-br-sm"
              : "bg-[var(--color-gray-100)] text-[var(--color-text-primary)] rounded-2xl rounded-bl-sm"
          }
        `}
      >
        {/* Message content */}
        <span className="whitespace-pre-wrap break-words">
          {message.content}
        </span>

        {/* Streaming cursor */}
        {message.isStreaming && (
          <span className="animate-blink ml-0.5 text-current">▌</span>
        )}
      </div>
    </div>
  );
}
