"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Match } from "@/data/mockData";

interface HeroCarouselProps {
  matches: Match[];
}

const heroMatches = [
  {
    id: "h1",
    title: "Charleston Open Tennis 2026",
    subtitle: "WTA 500 - Early Rounds LIVE",
    status: "LIVE",
    backgroundImage: "linear-gradient(135deg, rgba(232, 119, 46, 0.15) 0%, rgba(11, 23, 25, 0.8) 100%)",
  },
  {
    id: "h2",
    title: "Houston ATP 250",
    subtitle: "March 30 - April 5, 2026",
    status: "UPCOMING",
    backgroundImage: "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(11, 23, 25, 0.8) 100%)",
  },
  {
    id: "h3",
    title: "ATP Marrakech & ATP Bucharest",
    subtitle: "Live & Upcoming Matches",
    status: "LIVE",
    backgroundImage: "linear-gradient(135deg, rgba(232, 119, 46, 0.15) 0%, rgba(11, 23, 25, 0.8) 100%)",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: slide.backgroundImage }}
        >
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {slide.status === "LIVE" && (
                    <div className="flex items-center gap-2 bg-tc-live/20 px-3 py-1.5 rounded-full">
                      <div className="live-dot" style={{ width: 8, height: 8 }} />
                      <span className="text-tc-live text-sm font-bold uppercase">LIVE</span>
                    </div>
                  )}
                  {slide.status === "UPCOMING" && (
                    <div className="flex items-center gap-2 bg-tc-orange/20 px-3 py-1.5 rounded-full">
                      <span className="text-tc-orange text-sm font-bold uppercase">UPCOMING</span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{slide.title}</h1>
                <p className="text-tc-gray-light text-lg">{slide.subtitle}</p>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {heroMatches.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    data-focusable
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide ? "bg-tc-orange w-8" : "bg-tc-gray-light"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  data-focusable
                  className="w-10 h-10 rounded-full bg-tc-dark-300/50 flex items-center justify-center text-white hover:bg-tc-orange transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  data-focusable
                  className="w-10 h-10 rounded-full bg-tc-dark-300/50 flex items-center justify-center text-white hover:bg-tc-orange transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
