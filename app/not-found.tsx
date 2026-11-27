import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Dots } from "@/components/ui/Dots";

export default function NotFound() {
  return (
    <section className="bg-brume">
      <div className="wrap section" style={{ display: "flex", gap: 40, alignItems: "center", minHeight: "60vh" }}>
        <Dots breath />
        <div className="stack" style={{ gap: 24 }}>
          <Eyebrow>Page introuvable</Eyebrow>
          <h1 className="h-page">Cette page s&apos;est un peu trop relâchée.</h1>
          <div><Link href="/" className="btn btn--dark">Retour à l&apos;accueil</Link></div>
        </div>
      </div>
    </section>
  );
}
