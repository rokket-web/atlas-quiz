"use client";

import { useEffect, useRef, useState } from "react";

export default function DonateScreen() {
  const [showCheckout, setShowCheckout] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!showCheckout) return;
    const searchParams = new URLSearchParams(window.location.search);
    const validUrlParams = ["c_src", "c_src2", "amount", "recurring", "designation"];
    const appendUrlParams = validUrlParams.reduce((acc, key) => {
      const value = searchParams.get(key);
      return value === null ? acc : `${acc}&${key}=${value}`;
    }, "");

    if (iframeRef.current && appendUrlParams) {
      iframeRef.current.src += appendUrlParams;
    }
  }, [showCheckout]);

  return (
    <div
      className="animate-fade-in flex items-center justify-center h-full w-full"
      style={{
        backgroundImage: "url('/card-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.48)" }} />

      {showCheckout ? (
        /* Classy checkout iframe */
        <div className="relative flex flex-col items-center gap-4">
          <iframe
            ref={iframeRef}
            id="classy-iframe"
            // @ts-expect-error allowpaymentrequest is a non-standard attribute
            allowpaymentrequest="true"
            src="https://give.atlasfree.org/give/413670/#!/donation/checkout?eg=true&egfa=true"
            style={{
              width: 345,
              height: 520,
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "1.5rem",
            }}
          />
          <button
            onClick={() => setShowCheckout(false)}
            className="font-black rounded-2xl px-10 py-4 tracking-widest transition-opacity hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#ffcd2b",
              color: "#231F20",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.15em",
            }}
          >
            I'M NOT READY
          </button>
        </div>
      ) : (
        /* Pitch card */
        <div
          className="relative flex flex-col items-center text-center rounded-2xl px-8 py-10 w-full mx-6"
          style={{
            backgroundColor: "#ffffff",
            maxWidth: 560,
            gap: "1.1rem",
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
            className="leading-snug"
            style={{
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: "#231F20",
              lineHeight: 1.55,
            }}
          >
            <span style={{ color: "#2954ff", fontWeight: 800 }}>Before we lose you…</span>
            <br />
            Will you give $27.60 for the 27.6 million people trapped in trafficking to fund their rescue and help dismantle the business of exploitation?
          </p>

          {/* Person image */}
          <img
            src="/donate-person.png"
            alt=""
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: "1rem",
            }}
          />

          {/* Donate button */}
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full font-black rounded-2xl py-4 tracking-widest transition-opacity hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#2954ff",
              color: "#ffffff",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.2em",
            }}
          >
            DONATE
          </button>

          {/* Not ready button */}
          <button
            className="w-full font-black rounded-2xl py-4 tracking-widest transition-opacity hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#ffcd2b",
              color: "#231F20",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.15em",
            }}
          >
            I'M NOT READY
          </button>
        </div>
      )}
    </div>
  );
}
