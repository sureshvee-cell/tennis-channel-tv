"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Hls from "hls.js";
import { Match, countryFlags } from "@/data/mockData";

interface VideoPlayerProps {
  match: Match;
  compact?: boolean;
  muted?: boolean;
  showControls?: boolean;
}

export default function VideoPlayer({
  match,
  compact = false,
  muted: initialMuted = false,
  showControls = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [showControlsOverlay, setShowControlsOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAtLiveEdge, setIsAtLiveEdge] = useState(true);
  const [showCaptions, setShowCaptions] = useState(false);
  const [volume, setVolume] = useState(80);
  const [spoilerMode, setSpoilerMode] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [streamReady, setStreamReady] = useState(false);

  const isUpcoming = match.status === "upcoming";

  // Initialize HLS.js or native video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isUpcoming) return;

    const streamUrl = match.streamUrl;
    const fallbackUrl = match.fallbackUrl;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported() && streamUrl.endsWith(".m3u8")) {
      // Use HLS.js for browsers that don't natively support HLS
      const hls = new Hls({
        startLevel: -1, // auto quality
        capLevelToPlayerSize: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStreamReady(true);
        setBuffering(false);
        video.play().catch(() => {
          // Autoplay blocked — mute and retry
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          // HLS stream failed — fall back to MP4
          console.log("HLS error, falling back to MP4:", data.type);
          hls.destroy();
          hlsRef.current = null;
          video.src = fallbackUrl;
          video.load();
          video.play().catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          });
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        setStreamReady(true);
        setBuffering(false);
        video.play().catch(() => {});
      });
    } else {
      // No HLS support — use MP4 fallback directly
      video.src = fallbackUrl;
      video.load();
      video.addEventListener("loadeddata", () => {
        setStreamReady(true);
        setBuffering(false);
      });
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [match.streamUrl, match.fallbackUrl, isUpcoming]);

  const hideControlsAfterDelay = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControlsOverlay(false);
    }, 4000);
  }, [isPlaying]);

  useEffect(() => {
    if (showControls) {
      hideControlsAfterDelay();
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [showControls, hideControlsAfterDelay]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const goToLive = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = videoRef.current.duration - 1;
    setIsAtLiveEdge(true);
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
    if (seconds < 0) setIsAtLiveEdge(false);
  };

  const handleMouseMove = () => {
    setShowControlsOverlay(true);
    hideControlsAfterDelay();
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Upcoming match screen
  if (isUpcoming) {
    return (
      <div className="relative w-full h-full bg-tc-teal flex items-center justify-center">
        {/* Background image */}
        {match.thumbnailUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${match.thumbnailUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tc-teal via-tc-teal/80 to-tc-teal/60" />

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-400 text-lg font-semibold uppercase tracking-wider">Upcoming Match</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{match.tournament}</h2>
          <p className="text-tc-gray-light text-lg mb-8">{match.round} &middot; {match.court}</p>

          <div className="flex items-center justify-center gap-16 mb-10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-tc-teal-light flex items-center justify-center text-3xl mb-3 mx-auto border-2 border-tc-orange/30">
                {countryFlags[match.player1.countryCode] || "?"}
              </div>
              <p className="text-white font-semibold text-xl">{match.player1.name}</p>
              {match.player1.seed && <p className="text-tc-orange text-sm">Seed #{match.player1.seed}</p>}
            </div>
            <span className="text-tc-gray text-3xl font-light">vs</span>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-tc-teal-light flex items-center justify-center text-3xl mb-3 mx-auto border-2 border-tc-orange/30">
                {countryFlags[match.player2.countryCode] || "?"}
              </div>
              <p className="text-white font-semibold text-xl">{match.player2.name}</p>
              {match.player2.seed && <p className="text-tc-orange text-sm">Seed #{match.player2.seed}</p>}
            </div>
          </div>

          <p className="text-tc-gray text-base">
            Starts at {new Date(match.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <button
            data-focusable
            className="mt-6 px-8 py-3 rounded-full bg-tc-teal-light text-tc-orange font-semibold text-base border border-tc-teal-light hover:border-tc-orange transition-all"
          >
            Set Reminder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full bg-black overflow-hidden group"
      onMouseMove={handleMouseMove}
      onClick={() => {
        setShowControlsOverlay(true);
        hideControlsAfterDelay();
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        muted={isMuted}
        playsInline
        onTimeUpdate={() => {
          if (!videoRef.current) return;
          setCurrentTime(videoRef.current.currentTime);
          setDuration(videoRef.current.duration || 0);
        }}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => {
          setBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setShowEndScreen(true)}
        poster={match.thumbnailUrl}
      />

      {/* Buffering indicator */}
      {buffering && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
          <div className="w-14 h-14 border-4 border-tc-orange/30 border-t-tc-orange rounded-full animate-spin mb-4" />
          <p className="text-white text-sm font-medium">Loading stream...</p>
          <p className="text-tc-gray text-xs mt-1">{match.tournament} &middot; {match.round}</p>
        </div>
      )}

      {/* Match Info Banner (shows briefly at top) */}
      {!compact && streamReady && (
        <div className="absolute top-0 left-0 right-0 z-25 bg-gradient-to-b from-black/80 to-transparent px-6 py-4 pointer-events-none opacity-100 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold text-sm">{match.tournament}</span>
              <span className="text-tc-gray text-xs">{match.round}</span>
              {match.court && <span className="text-tc-gray text-xs">&middot; {match.court}</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-tc-gray">
              <span>Sample Content</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Score Overlay (always visible, top-left) */}
      {!compact && match.isLive && match.sets.length > 0 && (
        <div className="absolute top-14 left-5 z-30 glass rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="live-dot" />
            <span className="text-xs font-bold text-red-400 uppercase">{match.tournament}</span>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-tc-gray-light w-28 truncate">{match.player1.name}</span>
              <div className="flex gap-2">
                {match.sets.map((set, i) => (
                  <span key={i} className={`font-mono font-bold min-w-[1rem] text-center ${i === match.currentSet - 1 ? "text-tc-orange" : "text-white"}`}>
                    {set.player1}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-tc-gray-light w-28 truncate">{match.player2.name}</span>
              <div className="flex gap-2">
                {match.sets.map((set, i) => (
                  <span key={i} className={`font-mono font-bold min-w-[1rem] text-center ${i === match.currentSet - 1 ? "text-tc-orange" : "text-white"}`}>
                    {set.player2}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      {showControls && showControlsOverlay && (
        <div className="absolute inset-0 z-20 transition-opacity duration-300">
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 gradient-bottom pt-32 pb-6 px-8">
            {/* Progress bar */}
            {!spoilerMode && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-tc-gray-light font-mono">{formatTime(currentTime)}</span>
                <div className="flex-1 relative h-1 bg-tc-teal-light rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-tc-orange rounded-full transition-all"
                    style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
                  />
                  {/* Live edge marker */}
                  {match.isLive && <div className="absolute top-0 right-0 h-full w-1 bg-red-500" />}
                </div>
                <span className="text-xs text-tc-gray-light font-mono">{formatTime(duration)}</span>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Rewind 10s */}
                <button
                  data-focusable
                  onClick={() => seekRelative(-10)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="8" stroke="none">10</text>
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  data-focusable
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                {/* Forward 10s */}
                <button
                  data-focusable
                  onClick={() => seekRelative(10)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6" />
                    <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="8" stroke="none">10</text>
                  </svg>
                </button>

                {/* Volume */}
                <button
                  data-focusable
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                {/* Go to Live button */}
                {!isAtLiveEdge && match.isLive && (
                  <button
                    data-focusable
                    onClick={goToLive}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/80 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    <div className="live-dot" />
                    Go to Live
                  </button>
                )}

                {match.isLive && isAtLiveEdge && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20">
                    <div className="live-dot" />
                    <span className="text-red-400 text-sm font-bold">LIVE</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Captions */}
                <button
                  data-focusable
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    showCaptions ? "bg-tc-orange text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" stroke="none">CC</text>
                  </svg>
                </button>

                {/* Spoiler Mode */}
                <button
                  data-focusable
                  onClick={() => setSpoilerMode(!spoilerMode)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    spoilerMode ? "bg-tc-orange text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title="Spoiler Mode - Hide progress bar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>

                {/* Settings */}
                <button
                  data-focusable
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End of Stream Screen */}
      {showEndScreen && (
        <div className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stream Ended</h3>
            <p className="text-tc-gray-light mb-8">
              {match.player1.name} vs {match.player2.name}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                data-focusable
                onClick={() => {
                  setShowEndScreen(false);
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }}
                className="px-8 py-3 rounded-full bg-tc-orange text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Replay
              </button>
              <a
                href="/"
                data-focusable
                className="px-8 py-3 rounded-full bg-tc-teal-light text-white font-semibold border border-tc-teal-light hover:border-tc-gray transition-colors"
              >
                Browse More
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
