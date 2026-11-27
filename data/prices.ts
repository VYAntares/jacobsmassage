/** Prices as displayed on the existing website — confirm before publishing. */
export const prices = [
  {
    id: "adultes",
    name: "Adultes",
    badge: "Tarif standard",
    amount: "70",
    unit: "CHF / heure",
    features: [
      "Valable pour une heure de traitement",
      "Pour toutes les méthodes de massage",
      "Pas de remboursement sur cette prestation",
    ],
    featured: true,
  },
  {
    id: "etudiants",
    name: "Étudiants",
    badge: "Sur carte étudiante",
    amount: "1.–",
    unit: "CHF / minute",
    features: [
      "Uniquement sur présentation d'une carte étudiante",
      "Pour toutes les techniques",
      "Vous choisissez la durée",
    ],
    featured: false,
  },
] as const;

export const priceSummary = {
  session: "70 CHF",
  sessionLabel: "Séance d'une heure",
  headline: "70 CHF la séance d'une heure.",
  student: "Tarif étudiant à 1.– CHF la minute.",
};

export const goodToKnow = [
  { label: "Durée d'une consultation", value: "60 à 90 min" },
  { label: "Première séance", value: "Anamnèse incluse" },
  { label: "Moyen de paiement", value: "Espèces ou TWINT" },
  { label: "Remboursement assurance", value: "Non" },
] as const;
