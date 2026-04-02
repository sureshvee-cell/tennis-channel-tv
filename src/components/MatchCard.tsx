"use client";

import React from "react";
import Link from "next/link";
import { Match, countryFlags } from "@/data/mockData";

interface MatchCardProps {
  match: Match;
  size?: "small" | "medium" | "large";
  index?: number;
}

export default function MatchCard({ match, size = "medium", index = 0 }: MatchCardProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  const entitlementBadge = () => {
    switch (match.entitlement) {
      case "free":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tc-live/20 text-tc-live">NO LOGIN</span>;
      case "cable":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-blue-400">TV PROVIDER</span>;
      case "subscription":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tc-orange/30 text-tc-orange">TC+</span>;
      default:
        return null;
    }
  };

  const cardHeight = size === "large" ? "h-80" : size === "medium" ? "h-56" : "h-44";

  return (
    <Link
      href={`/player?matchId=${match.id}`}
      data-focusable
      className={`block relative ${cardHeight} rounded-lg overflow-hidden bg-tc-teal-light group animate-fade-in border border-tc-teal-light hover:border-tc-orange transition-all`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tc-teal-light via-tc-dark to-tc-teal" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        {/* Top: Tournament & Status */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-tc-gray text-xs font-medium uppercase tracking-wider">{match.tournament}</p>
            <p className="text-tc-gray-light text-xs mt-0.5">{match.round}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {entitlementBadge()}
            {isLive && (
              <div className="flex items-center gap-1.5 bg-tc-live/20 px-2.5 py-1 rounded-full">
                <div className="live-dot" style={{ width: 6, height: 6 }} />
                <span className="text-tc-live text-xs font-bold uppercase">Live</span>
              </div>
            )}
            {isUpcoming && (
              <div className="flex items-center gap-1.5 bg-tc-orange/20 px-2.5 py-1 rounded-full">
                <span className="text-tc-orange text-xs font-bold">
                  {new Date(match.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Middle: Players & Score */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {/* Player 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">{countryFlags[match.player1.countryCode] || ""}</span>
              <div className="min-w-0">
                <span className="text-white font-semibold text-sm line-clamp-1">{match.player1.name}</span>
                {match.player1.seed && (
                  <span className="text-tc-gray text-xs ml-1">[{match.player1.seed}]</span>
                )}
              </div>
            </div>
            {match.sets.length > 0 && (
              <div className="flex gap-2 ml-2 flex-shrink-0">
                {match.sets.map((set, i) => (
                  <span
                    key={i}
                    className={`text-sm font-mono font-bold min-w-[1.5rem] text-center ${
                      i === match.currentSet - 1 ? "text-tc-orange" : "text-tc-gray-light"
                    }`}
                  >
                    {set.player1}
                    {set.tiebreak && i !== match.currentSet - 1 && (
                      <sup className="text-[10px] text-tc-gray">{set.tiebreak.player1}</sup>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-tc-teal-light mx-2" />

          {/* Player 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">{countryFlags[match.player2.countryCode] || ""}</span>
              <div className="min-w-0">
                <span className="text-white font-semibold text-sm line-clamp-1">{match.player2.name}</span>
                {match.player2.seed && (
                  <span className="text-tc-gray text-xs ml-1">[{match.player2.seed}]</span>
                )}
              </div>
            </div>
            {match.sets.length > 0 && (
              <div className="flex gap-2 ml-2 flex-shrink-0">
                {match.sets.map((set, i) => (
                  <span
                    key={i}
                    className={`text-sm font-mono font-bold min-w-[1.5rem] text-center ${
                      i === match.currentSet - 1 ? "text-tc-orange" : "text-tc-gray-light"
                    }`}
                  >
                    {set.player2}
                    {set.tiebreak && i !== match.currentSet - 1 && (
                      <sup className="text-[10px] text-tc-gray">{set.tiebreak.player2}</sup>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Watch prompt */}
        <div className="flex items-center justify-between">
          <span className="text-tc-gray text-xs capitalize">
            {match.category === "fast-channel" ? "Channel" : match.category === "pickleball" ? "Pickleball" : match.category}
          </span>
          <div className="flex items-center gap-2 text-tc-orange text-xs font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <span>{isUpcoming ? "Set Reminder" : "Watch Now"}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
