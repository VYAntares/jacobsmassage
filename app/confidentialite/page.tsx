import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { business } from "@/data/business";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment Jacob's Massage traite vos données personnelles, conformément à la loi fédérale sur la protection des données (nLPD).",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  const { address, phone, legal } = business;
  return (
    <LegalPage eyebrow="Protection des données" title="Politique de confidentialité">
      <p>
        Cette politique explique quelles données personnelles sont traitées via ce site et au cabinet, conformément à la
        loi fédérale sur la protection des données (nLPD).
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {legal.owner}, {business.name}
        <br />
        {address.street}, {address.postalCode} {address.city}, {address.country}
        <br />
        Téléphone : <a href={phone.href}>{phone.display}</a>
      </p>

      <h2>Formulaire de contact</h2>
      <p>
        Lorsque vous envoyez un message, nous recevons votre prénom, votre nom, votre adresse e-mail, votre numéro de
        téléphone (facultatif) et votre message. Ces données servent uniquement à vous répondre. Elles sont transmises
        par e-mail via le service Resend (Resend, Inc., États-Unis) et conservées le temps nécessaire au traitement de
        votre demande.
      </p>

      <h2>Rendez-vous et séances</h2>
      <p>
        Les informations recueillies par téléphone ou lors de l&apos;anamnèse (dossier personnel) sont utilisées
        uniquement pour la prise de rendez-vous et l&apos;adaptation du soin. Elles sont traitées de manière
        confidentielle et ne sont jamais transmises à des tiers sans votre accord.
      </p>

      <h2>Hébergement et données techniques</h2>
      <p>
        Le site est hébergé par Cloudflare, Inc. Lors de votre visite, des données techniques (adresse IP, type de
        navigateur, date et heure) peuvent être traitées pour assurer le fonctionnement et la sécurité du site.
      </p>

      <h2>Cookies et statistiques</h2>
      <p>Ce site n&apos;utilise ni cookies publicitaires, ni outils de statistiques ou de suivi.</p>

      <h2>Carte Google Maps</h2>
      <p>
        La carte de la page Contact ne se charge que si vous cliquez sur « Afficher la carte ». Google (Google LLC,
        États-Unis) peut alors traiter des données comme votre adresse IP, selon sa propre{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>.
      </p>

      <h2>Transfert à l&apos;étranger</h2>
      <p>
        Les prestataires cités (Cloudflare, Resend, Google) peuvent traiter des données aux États-Unis. Ces transferts
        reposent sur des garanties reconnues, notamment le Swiss-U.S. Data Privacy Framework ou des clauses
        contractuelles types.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès à vos données, leur rectification ou leur suppression, et vous opposer à leur
        traitement, en nous contactant par téléphone ou par courrier à l&apos;adresse ci-dessus. Vous pouvez également
        vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT).
      </p>

      <h2>Modifications</h2>
      <p>Cette politique peut être mise à jour. La version publiée sur cette page fait foi.</p>
    </LegalPage>
  );
}
