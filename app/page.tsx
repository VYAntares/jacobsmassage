import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import { audiences } from "@/data/audiences";
import { treatmentTeasers } from "@/data/treatments";
import { practitioner } from "@/data/practitioner";
import { priceSummary } from "@/data/prices";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Dots } from "@/components/ui/Dots";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";

export default function HomePage() {
  return (
    <>
      {/* ── Hero */}
      <section className="bg-brume" data-hero>
        <div className="wrap hero__inner">
          <div className="stack min0" style={{ flex: "1 1 460px", gap: 28 }}>
            <Eyebrow dot data-hero-item>
              Massothérapie à {business.address.city}, {business.address.nearby}
            </Eyebrow>
            <h1 className="h-display" data-hero-item>
              Relâcher le corps, apaiser l&apos;esprit.
            </h1>
            <p className="lead" style={{ maxWidth: 520 }} data-hero-item>
              Massage classique et réflexologie dans un cabinet simple et chaleureux. Chaque séance est unique, adaptée
              à votre corps et à votre rythme par {practitioner.name}, massothérapeute.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }} data-hero-item>
              <BookingButton />
              <Link href="/massage" className="btn btn--outline">
                Découvrir le massage
              </Link>
            </div>
            <div className="facts" data-hero-item>
              <div><span>Disponibilités</span><strong>{business.hours.short}</strong></div>
              <div>
                <span>Cabinet</span>
                <strong>{business.address.streetShort}, {business.address.city}</strong>
              </div>
              <div><span>{priceSummary.sessionLabel}</span><strong>{priceSummary.session}</strong></div>
            </div>
          </div>

          <div className="min0" style={{ flex: "1 1 440px", position: "relative", display: "flex", gap: 20, alignItems: "stretch" }}>
            <Dots breath className="hero-dots" style={{ justifyContent: "space-between", padding: "24px 0" }} />
            <div style={{ flex: 1, position: "relative" }}>
              <div className="media palm-bl hero__img" data-hero-media>
                <Image
                  src="/images/massage-dos.jpg"
                  alt="Massage du dos en cabinet"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 960px) 100vw, 560px"
                  data-parallax="4"
                />
              </div>
              <div className="float-card" data-hero-item>
                <strong style={{ fontWeight: 600, fontSize: 18 }}>Première séance</strong>
                <span style={{ fontSize: 14, color: "var(--texte-2)", lineHeight: 1.45 }}>
                  Un temps d&apos;écoute pour l&apos;anamnèse et votre dossier personnel.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pour qui ? */}
      <section className="wrap" style={{ paddingTop: "var(--s-104)", paddingBottom: "var(--s-96)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 640 }}>
            <Eyebrow data-reveal>Pour qui ?</Eyebrow>
            <h2 className="h-section" data-reveal>Un massage pour chaque étape de la vie.</h2>
          </div>
          <Link href="/massage#pour-qui" className="link-arrow" data-reveal>
            Voir le détail <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="audience-grid">
          {audiences.map((a, i) => (
            <Link key={a.id} href={`/massage#${a.id}`} className="card-link" data-reveal data-reveal-delay={i * 0.06}>
              <div className="media" style={{ borderRadius: 20, height: 300 }}>
                <Image loading="eager" fetchPriority="low" src={a.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px" />
              </div>
              <strong style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{a.name}</strong>
              <span style={{ fontSize: 15, color: "var(--texte-2)", lineHeight: 1.5 }}>{a.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Qu'est-ce que le massage ? */}
      <section className="bg-nuit">
        <div className="wrap section split">
          <div className="min0" style={{ flex: "1 1 420px" }}>
            <div className="media palm-tl tall-img" data-mask>
              <Image loading="eager" fetchPriority="low"
                src="/images/preparation-table.jpg"
                alt="Préparation de la table de massage"
                fill
                sizes="(max-width: 960px) 100vw, 560px"
                data-parallax="5"
              />
            </div>
          </div>
          <div className="stack min0" style={{ flex: "1 1 460px", gap: 24 }}>
            <Eyebrow green data-reveal>Qu&apos;est-ce que le massage ?</Eyebrow>
            <h2 className="h-section" data-reveal>Une pratique manuelle qui écoute ce que le corps raconte.</h2>
            <p style={{ color: "var(--nuit-texte)" }} data-reveal>
              Le massage permet d&apos;entrer en contact avec le corps. Le masseur sait apprécier les informations dont
              il témoigne.
            </p>
            <p style={{ color: "var(--nuit-texte)" }} data-reveal>
              Avec des techniques et des manipulations qui lui sont propres, il soulage les tensions et les douleurs.
              Une démarche pour se détendre et faire le plein d&apos;énergie.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 }}>
              {treatmentTeasers.map((t) => (
                <Link key={t.href} href={t.href} className="tile-link" data-reveal>
                  <Image loading="eager" fetchPriority="low" src={t.thumb} alt="" width={72} height={72} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 12, flex: "none" }} />
                  <span className="stack">
                    <strong style={{ fontWeight: 600, fontSize: 19 }}>{t.name}</strong>
                    <span style={{ fontSize: 14, color: "var(--nuit-muted)" }}>{t.sub}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Votre thérapeute */}
      <section className="wrap section split">
        <div className="stack min0" style={{ flex: "1 1 520px", gap: 28 }}>
          <Eyebrow data-reveal>Votre thérapeute</Eyebrow>
          <blockquote
            data-reveal
            style={{ margin: 0, fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
          >
            {practitioner.quote}
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }} data-reveal>
            <span aria-hidden="true" style={{ width: 44, height: 3, background: "var(--colonne)" }} />
            <span><strong>{practitioner.name}</strong> · {practitioner.title}</span>
          </div>
          <Link href="/cabinet" className="link-arrow" style={{ alignSelf: "flex-start" }} data-reveal>
            Découvrir le cabinet <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="min0" style={{ flex: "1 1 360px", display: "flex", justifyContent: "center" }}>
          <div className="media portrait" style={{ borderRadius: "210px 210px 28px 28px", maxWidth: 420 }} data-mask>
            <Image loading="eager" fetchPriority="low" src={practitioner.portrait.src} alt={practitioner.portrait.alt} fill sizes="420px" data-parallax="4" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Prenez rendez-vous par téléphone."
        text={`${business.hours.sentence} ${business.payment.sentence}.`}
      />
    </>
  );
}
