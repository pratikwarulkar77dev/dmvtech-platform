"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface NavMenuController {
  /** Id of the menu that is currently open, or null when all are closed. */
  openId: string | null;
  open: (id: string) => void;
  toggle: (id: string) => void;
  /** Closes `id` after a short delay, cancelled if the pointer re-enters. */
  scheduleClose: (id: string) => void;
  close: () => void;
}

/**
 * Single source of truth for which desktop menu is open. Keeping this in one
 * place guarantees only one panel is ever visible and lets hover, click, and
 * keyboard interactions share the same close-delay timer.
 */
export function useNavMenuController(closeDelayMs = 160): NavMenuController {
  const [openId, setOpenId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const open = useCallback(
    (id: string) => {
      clearTimer();
      setOpenId(id);
    },
    [clearTimer]
  );

  const toggle = useCallback(
    (id: string) => {
      clearTimer();
      setOpenId((current) => (current === id ? null : id));
    },
    [clearTimer]
  );

  const scheduleClose = useCallback(
    (id: string) => {
      clearTimer();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setOpenId((current) => (current === id ? null : current));
      }, closeDelayMs);
    },
    [clearTimer, closeDelayMs]
  );

  const close = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, [clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  return useMemo(
    () => ({ openId, open, toggle, scheduleClose, close }),
    [openId, open, toggle, scheduleClose, close]
  );
}
