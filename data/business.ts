/**
 * Central business information for Jacob's Massage.
 *
 * ⚠️ Everything below is taken from the existing website
 * (https://www.jacobsmassage.ch/) and the validated /design.
 * Hours, prices, payment and reimbursement conditions must be confirmed
 * by Elie Berthet before publication. Edit them here only — every page
 * reads from this file.
 */
export const business = {
  name: "Jacob's Massage",
  tagline: "Massothérapie · Lonay",
  practitioner: {
    name: "Elie Berthet",
    title: "Massothérapeute",
  },
  phone: {
    display: "079 450 84 96",
    href: "tel:+41794508496",
    e164: "+41794508496",
  },
  address: {
    street: "Chemin des Abbesses 29",
    streetShort: "Ch. des Abbesses 29",
    postalCode: "1027",
    city: "Lonay",
    region: "Vaud",
    country: "Suisse",
    countryCode: "CH",
    nearby: "proche de Morges",
  },
  /** Opens the address in the visitor's map app / Google Maps. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Chemin+des+Abbesses+29%2C+1027+Lonay%2C+Suisse",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Chemin+des+Abbesses+29%2C+1027+Lonay%2C+Suisse",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Chemin+des+Abbesses+29,+1027+Lonay&output=embed",
  hours: {
    short: "Lun – dim · 11h – 20h",
    days: "Du lundi au dimanche",
    time: "11h à 20h",
    sentence: "Du lundi au dimanche, de 11h à 20h.",
    /** schema.org openingHours */
    schema: "Mo-Su 11:00-20:00",
  },
  payment: {
    short: "Espèces ou TWINT",
    sentence: "Paiement en espèces ou par TWINT",
  },
  /** Legal pages (Swiss sole trader — impressum + nLPD privacy notice). */
  legal: {
    owner: "Elie Berthet",
    form: "Entreprise individuelle",
    /** Add the UID (CHE-xxx.xxx.xxx) here only if the business is registered. */
    uid: null as string | null,
    updated: "27 novembre 2026",
  },
  credit: { label: "hiboot.ch", href: "https://hiboot.ch" },
  /** Only enable once the number is confirmed to be used on WhatsApp. */
  whatsapp: null as string | null,
  /** Real social profiles only. */
  social: [] as { label: string; href: string }[],
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.jacobsmassage.ch";
