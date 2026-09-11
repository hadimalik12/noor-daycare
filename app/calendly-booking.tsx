"use client";

import { useEffect, useRef, useState } from "react";

export const BOOKING_URL = "https://calendly.com/noor-day-care/30min";
const SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
    }) => void;
  };
};

export function CalendlyBooking() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    const initialize = () => {
      if (disposed || element.querySelector("iframe")) return;
      const calendly = (window as CalendlyWindow).Calendly;
      if (!calendly) return;
      calendly.initInlineWidget({ url: BOOKING_URL, parentElement: element });
      const frame = element.querySelector("iframe");
      if (frame) frame.title = "Schedule a visit to Malik's Daycare";
    };
    const fail = () => {
      if (!disposed) setFailed(true);
    };
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_URL}"]`,
    );
    if ((window as CalendlyWindow).Calendly) initialize();
    else {
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        script.addEventListener("load", initialize);
        script.addEventListener("error", fail);
        document.body.appendChild(script);
      } else {
        script.addEventListener("load", initialize);
        script.addEventListener("error", fail);
      }
    }
    return () => {
      disposed = true;
      script?.removeEventListener("load", initialize);
      script?.removeEventListener("error", fail);
      element.replaceChildren();
    };
  }, []);

  return (
    <>
      {failed && (
        <p className="booking-error" role="status">
          The calendar couldn&apos;t load. Please use the booking link below to
          choose a time.
        </p>
      )}
      <div
        ref={container}
        className="calendly-inline-widget"
        data-url={BOOKING_URL}
        data-auto-load="false"
        hidden={failed}
      />
    </>
  );
}
