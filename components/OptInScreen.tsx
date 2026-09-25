"use client";

interface OptInScreenProps {
  onContinue: () => void;
}

export default function OptInScreen({ onContinue }: OptInScreenProps) {
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

      {/* Card */}
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

        {/* Headline */}
        <p
          className="font-black"
          style={{
            fontFamily: "'Garet', sans-serif",
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            color: "#231F20",
            lineHeight: 1.1,
          }}
        >
          If you're reading this, we need you to join us to bring down the business of human trafficking.
        </p>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Garet', sans-serif",
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            color: "#231F20",
            lineHeight: 1.5,
          }}
        >
          It's time for the industry of exploitation to come to an end. Sign your name here to join the cause, and we'll send you your next step on this mission.
        </p>

        {/* Inputs — side by side on sm+, stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            placeholder="name"
            className="flex-1 font-black text-center outline-none min-w-0"
            style={{
              backgroundColor: "#e6e6e6",
              fontFamily: "'Garet', sans-serif",
              fontSize: "1.1rem",
              color: "#231F20",
              border: "none",
              borderRadius: "5px",
              padding: "10px 16px",
            }}
          />
          <input
            type="email"
            placeholder="email"
            className="flex-1 font-black text-center outline-none min-w-0"
            style={{
              backgroundColor: "#e6e6e6",
              fontFamily: "'Garet', sans-serif",
              fontSize: "1.1rem",
              color: "#231F20",
              border: "none",
              borderRadius: "5px",
              padding: "10px 16px",
            }}
          />
        </div>

        {/* Button — always full width below inputs */}
        <button
          onClick={onContinue}
          className="w-full font-black tracking-widest transition-opacity hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "#2954ff",
            color: "#ffffff",
            fontFamily: "'Garet', sans-serif",
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.2em",
            borderRadius: "5px",
            padding: "10px 16px",
          }}
        >
          JOIN THE CAUSE
        </button>
      </div>
    </div>
  );
}
