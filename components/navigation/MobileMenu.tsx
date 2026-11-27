"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { business } from "@/data/business";
import { Brand } from "@/components/ui/Brand";
import { CloseIcon, PhoneIcon } from "@/components/ui/Icons";
import { Dots } from "@/components/ui/Dots";
import { openMenu, closeMenu } from "@/animations/menuAnimations";
import { useLenis } from "@/components/motion/SmoothScroll";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const wasOpen = useRef(false);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) {
      wasOpen.current = true;
      openMenu(el);
      lenis?.stop();
      document.body.style.overflow = "hidden";
      closeBtn.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      closeMenu(el);
      lenis?.start();
      document.body.style.overflow = "";
      document.querySelector<HTMLButtonElement>(".menu-btn")?.focus({ preventScroll: true });
    }
  }, [open, lenis]);

  // Escape + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close if resized to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = () => mq.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mobile-menu__top">
        <Brand onClick={onClose} />
        <button ref={closeBtn} type="button" className="mobile-menu__close" onClick={onClose} aria-label="Fermer le menu">
          <CloseIcon />
        </button>
      </div>
      <div className="mobile-menu__body">
        <ul className="mobile-menu__list">
          {navigation.map((item, i) => (
            <li key={item.href} data-menu-item>
              <Link
                href={item.href}
                className="mobile-menu__link"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                onClick={onClose}
              >
                <small>0{i + 1}</small>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Dots sizes={[8, 12, 16, 20, 16, 12, 8]} gap={10} style={{ paddingTop: 20 }} />
      </div>
      <div className="mobile-menu__foot" data-menu-item>
        <a href={business.phone.href} className="btn btn--dark" style={{ fontSize: 18, padding: "18px 26px" }}>
          <PhoneIcon /> Prendre rendez-vous
        </a>
        <p style={{ fontSize: 15, color: "var(--texte-2)" }}>
          <a href={business.phone.href} style={{ fontWeight: 600 }}>{business.phone.display}</a>
          <br />
          {business.address.street}, {business.address.postalCode} {business.address.city}
          <br />
          {business.hours.sentence}
        </p>
      </div>
    </div>
  );
}
