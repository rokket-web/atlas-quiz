"use client";

import { useEffect, useRef, useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    onSignupRef.current = onSignup;
  }, [onSignup]);

  useEffect(() => {
    const container = formRef.current;
    if (!container) return;
    const w = window as VirtuousWindow;

    // Virtuous calls settings.onSuccess after a successful submit (the embed script keeps an existing VirtuousForms object)
    w.VirtuousForms = w.VirtuousForms || {};
    w.VirtuousForms.settings = {
      ...w.VirtuousForms.settings,
      onSuccess: (data) => {
        setSubmitted(true);
        onSignupRef.current?.({ firstName: data.firstName, lastName: data.lastName, email: data.email });
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
    <div
      className="animate-fade-in flex flex-col items-center justify-center-safe h-full w-full overflow-y-auto p-6 md:p-10"
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
        className="relative flex flex-col items-center text-center rounded-2xl w-full"
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

        {/* Virtuous email opt-in form */}
        <div ref={formRef} className="optin-form w-full text-left" />

        {/* Continue — fades in once the Virtuous form has been submitted */}
        {submitted && (
          <div className="animate-fade-in w-full">
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
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
