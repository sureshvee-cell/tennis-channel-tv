"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/FeaturedMatch";
import LiveRail from "@/components/LiveRail";
import { mockMatches } from "@/data/mockData";

export default function HomePage() {
  // Filter matches by status and category
  const liveMatches = mockMatches.filter((m) => m.status === "live");
  const upcomingMatches = mockMatches.filter((m) => m.status === "upcoming");
  const highlightMatches = mockMatches.filter((m) => m.status === "completed");

  // Live TV channels (specific matches that act as channels)
  const liveTVChannels = liveMatches.slice(0, 3);

  // ATP/WTA upcoming
  const atpMatches = upcomingMatches.filter((m) => m.category === "atp");
  const wtaMatches = liveMatches.filter((m) => m.category === "wta");

  return (
    <div className="flex h-screen bg-tc-teal overflow-hidden">
      <Navigation />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Carousel */}
        <section className="px-8 pt-6 pb-4 flex-shrink-0">
          <HeroCarousel />
        </section>

        {/* Live TV Channels Row */}
        {liveTVChannels.length > 0 && (
          <section className="px-8 pb-6 flex-shrink-0">
            <h2 className="text-tv-lg font-bold text-white mb-4">Watch Live TV</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {liveTVChannels.map((match, i) => (
                <div key={match.id} className="flex-shrink-0 w-[360px] h-56 rounded-lg overflow-hidden bg-tc-teal-light border border-tc-teal-light hover:border-tc-orange transition-all group cursor-pointer relative">
                  {/* Channel Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-tc-teal-light to-tc-dark flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-tc-gray text-xs font-medium uppercase tracking-wider">{match.tournament}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-tc-live/20 px-2.5 py-1 rounded-full">
                          <div className="live-dot" style={{ width: 6, height: 6 }} />
                          <span className="text-tc-live text-xs font-bold uppercase">Live</span>
                        </div>
                        {match.entitlement === "free" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tc-live/20 text-tc-live">NO LOGIN</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-1">{match.tournament}</h3>
                        <p className="text-tc-gray-light text-xs">{match.round}</p>
                      </div>
                      <div className="flex items-center gap-2 text-tc-orange text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Watch</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Live & Upcoming Matches */}
        {atpMatches.length > 0 && (
          <LiveRail
            title="Live & Upcoming"
            subtitle="ATP Marrakech & ATP Bucharest"
            matches={atpMatches}
            showLiveBadge={false}
          />
        )}

        {/* WTA Matches */}
        {wtaMatches.length > 0 && (
          <LiveRail
            title="WTA Tennis"
            subtitle="Charleston Open & More"
            matches={wtaMatches}
            showLiveBadge={true}
          />
        )}

        {/* Match Highlights */}
        {highlightMatches.length > 0 && (
          <LiveRail
            title="Match Highlights"
            subtitle="Featured Clips"
            matches={highlightMatches}
          />
        )}

        {/* Quick Links Footer */}
        <section className="px-8 py-6 mb-8 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4">
            <a
              href="/multiview"
              data-focusable
              className="p-6 rounded-lg bg-tc-teal-light border border-tc-teal-light hover:border-tc-orange transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-tc-orange/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                    <rect x="2" y="2" width="9" height="9" rx="1" />
                    <rect x="13" y="2" width="9" height="9" rx="1" />
                    <rect x="2" y="13" width="9" height="9" rx="1" />
                    <rect x="13" y="13" width="9" height="9" rx="1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Multiview</h3>
                  <p className="text-tc-gray text-xs">Watch 4 matches at once</p>
                </div>
              </div>
            </a>
            <a
              href="/tv-provider"
              data-focusable
              className="p-6 rounded-lg bg-tc-teal-light border border-tc-teal-light hover:border-tc-orange transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">TV Provider</h3>
                  <p className="text-tc-gray text-xs">Sign in with cable</p>
                </div>
              </div>
            </a>
            <a
              href="/subscribe"
              data-focusable
              className="p-6 rounded-lg bg-tc-teal-light border border-tc-teal-light hover:border-tc-orange transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Subscribe</h3>
                  <p className="text-tc-gray text-xs">Get Tennis Channel+</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* TV Schedule Bar */}
        <section className="px-8 py-6 border-t border-tc-teal-light bg-tc-teal/50 flex-shrink-0">
          <div className="flex items-center gap-6">
            <span className="text-tc-gray text-xs uppercase tracking-wider font-semibold flex-shrink-0">Schedule</span>
            <div className="flex gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {[
                { time: "2:00 PM PDT", show: "Charleston Open - Early Rounds", live: true },
                { time: "1:00 PM PDT", show: "Tennis Today on T2", live: true },
                { time: "3:00 AM PDT", show: "ATP Marrakech R16", live: false },
                { time: "4:00 AM PDT", show: "ATP Bucharest R32", live: false },
                { time: "12:00 PM PDT", show: "PPA Tour: Asia Hanoi Cup", live: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="text-tc-gray-light text-xs font-mono whitespace-nowrap">{item.time}</span>
                  {item.live && <div className="live-dot" style={{ width: 5, height: 5 }} />}
                  <span className={`text-xs whitespace-nowrap ${item.live ? "text-white font-medium" : "text-tc-gray"}`}>
                    {item.show}
                  </span>
                  {i < 4 && <span className="text-tc-teal-light mx-2">|</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
