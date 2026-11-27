"use client";
import { getGsap, EASE } from "./gsap";

/** Opening sequence for page heroes marked data-hero. */
export function heroTimeline(scope: HTMLElement) {
  const { gsap } = getGsap();
  const hero = scope.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;

  const items = hero.querySelectorAll<HTMLElement>("[data-hero-item]");
  const media = hero.querySelector<HTMLElement>("[data-hero-media]");
  const dots = hero.querySelectorAll<HTMLElement>("[data-breath] span");

  const tl = gsap.timeline({ defaults: { ease: EASE } });
  if (items.length)
    tl.fromTo(items, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.1);
  if (media)
    tl.fromTo(
      media,
      { clipPath: "inset(18% 12% 18% 12% round 28px)", scale: 1.06 },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.5, ease: "expo.out" },
      0,
    );
  if (dots.length)
    tl.fromTo(dots, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.06, ease: "back.out(2)" }, 0.4);
  return tl;
}

/**
 * "Breath": the logo's dot column slowly inhales/exhales — a quiet cue to
 * slow down. Runs only while visible.
 */
export function breathing(scope: HTMLElement) {
  const { gsap, ScrollTrigger } = getGsap();
  gsap.utils.toArray<HTMLElement>("[data-breath]", scope).forEach((col) => {
    const dots = col.querySelectorAll("span");
    const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true, delay: 1.6 });
    tl.to(dots, {
      scale: 1.25,
      duration: 2.2,
      ease: "sine.inOut",
      stagger: { each: 0.18, from: "center" },
    });
    ScrollTrigger.create({
      trigger: col,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
    });
  });
}
