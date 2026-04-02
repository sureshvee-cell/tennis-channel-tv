"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Search", href: "/search", icon: "search" },
  { label: "Schedule", href: "/#schedule", icon: "schedule" },
  { label: "Live", href: "/#live", icon: "live" },
  { label: "Tournaments", href: "/#tournaments", icon: "tournaments" },
  { label: "Series", href: "/#series", icon: "series" },
];

const NavIcon = ({ icon, size = 24 }: { icon: string; size?: number }) => {
  const s = size;
  switch (icon) {
    case "home":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "search":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
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
    case "tournaments":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6-3 6 3v6l-6 3-6-3V9z" />
          <path d="M12 12v6" />
        </svg>
      );
    case "series":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 2v5" />
          <path d="M8 2v5" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Navigation() {
  const { user, isAuthenticated, signOut } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar-nav">
      {/* Logo */}
      <Link
        href="/"
        data-focusable
        className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-tc-orange to-orange-600 text-white font-bold text-lg flex-shrink-0 transition-all hover:scale-105"
      >
        T
      </Link>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            data-focusable
            title={item.label}
            className={`sidebar-item ${isActive(item.href) ? "active" : ""}`}
          >
            <NavIcon icon={item.icon} size={24} />
          </Link>
        ))}
      </nav>

      {/* Auth Section at Bottom */}
      <div className="flex flex-col gap-2 items-center pt-4 border-t border-tc-teal-light">
        {isAuthenticated ? (
          <>
            <div className="w-10 h-10 rounded-full bg-tc-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button
              data-focusable
              onClick={signOut}
              title="Sign Out"
              className="sidebar-item text-xs opacity-75 hover:opacity-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              data-focusable
              title="Sign In"
              className="w-10 h-10 rounded-md border-2 border-tc-orange text-tc-orange flex items-center justify-center font-bold text-sm hover:bg-tc-orange hover:text-white transition-all"
            >
              IN
            </Link>
            <Link
              href="/subscribe"
              data-focusable
              title="Sign Up"
              className="w-10 h-10 rounded-md bg-tc-orange text-white flex items-center justify-center font-bold text-sm hover:bg-orange-600 transition-all"
            >
              UP
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
