"use client";

import React, { useState, useCallback } from "react";

interface OnScreenKeyboardProps {
  onInput: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  value: string;
  placeholder?: string;
  isPassword?: boolean;
}

const ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@"],
  ["z", "x", "c", "v", "b", "n", "m", ".", "-", "_"],
];

const SPECIAL_KEYS = [
  { label: "Space", width: "flex-[3]" },
  { label: ".com", width: "flex-1" },
  { label: "Delete", width: "flex-1" },
  { label: "Clear", width: "flex-1" },
  { label: "Done", width: "flex-1" },
];

export default function OnScreenKeyboard({
  onInput,
  onSubmit,
  onClose,
  value,
  placeholder = "Type here...",
  isPassword = false,
}: OnScreenKeyboardProps) {
  const [isUpperCase, setIsUpperCase] = useState(false);

  const handleKeyPress = useCallback(
    (key: string) => {
      switch (key) {
        case "Space":
          onInput(value + " ");
          break;
        case ".com":
          onInput(value + ".com");
          break;
        case "Delete":
          onInput(value.slice(0, -1));
          break;
        case "Clear":
          onInput("");
          break;
        case "Done":
          onSubmit();
          break;
        case "Shift":
          setIsUpperCase(!isUpperCase);
          break;
        default:
          onInput(value + (isUpperCase ? key.toUpperCase() : key));
          if (isUpperCase) setIsUpperCase(false);
          break;
      }
    },
    [value, isUpperCase, onInput, onSubmit]
  );

  return (
    <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
      {/* Input display */}
      <div className="bg-tc-teal rounded-xl px-5 py-4 mb-5 border border-tc-teal-light">
        <p className={`text-lg font-mono ${value ? "text-white" : "text-tc-gray"}`}>
          {value ? (isPassword ? "\u2022".repeat(value.length) : value) : placeholder}
        </p>
        <div className="w-0.5 h-5 bg-tc-orange inline-block animate-pulse ml-0.5" />
      </div>

      {/* Keyboard rows */}
      <div className="flex flex-col gap-2">
        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 justify-center">
            {rowIdx === 2 && (
              <button
                data-focusable
                onClick={() => handleKeyPress("Shift")}
                className={`keyboard-key px-4 ${isUpperCase ? "!bg-tc-orange" : ""}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            )}
            {row.map((key) => (
              <button
                key={key}
                data-focusable
                onClick={() => handleKeyPress(key)}
                className="keyboard-key"
              >
                {isUpperCase ? key.toUpperCase() : key}
              </button>
            ))}
          </div>
        ))}

        {/* Special keys row */}
        <div className="flex gap-1.5 mt-1">
          {SPECIAL_KEYS.map((key) => (
            <button
              key={key.label}
              data-focusable
              onClick={() => handleKeyPress(key.label)}
              className={`keyboard-key ${key.width} ${
                key.label === "Done" ? "!bg-tc-orange font-semibold" : ""
              }`}
            >
              {key.label}
            </button>
          ))}
        </div>
      </div>

      {/* Close hint */}
      <div className="mt-4 text-center">
        <button
          data-focusable
          onClick={onClose}
          className="text-tc-gray text-sm hover:text-white transition-colors"
        >
          Press <kbd className="px-1.5 py-0.5 bg-tc-teal-light rounded text-xs">ESC</kbd> to close keyboard
        </button>
      </div>
    </div>
  );
}
