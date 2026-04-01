"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import SubscriptionGate from "@/components/SubscriptionGate";
import TVProviderPicker from "@/components/TVProviderPicker";
import { useAuth } from "@/context/AuthContext";
import { mockMatches } from "@/data/mockData";

function PlayerContent() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId") || "m1";
  const { checkEntitlement, isAuthenticated } = useAuth();
  const [showGate, setShowGate] = useState(false);
  const [showTVProvider, setShowTVProvider] = useState(false);

  const match = mockMatches.find((m) => m.id === matchId) || mockMatches[0];

  useEffect(() => {
    // Check entitlement on mount
    if (!checkEntitlement(match.entitlement)) {
      setShowGate(true);
    } else {
      setShowGate(false);
    }
  }, [match.entitlement, checkEntitlement]);

  // TV Provider picker
  if (showTVProvider) {
    return (
      <TVProviderPicker
        onSuccess={() => {
          setShowTVProvider(false);
          setShowGate(false);
        }}
        onCancel={() => setShowTVProvider(false)}
      />
    );
  }

  // Subscription gate
  if (showGate) {
    return (
      <SubscriptionGate
        requiredEntitlement={match.entitlement}
        matchTitle={`${match.player1.name} vs ${match.player2.name} - ${match.tournament}`}
        onCableSignIn={() => setShowTVProvider(true)}
      />
    );
  }

  return (
    <div className="w-screen h-screen bg-black">
      <VideoPlayer match={match} />

      {/* Back button overlay */}
      <a
        href="/"
        data-focusable
        className="fixed top-5 right-5 z-40 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-tc-dark-300 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </a>
    </div>
  );
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-tc-green/30 border-t-tc-green rounded-full animate-spin" />
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  );
}
