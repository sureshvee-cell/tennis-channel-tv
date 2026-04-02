"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Live", href: "/#live", icon: "live" },
  { label: "Schedule", href: "/#schedule", icon: "schedule" },
  { label: "Multiview", href: "/multiview", icon: "multiview" },
];

const NavIcon = ({ icon, size = 20 }: { icon: string; size?: number }) => {
  const s = size;
  switch (icon) {
    case "home":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "live":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
          <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
        </svg>
      );
    case "schedule":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "multiview":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="9" height="9" rx="1" />
          <rect x="13" y="2" width="9" height="9" rx="1" />
          <rect x="2" y="13" width="9" height="9" rx="1" />
          <rect x="13" y="13" width="9" height="9" rx="1" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Navigation() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [activeItem, setActiveItem] = useState(0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-tc-dark-300">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mr-8">
          <div className="flex items-center">
            <div className="bg-tc-green text-white font-extrabold text-xl px-2 py-1 leading-none">
              <span className="block text-[10px] tracking-wider">TENNIS</span>
              <span className="block text-[10px] tracking-wider">CHANNEL</span>
            </div>
          </div>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-1 flex-1">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              data-focusable
              onClick={() => setActiveItem(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-tv-sm font-medium transition-all ${
                activeItem === i
                  ? "bg-tc-green/20 text-tc-green"
                  : "text-tc-gray-light hover:text-white"
              }`}
            >
              <NavIcon icon={item.icon} size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User / Auth */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 text-tv-sm">
                <div className="w-8 h-8 rounded-full bg-tc-green flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-tc-gray-light">{user?.name}</span>
              </div>
              <button
                data-focusable
                onClick={signOut}
                className="px-4 py-2 rounded-full text-tv-xs text-tc-gray border border-tc-dark-400 hover:border-tc-gray transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              data-focusable
              className="px-6 py-2.5 rounded-full bg-tc-green text-white text-tv-sm font-semibold hover:bg-tc-green-dark transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
