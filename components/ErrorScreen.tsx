"use client";

import { useEffect, useState } from "react";

interface ErrorScreenProps {
  onContinue: () => void;
}

export default function ErrorScreen({ onContinue }: ErrorScreenProps) {
  const [flash, setFlash] = useState(false);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    // Show video alone for 150ms, then reveal box and start flashing (toggle every 300ms)
    const reveal = setTimeout(() => {
      setShowBox(true);
      interval = setInterval(() => {
        setFlash((f) => !f);
      }, 300);
    }, 150);

    // After 5 seconds, proceed
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onContinue();
    }, 5000);

    return () => {
      clearTimeout(reveal);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onContinue]);

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/11999581-hd_1920_1080_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay so box stays readable before video is added */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />

      {/* Flashing box — wide rectangle on mobile, larger box on iPad and up */}
      {showBox && (
        <div
          className="relative flex items-center justify-center rounded-2xl w-[90%] aspect-[12/5] md:w-[60%] md:h-[40%] md:aspect-auto"
          style={{
            backgroundColor: flash ? "#cc0000" : "#ffffff",
            transition: "background-color 0.05s",
          }}
        >
          <p
            className="font-black md:tracking-widest select-none text-center text-[16vw] md:text-[clamp(3.2rem,9.6vw,7.2rem)]"
            style={{
              fontFamily: "'Garet', sans-serif",
              color: flash ? "#ffffff" : "#cc0000",
              transition: "color 0.05s",
            }}
          >
            ERROR!
          </p>
        </div>
      )}
    </div>
  );
}
