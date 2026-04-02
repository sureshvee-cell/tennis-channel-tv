"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Match } from "@/data/mockData";

interface HeroCarouselProps {
  matches?: Match[];
}

const heroMatches = [
  {
    id: "h1",
    title: "Charleston Open Tennis 2026",
    subtitle: "WTA 500 - Early Rounds LIVE",
    status: "LIVE",
    matchId: "m1",
    backgroundImage: "linear-gradient(135deg, rgba(232, 119, 46, 0.2) 0%, rgba(11, 23, 25, 0.9) 100%)",
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=600&fit=crop&q=80",
  },
  {
    id: "h2",
    title: "Houston ATP 250",
    subtitle: "March 30 - April 5, 2026",
    status: "UPCOMING",
    matchId: "m6",
    backgroundImage: "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(11, 23, 25, 0.9) 100%)",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=600&fit=crop&q=80",
  },
  {
    id: "h3",
    title: "ATP Marrakech & ATP Bucharest",
    subtitle: "Live & Upcoming Matches",
    status: "LIVE",
    matchId: "m3",
    backgroundImage: "linear-gradient(135deg, rgba(232, 119, 46, 0.2) 0%, rgba(11, 23, 25, 0.9) 100%)",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=600&fit=crop&q=80",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMatches.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMatches.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMatches.length) % heroMatches.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-tc-teal-light group">
      {/* Slides */}
      {heroMatches.map((slide, index) => (
        <Link
          href={`/player?matchId=${slide.matchId}`}
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
            }}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: slide.backgroundImage }}
          />
          {/* Extra dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-tc-teal/90 via-tc-teal/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-start justify-between">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  {slide.status === "LIVE" && (
                    <div className="flex items-center gap-2 bg-tc-live/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <div className="live-dot" style={{ width: 8, height: 8 }} />
                      <span className="text-tc-live text-sm font-bold uppercase">LIVE</span>
                    </div>
                  )}
                  {slide.status === "UPCOMING" && (
                    <div className="flex items-center gap-2 bg-tc-orange/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-tc-orange text-sm font-bold uppercase">UPCOMING</span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{slide.title}</h1>
                <p className="text-tc-gray-light text-lg drop-shadow-md">{slide.subtitle}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tc-orange text-white font-semibold text-sm hover:bg-orange-600 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Now
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {heroMatches.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); goToSlide(i); }}
                    data-focusable
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? "bg-tc-orange w-10" : "bg-white/30 w-6 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.preventDefault(); prevSlide(); }}
                  data-focusable
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tc-orange transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); nextSlide(); }}
                  data-focusable
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tc-orange transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
