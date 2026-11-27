import { Eyebrow } from "@/components/ui/Eyebrow";
import { business } from "@/data/business";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-brume">
        <div className="wrap stack" style={{ paddingTop: "var(--s-80)", paddingBottom: 56, gap: 18 }}>
          <Eyebrow dot>{eyebrow}</Eyebrow>
          <h1 className="h-page" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{title}</h1>
          <p className="muted" style={{ fontSize: 15 }}>Dernière mise à jour : {business.legal.updated}</p>
        </div>
      </section>
      <section className="wrap legal" style={{ paddingTop: 56, paddingBottom: "var(--s-104)" }}>
        {children}
      </section>
    </>
  );
}
