export const cabinetGallery = {
  main: {
    src: "/images/salle-massage.jpg",
    alt: "La salle de massage du cabinet à Lonay",
  },
  side: [
    { src: "/images/table-serviettes.jpg", alt: "Table de soin préparée avec serviettes" },
    { src: "/images/carte-visite.jpg", alt: "Carte de visite Jacob's Massage" },
  ],
};

export const cabinetSpaces = [
  { icon: "home", title: "Salle de soin", text: "Table de massage, lumière naturelle, calme." },
  { icon: "bath", title: "Salle de bain", text: "Pour se rafraîchir avant ou après le soin." },
  { icon: "chat", title: "Espace discussion", text: "Le temps d'échanger sur vos besoins." },
] as const;

/** Session flow as described on the existing website — confirm durations. */
export const consultationSteps = [
  {
    title: "L'écoute",
    text: "La première séance commence toujours par un temps d'écoute plus attentif : l'anamnèse, et la création de votre dossier personnel.",
  },
  {
    title: "Le soin",
    text: "Les consultations durent 60 minutes et peuvent aller jusqu'à 90 minutes, selon vos besoins.",
  },
  {
    title: "Le suivi",
    text: "Un moment pour échanger sur vos ressentis et adapter les séances suivantes.",
  },
];

export const firstSession = [
  "Un temps pour parler de vos besoins, de vos gênes et de vos attentes.",
  "Le soin est adapté à votre corps, à votre rythme et à votre confort.",
  "Vous pouvez poser vos questions et signaler la moindre gêne à tout moment.",
];
