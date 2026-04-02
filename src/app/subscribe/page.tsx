"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { mockSubscriptionPlans } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function SubscribePage() {
  const { signIn, isAuthenticated, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [step, setStep] = useState<"plans" | "confirm" | "processing" | "success">("plans");

  const handleSubscribe = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 3000));
    if (!isAuthenticated) {
      await signIn("subscriber@tennischannel.com", "pass");
    }
    setStep("success");
  };

  if (step === "processing") {
    return (
      <div className="flex h-screen bg-tc-teal overflow-hidden">
        <Navigation />
        <main className="main-content flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-tc-orange/30 border-t-tc-orange rounded-full animate-spin mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">Processing your subscription</h3>
            <p className="text-tc-gray-light text-sm">Connecting to platform payment system...</p>
            <p className="text-tc-gray text-xs mt-4">
              In production, this would use the platform&apos;s native In-App Purchase flow
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (step === "success") {
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
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Tennis Channel+!</h2>
            <p className="text-tc-gray-light mb-8">Your subscription is now active. Enjoy unlimited tennis.</p>
            <a
              href="/"
              data-focusable
              className="px-10 py-4 rounded-full bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors inline-block"
            >
              Start Watching
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-tc-teal overflow-hidden">
      <Navigation />
      <main className="main-content">
        {/* Hero Banner */}
        <div className="relative h-64 flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(232, 119, 46, 0.25) 0%, rgba(11, 23, 25, 0.95) 60%)" }}>
          <div className="absolute inset-0 flex items-center px-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tc-orange to-orange-600 flex items-center justify-center text-white font-bold text-xl">T</div>
                <div className="bg-tc-orange/20 px-3 py-1 rounded-full">
                  <span className="text-tc-orange text-sm font-bold">PLUS</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Your All-Access Pass to Live Tennis
              </h1>
              <p className="text-tc-gray-light text-base max-w-lg">
                Watch every match, every tournament, with exclusive content and multiview. Cancel anytime.
              </p>
            </div>
            <div className="flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(232, 119, 46, 0.3) 0%, rgba(26, 47, 51, 0.8) 100%)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="1" opacity="0.4">
                  <polygon points="5 3 19 12 5 21 5 3" fill="#E8772E" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="px-12 py-10">
          <div className="flex gap-8 justify-center mb-10">
            {mockSubscriptionPlans.map((plan) => (
              <button
                key={plan.id}
                data-focusable
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative w-80 p-8 rounded-2xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? "border-tc-orange bg-tc-orange/5 shadow-lg shadow-tc-orange/10"
                    : "border-tc-teal-light bg-tc-teal-light hover:border-tc-gray/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-tc-orange text-white text-xs font-bold">
                    BEST VALUE
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-tc-gray text-base">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-tc-gray-light">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {selectedPlan === plan.id && (
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-tc-teal-light text-tc-orange font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="16 9 10.5 14.5 8 12" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Subscribe Button */}
          <div className="text-center mb-12">
            <button
              data-focusable
              onClick={() => setStep("confirm")}
              className="px-12 py-4 rounded-full bg-tc-orange text-white font-bold text-xl hover:bg-orange-600 transition-colors"
            >
              Continue with {mockSubscriptionPlans.find((p) => p.id === selectedPlan)?.name} Plan
            </button>
            <p className="text-tc-gray text-sm mt-4">
              Payment will be processed through your platform&apos;s In-App Purchase system.
            </p>
            <p className="text-tc-gray text-xs mt-2">
              Cancel anytime. No commitment. Free trial may be available.
            </p>
          </div>

          {/* Confirm Dialog */}
          {step === "confirm" && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
              <div className="bg-tc-teal-light rounded-2xl p-8 max-w-md w-full border border-tc-teal-light">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Confirm Subscription</h3>
                <div className="bg-tc-teal rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-tc-gray-light">Plan</span>
                    <span className="text-white font-semibold">
                      Tennis Channel+ {mockSubscriptionPlans.find((p) => p.id === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tc-gray-light">Price</span>
                    <span className="text-white font-bold text-lg">
                      {mockSubscriptionPlans.find((p) => p.id === selectedPlan)?.price}
                      {mockSubscriptionPlans.find((p) => p.id === selectedPlan)?.period}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    data-focusable
                    onClick={() => setStep("plans")}
                    className="flex-1 py-3 rounded-xl bg-tc-teal text-tc-gray font-medium border border-tc-teal-light hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    data-focusable
                    onClick={handleSubscribe}
                    className="flex-1 py-3 rounded-xl bg-tc-orange text-white font-bold hover:bg-orange-600 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                    <circle cx="12" cy="12" r="2" fill="#E8772E" />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
                    <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                  </svg>
                ),
                title: "Live Matches",
                desc: "Every ATP, WTA, and Grand Slam match live as it happens",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                    <rect x="2" y="2" width="9" height="9" rx="1" />
                    <rect x="13" y="2" width="9" height="9" rx="1" />
                    <rect x="2" y="13" width="9" height="9" rx="1" />
                    <rect x="13" y="13" width="9" height="9" rx="1" />
                  </svg>
                ),
                title: "Multiview",
                desc: "Watch up to 4 matches simultaneously on one screen",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ),
                title: "VOD Library",
                desc: "Thousands of hours of classic matches and documentaries",
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-tc-teal-light border border-tc-teal-light text-center">
                <div className="w-14 h-14 rounded-xl bg-tc-orange/10 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-tc-gray text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
