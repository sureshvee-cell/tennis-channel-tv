"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import Navigation from "@/components/Navigation";

type AuthMode = "choose" | "email" | "qr-code" | "device-code" | "register";

export default function AuthPage() {
  const { signIn, signInWithCode, createFreeAccount, isLoading, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<AuthMode>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeField, setActiveField] = useState<"email" | "password" | null>(null);
  const [deviceCode, setDeviceCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Generate a random device code
  useEffect(() => {
    setDeviceCode(
      Math.random().toString(36).substring(2, 6).toUpperCase() +
        "-" +
        Math.random().toString(36).substring(2, 6).toUpperCase()
    );
  }, []);

  // Redirect on success
  useEffect(() => {
    if (isAuthenticated && success) {
      window.location.href = "/";
    }
  }, [isAuthenticated, success]);

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    setError("");
    const ok = await signIn(email, password);
    if (ok) setSuccess(true);
    else setError("Invalid credentials. Please try again. (Error ID: TC-AUTH-1001)");
  };

  const handleCodeSignIn = async () => {
    setError("");
    const ok = await signInWithCode(deviceCode);
    if (ok) setSuccess(true);
  };

  const handleCreateAccount = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    const ok = await createFreeAccount(email);
    if (ok) setSuccess(true);
  };

  if (success) {
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
            <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
            <p className="text-tc-gray-light">Redirecting to Tennis Channel...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-tc-teal overflow-hidden">
      <Navigation />
      <main className="main-content flex items-center justify-center">
        <div className="flex w-full max-w-5xl mx-auto px-8 gap-12">
          {/* Left Side - Branding */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden h-[500px]" style={{ background: "linear-gradient(135deg, rgba(232, 119, 46, 0.2) 0%, rgba(11, 23, 25, 0.95) 100%)" }}>
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tc-orange to-orange-600 flex items-center justify-center text-white font-bold text-xl">T</div>
                    <div>
                      <p className="text-white font-bold text-lg">Tennis Channel</p>
                      <p className="text-tc-gray text-xs">Stream Live Tennis</p>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Watch Tennis<br/>Anytime, Anywhere</h2>
                  <p className="text-tc-gray-light text-sm leading-relaxed max-w-sm">
                    Sign in to access live matches, exclusive content, multiview mode, and thousands of hours of tennis programming.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                        <circle cx="12" cy="12" r="2" fill="#E8772E" />
                        <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
                        <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                      </svg>
                    </div>
                    <span className="text-tc-gray-light text-sm">Live ATP, WTA & Grand Slam matches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                        <rect x="2" y="2" width="9" height="9" rx="1" />
                        <rect x="13" y="2" width="9" height="9" rx="1" />
                        <rect x="2" y="13" width="9" height="9" rx="1" />
                        <rect x="13" y="13" width="9" height="9" rx="1" />
                      </svg>
                    </div>
                    <span className="text-tc-gray-light text-sm">Multiview - 4 matches at once</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    <span className="text-tc-gray-light text-sm">Full VOD library &amp; highlights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-tc-orange to-orange-600 text-white font-extrabold px-5 py-3 rounded-lg mb-4">
                <span className="block text-sm tracking-widest">TENNIS</span>
                <span className="block text-sm tracking-widest">CHANNEL</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                {mode === "register" ? "Create Your Account" : "Sign In"}
              </h1>
            </div>

            {/* Mode Selection */}
            {mode === "choose" && (
              <div className="space-y-3">
                <button
                  data-focusable
                  onClick={() => setMode("email")}
                  className="w-full p-4 rounded-xl bg-tc-teal-light border border-tc-teal-light text-left flex items-center gap-4 hover:border-tc-orange/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-tc-orange/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8772E" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4l-10 8L2 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Sign in with Email</h3>
                    <p className="text-tc-gray text-xs">Use on-screen keyboard to enter credentials</p>
                  </div>
                </button>

                <button
                  data-focusable
                  onClick={() => setMode("qr-code")}
                  className="w-full p-4 rounded-xl bg-tc-teal-light border border-tc-teal-light text-left flex items-center gap-4 hover:border-tc-orange/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <rect x="14" y="2" width="8" height="8" rx="1" />
                      <rect x="2" y="14" width="8" height="8" rx="1" />
                      <rect x="14" y="14" width="4" height="4" />
                      <line x1="22" y1="14" x2="22" y2="22" />
                      <line x1="14" y1="22" x2="22" y2="22" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Scan QR Code</h3>
                    <p className="text-tc-gray text-xs">Use your phone to sign in quickly</p>
                  </div>
                </button>

                <button
                  data-focusable
                  onClick={() => setMode("device-code")}
                  className="w-full p-4 rounded-xl bg-tc-teal-light border border-tc-teal-light text-left flex items-center gap-4 hover:border-tc-orange/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Enter Code on Another Device</h3>
                    <p className="text-tc-gray text-xs">Go to tennischannel.com/activate</p>
                  </div>
                </button>

                <div className="pt-3 text-center">
                  <button
                    data-focusable
                    onClick={() => setMode("register")}
                    className="text-tc-orange font-medium text-sm hover:underline transition-all"
                  >
                    New here? Create a free account
                  </button>
                </div>
              </div>
            )}

            {/* Email Sign In */}
            {mode === "email" && (
              <div>
                <div className="mb-4">
                  <label className="text-tc-gray-light text-sm mb-2 block">Email Address</label>
                  <button
                    onClick={() => setActiveField("email")}
                    data-focusable
                    className="w-full bg-tc-teal-light border border-tc-teal-light rounded-xl px-5 py-4 text-left hover:border-tc-orange/50 transition-all"
                  >
                    <span className={email ? "text-white" : "text-tc-gray"}>
                      {email || "Tap to enter email..."}
                    </span>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="text-tc-gray-light text-sm mb-2 block">Password</label>
                  <button
                    onClick={() => setActiveField("password")}
                    data-focusable
                    className="w-full bg-tc-teal-light border border-tc-teal-light rounded-xl px-5 py-4 text-left hover:border-tc-orange/50 transition-all"
                  >
                    <span className={password ? "text-white" : "text-tc-gray"}>
                      {password ? "\u2022".repeat(password.length) : "Tap to enter password..."}
                    </span>
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  data-focusable
                  onClick={handleEmailSignIn}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {activeField && (
                  <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center pb-8">
                    <OnScreenKeyboard
                      value={activeField === "email" ? email : password}
                      onInput={(v) => activeField === "email" ? setEmail(v) : setPassword(v)}
                      onSubmit={() => setActiveField(null)}
                      onClose={() => setActiveField(null)}
                      placeholder={activeField === "email" ? "Enter email..." : "Enter password..."}
                      isPassword={activeField === "password"}
                    />
                  </div>
                )}

                <button
                  data-focusable
                  onClick={() => setMode("choose")}
                  className="w-full mt-4 text-tc-gray text-sm text-center hover:text-white transition-colors"
                >
                  &larr; Back to sign-in options
                </button>
              </div>
            )}

            {/* QR Code */}
            {mode === "qr-code" && (
              <div className="text-center">
                <div className="qr-container mx-auto mb-6">
                  <div className="w-48 h-48 bg-white flex items-center justify-center">
                    <svg width="180" height="180" viewBox="0 0 200 200">
                      <rect x="10" y="10" width="60" height="60" fill="black" />
                      <rect x="20" y="20" width="40" height="40" fill="white" />
                      <rect x="28" y="28" width="24" height="24" fill="black" />
                      <rect x="130" y="10" width="60" height="60" fill="black" />
                      <rect x="140" y="20" width="40" height="40" fill="white" />
                      <rect x="148" y="28" width="24" height="24" fill="black" />
                      <rect x="10" y="130" width="60" height="60" fill="black" />
                      <rect x="20" y="140" width="40" height="40" fill="white" />
                      <rect x="28" y="148" width="24" height="24" fill="black" />
                      <rect x="80" y="10" width="12" height="12" fill="black" />
                      <rect x="100" y="10" width="12" height="12" fill="black" />
                      <rect x="80" y="30" width="12" height="12" fill="black" />
                      <rect x="80" y="80" width="12" height="12" fill="black" />
                      <rect x="100" y="80" width="12" height="12" fill="black" />
                      <rect x="80" y="100" width="12" height="12" fill="black" />
                      <rect x="130" y="80" width="12" height="12" fill="black" />
                      <rect x="150" y="100" width="12" height="12" fill="black" />
                      <rect x="170" y="80" width="12" height="12" fill="black" />
                      <rect x="130" y="130" width="20" height="20" fill="black" />
                      <rect x="160" y="130" width="12" height="12" fill="black" />
                      <rect x="130" y="160" width="12" height="12" fill="black" />
                      <rect x="160" y="160" width="30" height="12" fill="black" />
                      <rect x="170" y="170" width="20" height="20" fill="black" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Scan to Sign In</h3>
                <p className="text-tc-gray-light text-sm mb-6 max-w-sm mx-auto">
                  Open your camera app and scan this QR code to sign in from your phone or tablet
                </p>
                <p className="text-tc-gray text-xs">
                  Or visit <span className="text-tc-orange font-mono">tennischannel.com/tv</span> on any device
                </p>

                <button
                  data-focusable
                  onClick={handleCodeSignIn}
                  className="mt-6 px-6 py-3 rounded-full bg-tc-orange text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  Simulate Successful Scan
                </button>

                <button
                  data-focusable
                  onClick={() => setMode("choose")}
                  className="block w-full mt-4 text-tc-gray text-sm text-center hover:text-white transition-colors"
                >
                  &larr; Back to sign-in options
                </button>
              </div>
            )}

            {/* Device Code */}
            {mode === "device-code" && (
              <div className="text-center">
                <div className="bg-tc-teal-light rounded-2xl p-8 border border-tc-teal-light mb-6">
                  <p className="text-tc-gray text-sm mb-3">Your activation code:</p>
                  <p className="text-4xl font-bold font-mono text-white tracking-[0.3em]">{deviceCode}</p>
                </div>

                <div className="space-y-4 text-left bg-tc-teal-light rounded-xl p-6 border border-tc-teal-light">
                  <h4 className="text-white font-semibold text-center mb-4">How to activate:</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center shrink-0 text-tc-orange font-bold text-sm">1</div>
                    <p className="text-tc-gray-light text-sm">On your phone, tablet, or computer, go to <span className="text-tc-orange font-mono">tennischannel.com/activate</span></p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center shrink-0 text-tc-orange font-bold text-sm">2</div>
                    <p className="text-tc-gray-light text-sm">Sign in with your Tennis Channel account</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-tc-orange/20 flex items-center justify-center shrink-0 text-tc-orange font-bold text-sm">3</div>
                    <p className="text-tc-gray-light text-sm">Enter the code shown above</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 text-tc-gray text-sm">
                  <div className="w-4 h-4 border-2 border-tc-gray/30 border-t-tc-orange rounded-full animate-spin" />
                  Waiting for activation...
                </div>

                <button
                  data-focusable
                  onClick={handleCodeSignIn}
                  className="mt-4 px-6 py-3 rounded-full bg-tc-orange text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  Simulate Activation
                </button>

                <button
                  data-focusable
                  onClick={() => setMode("choose")}
                  className="block w-full mt-4 text-tc-gray text-sm text-center hover:text-white transition-colors"
                >
                  &larr; Back to sign-in options
                </button>
              </div>
            )}

            {/* Register */}
            {mode === "register" && (
              <div>
                <p className="text-tc-gray-light text-sm text-center mb-6">
                  Create a free account to access select content. No credit card required.
                </p>

                <div className="mb-6">
                  <label className="text-tc-gray-light text-sm mb-2 block">Email Address</label>
                  <button
                    onClick={() => setActiveField("email")}
                    data-focusable
                    className="w-full bg-tc-teal-light border border-tc-teal-light rounded-xl px-5 py-4 text-left hover:border-tc-orange/50 transition-all"
                  >
                    <span className={email ? "text-white" : "text-tc-gray"}>
                      {email || "Tap to enter email..."}
                    </span>
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  data-focusable
                  onClick={handleCreateAccount}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-tc-orange text-white font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Free Account"}
                </button>

                <p className="text-tc-gray text-xs text-center mt-4">
                  We&apos;ll send a verification email to confirm your address.
                </p>

                {activeField && (
                  <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center pb-8">
                    <OnScreenKeyboard
                      value={email}
                      onInput={setEmail}
                      onSubmit={() => setActiveField(null)}
                      onClose={() => setActiveField(null)}
                      placeholder="Enter email..."
                    />
                  </div>
                )}

                <button
                  data-focusable
                  onClick={() => setMode("choose")}
                  className="block w-full mt-4 text-tc-gray text-sm text-center hover:text-white transition-colors"
                >
                  &larr; Back to sign-in options
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
