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

      {/* Flashing box */}
      <div
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: "75%",
          height: "50%",
          backgroundColor: flash ? "#cc0000" : "#ffffff",
          transition: "background-color 0.05s",
        }}
      >
        <p
          className="font-black tracking-widest select-none text-center"
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
    </div>
  );
}
