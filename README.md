# Jacob's Massage — site web

Site de Jacob's Massage (Elie Berthet, massothérapeute, Lonay), développé en
Next.js à partir de la maquette validée « Main & colonne » (Claude /design).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Prêt pour Vercel (aucune configuration nécessaire).

## Pages

| Route       | Board de la maquette |
|-------------|----------------------|
| `/`         | Accueil              |
| `/cabinet`  | Le cabinet (+ bloc « Votre première séance ») |
| `/massage`  | Le massage           |
| `/tarifs`   | Tarifs               |
| `/contact`  | Contact (carte Google Maps chargée au clic, formulaire fonctionnel) |

## Modifier le contenu

Toutes les informations sont centralisées dans `data/` :

- `business.ts` — téléphone, adresse, disponibilités, paiement, liens carte, réseaux sociaux, WhatsApp
- `prices.ts` — tarifs et « Bon à savoir »
- `treatments.ts`, `audiences.ts`, `cabinet.ts`, `practitioner.ts`, `navigation.ts`

⚠️ Les horaires, tarifs, conditions de paiement et de remboursement viennent du
site actuel : à confirmer par Elie Berthet avant la mise en ligne.

## Formulaire de contact

`/api/contact` envoie les messages via [Resend](https://resend.com) si ces
variables sont définies (voir `.env.example`) :

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL="Jacob's Massage <site@domaine-verifie.ch>"
```

Sans elles, le formulaire indique clairement que le message **n'a pas été
envoyé** et renvoie vers le téléphone. Les rendez-vous se prennent par
téléphone (liens `tel:` partout).

## Design system

- Couleurs (variables CSS dans `app/globals.css`) : Nuit `#0B2A36`, Main `#1E9AD6`,
  Colonne `#8CBF26`, Brume `#EEF3F4`, Lien `#0F6F9E`
- Typographie : Inter (fichiers de la maquette, servis en local), titres 600 serrés
- Formes : coins 28 px, coin « paume » 140 px, arches pour les portraits
- La colonne de points verts du logo sert de fil conducteur (elle « respire » doucement)

## Animations

GSAP + ScrollTrigger + Lenis (`animations/`, `components/motion/SmoothScroll.tsx`) :
apparition des blocs au scroll, dévoilement des images, léger parallaxe (desktop),
ouverture du menu mobile. Tout est désactivé avec `prefers-reduced-motion`, et le
contenu reste visible si JavaScript ne se charge pas.
