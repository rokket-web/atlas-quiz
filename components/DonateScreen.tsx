"use client";

import { useEffect, useState } from "react";

interface DonateScreenProps {
  onComplete: () => void;
}

type GoFundMeWindow = Window & {
  eg?: { init: (config: { win: Window }) => Promise<unknown>; destroy: () => void };
};

export default function DonateScreen({ onComplete }: DonateScreenProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // GoFundMe SDK only scans for [classy] embeds when it initializes. On first visit the script below loads after
    // the embed is in the DOM and auto-inits; on later visits (script already loaded) re-init to pick up the new embed.
    const w = window as GoFundMeWindow;
    if (w.eg) {
      w.eg.destroy();
      w.eg.init({ win: window });
    }
    return () => w.eg?.destroy();
  }, []);

  useEffect(() => {
    // Listen for Classy donation completion via postMessage
    function handleMessage(e: MessageEvent) {
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        (e.data.type === "classy:checkout:success" ||
          e.data.event === "donation:success" ||
          e.data.event === "checkout:success")
      ) {
        playOutro();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function playOutro() {
    setShowVideo(true);
    // Play background video for 2 seconds, then 100ms pause, then restart
    setTimeout(() => {
      setShowVideo(false);
      setTimeout(onComplete, 100);
    }, 2000);
  }

  return (
    <div
      className="animate-fade-in flex flex-col items-center justify-center-safe gap-5 h-full w-full overflow-y-auto py-8"
      style={{
        backgroundImage: "url('/card-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.48)" }} />

      {/* White card — stacked on mobile, two columns (logo + copy | widget) on iPad and up */}
      <div
        className="relative flex flex-col md:flex-row items-center text-center md:text-left rounded-2xl w-full max-w-[560px] md:max-w-[960px]"
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          gap: "1.2rem 2.5rem",
        }}
      >
        {/* Left column: logo + copy */}
        <div className="flex flex-col items-center md:items-start md:flex-1 md:pr-[30px]" style={{ gap: "1.2rem" }}>
          {/* Logo */}
          <img
            src="/atlas-logo.png"
            alt="Atlas Free"
            style={{ width: 72, height: 72, objectFit: "contain" }}
          />

          {/* Copy */}
          <p
            style={{
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: "#231F20",
              lineHeight: 1.55,
            }}
          >
            <span style={{ color: "#2954ff", fontWeight: 800 }}>Before we lose you…</span>
            <br />
            <span style={{ fontWeight: 800 }}>Will you give $27.60 for the 27.6 million people trapped in trafficking to fund their rescue and help dismantle the business of exploitation?</span>
          </p>
        </div>

        {/* Right column: donate widget */}
        <div className="w-full md:flex-1">
          {/* GoFundMe Pro (Classy) embedded donation form — React loads this script once and reuses it */}
          <script async src="https://giving.gofundme.com/embedded/api/checkout/sdk/js/75035" />
          <div
            id="j2gPfgO2esO5_Wt6uXuGA"
            // @ts-expect-error classy is a non-standard attribute read by the Classy embed script
            classy="849410"
          />
        </div>
      </div>

      {/* Yellow button — outside the card */}
      <button
        onClick={playOutro}
        className="relative font-black transition-opacity hover:opacity-90 active:scale-95"
        style={{
          backgroundColor: "#ffcd2b",
          color: "#231F20",
          fontFamily: "'Garet', sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          padding: "1.1rem 3.5rem",
          borderRadius: "1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        I'M NOT READY
      </button>

      {/* Outro — full screen background video */}
      {showVideo && (
        <video
          className="fixed inset-0 w-full h-full object-cover"
          style={{ zIndex: 100, backgroundColor: "#000" }}
          src="/videos/11999581-hd_1920_1080_24fps.mp4"
          autoPlay
          muted
          playsInline
        />
      )}
    </div>
  );
}
