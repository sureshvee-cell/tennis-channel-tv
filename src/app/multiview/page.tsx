"use client";

import React, { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import Navigation from "@/components/Navigation";
import { mockMatches, Match, countryFlags } from "@/data/mockData";

type LayoutMode = 1 | 2 | 3 | 4;

export default function MultiviewPage() {
  const [layout, setLayout] = useState<LayoutMode>(2);
  const [selectedMatches, setSelectedMatches] = useState<string[]>(["m1", "m2"]);
  const [showPicker, setShowPicker] = useState(false);
  const [activeSlot, setActiveSlot] = useState(0);
  const [audioSource, setAudioSource] = useState(0);

  const liveMatches = mockMatches.filter((m) => m.status === "live");

  const getSelectedMatch = (index: number): Match | null => {
    const matchId = selectedMatches[index];
    return matchId ? mockMatches.find((m) => m.id === matchId) || null : null;
  };

  const handleMatchSelect = (matchId: string) => {
    const updated = [...selectedMatches];
    updated[activeSlot] = matchId;
    setSelectedMatches(updated);
    setShowPicker(false);
  };

  const layoutClass = `multiview-${layout}`;

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Navigation />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Multiview Controls Bar */}
        <div className="glass border-b border-tc-teal-light px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold text-sm">Multiview</h2>
            <div className="h-4 w-px bg-tc-teal-light" />

            {/* Layout selector */}
            <div className="flex gap-2">
              {([1, 2, 3, 4] as LayoutMode[]).map((l) => (
                <button
                  key={l}
                  data-focusable
                  onClick={() => {
                    setLayout(l);
                    while (selectedMatches.length < l) {
                      const available = liveMatches.find(
                        (m) => !selectedMatches.includes(m.id)
                      );
                      if (available) selectedMatches.push(available.id);
                      else break;
                    }
                  }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    layout === l
                      ? "bg-tc-orange text-white"
                      : "bg-tc-teal-light text-tc-gray hover:text-white"
                  }`}
                >
                  {l === 1 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="1" width="14" height="14" rx="1" />
                    </svg>
                  )}
                  {l === 2 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="1" width="6" height="14" rx="1" />
                      <rect x="9" y="1" width="6" height="14" rx="1" />
                    </svg>
                  )}
                  {l === 3 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="1" width="9" height="14" rx="1" />
                      <rect x="12" y="1" width="3" height="6" rx="0.5" />
                      <rect x="12" y="9" width="3" height="6" rx="0.5" />
                    </svg>
                  )}
                  {l === 4 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="9" y="1" width="6" height="6" rx="1" />
                      <rect x="1" y="9" width="6" height="6" rx="1" />
                      <rect x="9" y="9" width="6" height="6" rx="1" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Audio source */}
          <div className="flex items-center gap-3">
            <span className="text-tc-gray text-xs">Audio from:</span>
            <div className="flex gap-1">
              {selectedMatches.slice(0, layout).map((_, i) => (
                <button
                  key={i}
                  data-focusable
                  onClick={() => setAudioSource(i)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    audioSource === i
                      ? "bg-tc-orange text-white"
                      : "bg-tc-teal-light text-tc-gray"
                  }`}
                >
                  Stream {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Multiview Grid */}
        <div className={`flex-1 ${layoutClass}`}>
          {Array.from({ length: layout }).map((_, i) => {
            const match = getSelectedMatch(i);
            return (
              <div key={i} className="relative bg-tc-teal overflow-hidden">
                {match ? (
                  <>
                    <VideoPlayer
                      match={match}
                      compact={layout > 1}
                      muted={audioSource !== i}
                      showControls={layout === 1}
                    />
                    {/* Stream label */}
                    {layout > 1 && (
                      <div className="absolute bottom-3 left-3 z-20 glass rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <span className="text-white text-xs font-medium">
                          {match.player1.name} vs {match.player2.name}
                        </span>
                        {audioSource === i && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8772E" stroke="none">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#E8772E" strokeWidth="2" fill="none" />
                          </svg>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    data-focusable
                    onClick={() => {
                      setActiveSlot(i);
                      setShowPicker(true);
                    }}
                    className="w-full h-full flex flex-col items-center justify-center text-tc-gray hover:text-tc-orange transition-colors"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span className="text-sm mt-2">Add Stream</span>
                  </button>
                )}

                {/* Swap button */}
                {match && layout > 1 && (
                  <button
                    data-focusable
                    onClick={() => {
                      setActiveSlot(i);
                      setShowPicker(true);
                    }}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full glass flex items-center justify-center text-tc-gray hover:text-white transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="1 4 1 10 7 10" />
                      <polyline points="23 20 23 14 17 14" />
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Match Picker Overlay */}
        {showPicker && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Select a Match for Stream {activeSlot + 1}
              </h3>
              <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                {liveMatches.map((match) => (
                  <button
                    key={match.id}
                    data-focusable
                    onClick={() => handleMatchSelect(match.id)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedMatches.includes(match.id)
                        ? "bg-tc-orange/10 border-tc-orange/50"
                        : "bg-tc-teal-light border-tc-teal-light hover:border-tc-orange/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="live-dot" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {countryFlags[match.player1.countryCode]} {match.player1.name} vs{" "}
                          {countryFlags[match.player2.countryCode]} {match.player2.name}
                        </p>
                        <p className="text-tc-gray text-sm">
                          {match.tournament} &middot; {match.round}
                        </p>
                      </div>
                    </div>
                    {selectedMatches.includes(match.id) && (
                      <span className="text-tc-orange text-xs font-bold">ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                data-focusable
                onClick={() => setShowPicker(false)}
                className="w-full mt-4 py-3 rounded-xl bg-tc-teal-light text-tc-gray font-medium hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
