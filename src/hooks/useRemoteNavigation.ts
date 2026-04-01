"use client";

import { useEffect, useCallback, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface UseRemoteNavigationOptions {
  gridColumns?: number;
  itemCount: number;
  onSelect?: (index: number) => void;
  onBack?: () => void;
  enabled?: boolean;
}

export function useRemoteNavigation({
  gridColumns = 1,
  itemCount,
  onSelect,
  onBack,
  enabled = true,
}: UseRemoteNavigationOptions) {
  const focusedIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFocus = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= itemCount) return;
      focusedIndex.current = newIndex;
      const container = containerRef.current;
      if (!container) return;
      const items = container.querySelectorAll("[data-focusable]");
      items.forEach((item, i) => {
        if (i === newIndex) {
          (item as HTMLElement).focus();
          item.classList.add("tv-focused");
        } else {
          item.classList.remove("tv-focused");
        }
      });
    },
    [itemCount]
  );

  const handleNavigation = useCallback(
    (direction: Direction) => {
      const current = focusedIndex.current;
      let next = current;

      switch (direction) {
        case "left":
          next = current - 1;
          break;
        case "right":
          next = current + 1;
          break;
        case "up":
          next = current - gridColumns;
          break;
        case "down":
          next = current + gridColumns;
          break;
      }

      if (next >= 0 && next < itemCount) {
        updateFocus(next);
      }
    },
    [gridColumns, itemCount, updateFocus]
  );

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          handleNavigation("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          handleNavigation("down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleNavigation("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNavigation("right");
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect?.(focusedIndex.current);
          break;
        case "Escape":
        case "Backspace":
          e.preventDefault();
          onBack?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, handleNavigation, onSelect, onBack]);

  return { containerRef, focusedIndex, updateFocus };
}
