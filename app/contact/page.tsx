import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { business } from "@/data/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneIcon, PinIcon, ClockIcon, ArrowIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";

export const metadata: Metadata = pageMetadata({
  title: "Contact & rendez-vous",
  description:
    "Prendre rendez-vous chez Jacob's Massage à Lonay : 079 450 84 96, du lundi au dimanche. Chemin des Abbesses 29, 1027 Lonay.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "var(--s-80)", paddingBottom: "var(--s-104)", display: "flex", flexWrap: "wrap", gap: 56 }} data-hero>
      <div className="stack min0" style={{ flex: "1 1 440px", gap: 32 }}>
        <div className="stack" style={{ gap: 18 }}>
          <Eyebrow dot data-hero-item>Nous contacter</Eyebrow>
          <h1 className="h-page" style={{ fontSize: "clamp(44px, 5.6vw, 72px)" }} data-hero-item>Prendre rendez-vous.</h1>
          <p className="lead" data-hero-item>
            Les rendez-vous se prennent par téléphone. Une question ? Appelez ou envoyez un message.
          </p>
        </div>

        <a href={business.phone.href} className="call-card" data-hero-item aria-label={`Appeler le ${business.phone.display}`}>
          <span style={{ flex: "none", width: 60, height: 60, borderRadius: "50%", background: "var(--colonne)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PhoneIcon size={26} stroke="#0B2A36" />
          </span>
          <span className="stack">
            <span style={{ fontSize: 15, color: "var(--nuit-muted)" }}>Par téléphone, 7 jours sur 7</span>
            <span style={{ fontWeight: 600, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.1 }}>{business.phone.display}</span>
          </span>
        </a>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }} data-hero-item>
          <div className="info-tile" style={{ flex: "1 1 200px" }}>
            <PinIcon />
            <strong style={{ fontWeight: 600 }}>Le cabinet</strong>
            <address style={{ fontStyle: "normal", color: "var(--texte-2)", fontSize: 15 }}>
              {business.address.street}
              <br />
              {business.address.postalCode} {business.address.city}
            </address>
            <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ fontSize: 15, marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Itinéraire <ArrowIcon size={16} />
              <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
            </a>
          </div>
          <div className="info-tile" style={{ flex: "1 1 200px" }}>
            <ClockIcon />
            <strong style={{ fontWeight: 600 }}>Disponibilités</strong>
            <span style={{ color: "var(--texte-2)", fontSize: 15 }}>
              {business.hours.days}
              <br />
              {business.hours.time}
            </span>
          </div>
        </div>

        <MapEmbed />
      </div>

      <ContactForm />
    </section>
  );
}
