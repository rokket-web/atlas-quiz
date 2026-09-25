"use client";

export default function DonateScreen() {
  return (
    <div
      className="animate-fade-in flex flex-col items-center justify-center h-full w-full px-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #3a3535 0%, #231F20 100%)",
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl px-8 pt-6 pb-8 text-center"
        style={{ backgroundColor: "#ffffff", color: "#231F20", overflowY: "auto", maxHeight: "85vh" }}
      >
        {/* Logo placeholder */}
        <div className="flex items-center justify-center mb-2">
          <div
            className="rounded-full flex items-center justify-center mb-2"
            style={{
              width: 56,
              height: 56,
              backgroundColor: "#231F20",
            }}
          >
            <span
              className="font-black text-xl"
              style={{ color: "#ffcd2b", fontFamily: "'Nunito', sans-serif" }}
            >
              A
            </span>
          </div>
        </div>

        <p
          className="font-black text-sm mb-1"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "#231F20",
            letterSpacing: "0.05em",
          }}
        >
          Atlas Free
        </p>

        <p
          className="font-bold mb-5"
          style={{
            color: "#ffcd2b",
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1.1rem",
          }}
        >
          Before we lose you…
        </p>

        <p
          className="font-bold mb-6 leading-snug"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
            color: "#231F20",
          }}
        >
          Will you give $27.60 for the 27.6 million people trapped in
          trafficking to fund their rescue and help dismantle the business of
          exploitation?
        </p>

        {/* Frequency toggle */}
        <div
          className="flex rounded-xl overflow-hidden mb-5 border"
          style={{ borderColor: "#e0e0e0" }}
        >
          <div
            className="flex-1 py-2 font-extrabold text-sm text-center"
            style={{
              backgroundColor: "#231F20",
              color: "#ffffff",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            One time
          </div>
          <div
            className="flex-1 py-2 font-extrabold text-sm text-center"
            style={{
              backgroundColor: "#ffffff",
              color: "#231F20",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Monthly
          </div>
        </div>

        <p
          className="text-xs mb-3 font-bold text-left"
          style={{ color: "#888", fontFamily: "'Nunito', sans-serif" }}
        >
          Choose a one-time amount
        </p>

        {/* Amount grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {["$25", "$50", "$100", "$250"].map((amt) => (
            <div
              key={amt}
              className="py-3 rounded-xl font-extrabold text-sm text-center cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "#f0f0f0",
                color: "#231F20",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {amt}
            </div>
          ))}
        </div>

        {/* Currency row */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="font-bold text-sm"
            style={{ color: "#888", fontFamily: "'Nunito', sans-serif" }}
          >
            USD
          </span>
          <span
            className="font-bold text-sm"
            style={{ color: "#888", fontFamily: "'Nunito', sans-serif" }}
          >
            •
          </span>
          <span
            className="font-bold text-sm"
            style={{ color: "#888", fontFamily: "'Nunito', sans-serif" }}
          >
            Other
          </span>
        </div>

        <a
          href="https://atlasfree.org/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl font-extrabold text-sm text-center transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#e0e0e0",
            color: "#888",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Choose an amount
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="mt-6">
        <button
          className="font-black px-10 py-4 rounded-2xl transition-all hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "#ffcd2b",
            color: "#231F20",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
          }}
          onClick={() => {
            window.open("https://atlasfree.org/donate", "_blank");
          }}
        >
          I'M READY TO HELP
        </button>
      </div>

      <p
        className="mt-4 font-bold text-sm opacity-60"
        style={{ fontFamily: "'Nunito', sans-serif", color: "#ffffff" }}
      >
        I'M NOT READY
      </p>
    </div>
  );
}
