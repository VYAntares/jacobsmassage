# Jacob's Massage — site web

Site de Jacob's Massage (Elie Berthet, massothérapeute, Lonay), développé en
Next.js à partir de la maquette validée « Main & colonne » (Claude /design).

## Démarrer

```bash
npm install
npm run dev        # développement : http://localhost:3000
npm run preview    # build + test local dans le runtime Cloudflare : http://localhost:8787
```

Le site est exporté en **statique** (`out/`) et servi par Cloudflare. Seul le
formulaire de contact exécute du code (`worker/index.ts`).

## Déployer sur Cloudflare

### Option A — Cloudflare Workers (recommandé)

1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → ce dépôt, branche `main`.
2. Réglages de build :
   - **Build command** : `npm run build`
   - **Deploy command** : `npx wrangler deploy`
   - Variable de build (facultatif) : `NEXT_PUBLIC_SITE_URL=https://www.jacobsmassage.ch`
3. Après le premier déploiement : **Settings → Domains & Routes** → ajouter `jacobsmassage.ch` et `www.jacobsmassage.ch`.
4. Formulaire (facultatif) : **Settings → Variables and Secrets**
   - `RESEND_API_KEY` (type *Secret*)
   - `CONTACT_TO_EMAIL` (adresse qui reçoit les messages)
   - `CONTACT_FROM_EMAIL` (ex. `Jacob's Massage <site@jacobsmassage.ch>`, domaine vérifié chez Resend)

Ou en ligne de commande : `npx wrangler login` puis `npm run deploy`.

### Option B — Cloudflare Pages

**Create → Pages → Connect to Git** → *Framework preset* : **None**,
*Build command* : `npm run build`, *Build output directory* : `out`.
Le formulaire est alors géré par `functions/api/contact.ts` (mêmes variables).

### Image de partage (WhatsApp, Instagram, Facebook, LinkedIn, X, iMessage…)

`public/og-image.jpg` (1200 × 630, 68 Ko) est déclarée sur toutes les pages
(Open Graph + Twitter Card). Les aperçus utilisent l'URL absolue construite
avec `NEXT_PUBLIC_SITE_URL` : ils fonctionnent dès que le domaine pointe vers
Cloudflare. Pour rafraîchir le cache après la mise en ligne :
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
(sert aussi pour WhatsApp et Instagram) et
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

### Images

Les photos sont servies en WebP responsive pré-générés (`public/images/opt/`).
Après avoir ajouté ou remplacé une photo dans `public/images/` :
`npm run images` (Python + Pillow).

## Pages

| Route       | Board de la maquette |
|-------------|----------------------|
| `/`         | Accueil              |
| `/cabinet`  | Le cabinet (+ bloc « Votre première séance ») |
| `/massage`  | Le massage           |
| `/tarifs`   | Tarifs               |
| `/contact`  | Contact (carte Google Maps chargée au clic, formulaire fonctionnel) |
| `/mentions-legales`, `/confidentialite` | Pages légales (impressum + nLPD), données dans `data/business.ts` → `legal` |

## Modifier le contenu

Toutes les informations sont centralisées dans `data/` :

- `business.ts` — téléphone, adresse, disponibilités, paiement, liens carte, réseaux sociaux, WhatsApp
- `prices.ts` — tarifs et « Bon à savoir »
- `treatments.ts`, `audiences.ts`, `cabinet.ts`, `practitioner.ts`, `navigation.ts`

⚠️ Les horaires, tarifs, conditions de paiement et de remboursement viennent du
site actuel : à confirmer par Elie Berthet avant la mise en ligne.

## Formulaire de contact

`/api/contact` (Worker Cloudflare) envoie les messages via [Resend](https://resend.com)
si `RESEND_API_KEY` et `CONTACT_TO_EMAIL` sont définies dans Cloudflare
(en local : fichier `.dev.vars`, voir `.env.example`). Sans elles, le formulaire indique clairement que le message **n'a pas été
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
