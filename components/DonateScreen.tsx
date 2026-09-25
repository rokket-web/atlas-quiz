"use client";

import { useEffect, useRef, useState } from "react";

interface DonateScreenProps {
  onComplete: () => void;
}

export default function DonateScreen({ onComplete }: DonateScreenProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [flashing, setFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const validUrlParams = ["c_src", "c_src2", "amount", "recurring", "designation"];
    const appendUrlParams = validUrlParams.reduce((acc, key) => {
      const value = searchParams.get(key);
      return value === null ? acc : `${acc}&${key}=${value}`;
    }, "");

    if (iframeRef.current && appendUrlParams) {
      iframeRef.current.src += appendUrlParams;
    }

    // Listen for Classy donation completion via postMessage
    function handleMessage(e: MessageEvent) {
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        (e.data.type === "classy:checkout:success" ||
          e.data.event === "donation:success" ||
          e.data.event === "checkout:success")
      ) {
        triggerFlash();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function triggerFlash() {
    setFlashing(true);
    // Flash every 300ms for 2 seconds, then 100ms dark pause, then restart
    let count = 0;
    const interval = setInterval(() => {
      setFlashColor((f) => !f);
      count++;
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setFlashing(false);
      setTimeout(onComplete, 100);
    }, 2000);
  }

  return (
    <div
      className="animate-fade-in flex flex-col items-center justify-start gap-5 h-full w-full overflow-y-auto py-8"
      style={{
        backgroundImage: "url('/card-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.48)" }} />

      {/* White card */}
      <div
        className="relative flex flex-col items-center text-center rounded-2xl w-full mx-6"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: 560,
          padding: "40px",
          gap: "1.2rem",
        }}
      >
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

        {/* Donate widget */}
        <iframe
          ref={iframeRef}
          id="classy-iframe"
          // @ts-expect-error allowpaymentrequest is a non-standard attribute
          allowpaymentrequest="true"
          src="https://give.atlasfree.org/give/413670/#!/donation/checkout?eg=true&egfa=true"
          style={{
            width: "100%",
            height: 520,
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Yellow button — outside the card */}
      <button
        onClick={triggerFlash}
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

      {/* Flash overlay — full screen, video placeholder */}
      {flashing && (
        <div
          className="fixed inset-0"
          style={{
            backgroundColor: flashColor ? "#cc0000" : "#ffffff",
            zIndex: 100,
            transition: "background-color 0.05s",
          }}
        />
      )}
    </div>
  );
}
