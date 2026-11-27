import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cabinetGallery, cabinetSpaces, consultationSteps, firstSession } from "@/data/cabinet";
import { practitioner } from "@/data/practitioner";
import { priceSummary } from "@/data/prices";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/ui/CtaBand";
import { BookingButton } from "@/components/ui/BookingButton";
import { spaceIcons } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Le cabinet",
  description:
    "Le cabinet Jacob's Massage à Lonay : une salle de soin lumineuse, une salle de bain et un espace pour discuter. Découvrez Elie Berthet et le déroulement d'une séance.",
  alternates: { canonical: "/cabinet" },
};

export default function CabinetPage() {
  return (
    <>
      {/* ── Intro */}
      <section data-hero className="wrap" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 720 }}>
            <Eyebrow dot data-hero-item>Le cabinet</Eyebrow>
            <h1 className="h-page" data-hero-item>Un lieu simple et chaleureux, pensé pour se poser.</h1>
          </div>
          <p className="muted" style={{ maxWidth: 380 }} data-hero-item>
            Une salle de soin lumineuse, une salle de bain et un espace pour discuter avant et après la séance.
          </p>
        </div>
      </section>

      {/* ── Gallery */}
      <section className="wrap" style={{ paddingBottom: "var(--s-96)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <div className="media r-card gallery-main min0" style={{ flex: "2 1 520px" }} data-mask>
            <Image src={cabinetGallery.main.src} alt={cabinetGallery.main.alt} fill priority sizes="(max-width: 960px) 100vw, 800px" data-parallax="3" />
          </div>
          <div className="stack min0" style={{ flex: "1 1 280px", gap: 20 }}>
            {cabinetGallery.side.map((img) => (
              <div key={img.src} className="media r-card gallery-side" data-mask>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 960px) 100vw, 400px" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
          {cabinetSpaces.map((s) => {
            const Icon = spaceIcons[s.icon];
            return (
              <div key={s.title} data-reveal style={{ flex: "1 1 260px", display: "flex", gap: 14, alignItems: "flex-start", padding: 22, borderRadius: 20, background: "var(--brume)" }}>
                <span style={{ flex: "none", paddingTop: 2 }}><Icon /></span>
                <span className="stack">
                  <strong>{s.title}</strong>
                  <span style={{ fontSize: 15, color: "var(--texte-2)" }}>{s.text}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Votre thérapeute */}
      <section className="bg-brume" id="therapeute">
        <div className="wrap section split">
          <div className="min0" style={{ flex: "1 1 360px", display: "flex", justifyContent: "center" }}>
            <div className="media portrait-lg" style={{ borderRadius: "220px 220px 28px 28px", maxWidth: 440 }} data-mask>
              <Image src={practitioner.portrait.src} alt={practitioner.portrait.altNotes} fill sizes="440px" data-parallax="4" />
            </div>
          </div>
          <div className="stack min0" style={{ flex: "1 1 480px", gap: 24 }}>
            <Eyebrow data-reveal>Votre thérapeute</Eyebrow>
            <h2 className="h-section" style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.02 }} data-reveal>
              {practitioner.name}
            </h2>
            <p style={{ fontSize: 20, color: "var(--texte-2)" }} data-reveal>{practitioner.bio}</p>
            <div data-reveal>
              <Link href="/contact" className="btn btn--dark">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation */}
      <section className="wrap section" id="seance">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
          <div className="stack" style={{ flex: "1 1 360px", gap: 16 }}>
            <Eyebrow data-reveal>Consultation</Eyebrow>
            <h2 className="h-section" data-reveal>Comment se déroule une séance ?</h2>
          </div>
          <ol style={{ flex: "1 1 560px", margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
            {consultationSteps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{
                  display: "flex", gap: 24, padding: "28px 0", borderTop: "1px solid var(--bord)",
                  borderBottom: i === consultationSteps.length - 1 ? "1px solid var(--bord)" : undefined,
                }}
              >
                <span aria-hidden="true" style={{ flex: "none", width: 48, height: 48, borderRadius: "50%", background: "var(--colonne)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 20 }}>
                  {i + 1}
                </span>
                <span className="stack" style={{ gap: 4 }}>
                  <strong style={{ fontWeight: 600, fontSize: 22 }}>{step.title}</strong>
                  <span className="muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Extension: first-session reassurance, in the same visual vocabulary */}
        <div
          data-reveal
          style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between", padding: "40px", borderRadius: "28px 28px 28px 96px", background: "var(--brume)" }}
          className="first-session"
        >
          <div className="stack" style={{ gap: 14, flex: "1 1 420px" }}>
            <h3 style={{ margin: 0, fontWeight: 600, fontSize: "clamp(26px, 2.6vw, 34px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Votre première séance, un moment pour écouter.
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, color: "var(--texte-2)" }}>
              {firstSession.map((t) => (
                <li key={t} style={{ display: "flex", gap: 12 }}>
                  <span aria-hidden="true" style={{ flex: "none", marginTop: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--colonne)" }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <BookingButton />
        </div>
      </section>

      <CtaBand
        title={priceSummary.headline}
        text={priceSummary.student}
        link={{ href: "/tarifs", label: "Voir les tarifs" }}
      />
    </>
  );
}
