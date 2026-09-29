"use client";

interface FightScreenProps {
  onDone: () => void;
}

// Sized by each SVG's own width/height attributes
const SOCIAL_ICONS = [
  { src: "/social/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/atlasfree/" },
  { src: "/social/linkedin.svg", alt: "LinkedIn", href: "https://www.linkedin.com/company/atlasfree/" },
  { src: "/social/x.svg", alt: "X", href: "https://twitter.com/atlasfreeorg" },
  { src: "/social/facebook.svg", alt: "Facebook", href: "https://www.facebook.com/atlasfreeorg" },
  { src: "/social/youtube.svg", alt: "YouTube", href: "https://www.youtube.com/c/AtlasFree" },
];

// Body copy sits on a 29px line grid, matching the Figma frame
const LINE = "29px";

export default function FightScreen({ onDone }: FightScreenProps) {
  return (
    <div className="animate-fade-in relative h-full w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/screen-back.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.48)" }} />

      <div className="relative flex flex-col items-center justify-center-safe h-full w-full overflow-y-auto py-6 md:py-10" style={{ gap: 49 }}>
        {/* White card */}
        <div
          className="flex flex-col items-center text-center rounded-[17px] w-[90vw] max-w-[655px]"
          style={{
            backgroundColor: "#ffffff",
            padding: "56px 24px 93px",
            gap: 49,
          }}
        >
          {/* Logo */}
          <img
            src="/atlas-logo.png"
            alt="Atlas Free"
            style={{ width: 86, height: 86, objectFit: "cover" }}
          />

          <div
            style={{
              fontFamily: "'Garet', sans-serif",
              fontSize: 22,
              lineHeight: LINE,
              color: "#231F20",
              maxWidth: 406,
            }}
          >
            <p style={{ color: "#2954ff", fontWeight: 700 }}>We need you in this fight!</p>

            <p style={{ marginTop: LINE }}>Follow us on social media</p>
            <p style={{ fontWeight: 700 }}>@atlasfree</p>

            {/* Social icons */}
            <div className="flex items-center justify-center" style={{ height: LINE, gap: 8.8 }}>
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon.alt}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex transition-opacity hover:opacity-70"
                >
                  <img src={icon.src} alt={icon.alt} />
                </a>
              ))}
            </div>

            <p style={{ marginTop: LINE, fontWeight: 700 }}>Get to know our team and mission.</p>
            <p>Come back to our booth throughout THINQ!</p>
          </div>
        </div>

        {/* Done — restarts the quiz */}
        <button
          onClick={onDone}
          className="font-bold transition-opacity hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "#ffcd2b",
            color: "rgba(35,31,32,0.9)",
            fontFamily: "'Garet', sans-serif",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "4.8px",
            width: 194.454,
            height: 46,
            borderRadius: 17,
            border: "none",
            cursor: "pointer",
          }}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
