"use client";

import React, { useState } from "react";
import { mockTVProviders } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

interface TVProviderPickerProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TVProviderPicker({ onSuccess, onCancel }: TVProviderPickerProps) {
  const { signInWithCable, isLoading } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<"select" | "authenticating" | "success" | "error">("select");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredProviders = mockTVProviders.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProviderSelect = async (providerId: string) => {
    setSelectedProvider(providerId);
    setAuthStep("authenticating");

    // Simulate Adobe Primetime auth
    await new Promise((r) => setTimeout(r, 2500));

    // Simulate success (or error for demo)
    const success = await signInWithCable(providerId);
    if (success) {
      setAuthStep("success");
      setTimeout(onSuccess, 1500);
    } else {
      setAuthStep("error");
      setErrorMessage(
        "Your TV provider account was verified, but your current package does not include Tennis Channel. Please contact your provider to add Tennis Channel to your subscription."
      );
    }
  };

  if (authStep === "authenticating") {
    return (
      <div className="fixed inset-0 z-50 bg-tc-dark/95 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-tc-green/30 border-t-tc-green rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-white mb-2">Verifying with your TV Provider</h3>
          <p className="text-tc-gray-light">
            Authenticating via Adobe Primetime...
          </p>
          <p className="text-tc-gray text-sm mt-2">
            Provider: {mockTVProviders.find((p) => p.id === selectedProvider)?.name}
          </p>
        </div>
      </div>
    );
  }

  if (authStep === "success") {
    return (
      <div className="fixed inset-0 z-50 bg-tc-dark/95 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-tc-green/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00B140" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Verified!</h3>
          <p className="text-tc-gray-light">Welcome, cable subscriber. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (authStep === "error") {
    return (
      <div className="fixed inset-0 z-50 bg-tc-dark/95 flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-lg">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Package Not Included</h3>
          <p className="text-tc-gray-light text-sm mb-6 leading-relaxed">{errorMessage}</p>
          <p className="text-tc-gray text-xs mb-6">Error ID: TC-CABLE-4032</p>
          <div className="flex gap-3 justify-center">
            <button
              data-focusable
              onClick={() => setAuthStep("select")}
              className="px-6 py-3 rounded-full bg-tc-dark-300 text-white font-medium border border-tc-dark-400"
            >
              Try Another Provider
            </button>
            <button
              data-focusable
              onClick={onCancel}
              className="px-6 py-3 rounded-full bg-tc-green text-white font-semibold"
            >
              Subscribe Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-tc-dark/95 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Sign in with your TV Provider</h2>
          <p className="text-tc-gray-light">Select your cable or satellite provider to verify your subscription</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-tc-gray"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your provider..."
            className="w-full bg-tc-dark-200 border border-tc-dark-400 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-tc-gray focus:border-tc-green focus:outline-none transition-colors"
          />
        </div>

        {/* Provider Grid */}
        <div className="provider-grid max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: "none" }}>
          {filteredProviders.map((provider) => (
            <button
              key={provider.id}
              data-focusable
              onClick={() => handleProviderSelect(provider.id)}
              className="flex items-center gap-3 p-4 rounded-xl bg-tc-dark-200 border border-tc-dark-400 text-left hover:border-tc-green/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-tc-dark-300 flex items-center justify-center text-tc-gray-light font-bold text-sm shrink-0">
                {provider.name.charAt(0)}
              </div>
              <span className="text-white text-sm font-medium truncate">{provider.name}</span>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <div className="text-center mt-6">
          <button
            data-focusable
            onClick={onCancel}
            className="text-tc-gray hover:text-white text-sm transition-colors"
          >
            Cancel &middot; Go back
          </button>
        </div>
      </div>
    </div>
  );
}
