"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { business } from "@/data/business";
import { Brand } from "@/components/ui/Brand";
import { PhoneIcon } from "@/components/ui/Icons";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__inner">
        <Brand />
        <nav className="nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav__link"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={business.phone.href} className="nav__cta" aria-label={`Prendre rendez-vous : ${business.phone.display}`}>
            {business.phone.display}
          </a>
        </nav>
        <div style={{ display: "flex", gap: 8 }} className="header-mobile-actions">
          <a href={business.phone.href} className="mobile-call" aria-label={`Appeler le ${business.phone.display}`}>
            <PhoneIcon />
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="menu-btn__bars" aria-hidden="true"><span /><span /><span /></span>
            Menu
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}
