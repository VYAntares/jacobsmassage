"use client";
import { getGsap } from "./gsap";

/** Gentle vertical drift for images marked data-parallax (value = % travel). */
export function parallax(scope: HTMLElement) {
  const { gsap } = getGsap();
  const mm = gsap.matchMedia();
  mm.add("(min-width: 769px)", () => {
    gsap.utils.toArray<HTMLElement>("[data-parallax]", scope).forEach((el) => {
      const amount = Number(el.dataset.parallax || 6);
      gsap.fromTo(
        el,
        { yPercent: -amount, scale: 1.12 },
        {
          yPercent: amount,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });
  return mm;
}
