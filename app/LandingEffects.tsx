"use client";

import { useEffect } from "react";
import "./landing-effects.css";

type Target = { el: HTMLElement; delay: number };

const TEXT_TAGS = new Set([
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "SPAN",
  "A",
  "LABEL",
]);

/**
 * Finds the blocks of a section that should animate in.
 * Groups of 3 or more cards (departments, services, news...) animate one after another.
 */
function collectTargets(section: HTMLElement): Target[] {
  let container: HTMLElement = section;
  while (
    container.children.length === 1 &&
    container.firstElementChild instanceof HTMLElement
  ) {
    container = container.firstElementChild;
  }

  const targets: Target[] = [];
  Array.from(container.children).forEach((child) => {
    if (!(child instanceof HTMLElement)) return;
    const kids = Array.from(child.children).filter(
      (k): k is HTMLElement => k instanceof HTMLElement,
    );
    if (kids.length >= 3 && !TEXT_TAGS.has(child.tagName)) {
      kids.forEach((kid, i) =>
        targets.push({ el: kid, delay: Math.min(i, 7) * 90 }),
      );
    } else {
      targets.push({ el: child, delay: 0 });
    }
  });
  return targets;
}

export default function LandingEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.querySelector("main") ?? document.body;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("section:not(.landing-hero)"),
    );
    const touched: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fx-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    sections.forEach((section) => {
      collectTargets(section).forEach(({ el, delay }) => {
        // Anything already on screen is left alone, so nothing flashes.
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add("fx-reveal");
        el.style.setProperty("--fx-delay", `${delay}ms`);
        touched.push(el);
        observer.observe(el);
      });
    });

    // Thin progress bar at the top of the page.
    const bar = document.createElement("div");
    bar.className = "fx-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      bar.remove();
      touched.forEach((el) => {
        el.classList.remove("fx-reveal", "fx-in");
        el.style.removeProperty("--fx-delay");
      });
    };
  }, []);

  return null;
}
