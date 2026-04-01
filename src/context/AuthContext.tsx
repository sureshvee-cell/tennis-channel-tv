"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  subscriptionTier: "none" | "free-account" | "subscriber" | "cable";
  provider?: string;
  devices: string[];
  maxDevices: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithCode: (code: string) => Promise<boolean>;
  signInWithCable: (providerId: string) => Promise<boolean>;
  signOut: () => void;
  createFreeAccount: (email: string) => Promise<boolean>;
  checkEntitlement: (required: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate Auth0 sign-in
    await new Promise((r) => setTimeout(r, 1500));
    setUser({
      email,
      name: email.split("@")[0],
      subscriptionTier: "subscriber",
      devices: ["Living Room TV", "Bedroom TV"],
      maxDevices: 5,
    });
    setIsLoading(false);
    return true;
  }, []);

  const signInWithCode = useCallback(async (_code: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setUser({
      email: "viewer@tennischannel.com",
      name: "Tennis Fan",
      subscriptionTier: "subscriber",
      devices: ["Smart TV"],
      maxDevices: 5,
    });
    setIsLoading(false);
    return true;
  }, []);

  const signInWithCable = useCallback(async (providerId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setUser({
      email: "cable@provider.com",
      name: "Cable Subscriber",
      subscriptionTier: "cable",
      provider: providerId,
      devices: ["Smart TV"],
      maxDevices: 5,
    });
    setIsLoading(false);
    return true;
  }, []);

  const createFreeAccount = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setUser({
      email,
      name: email.split("@")[0],
      subscriptionTier: "free-account",
      devices: ["Smart TV"],
      maxDevices: 5,
    });
    setIsLoading(false);
    return true;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const checkEntitlement = useCallback(
    (required: string): boolean => {
      if (required === "free") return true;
      if (!user) return false;
      if (required === "free-account") return true;
      if (required === "cable") return user.subscriptionTier === "cable" || user.subscriptionTier === "subscriber";
      if (required === "subscription") return user.subscriptionTier === "subscriber" || user.subscriptionTier === "cable";
      return false;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signInWithCode,
        signInWithCable,
        signOut,
        createFreeAccount,
        checkEntitlement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
