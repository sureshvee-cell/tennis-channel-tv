"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockSubscriptionPlans } from "@/data/mockData";

interface SubscriptionGateProps {
  requiredEntitlement: string;
  matchTitle?: string;
  onCableSignIn: () => void;
}

export default function SubscriptionGate({
  requiredEntitlement,
  matchTitle,
  onCableSignIn,
}: SubscriptionGateProps) {
  const { isAuthenticated, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("annual");

  const getMessage = () => {
    if (requiredEntitlement === "cable") {
      return {
        title: "TV Provider Sign-In Required",
        subtitle: "This content is available to cable and satellite subscribers.",
        showCableOption: true,
        showSubscribeOption: true,
      };
    }
    if (requiredEntitlement === "subscription") {
      return {
        title: "Tennis Channel+ Subscription Required",
        subtitle: "Subscribe to Tennis Channel+ to watch live matches and exclusive content.",
        showCableOption: true,
        showSubscribeOption: true,
      };
    }
    if (requiredEntitlement === "free-account") {
      return {
        title: "Free Account Required",
        subtitle: "Create a free account to watch this content. No subscription or payment needed.",
        showCableOption: false,
        showSubscribeOption: false,
      };
    }
    return {
      title: "Sign In Required",
      subtitle: "Please sign in to access this content.",
      showCableOption: false,
      showSubscribeOption: false,
    };
  };

  const msg = getMessage();

  return (
    <div className="fixed inset-0 z-40 bg-tc-teal/95 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-tc-orange/10 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{msg.title}</h2>
          <p className="text-tc-gray-light text-base max-w-md mx-auto">{msg.subtitle}</p>
          {matchTitle && (
            <p className="text-tc-orange text-sm mt-3 font-medium">{matchTitle}</p>
          )}
        </div>

        {/* Subscription Plans */}
        {msg.showSubscribeOption && (
          <div className="flex gap-6 justify-center mb-8">
            {mockSubscriptionPlans.map((plan) => (
              <button
                key={plan.id}
                data-focusable
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative w-72 p-6 rounded-2xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? "border-tc-orange bg-tc-orange/5"
                    : "border-tc-teal-light bg-tc-teal-light hover:border-tc-gray/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-tc-orange text-white text-xs font-bold">
                    BEST VALUE
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-tc-gray text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-tc-gray-light">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {selectedPlan === plan.id && (
                  <div className="mt-4 pt-4 border-t border-tc-teal-light">
                    <div className="w-5 h-5 rounded-full bg-tc-orange flex items-center justify-center mx-auto">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          {msg.showSubscribeOption && (
            <a
              href="/subscribe"
              data-focusable
              className="px-10 py-4 rounded-full bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors"
            >
              Subscribe Now
            </a>
          )}

          {msg.showCableOption && (
            <button
              data-focusable
              onClick={onCableSignIn}
              className="px-8 py-3 rounded-full bg-tc-teal-light text-white font-medium border border-tc-teal-light hover:border-tc-gray transition-colors"
            >
              Sign In with TV Provider
            </button>
          )}

          {requiredEntitlement === "free-account" && (
            <a
              href="/auth?mode=register"
              data-focusable
              className="px-10 py-4 rounded-full bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors"
            >
              Create Free Account
            </a>
          )}

          {!isAuthenticated && (
            <a
              href="/auth"
              data-focusable
              className="text-tc-gray-light hover:text-white text-sm transition-colors"
            >
              Already have an account? Sign In
            </a>
          )}

          <a
            href="/"
            data-focusable
            className="text-tc-gray hover:text-tc-gray-light text-sm transition-colors mt-2"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
