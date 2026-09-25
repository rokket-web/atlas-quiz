"use client";

import { useEffect, useState } from "react";

interface ClosingScreenProps {
  onContinue: () => void;
}

const TAPE_TEXT = "GOING OUT OF BUSINESS  •  GOING OUT OF BUSINESS  •  ";

export default function ClosingScreen({ onContinue }: ClosingScreenProps) {
  const [showThreat, setShowThreat] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowThreat(true), 1200);
    const t2 = setTimeout(() => setShowButton(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden"
      style={{ backgroundColor: "#111" }}
    >
      {/* Static scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px)",
          zIndex: 1,
        }}
      />

      {/* Glitchy static noise using random stripes */}
      <div
        className="absolute inset-0 pointer-events-none glitch-flicker"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.35'/%3E%3C/svg%3E\")",
          backgroundSize: "300px 300px",
          zIndex: 2,
          mixBlendMode: "screen",
        }}
      />

      {/* Police tape strips - top */}
      <div
        className="absolute top-12 left-0 right-0 overflow-hidden"
        style={{ zIndex: 3 }}
      >
        <div
          className="tape-track flex whitespace-nowrap"
          style={{
            width: "200%",
            backgroundColor: "#ffcd2b",
            color: "#231F20",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
            padding: "10px 0",
            letterSpacing: "0.05em",
            transform: "rotate(-2deg) translateX(-2%)",
          }}
        >
          {TAPE_TEXT.repeat(6)}
        </div>
      </div>

      {/* Police tape strips - bottom */}
      <div
        className="absolute bottom-12 left-0 right-0 overflow-hidden"
        style={{ zIndex: 3 }}
      >
        <div
          className="tape-track flex whitespace-nowrap"
          style={{
            width: "200%",
            backgroundColor: "#ffcd2b",
            color: "#231F20",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
            padding: "10px 0",
            letterSpacing: "0.05em",
            transform: "rotate(2deg) translateX(-2%)",
            animationDirection: "reverse",
          }}
        >
          {TAPE_TEXT.repeat(6)}
        </div>
      </div>

      {/* Center card */}
      {showThreat && (
        <div
          className="animate-fade-in relative flex flex-col items-center text-center px-10 py-8 rounded-2xl"
          style={{
            backgroundColor: "#ffffff",
            color: "#cc0000",
            zIndex: 4,
            maxWidth: "500px",
            margin: "0 24px",
          }}
        >
          <p
            className="font-black leading-tight mb-6"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              color: "#cc0000",
            }}
          >
            HUMAN TRAFFICKING HAS
            <br />
            DETECTED A THREAT
          </p>

          {showButton && (
            <button
              onClick={onContinue}
              className="animate-fade-in font-black px-8 py-3 rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#231F20",
                color: "#ffcd2b",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
              }}
            >
              see what you can do →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
