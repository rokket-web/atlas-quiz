"use client";

import { useEffect, useRef, useState } from "react";

interface ClosingScreenProps {
  onContinue: () => void;
}

const TAPE_TEXT = "GOING OUT OF BUSINESS  •  GOING OUT OF BUSINESS  •  ";

// Pre-generate band data once (top position + random angle) so it's stable across renders
function makeBands(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const top = 8 + i * (84 / (count - 1)); // spread from ~8% to ~92%
    // Random angle between -18 and +18 degrees, nudged away from 0
    const sign = i % 2 === 0 ? 1 : -1;
    const angle = sign * (6 + Math.random() * 12);
    return { top, angle };
  });
}

export default function ClosingScreen({ onContinue }: ClosingScreenProps) {
  const [flash, setFlash] = useState(false);
  const [visibleBands, setVisibleBands] = useState(0);
  const bands = useRef(makeBands(7)).current;

  useEffect(() => {
    // Reveal one band every 500ms
    const bandInterval = setInterval(() => {
      setVisibleBands((n) => {
        if (n >= bands.length) {
          clearInterval(bandInterval);
          return n;
        }
        return n + 1;
      });
    }, 500);

    const flashInterval = setInterval(() => {
      setFlash((f) => !f);
    }, 300);

    const timeout = setTimeout(() => {
      clearInterval(bandInterval);
      clearInterval(flashInterval);
      onContinue();
    }, 5000);

    return () => {
      clearInterval(bandInterval);
      clearInterval(flashInterval);
      clearTimeout(timeout);
    };
  }, [onContinue, bands.length]);

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      {/* Video background — swap src when asset is ready */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src=""
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay so box stays readable before video is added */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />

      {/* Police tape bands — revealed one every 500ms */}
      {bands.slice(0, visibleBands).map((band, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: `${band.top}%`,
            transform: `rotate(${band.angle}deg)`,
            zIndex: 40,
          }}
        >
          <div
            className="tape-track flex whitespace-nowrap"
            style={{
              width: "200%",
              backgroundColor: "#ffcd2b",
              color: "#231F20",
              fontFamily: "'Garet', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(0.7rem, 1.3vw, 0.95rem)",
              padding: "9px 0",
              letterSpacing: "0.05em",
            }}
          >
            {TAPE_TEXT.repeat(8)}
          </div>
        </div>
      ))}

      {/* Flashing box */}
      <div
        className="relative flex items-center justify-center rounded-2xl px-8 text-center"
        style={{
          width: "75%",
          height: "50%",
          backgroundColor: flash ? "#cc0000" : "#ffffff",
          transition: "background-color 0.05s",
          zIndex: 30,
        }}
      >
        <p
          className="font-black leading-tight select-none"
          style={{
            fontFamily: "'Garet', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: flash ? "#ffffff" : "#cc0000",
            transition: "color 0.05s",
          }}
        >
          HUMAN TRAFFICKING HAS
          <br />
          DETECTED A THREAT
        </p>
      </div>
    </div>
  );
}
