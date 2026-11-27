import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { business } from "@/data/business";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Jacob's Massage, Elie Berthet, massothérapeute à Lonay.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  const { address, phone, legal } = business;
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {business.name}
        <br />
        {legal.owner}, {business.practitioner.title.toLowerCase()} — {legal.form}
        <br />
        {address.street}, {address.postalCode} {address.city}, {address.country}
        <br />
        Téléphone : <a href={phone.href}>{phone.display}</a>
        {legal.uid && (
          <>
            <br />
            IDE / UID : {legal.uid}
          </>
        )}
      </p>
      <p>Responsable du contenu : {legal.owner}.</p>

      <h2>Hébergement</h2>
      <p>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis — cloudflare.com</p>

      <h2>Conception et réalisation</h2>
      <p>
        <a href={business.credit.href} target="_blank" rel="noopener">{business.credit.label}</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, le logo, les photographies et la mise en page de ce site sont protégés par le droit d&apos;auteur.
        Toute reproduction, même partielle, nécessite l&apos;accord préalable de {legal.owner}.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations de ce site sont données à titre indicatif et peuvent évoluer (tarifs, disponibilités). Elles ne
        remplacent pas un avis ou un traitement médical. {business.name} ne peut être tenu responsable du contenu des
        sites externes vers lesquels des liens renvoient.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Voir la <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>Droit applicable</h2>
      <p>Le présent site est soumis au droit suisse. Le for juridique est au siège de l&apos;éditeur, dans le canton de Vaud.</p>
    </LegalPage>
  );
}
