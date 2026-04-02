"use client";

import React, { useRef } from "react";
import MatchCard from "./MatchCard";
import { Match } from "@/data/mockData";

interface LiveRailProps {
  title: string;
  subtitle?: string;
  matches: Match[];
  showLiveBadge?: boolean;
}

export default function LiveRail({ title, subtitle, matches, showLiveBadge = false }: LiveRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (matches.length === 0) return null;

  return (
    <section className="mb-10 animate-slide-up">
      {/* Section Header */}
      <div className="flex items-center justify-between px-8 mb-4">
        <div className="flex items-center gap-3">
          {showLiveBadge && <div className="live-dot" />}
          <h2 className="text-tv-lg font-bold text-white">{title}</h2>
          {subtitle && <span className="text-tc-gray text-tv-sm ml-2">{subtitle}</span>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            data-focusable
            className="w-10 h-10 rounded-full bg-tc-teal-light flex items-center justify-center text-tc-gray hover:text-tc-orange hover:bg-tc-teal-light/80 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            data-focusable
            className="w-10 h-10 rounded-full bg-tc-teal-light flex items-center justify-center text-tc-gray hover:text-tc-orange hover:bg-tc-teal-light/80 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Rail */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-8 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {matches.map((match, i) => (
          <div key={match.id} className="flex-shrink-0 w-[360px]">
            <MatchCard match={match} size="medium" index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
