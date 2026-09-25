"use client";

import { useEffect, useRef } from "react";

export default function DonateScreen() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Pass through any URL params (c_src, c_src2, amount, recurring, designation)
    const searchParams = new URLSearchParams(window.location.search);
    const validUrlParams = ["c_src", "c_src2", "amount", "recurring", "designation"];
    const appendUrlParams = validUrlParams.reduce((acc, key) => {
      const value = searchParams.get(key);
      return value === null ? acc : `${acc}&${key}=${value}`;
    }, "");

    if (iframeRef.current && appendUrlParams) {
      iframeRef.current.src += appendUrlParams;
    }
  }, []);

  return (
    <div
      className="animate-fade-in flex flex-col items-center justify-center h-full w-full px-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at center, #3a3535 0%, #231F20 100%)",
      }}
    >
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

      <p
        className="mt-5 font-bold text-sm opacity-50"
        style={{ fontFamily: "'Nunito', sans-serif", color: "#ffffff" }}
      >
        I'M NOT READY
      </p>
    </div>
  );
}
