export type ContactPayload = {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s./-]{7,20}$/;

export function validateContact(p: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  if (!p.prenom?.trim()) e.prenom = "Indiquez votre prénom.";
  if (!p.nom?.trim()) e.nom = "Indiquez votre nom.";
  if (!p.email?.trim()) e.email = "Indiquez votre e-mail.";
  else if (!EMAIL.test(p.email.trim())) e.email = "Cette adresse e-mail ne semble pas valide.";
  if (p.tel?.trim() && !PHONE.test(p.tel.trim())) e.tel = "Ce numéro de téléphone ne semble pas valide.";
  if (!p.message?.trim()) e.message = "Écrivez votre message.";
  else if (p.message.trim().length < 10) e.message = "Votre message est un peu court (10 caractères minimum).";
  else if (p.message.length > 4000) e.message = "Votre message est trop long (4000 caractères maximum).";
  if (!p.consent) e.consent = "Merci d'accepter l'utilisation de vos données pour vous répondre.";
  return e;
}
