"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import TVProviderPicker from "@/components/TVProviderPicker";
import { useAuth } from "@/context/AuthContext";

export default function TVProviderPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-tc-teal overflow-hidden">
        <Navigation />
        <main className="main-content flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-tc-live/20 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Already Signed In</h2>
            <p className="text-tc-gray-light mb-8">You&apos;re already authenticated with your TV provider.</p>
            <a
              href="/"
              data-focusable
              className="px-10 py-4 rounded-full bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors inline-block"
            >
              Go to Home
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-tc-teal overflow-hidden">
      <Navigation />
      <main className="main-content flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-tc-orange/10 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Sign in with your TV Provider</h2>
            <p className="text-tc-gray-light">Select your cable or satellite provider to verify your subscription</p>
          </div>

          {/* Provider Grid - inline version */}
          <TVProviderPicker
            onSuccess={() => {
              window.location.href = "/";
            }}
            onCancel={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </main>
    </div>
  );
}
