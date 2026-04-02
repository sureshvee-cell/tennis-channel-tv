"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import FeaturedMatch from "@/components/FeaturedMatch";
import LiveRail from "@/components/LiveRail";
import { mockMatches } from "@/data/mockData";

export default function HomePage() {
  const liveMatches = mockMatches.filter((m) => m.status === "live");
  const upcomingMatches = mockMatches.filter((m) => m.status === "upcoming");
  const featuredMatch = liveMatches[0];
  const grandSlamMatches = liveMatches.filter((m) => m.category === "grand-slam");
  const fastChannels = liveMatches.filter((m) => m.category === "fast-channel");

  return (
    <div className="min-h-screen bg-tc-dark">
      <Navigation />

      {/* Content area with nav offset */}
      <main className="pt-20">
        {/* Featured Match Hero */}
        {featuredMatch && (
          <section className="px-12 pt-6 mb-8">
            <FeaturedMatch match={featuredMatch} />
          </section>
        )}

        {/* Live Now Rail */}
        <LiveRail
          title="Live Now"
          subtitle={`${liveMatches.length} matches`}
          matches={liveMatches}
          showLiveBadge
        />

        {/* Grand Slam */}
        {grandSlamMatches.length > 0 && (
          <LiveRail
            title="Grand Slam"
            subtitle="Roland Garros"
            matches={grandSlamMatches}
          />
        )}

        {/* FAST Channels / Linear */}
        {fastChannels.length > 0 && (
          <LiveRail
            title="Free Channels"
            subtitle="No subscription required"
            matches={fastChannels}
          />
        )}

        {/* Upcoming */}
        <LiveRail
          title="Coming Up Next"
          matches={upcomingMatches}
        />

        {/* Quick Links Footer */}
        <section className="px-12 py-8 mb-8">
          <div className="flex gap-4">
            <a
              href="/multiview"
              data-focusable
              className="flex-1 p-6 rounded-2xl bg-tc-dark-200 border border-tc-dark-400 hover:border-tc-green/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tc-green/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B140" strokeWidth="2">
                    <rect x="2" y="2" width="9" height="9" rx="1" />
                    <rect x="13" y="2" width="9" height="9" rx="1" />
                    <rect x="2" y="13" width="9" height="9" rx="1" />
                    <rect x="13" y="13" width="9" height="9" rx="1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Multiview</h3>
                  <p className="text-tc-gray text-sm">Watch up to 4 matches at once</p>
                </div>
              </div>
            </a>
            <a
              href="/tv-provider"
              data-focusable
              className="flex-1 p-6 rounded-2xl bg-tc-dark-200 border border-tc-dark-400 hover:border-tc-green/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">TV Provider</h3>
                  <p className="text-tc-gray text-sm">Sign in with your cable subscription</p>
                </div>
              </div>
            </a>
            <a
              href="/subscribe"
              data-focusable
              className="flex-1 p-6 rounded-2xl bg-tc-dark-200 border border-tc-dark-400 hover:border-tc-green/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Subscribe</h3>
                  <p className="text-tc-gray text-sm">Get Tennis Channel+ for full access</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Gracenote Schedule Bar */}
        <section className="px-12 py-6 bg-tc-dark-100 border-t border-tc-dark-300">
          <div className="flex items-center gap-6">
            <span className="text-tc-gray text-xs uppercase tracking-wider font-semibold">TV Schedule</span>
            <div className="flex gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {[
                { time: "2:00 PM", show: "Roland Garros QF - Alcaraz vs Sinner", live: true },
                { time: "3:00 PM", show: "Roland Garros QF - Swiatek vs Gauff", live: true },
                { time: "5:00 PM", show: "Tennis Channel Live - Studio Show", live: false },
                { time: "7:00 PM", show: "ATP Rome R16 - Djokovic vs Fritz", live: false },
                { time: "9:00 PM", show: "Classic Match: Federer vs Nadal 2008 Wimbledon Final", live: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="text-tc-gray-light text-sm font-mono">{item.time}</span>
                  {item.live && <div className="live-dot" style={{ width: 6, height: 6 }} />}
                  <span className={`text-sm ${item.live ? "text-white font-medium" : "text-tc-gray"}`}>
                    {item.show}
                  </span>
                  {i < 4 && <span className="text-tc-dark-400 mx-2">|</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
