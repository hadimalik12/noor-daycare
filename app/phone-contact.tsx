"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";

export function PhoneContact() {
  const [number, setNumber] = useState("");
  const callLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (number) callLink.current?.focus();
  }, [number]);

  function revealNumber() {
    // Obfuscation only: avoids plain-text harvesting, not determined scrapers.
    setNumber(String.fromCharCode(55, 55, 48, 57, 55, 56, 50, 54, 50, 55));
  }

  return (
    <div className="phone-contact">
      {number ? (
        <a
          ref={callLink}
          className="phone-contact-control"
          href={`tel:+1${number}`}
          aria-label={`Call Malik's Daycare at ${number}`}
        >
          <Phone size={18} aria-hidden="true" />
          ({number.slice(0, 3)}) {number.slice(3, 6)}-{number.slice(6)}
        </a>
      ) : (
        <button
          type="button"
          className="phone-contact-control"
          onClick={revealNumber}
        >
          <Phone size={18} aria-hidden="true" />
          Show phone number
        </button>
      )}
    </div>
  );
}
