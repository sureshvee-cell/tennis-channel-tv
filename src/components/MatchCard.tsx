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
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-600/30 text-green-400">FREE</span>;
      case "cable":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-blue-400">TV PROVIDER</span>;
      case "subscription":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tc-green/30 text-tc-green">TC+</span>;
      default:
        return null;
    }
  };

  const cardHeight = size === "large" ? "h-80" : size === "medium" ? "h-56" : "h-44";

  return (
    <Link
      href={`/player?matchId=${match.id}`}
      data-focusable
      className={`block relative ${cardHeight} rounded-tv overflow-hidden bg-tc-dark-200 group animate-fade-in`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Background gradient based on tournament */}
      <div className="absolute inset-0 bg-gradient-to-br from-tc-dark-200 via-tc-dark-100 to-tc-dark-300" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        {/* Top: Tournament & Status */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-tc-gray text-xs font-medium uppercase tracking-wider">{match.tournament}</p>
            <p className="text-tc-gray-light text-xs mt-0.5">{match.round} &middot; {match.court}</p>
          </div>
          <div className="flex items-center gap-2">
            {entitlementBadge()}
            {isLive && (
              <div className="flex items-center gap-1.5 bg-red-600/20 px-2.5 py-1 rounded-full">
                <div className="live-dot" />
                <span className="text-red-400 text-xs font-bold uppercase">Live</span>
              </div>
            )}
            {isUpcoming && (
              <div className="flex items-center gap-1.5 bg-yellow-600/20 px-2.5 py-1 rounded-full">
                <span className="text-yellow-400 text-xs font-bold">
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
            <div className="flex items-center gap-3">
              <span className="text-lg">{countryFlags[match.player1.countryCode] || ""}</span>
              <div>
                <span className="text-white font-semibold text-lg">{match.player1.name}</span>
                {match.player1.seed && (
                  <span className="text-tc-gray text-xs ml-2">[{match.player1.seed}]</span>
                )}
              </div>
            </div>
            {match.sets.length > 0 && (
              <div className="flex gap-3">
                {match.sets.map((set, i) => (
                  <span
                    key={i}
                    className={`text-lg font-mono font-bold min-w-[1.5rem] text-center ${
                      i === match.currentSet - 1 ? "text-tc-green" : "text-tc-gray-light"
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
          <div className="h-px bg-tc-dark-400 mx-4" />

          {/* Player 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">{countryFlags[match.player2.countryCode] || ""}</span>
              <div>
                <span className="text-white font-semibold text-lg">{match.player2.name}</span>
                {match.player2.seed && (
                  <span className="text-tc-gray text-xs ml-2">[{match.player2.seed}]</span>
                )}
              </div>
            </div>
            {match.sets.length > 0 && (
              <div className="flex gap-3">
                {match.sets.map((set, i) => (
                  <span
                    key={i}
                    className={`text-lg font-mono font-bold min-w-[1.5rem] text-center ${
                      i === match.currentSet - 1 ? "text-tc-green" : "text-tc-gray-light"
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
          <span className="text-tc-gray text-xs">
            {match.category === "fast-channel" ? "FAST Channel" : match.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-2 text-tc-green text-sm font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <span>{isUpcoming ? "Set Reminder" : "Watch Now"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
