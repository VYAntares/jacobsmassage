import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { audiences, audienceDisclaimer } from "@/data/audiences";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Le massage — classique & réflexologie",
  description:
    "Massage classique (pétrissage, glissements, points de pression) et réflexologie plantaire et palmaire à Lonay. Pour sportifs, adolescents, adultes et seniors.",
  path: "/massage",
});

export default function MassagePage() {
  return (
    <>
      {/* ── Intro */}
      <section className="bg-nuit" data-hero>
        <div className="wrap stack" style={{ paddingTop: "var(--s-88, 88px)", paddingBottom: "var(--s-88, 88px)", gap: 28 }}>
          <Eyebrow dot green data-hero-item>Le massage</Eyebrow>
          <h1 className="h-page" style={{ maxWidth: 900 }} data-hero-item>
            Deux techniques, une même attention au corps.
          </h1>
          <nav aria-label="Sur cette page" style={{ display: "flex", flexWrap: "wrap", gap: 10, paddingTop: 8 }} data-hero-item>
            {[
              { href: "#classique", label: "Massage classique" },
              { href: "#reflexologie", label: "Réflexologie" },
              { href: "#pour-qui", label: "Pour qui ?" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="pill-dark">{l.label}</a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Treatments */}
      {treatments.map((t, i) => {
        const imageFirst = i % 2 === 0;
        const img = (
          <div className="min0" style={{ flex: "1 1 440px" }}>
            <div className={`media feature-img ${t.corner === "bl" ? "palm-bl" : "palm-tr"}`} data-mask>
              <Image src={t.image} alt={t.alt} fill sizes="(max-width: 960px) 100vw, 580px" data-parallax="4" />
            </div>
          </div>
        );
        return (
          <section
            key={t.id}
            id={t.id}
            className="wrap split anchor"
            style={{
              paddingTop: i === 0 ? "var(--s-104)" : 56,
              paddingBottom: i === treatments.length - 1 ? "var(--s-104)" : 56,
              flexWrap: imageFirst ? "wrap" : "wrap-reverse",
            }}
          >
            {imageFirst && img}
            <div className="stack min0" style={{ flex: "1 1 440px", gap: 20 }}>
              <span style={{ fontWeight: 600, fontSize: 18, color: "var(--lien)" }} data-reveal>{t.number}</span>
              <h2 className="h-section" data-reveal>{t.name}</h2>
              <p className="lead" data-reveal>{t.lead}</p>
              <p className="muted" data-reveal>{t.body}</p>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0 }} data-reveal>
                {t.tags.map((tag) => (
                  <li key={tag} className="chip">{tag}</li>
                ))}
              </ul>
            </div>
            {!imageFirst && img}
          </section>
        );
      })}

      {/* ── Pour qui ? */}
      <section id="pour-qui" className="bg-brume anchor">
        <div className="wrap section stack" style={{ gap: 56 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 720 }}>
            <Eyebrow data-reveal>Pour qui ?</Eyebrow>
            <h2 className="h-section" data-reveal>Le massage s&apos;adapte à vous, à chaque âge.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))", gap: 24 }}>
            {audiences.map((a) => (
              <article key={a.id} id={a.id} className="anchor audience-card" data-reveal style={{ background: "var(--blanc)", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div className="media" style={{ height: 260 }}>
                  <Image src={a.image} alt={a.alt} fill sizes="(max-width: 1100px) 100vw, 600px" />
                </div>
                <div className="stack" style={{ padding: 32, gap: 12 }}>
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: 28 }}>{a.name}</h3>
                  <p style={{ color: "var(--texte-2)", fontSize: 16 }}>{a.description}</p>
                  {a.note && (
                    <p style={{ fontSize: 14, color: "var(--texte-3)", display: "flex", gap: 10 }}>
                      <span aria-hidden="true" style={{ flex: "none", marginTop: 7, width: 8, height: 8, borderRadius: "50%", background: "var(--colonne)" }} />
                      {a.note}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "var(--texte-3)" }} data-reveal>{audienceDisclaimer}</p>
        </div>
      </section>

      <CtaBand spacing="both" title="Envie d'essayer ?" text="Appelez pour réserver votre première séance." />
    </>
  );
}
