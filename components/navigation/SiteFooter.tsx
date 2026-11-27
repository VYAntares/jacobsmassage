import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import { navigation } from "@/data/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap stack" style={{ paddingTop: 72, paddingBottom: 32, gap: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 260px" }}>
            <Image src="/images/logo-blanc.png" alt="" width={33} height={64} style={{ height: 64, width: "auto" }} />
            <span className="stack" style={{ lineHeight: 1.2 }}>
              <span style={{ fontWeight: 600, fontSize: 24 }}>{business.name}</span>
              <span style={{ fontSize: 14, color: "var(--nuit-muted)" }}>
                {business.practitioner.name}, {business.practitioner.title.toLowerCase()}
              </span>
            </span>
          </div>
          <div className="stack" style={{ gap: 6, flex: "0 1 220px", fontSize: 15 }}>
            <span className="footer-title">Le cabinet</span>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
              {business.address.street}
              <br />
              {business.address.postalCode} {business.address.city}
              <span className="sr-only"> (ouvre la carte dans un nouvel onglet)</span>
            </a>
          </div>
          <div className="stack" style={{ gap: 6, flex: "0 1 220px", fontSize: 15 }}>
            <span className="footer-title">Disponibilités</span>
            <span>{business.hours.days}</span>
            <span>{business.hours.time}</span>
          </div>
          <div className="stack footer-contact" style={{ gap: 6, flex: "0 1 220px", fontSize: 15 }}>
            <span className="footer-title">Contact</span>
            <a href={business.phone.href}>{business.phone.display}</a>
            <Link href="/contact#message">Écrire un message</Link>
          </div>
        </div>
        <nav aria-label="Pied de page" style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 15 }}>
          {navigation.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          {business.social.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </nav>
        <div
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.14)", fontSize: 14, color: "var(--nuit-muted)",
          }}
        >
          <span>© {year} {business.name} · {business.address.city}, {business.address.nearby}</span>
          <span>{business.payment.sentence}</span>
        </div>
        <div
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12,
            marginTop: -32, fontSize: 14, color: "var(--nuit-muted)",
          }}
        >
          <nav aria-label="Informations légales" className="footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
          </nav>
          <a href={business.credit.href} target="_blank" rel="noopener" className="footer-credit">
            Réalisation : {business.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
