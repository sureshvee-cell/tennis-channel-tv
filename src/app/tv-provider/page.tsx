"use client";

import React from "react";
import TVProviderPicker from "@/components/TVProviderPicker";
import { useAuth } from "@/context/AuthContext";

export default function TVProviderPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-tc-dark flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-tc-green/20 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00B140" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Already Signed In</h2>
          <p className="text-tc-gray-light mb-8">You&apos;re already authenticated with your TV provider.</p>
          <a
            href="/"
            data-focusable
            className="px-10 py-4 rounded-full bg-tc-green text-white font-bold text-lg hover:bg-tc-green-dark transition-colors inline-block"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <TVProviderPicker
      onSuccess={() => {
        window.location.href = "/";
      }}
      onCancel={() => {
        window.location.href = "/";
      }}
    />
  );
}
