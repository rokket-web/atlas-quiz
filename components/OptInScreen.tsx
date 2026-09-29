"use client";

import { useEffect, useRef } from "react";

export interface OptInSignup {
  firstName: string;
  lastName: string;
  email: string;
}

interface OptInScreenProps {
  onContinue: () => void;
  onSignup?: (signup: OptInSignup) => void;
}

const VIRTUOUS_FORM_ID = "B80E96F5-7402-4298-AD46-BFE869583C8F";
const VIRTUOUS_ORG_ID = "2642";

type VirtuousWindow = Window & {
  VirtuousForms?: {
    IsLoaded?: boolean;
    VirtuousFormsApiUrl?: string;
    settings?: { onSuccess?: (data: OptInSignup) => void };
    LaunchDarklyClient?: { identify: (context: object) => Promise<unknown> } | null;
  };
  virtuousForm?: (options: object) => void;
};

export default function OptInScreen({ onContinue, onSignup }: OptInScreenProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const onSignupRef = useRef(onSignup);
  const onContinueRef = useRef(onContinue);

  useEffect(() => {
    onSignupRef.current = onSignup;
    onContinueRef.current = onContinue;
  }, [onSignup, onContinue]);

  useEffect(() => {
    const container = formRef.current;
    if (!container) return;
    const w = window as VirtuousWindow;

    // Virtuous calls settings.onSuccess after a successful submit (the embed script keeps an existing VirtuousForms object)
    w.VirtuousForms = w.VirtuousForms || {};
    w.VirtuousForms.settings = {
      ...w.VirtuousForms.settings,
      onSuccess: (data) => {
        onSignupRef.current?.({ firstName: data.firstName, lastName: data.lastName, email: data.email });
        // Go straight to the donate screen once the opt-in is saved
        onContinueRef.current();
      },
    };

    if (w.VirtuousForms?.IsLoaded && w.virtuousForm) {
      // Embed script only bootstraps once per page load — on later visits render the form directly
      const target = document.createElement("div");
      target.setAttribute("data-virtuous-form", VIRTUOUS_FORM_ID);
      container.appendChild(target);
      const render = () =>
        w.virtuousForm?.({
          organizationId: VIRTUOUS_ORG_ID,
          formId: VIRTUOUS_FORM_ID,
          environment: 0,
          isGiving: false,
          merchantType: "wepay",
          virtuousFormsApiUrl: w.VirtuousForms?.VirtuousFormsApiUrl,
        });
      const ld = w.VirtuousForms.LaunchDarklyClient;
      if (ld) ld.identify({ kind: "organization", key: VIRTUOUS_ORG_ID }).then(render);
      else render();
    } else {
      // Embed script renders the form next to its own <script data-vform> tag
      const script = document.createElement("script");
      script.src = "https://cdn.virtuoussoftware.com/virtuous.embed.min.js";
      script.setAttribute("data-vform", VIRTUOUS_FORM_ID);
      script.setAttribute("data-orgId", VIRTUOUS_ORG_ID);
      script.setAttribute("data-isGiving", "false");
      script.setAttribute("data-dependencies", "[]");
      container.appendChild(script);
    }

    return () => {
      container.innerHTML = "";
      if (w.VirtuousForms?.settings) delete w.VirtuousForms.settings.onSuccess;
    };
  }, []);

  return (
    <div className="animate-fade-in relative h-full w-full overflow-hidden">
      {/* Video background — stays put while the content layer scrolls */}
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

      <div className="relative flex flex-col items-center justify-center-safe gap-5 h-full w-full overflow-y-auto py-6 md:py-10">

        {/* Card */}
        <div
          className="relative flex flex-col items-center text-center rounded-2xl w-[90vw] max-w-[560px]"
          style={{
            backgroundColor: "#ffffff",
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

          {/* Virtuous email opt-in form */}
          <div ref={formRef} className="optin-form w-full text-left" />
        </div>

        {/* Yellow button — outside the card; skips the opt-in and goes to donate */}
        <button
          onClick={onContinue}
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
          I&apos;M NOT READY
        </button>
      </div>
    </div>
  );
}
