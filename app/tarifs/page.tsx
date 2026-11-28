import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { business } from "@/data/business";
import { prices, goodToKnow } from "@/data/prices";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CashIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Tarifs",
  description:
    "Tarifs du massage à Lonay : 70 CHF la séance d'une heure pour les adultes, 1.– CHF la minute pour les étudiants. Paiement en espèces ou par TWINT.",
  path: "/tarifs",
});

export default function TarifsPage() {
  return (
    <>
      <section className="bg-brume" data-hero>
        <div className="wrap stack" style={{ paddingTop: "var(--s-80, 80px)", paddingBottom: "var(--s-104)", gap: 56 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <div className="stack" style={{ gap: 18, maxWidth: 680 }}>
              <Eyebrow dot data-hero-item>Tarifs</Eyebrow>
              <h1 className="h-page" data-hero-item>Des tarifs clairs, en cabinet.</h1>
            </div>
            <p data-hero-item style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 999, background: "var(--blanc)", fontWeight: 600, fontSize: 15 }}>
              <CashIcon /> {business.payment.sentence}
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
            {prices.map((p) => {
              const dark = p.featured;
              return (
                <article
                  key={p.id}
                  data-hero-item
                  className="price-card min0"
                  style={{
                    flex: "1 1 380px", background: dark ? "var(--nuit)" : "var(--blanc)", color: dark ? "var(--blanc)" : "var(--nuit)",
                    borderRadius: 32, padding: 44, display: "flex", flexDirection: "column", gap: 24,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <h2 style={{ margin: 0, fontWeight: 600, fontSize: 28 }}>{p.name}</h2>
                    <span style={{ padding: "6px 12px", borderRadius: 999, background: dark ? "var(--colonne)" : "var(--brume)", color: "var(--nuit)", fontSize: 13, fontWeight: 600 }}>
                      {p.badge}
                    </span>
                  </div>
                  <p style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <span className="price-amount">{p.amount}</span>
                    <span style={{ fontSize: 20, color: dark ? "var(--nuit-texte)" : "var(--texte-2)" }}>{p.unit}</span>
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, color: dark ? "var(--nuit-texte)" : "var(--texte-2)" }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 12 }}>
                        <span aria-hidden="true" style={{ flex: "none", marginTop: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--colonne)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={business.phone.href}
                    className={`btn ${dark ? "btn--light" : "btn--dark"}`}
                    style={{ marginTop: "auto", alignSelf: "flex-start" }}
                  >
                    Réserver · {business.phone.display}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wrap section split">
        <div className="min0" style={{ flex: "1 1 440px" }}>
          <div className="media palm-br pricing-img" data-mask>
            <Image loading="eager" fetchPriority="low" src="/images/pierres-dos.jpg" alt="Pierres posées sur le dos pendant un soin" fill sizes="(max-width: 960px) 100vw, 580px" data-parallax="4" />
          </div>
        </div>
        <div className="stack min0" style={{ flex: "1 1 440px" }}>
          <h2 className="h-band" style={{ marginBottom: 20 }} data-reveal>Bon à savoir</h2>
          <dl style={{ margin: 0 }}>
            {goodToKnow.map((row, i) => (
              <div
                key={row.label}
                data-reveal
                style={{
                  display: "flex", justifyContent: "space-between", gap: 24, padding: "20px 0", borderTop: "1px solid var(--bord)",
                  borderBottom: i === goodToKnow.length - 1 ? "1px solid var(--bord)" : undefined,
                }}
              >
                <dt className="muted">{row.label}</dt>
                <dd style={{ margin: 0, fontWeight: 600, textAlign: "right" }}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
