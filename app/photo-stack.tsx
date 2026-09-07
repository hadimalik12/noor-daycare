"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const previews = [
  { src: "/images/art-preview.jpg", alt: "Children exploring paint together" },
  {
    src: "/images/playroom-preview.jpg",
    alt: "A bright playroom with toys and books",
  },
  {
    src: "/images/blocks-preview.jpg",
    alt: "Children building with wooden blocks",
  },
  {
    src: "/images/reading-preview.jpg",
    alt: "A child sharing a storybook with an adult",
  },
  {
    src: "/images/outdoor-preview.jpg",
    alt: "An outdoor childcare play space",
  },
];

export function PhotoStack() {
  const [index, setIndex] = useState(0);
  const topCard = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const ignoreClick = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      animation.current?.cancel();
    };
  }, []);

  async function flip(direction: number) {
    if (busy.current) return;
    busy.current = true;
    try {
      const card = topCard.current;
      if (
        card &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        animation.current = card.animate(
          [
            { transform: "translateX(0) rotateY(0) rotateZ(0)", opacity: 1 },
            {
              transform: `translateX(${-direction * 24}%) rotateY(${-direction * 35}deg) rotateZ(${-direction * 9}deg)`,
              opacity: 0,
            },
          ],
          { duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        );
        await animation.current.finished;
      }
      if (mounted.current)
        setIndex(
          (current) =>
            (current + direction + previews.length) % previews.length,
        );
    } catch {
      // Unmounting cancels the in-flight card animation.
    } finally {
      animation.current = null;
      busy.current = false;
    }
  }

  return (
    <div
      className="photo-stack"
      role="region"
      aria-roledescription="carousel"
      aria-label="Daycare preview photos"
    >
      <div className="photo-stack-stage">
        <button
          type="button"
          className="photo-stack-deck"
          aria-label={`${previews[index].alt}. Preview ${index + 1} of ${previews.length}. Next photo`}
          onClick={(event) => {
            if (event.detail === 0 || !ignoreClick.current) void flip(1);
            ignoreClick.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              void flip(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            ignoreClick.current = false;
            gesture.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            const start = gesture.current;
            gesture.current = null;
            if (!start || start.id !== event.pointerId) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            ignoreClick.current = Math.hypot(dx, dy) > 12;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3)
              void flip(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            gesture.current = null;
            ignoreClick.current = true;
          }}
          onLostPointerCapture={() => {
            gesture.current = null;
          }}
        >
          {previews.map((photo, photoIndex) => {
            const depth =
              (photoIndex - index + previews.length) % previews.length;
            return (
              <span
                key={photo.src}
                ref={depth === 0 ? topCard : undefined}
                className="photo-stack-card"
                aria-hidden={depth !== 0}
                style={
                  {
                    "--depth": depth,
                    "--tilt": `${depth === 0 ? 0 : depth % 2 ? -3 : 3}deg`,
                    zIndex: previews.length - depth,
                  } as CSSProperties
                }
              >
                <img
                  src={photo.src}
                  alt={depth === 0 ? photo.alt : ""}
                  width="1000"
                  height="750"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="photo-stack-label">Preview image</span>
              </span>
            );
          })}
        </button>
      </div>
      <div className="photo-stack-controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Previous preview photo"
          title="Previous photo"
          onClick={() => void flip(-1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span aria-live="polite" aria-atomic="true">
          {index + 1} of {previews.length}
        </span>
        <button
          type="button"
          className="icon-button"
          aria-label="Next preview photo"
          title="Next photo"
          onClick={() => void flip(1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
