"use client";

import { useEffect, useRef, useState } from "react";

/** Smallest row that still leaves the product photo a useful size (text block is ~170px). */
const MIN_ROW = 300;
/** Below this the screen is too short to fit even one row nicely: fall back to natural card height. */
const MIN_SINGLE = 280;

/**
 * Sizes grid rows so the first screen ends on a whole row: the visible rows finish one gap above the
 * bottom edge and the next row starts exactly at the fold, so nothing peeks in from below.
 * Returns a ref for the grid, the row height (px) or 0 for natural height, and whether it has measured.
 */
export function useFitRows<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const [rowH, setRowH] = useState(0);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    let lastW = 0;
    let lastH = 0;
    const fit = () => {
      const el = ref.current;
      if (!el) return setMeasured(true);
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const gap = parseFloat(getComputedStyle(el).rowGap) || 16;
      const avail = vh - top - gap;
      lastW = window.innerWidth;
      lastH = vh;
      if (avail < MIN_SINGLE) {
        setRowH(0);
      } else {
        const rows = Math.max(1, Math.floor((avail + gap) / (MIN_ROW + gap)));
        // round up so the next row starts at or below the fold, never a pixel above it
        setRowH(Math.ceil((avail - (rows - 1) * gap) / rows));
      }
      setMeasured(true);
    };

    fit();
    // Web fonts change the heading height above the grid.
    document.fonts?.ready.then(fit).catch(() => {});
    // Ignore small height changes (mobile address bar) so rows don't jump while scrolling.
    const onResize = () => {
      if (window.innerWidth !== lastW || Math.abs(window.innerHeight - lastH) > 120) fit();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, rowH, measured };
}
