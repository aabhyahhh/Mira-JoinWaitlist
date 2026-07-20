"use client";

import { useEffect, useState } from "react";

export type ViewportTier = "mobile" | "tablet" | "desktop";

const TABLET_MIN = 640;
const DESKTOP_MIN = 1024;

const SSR_FALLBACK = { width: 1280, height: 800 };

function tierFromWidth(width: number): ViewportTier {
  if (width >= DESKTOP_MIN) return "desktop";
  if (width >= TABLET_MIN) return "tablet";
  return "mobile";
}

/**
 * Live viewport dimensions + tier, updated on resize/orientation change.
 * This is the single source of truth breakpoint-specific compositions key
 * off — everything else (orbit radius, fragment count, logo scale) derives
 * from `tier` and the raw `width`/`height`, rather than each component
 * guessing its own breakpoint via CSS.
 *
 * SSR-safe: the initial state is always the same fixed fallback regardless
 * of environment, so the client's first render matches the server-rendered
 * HTML exactly (avoiding a hydration mismatch). The real viewport size is
 * only read inside useEffect, which runs after hydration — the resulting
 * re-render to correct values is expected and harmless.
 */
export function useViewport() {
  const [size, setSize] = useState(SSR_FALLBACK);

  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return { ...size, tier: tierFromWidth(size.width) };
}
