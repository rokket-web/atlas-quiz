"use client";

import { useEffect, useState } from "react";

interface ErrorScreenProps {
  onContinue: () => void;
}

export default function ErrorScreen({ onContinue }: ErrorScreenProps) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Flash interval — toggle every 300ms
    const interval = setInterval(() => {
      setFlash((f) => !f);
    }, 300);

    // After 5 seconds, proceed
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onContinue();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onContinue]);

  return (
    <div
      className="flex items-center justify-center h-full w-full transition-colors"
      style={{
        backgroundColor: flash ? "#cc0000" : "#ffffff",
      }}
    >
      <p
        className="font-black tracking-widest select-none"
        style={{
          fontFamily: "'Garet', sans-serif",
          fontSize: "clamp(4rem, 12vw, 9rem)",
          color: flash ? "#ffffff" : "#cc0000",
          transition: "color 0.05s",
        }}
      >
        ERROR!
      </p>
    </div>
  );
}
