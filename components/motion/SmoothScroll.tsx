"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "@/animations/gsap";
import { textAndBlockReveals } from "@/animations/reveal";
import { parallax } from "@/animations/parallax";
import { heroTimeline, breathing } from "@/animations/heroTimeline";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger, plus per-page
 * animation setup (re-run on every route change, fully cleaned up).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis lifecycle
  useEffect(() => {
    (window as unknown as { __motionReady?: boolean }).__motionReady = true;
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove("js-motion");
      return;
    }
    const { gsap, ScrollTrigger } = getGsap();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: !isTouch,
      anchors: { offset: -88 },
    });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Route change: reset scroll + (re)build animations
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const scope = mainRef.current;
    if (!scope || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    let mm: ReturnType<typeof parallax> | undefined;
    const ctx = gsap.context(() => {
      heroTimeline(scope);
      textAndBlockReveals(scope);
      breathing(scope);
      mm = parallax(scope);
    }, scope);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 400);
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) window.setTimeout(() => lenisRef.current?.scrollTo(target as HTMLElement, { offset: -88 }), 120);
    }
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      mm?.revert();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>
      <div ref={mainRef}>{children}</div>
    </LenisContext.Provider>
  );
}
