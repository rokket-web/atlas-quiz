"use client";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div
      className="animate-fade-in flex flex-col items-center justify-center h-full w-full text-center px-8"
      style={{ backgroundColor: "#231F20" }}
    >
      <p
        className="text-lg font-bold mb-4 tracking-wide"
        style={{ color: "#ffcd2b", fontFamily: "'Garet', sans-serif" }}
      >
        get to know
      </p>

      <h1
        className="font-black leading-tight mb-10"
        style={{
          fontFamily: "'Garet', sans-serif",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          color: "#ffffff",
          lineHeight: 1.05,
        }}
      >
        human
        <br />
        trafficking
        <br />
        inc.
      </h1>

      <button
        onClick={onStart}
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
          transition: "opacity 0.15s",
        }}
      >
        take the quiz
      </button>
    </div>
  );
}
