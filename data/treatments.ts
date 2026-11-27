export type Treatment = {
  id: string;
  number: string;
  name: string;
  short: string;
  thumb: string;
  image: string;
  alt: string;
  lead: string;
  body: string;
  tags: string[];
  corner: "bl" | "tr";
  /** Duration is not confirmed per technique. */
  duration: null;
};

export const treatments: Treatment[] = [
  {
    id: "classique",
    number: "01",
    name: "Le massage classique",
    short: "Massage classique",
    thumb: "/images/pierres-dos.jpg",
    image: "/images/massage-dos.jpg",
    alt: "Massage classique du dos",
    lead: "Le massage classique permet un relâchement du corps et de l'esprit. Il utilise des techniques de pétrissage et de glissement, ainsi que certains points de pression musculaire.",
    body: "Toutes ces manœuvres ont pour but de rééquilibrer le corps et de calmer les douleurs.",
    tags: ["Pétrissage", "Glissements", "Points de pression"],
    corner: "bl",
    duration: null,
  },
  {
    id: "reflexologie",
    number: "02",
    name: "La réflexologie plantaire et palmaire",
    short: "Réflexologie",
    thumb: "/images/reflexologie-plantaire.jpg",
    image: "/images/reflexologie-plantaire.jpg",
    alt: "Réflexologie plantaire",
    lead: "La réflexologie agit sur des zones du corps et des organes en lien nerveux direct. Elle vise l'homéostasie du corps, pour tenter de retrouver un état équilibré.",
    body: "Elle a des effets de relâchement et de détente, et calme le stress.",
    tags: ["Pieds", "Mains", "Anti-stress"],
    corner: "tr",
    duration: null,
  },
];

export const treatmentTeasers = [
  {
    href: "/massage#classique",
    name: "Massage classique",
    sub: "Pétrissage, glissements, pressions",
    thumb: "/images/pierres-dos.jpg",
  },
  {
    href: "/massage#reflexologie",
    name: "Réflexologie",
    sub: "Plantaire et palmaire",
    thumb: "/images/reflexologie-plantaire.jpg",
  },
];
