"use client";
import { getGsap, prefersReducedMotion } from "./gsap";

/*
 * Visibility is driven by the .is-open class (CSS), so the menu always
 * shows even if an animation is interrupted. GSAP only adds motion.
 */
export function openMenu(panel: HTMLElement) {
  const { gsap } = getGsap();
  const items = panel.querySelectorAll("[data-menu-item]");
  gsap.killTweensOf([panel, items]);
  if (prefersReducedMotion()) {
    gsap.set([panel, items], { clearProps: "all" });
    return;
  }
  gsap.fromTo(panel, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", clearProps: "transform" });
  gsap.fromTo(items, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.1, ease: "power3.out" });
}

export function closeMenu(panel: HTMLElement) {
  const { gsap } = getGsap();
  const items = panel.querySelectorAll("[data-menu-item]");
  gsap.killTweensOf([panel, items]);
  gsap.set([panel, items], { clearProps: "all" });
}
