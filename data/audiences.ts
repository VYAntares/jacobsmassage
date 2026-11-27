export type Audience = {
  id: string;
  name: string;
  image: string;
  alt: string;
  summary: string;
  description: string;
  note?: string;
};

/** Texts follow the existing website and the validated /design. */
export const audiences: Audience[] = [
  {
    id: "sportifs",
    name: "Sportifs",
    image: "/images/sportifs.jpg",
    alt: "Skieur en pleine descente",
    summary:
      "Récupérer plus vite, soulager les courbatures et relâcher après l'effort.",
    description:
      "L'activité physique est excellente pour la santé ! Le masseur aide à raccourcir la récupération en favorisant la nutrition du muscle et en soulageant les courbatures. Le massage agit aussi sur la détente physiologique et psychologique, pour se relâcher après l'effort et entrer agréablement dans la phase d'anabolisme.",
  },
  {
    id: "adolescents",
    name: "Adolescents",
    image: "/images/adolescents.jpg",
    alt: "Deux adolescentes qui discutent",
    summary:
      "Reprendre contact avec un corps qui change, par la proprioception.",
    description:
      "Cette période de la vie est remplie de défis : on apprend à accepter un corps qui change, et les hormones déstabilisent parfois l'esprit. Le massage aide l'adolescent à reprendre le contrôle de son corps par la proprioception : les manœuvres du massage classique offrent au cerveau un retour plus effectif. Un très bon accompagnement dans ce processus de réappropriation.",
    note: "Pour les mineurs, le rendez-vous se prend avec l'accord d'un parent ou d'un représentant légal.",
  },
  {
    id: "adultes",
    name: "Adultes",
    image: "/images/adultes.jpg",
    alt: "Personne qui se tient les épaules",
    summary:
      "Libérer les tensions que le stress et le quotidien installent dans le corps.",
    description:
      "La vie apporte des épreuves physiques ou psychiques. Le stress, la perte de confiance en soi ou les déprimes passagères créent des tensions musculaires, tout comme le sport. Le massage peut faire partie de la solution : comme l'esprit, le corps a besoin d'attention. Le masseur comprend ce dont vous avez besoin, et vous soulage.",
  },
  {
    id: "seniors",
    name: "Seniors",
    image: "/images/seniors.jpg",
    alt: "Seniors faisant des exercices d'étirement",
    summary:
      "Prendre soin de soi, retrouver une mobilité oubliée, apaiser les douleurs installées.",
    description:
      "À cette période de la vie, on a envie de prendre soin de soi, de vivre de nouvelles choses ou de retrouver une mobilité oubliée. Le massage offre un moment d'évasion et de soin, pour s'occuper de douleurs parfois installées depuis trop longtemps.",
  },
];

export const audienceDisclaimer =
  "Le massage ne remplace pas un avis ou un traitement médical. En cas de doute, parlez-en à votre médecin.";
