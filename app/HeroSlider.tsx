"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import LandingEffects from "./LandingEffects";

const SLIDE_DELAY = 6500;

type Slide = {
  image: string;
  alt: string;
};

// If your saved files are .png instead of .jpg, change the two extensions below.
const slides: Slide[] = [
  {
    image: "/images/slide-campus.jpg",
    alt: "ICARE Institute of Medical Sciences and Research campus and Dr. Bidhan Chandra Roy Hospital",
  },
  {
    image: "/images/slide-advantage.jpg",
    alt: "The ICARE advantage: advanced labs, smart classrooms and modern hostels",
  },
];

const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const move = useCallback((offset: number) => {
    setActive((current) => (current + offset + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setTimeout(() => move(1), SLIDE_DELAY);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduceMotion, move]);

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  }

  return (
    <section
      className="landing-hero"
      aria-label="ICARE campus highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <LandingEffects />
      <h1 style={visuallyHidden}>
        ICARE Institute of Medical Sciences and Research
      </h1>

      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`landing-slide image-only${index === active ? " active" : ""}`}
          aria-hidden={index !== active}
          style={{ "--slide-bg": `url(${slide.image})` } as CSSProperties}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      <button
        className="landing-arrow previous"
        type="button"
        onClick={() => move(-1)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="landing-arrow next"
        type="button"
        onClick={() => move(1)}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="landing-dots" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={index === active}
          />
        ))}
      </div>

      {!reduceMotion && (
        <div
          key={`${active}-${paused}`}
          className={`landing-progress${paused ? " is-paused" : ""}`}
          style={{ animationDuration: `${SLIDE_DELAY}ms` }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
