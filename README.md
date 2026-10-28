# Ton Studio — la boutique en ligne

Site e-commerce complet aux couleurs rose bonbon / vert néon / violet.
Fait avec **Next.js**, hébergé sur **Vercel** et encaissé avec **Stripe**.

## Ce que fait le site

| Page | Adresse | Ce qu'on y fait |
|---|---|---|
| Accueil | `/` | Mise en avant + nouveautés |
| Boutique | `/boutique` | Filtres Prints / Stickers / Cartes / Packs, tri, recherche |
| Fiche produit | `/produit/print-spirale` | Photos, quantité, ajout au panier |
| Panier | `/panier` | Quantités, barre « livraison offerte », bouton Commander |
| Paiement | page sécurisée Stripe | CB, Apple Pay, Google Pay, adresse, choix Colissimo / Mondial Relay, codes promo |
| Merci | `/merci` | Confirmation après paiement (le panier se vide) |
| À propos, Où me trouver, Livraison & FAQ | … | Tes contenus |
| Contact | `/contact` | Formulaire qui arrive dans ta boîte mail |
| Mentions légales, CGV, Confidentialité | … | Modèles à compléter |

La newsletter du pied de page t'envoie un email à chaque inscription.

---

## Mettre le site en ligne (≈ 30 min, sans terminal)

### Étape 1 — Créer les comptes (gratuits)
1. **GitHub** : https://github.com/signup (là où ton code est rangé)
2. **Vercel** : https://vercel.com/signup → choisis « Continue with GitHub »
3. **Stripe** : https://dashboard.stripe.com/register (là où l'argent arrive)
4. **Resend** : https://resend.com/signup (pour recevoir les messages du formulaire)

### Étape 2 — Mettre le code sur GitHub
1. Sur GitHub, clique sur **+** (en haut à droite) → **New repository**.
2. Nom : `ton-studio`, coche **Private**, puis **Create repository**.
3. Sur la page suivante, clique sur le lien **uploading an existing file**.
4. Ouvre le dossier `ton-studio` décompressé, **sélectionne tout son contenu**
   (les dossiers `app`, `components`, `data`, `lib`, `public` et les fichiers),
   puis glisse-le dans la fenêtre GitHub.
5. Attends la fin du chargement, puis clique sur **Commit changes**.

### Étape 3 — Récupérer ta clé Stripe
1. Dans Stripe, en haut à droite, vérifie que **Mode test** est activé (pour essayer sans vrai argent).
2. Va dans **Développeurs → Clés API**.
3. Copie la **Clé secrète** (elle commence par `sk_test_…`). Ne la partage jamais.

### Étape 4 — Récupérer ta clé Resend
1. Dans Resend : **API Keys → Create API Key** → copie-la (`re_…`).
2. Tant que tu n'as pas ton propre nom de domaine, Resend envoie seulement
   vers l'adresse email de ton compte Resend : utilise donc la même adresse plus bas.

### Étape 5 — Publier sur Vercel
1. Sur https://vercel.com/new, à côté de ton dépôt `ton-studio`, clique sur **Import**.
2. Ouvre **Environment Variables** et ajoute ces lignes, une par une (Nom → Valeur) :

   | Nom | Valeur |
   |---|---|
   | `STRIPE_SECRET_KEY` | ta clé `sk_test_…` |
   | `RESEND_API_KEY` | ta clé `re_…` |
   | `CONTACT_EMAIL` | l'adresse où tu veux recevoir les messages |
   | `NEXT_PUBLIC_SITE_URL` | à remplir après le 1er déploiement (voir point 4) |

3. Clique sur **Deploy**. Au bout d'environ 1 minute, ton site est en ligne 🎉
4. Copie l'adresse du site (ex. `https://ton-studio.vercel.app`), puis va dans
   **Settings → Environment Variables**, ajoute `NEXT_PUBLIC_SITE_URL` avec cette adresse
   (sans `/` à la fin), puis va dans **Deployments → ⋯ → Redeploy**.

### Étape 6 — Tester une commande
Ajoute un produit au panier → **Commander**. Sur la page Stripe, utilise la carte de test :
`4242 4242 4242 4242`, une date future quelconque, n'importe quel CVC.
La commande apparaît dans Stripe → **Paiements**.

### Étape 7 — Ouvrir la boutique pour de vrai
1. Dans Stripe, clique sur **Activer les paiements** et remplis tes infos (SIRET, IBAN…).
2. Désactive le **Mode test**, puis copie la clé secrète **live** (`sk_live_…`).
3. Dans Vercel, remplace `STRIPE_SECRET_KEY` par cette clé, puis **Redeploy**.

---

## Le quotidien

### Ajouter ou modifier un produit
Tout se passe dans le fichier **`data/products.ts`**, directement sur GitHub :
1. Ouvre le fichier sur GitHub → icône **crayon** ✏️ (Edit).
2. Copie un bloc `{ … },`, colle-le à la suite et change les infos.
   - Prix en **centimes** : `2500` = 25,00 €
   - `epuise: true` affiche le produit comme épuisé (on ne peut plus l'acheter)
   - `nouveau: true` ajoute le sticker « NOUVEAU » et fait apparaître le produit dans le menu
     **Nouveautés** et sur l'accueil (enlève la ligne quand il n'est plus nouveau)
3. **Commit changes**. Vercel remet le site à jour tout seul en environ 1 minute.

### Ajouter des photos
1. Sur GitHub, ouvre le dossier `public/produits` → **Add file → Upload files**.
2. Glisse tes photos (.jpg, idéalement au format portrait et à moins de 1 Mo).
3. Dans `products.ts`, indique le chemin : `images: ["/produits/ma-photo.jpg"]`.
4. **Plusieurs photos pour un produit** : liste-les entre les crochets, séparées par des virgules.
   La 1re est la photo principale.
   ```
   images: ["/produits/print-face.jpg", "/produits/print-detail.jpg", "/produits/print-cadre.jpg"],
   ```
   - Dans la boutique, la **2e photo apparaît au survol** de la souris.
   - Sur la fiche produit, toutes les photos s'affichent en **miniatures cliquables** sous la grande image.
   - Exemple déjà en place : le Print Spirale (vue encadrée + gros plan).

### Changer les textes, la livraison, les événements, la FAQ
Tout est dans **`data/site.ts`** : email, Instagram, texte du bandeau, tarifs
et pays de livraison, seuil de livraison offerte, événements, boutiques partenaires,
questions de la FAQ et de la page À propos.

Les textes longs des pages se trouvent dans `app/<nom-de-la-page>/page.tsx`
(par exemple `app/a-propos/page.tsx`).

### Changer une couleur
Tout en haut de **`app/globals.css`** : `--rose`, `--vert`, `--violet`…

### Gérer les commandes
- Chaque vente t'est notifiée par email par Stripe, et le client reçoit son reçu
  (active-le dans Stripe → **Paramètres → E-mails clients**).
- L'adresse de livraison et le transporteur choisi apparaissent dans le détail du paiement.
- **Mondial Relay** : le client indique son adresse, et tu choisis le point relais le plus proche
  au moment de créer l'étiquette.

### Codes promo
Stripe → **Catalogue de produits → Coupons → Créer**, puis ajoute un **code promotionnel**
(ex. `XOXO10`). Le champ « Code promo » apparaît automatiquement sur la page de paiement.

### Page de paiement à tes couleurs
Stripe → **Paramètres → Image de marque** : ajoute ton logo, avec `#FF4FA3` comme couleur
principale et `#0B0B0F` pour les boutons.

### Ton propre nom de domaine (ex. tonstudio.fr)
Vercel → ton projet → **Settings → Domains** → ajoute le domaine et suis les instructions.
Pense ensuite à mettre à jour `NEXT_PUBLIC_SITE_URL`.

---

## ⚠️ À faire avant d'ouvrir
- [ ] Compléter les passages surlignés `[entre crochets]` dans les pages Mentions légales,
      CGV et Confidentialité (SIRET, adresse, médiateur de la consommation…). Ce sont des modèles :
      fais-les relire si tu as un doute.
- [ ] Remplacer `[Prénom]`, l'email et l'Instagram dans `data/site.ts`.
- [ ] Remplacer les blocs « Portrait atelier », « Carte » et « Photo du stand » par tes photos.
- [ ] Faire une vraie commande test en mode live (et te la rembourser depuis Stripe).

## Pour les curieuses (facultatif) : lancer le site sur ton ordi
Installe Node.js (https://nodejs.org), puis, dans le dossier du projet :
```
npm install
cp .env.example .env.local   # puis remplis tes clés
npm run dev                  # → http://localhost:3000
```
