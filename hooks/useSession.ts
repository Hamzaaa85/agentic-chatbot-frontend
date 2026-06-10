"use client";

/* ═══════════════════════════════════════════════════════════
   useSession — Session ID Management
   Generates and persists a unique session ID per browser tab.
   ═══════════════════════════════════════════════════════════ */

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import type { UseSessionReturn } from "@/lib/types";

function generateSessionId(): string {
  // crypto.randomUUID() is available in all modern browsers
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `web:${crypto.randomUUID()}`;
  }
  // Fallback for older environments
  return `web:${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Gets or creates a session ID from sessionStorage.
 * Using sessionStorage means each tab gets its own session,
 * but it survives page refreshes within the same tab.
 */
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let id = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
  }
  return id;
}

export function useSession(): UseSessionReturn {
  // Use a ref to avoid re-reads from sessionStorage on every render
  const idRef = useRef<string>("");

  // useSyncExternalStore for SSR-safe hydration
  const sessionId = useSyncExternalStore(
    // subscribe — sessionStorage doesn't fire events in same tab, so noop
    () => () => {},
    // getSnapshot — client
    () => {
      if (!idRef.current) {
        idRef.current = getOrCreateSessionId();
      }
      return idRef.current;
    },
    // getServerSnapshot — SSR
    () => ""
  );

  const resetSession = useCallback((): string => {
    const newId = generateSessionId();
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, newId);
    idRef.current = newId;
    return newId;
  }, []);

  return useMemo(
    () => ({ sessionId, resetSession }),
    [sessionId, resetSession]
  );
}
