"use client";
import { getGsap, EASE } from "./gsap";

/**
 * Scroll reveals for elements marked with:
 *  - data-reveal          → fade + rise (data-reveal="fade" for fade only)
 *  - data-reveal-delay    → optional delay in seconds
 *  - data-mask            → image unmasking from the bottom
 */
export function textAndBlockReveals(scope: HTMLElement) {
  const { gsap, ScrollTrigger } = getGsap();

  const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  ScrollTrigger.batch(blocks, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.08,
        delay: (_i: number, el: Element) =>
          Number((el as HTMLElement).dataset.revealDelay || 0),
        overwrite: true,
      }),
  });

  gsap.utils.toArray<HTMLElement>("[data-mask]", scope).forEach((el) => {
    gsap.to(el, {
      clipPath: "inset(0% 0 0 0 round 0px)",
      duration: 1.3,
      ease: "power4.inOut",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onComplete: () => {
        el.style.clipPath = "none";
      },
    });
  });
}
