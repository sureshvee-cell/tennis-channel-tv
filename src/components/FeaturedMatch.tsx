"use client";

import React from "react";
import Link from "next/link";
import { Match, countryFlags } from "@/data/mockData";

interface FeaturedMatchProps {
  match: Match;
}

export default function FeaturedMatch({ match }: FeaturedMatchProps) {
  return (
    <Link
      href={`/player?matchId=${match.id}`}
      data-focusable
      className="block relative w-full h-[420px] rounded-2xl overflow-hidden bg-tc-dark-200 group"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-tc-dark/80 to-tc-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,177,64,0.15),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-10">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1.5 bg-red-600/20 px-3 py-1.5 rounded-full">
                <div className="live-dot" />
                <span className="text-red-400 text-sm font-bold uppercase">Live Now</span>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-tc-dark-400/60 text-tc-gray-light text-sm">
                {match.round}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">{match.tournament}</h2>
            <p className="text-tc-gray-light text-base mt-1">{match.court}</p>
          </div>
          <div className="text-right">
            <p className="text-tc-gray text-sm">Set {match.currentSet} of 5</p>
          </div>
        </div>

        {/* Center: Player Matchup */}
        <div className="flex items-center justify-center gap-16">
          {/* Player 1 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-tc-dark-300 flex items-center justify-center text-4xl mb-3 mx-auto border-2 border-tc-dark-400">
              {countryFlags[match.player1.countryCode] || "?"}
            </div>
            <h3 className="text-2xl font-bold text-white">{match.player1.name}</h3>
            <p className="text-tc-gray text-sm mt-1">
              {match.player1.country}
              {match.player1.seed && ` | Seed #${match.player1.seed}`}
            </p>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-4">
              {match.sets.map((set, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-1 ${
                    i === match.currentSet - 1 ? "text-tc-green" : "text-tc-gray-light"
                  }`}
                >
                  <span className="text-xs text-tc-gray uppercase">
                    {i === match.currentSet - 1 ? "Current" : `Set ${i + 1}`}
                  </span>
                  <span className="text-3xl font-bold font-mono">{set.player1}</span>
                  <div className="w-6 h-px bg-tc-dark-400" />
                  <span className="text-3xl font-bold font-mono">{set.player2}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Player 2 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-tc-dark-300 flex items-center justify-center text-4xl mb-3 mx-auto border-2 border-tc-dark-400">
              {countryFlags[match.player2.countryCode] || "?"}
            </div>
            <h3 className="text-2xl font-bold text-white">{match.player2.name}</h3>
            <p className="text-tc-gray text-sm mt-1">
              {match.player2.country}
              {match.player2.seed && ` | Seed #${match.player2.seed}`}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div className="nav-hint">
            Press <kbd>Enter</kbd> to watch &middot; <kbd>&larr;</kbd><kbd>&rarr;</kbd> to browse
          </div>
          <div className="flex items-center gap-3 text-tc-green font-semibold text-lg opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Now
          </div>
        </div>
      </div>
    </Link>
  );
}
