"use client";

import { useState, type CSSProperties } from "react";
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
  const [{ index, previous }, setPhoto] = useState<{
    index: number;
    previous: number | null;
  }>({ index: 0, previous: null });

  function changePhoto(direction: number) {
    setPhoto((current) => ({
      index: (current.index + direction + previews.length) % previews.length,
      previous: current.index,
    }));
  }

  return (
    <div
      className="photo-stack"
      role="region"
      aria-roledescription="carousel"
      aria-label="Daycare preview photos"
    >
      <div className="photo-stack-stage">
        <div className="photo-stack-deck">
          {previews.map((photo, photoIndex) => {
            const depth =
              (photoIndex - index + previews.length) % previews.length;
            return (
              <span
                key={photo.src}
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
          {previous !== null && (
            <span
              key={index}
              className="photo-stack-card photo-stack-outgoing"
              aria-hidden="true"
              onAnimationEnd={() =>
                setPhoto((current) =>
                  current.index === index
                    ? { ...current, previous: null }
                    : current,
                )
              }
            >
              <img
                src={previews[previous].src}
                alt=""
                width="1000"
                height="750"
                draggable={false}
              />
              <span className="photo-stack-label">Preview image</span>
            </span>
          )}
        </div>
      </div>
      <div className="photo-stack-controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Previous preview photo"
          title="Previous photo"
          onClick={() => changePhoto(-1)}
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
          onClick={() => changePhoto(1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
