"use client";
import { useEffect, useRef } from "react";

/**
 * Silent looping background video for the home hero.
 * - The poster (17 KB) paints immediately; the video streams in behind it.
 * - Smaller file on phones (854 px, ~1.2 MB) and 1280 px (~2.3 MB) elsewhere.
 * - Respects prefers-reduced-motion and the iOS Low Data / Save-Data mode
 *   (poster only), and pauses while the hero is off-screen.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const src = window.matchMedia("(max-width: 768px)").matches ? "/videos/hero-854.mp4" : "/videos/hero-1280.mp4";
    v.src = src;
    v.load();
    const play = () => v.play().catch(() => {});
    play();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video__media"
      poster="/videos/hero-poster.webp"
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
