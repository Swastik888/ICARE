"use client";

import { useEffect } from "react";

/** Adds reliable scroll-in reveals without requiring CSS scroll-timeline support. */
export default function ScrollAnimator() {
  useEffect(() => {
    const groups: Array<[string, "up" | "left" | "right" | "alternate"]> = [
      [".intro-section .intro-copy", "left"],
      [".intro-section .enquiry-card", "right"],
      [".campus-video-copy", "left"],
      [".campus-video-frame", "right"],
      [".section-heading", "up"],
      [".promise-card", "alternate"],
      [".about-photo", "left"],
      [".about-copy", "right"],
      [".service-card", "alternate"],
      [".admission-banner .banner-inner", "up"],
      [".news-panel", "left"],
      [".events-panel", "right"],
      [".department-item", "alternate"],
      [".footer-main > div", "alternate"],
      [".contact-info-card", "alternate"],
      [".contact-form-card", "left"],
      [".contact-location-copy", "right"],
      [".contact-map", "up"],
    ];
    const elements: HTMLElement[] = [];

    groups.forEach(([selector, direction]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("scroll-reveal", `reveal-${direction === "alternate" ? (index % 2 ? "right" : "left") : direction}`);
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
        elements.push(element);
      });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
