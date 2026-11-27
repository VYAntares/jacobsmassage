"use client";
import { getGsap, prefersReducedMotion } from "./gsap";

export function openMenu(panel: HTMLElement) {
  const { gsap } = getGsap();
  const links = panel.querySelectorAll("[data-menu-item]");
  gsap.killTweensOf([panel, links]);
  gsap.set(panel, { visibility: "visible" });
  if (prefersReducedMotion()) {
    gsap.set(panel, { clipPath: "none", opacity: 1 });
    gsap.set(links, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    panel,
    { clipPath: "circle(0% at calc(100% - 48px) 37px)" },
    { clipPath: "circle(150% at calc(100% - 48px) 37px)", duration: 0.7, ease: "power3.inOut" },
  );
  gsap.fromTo(links, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.25, ease: "power3.out" });
}

export function closeMenu(panel: HTMLElement, onDone?: () => void) {
  const { gsap } = getGsap();
  gsap.killTweensOf(panel);
  if (prefersReducedMotion()) {
    gsap.set(panel, { visibility: "hidden" });
    onDone?.();
    return;
  }
  gsap.to(panel, {
    clipPath: "circle(0% at calc(100% - 48px) 37px)",
    duration: 0.5,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.set(panel, { visibility: "hidden" });
      onDone?.();
    },
  });
}
