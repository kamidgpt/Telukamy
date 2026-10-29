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
| Contact | `/contact` | Formulaire qui arrive dans ta boîte Gmail |
| Mentions légales, CGV, Confidentialité | … | Modèles à compléter |

La newsletter du pied de page ajoute chaque inscrit dans ta liste **Brevo**, d'où tu envoies
tes newsletters gratuitement (jusqu'à 300 emails par jour).

**Coût** : GitHub et Gmail sont gratuits, Stripe ne prend qu'une commission sur chaque vente.
Pour l'hébergement, lis l'encadré « Vercel gratuit ou Netlify gratuit ? » juste en dessous.

---

## ⚠️ Vercel gratuit ou Netlify gratuit ?
L'offre gratuite de Vercel (**Hobby**) est réservée aux sites **non commerciaux** : une boutique
qui encaisse des paiements doit passer à l'offre **Pro** (20 $/mois). Pour tester en mode Stripe
« test », l'offre gratuite suffit.

Pour vendre sans abonnement, tu peux héberger exactement le même code sur **Netlify**, dont
l'offre gratuite autorise l'usage commercial (voir la section « Héberger sur Netlify » plus bas).
Aucune modification du code n'est nécessaire.

---

## Mettre le site en ligne (≈ 30 min, sans terminal)

### Étape 1 — Créer les comptes (gratuits)
1. **GitHub** : https://github.com/signup (là où ton code est rangé)
2. **Vercel** : https://vercel.com/signup → choisis « Continue with GitHub »
3. **Stripe** : https://dashboard.stripe.com/register (là où l'argent arrive)
4. **Gmail** : une adresse dédiée à la boutique, par ex. `tonstudio@gmail.com`
   (c'est là qu'arriveront les messages du formulaire de contact)
5. **Brevo** : https://www.brevo.com (gratuit, pour gérer et envoyer ta newsletter)

### Étape 2 — Mettre le code sur GitHub
1. Sur GitHub, clique sur **+** (en haut à droite) → **New repository**.
2. Nom : `ton-studio`, coche **Private**, puis **Create repository**.
3. Sur la page suivante, clique sur le lien **uploading an existing file**.
4. Ouvre le dossier du projet et sélectionne **uniquement** ces éléments
   (Cmd + clic pour en sélectionner plusieurs) :
   - les dossiers `app`, `components`, `data`, `lib`, `public`
   - les fichiers `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `README.md`

   ⚠️ **Ne glisse jamais le dossier `node_modules`** (ni `.next` s'il apparaît) : ce sont des
   milliers de fichiers recréés automatiquement par `npm install`. Vercel les installe lui-même.
   Sans eux, le projet fait une cinquantaine de fichiers, sous la limite de 100 de GitHub.
5. Glisse la sélection dans la fenêtre GitHub, attends la fin du chargement,
   puis clique sur **Commit changes**.
6. Vérifie sur la page du dépôt que tu vois bien les dossiers `app`, `components`, `data`, `lib`,
   `public` à la racine (et pas un dossier `ton-studio` qui les contiendrait).

### Étape 3 — Récupérer ta clé Stripe
1. Dans Stripe, en haut à droite, vérifie que **Mode test** est activé (pour essayer sans vrai argent).
2. Va dans **Développeurs → Clés API**.
3. Copie la **Clé secrète** (elle commence par `sk_test_…`). Ne la partage jamais.

### Étape 4 — Créer le mot de passe d'application Gmail
Le site se connecte à ton Gmail pour t'envoyer les messages du formulaire. Google demande
pour ça un mot de passe spécial (ton vrai mot de passe ne marchera pas, et c'est mieux ainsi).
1. Connecte-toi au compte Gmail de la boutique, puis va sur https://myaccount.google.com/security
2. Active la **Validation en deux étapes** si ce n'est pas déjà fait (obligatoire).
3. Va sur https://myaccount.google.com/apppasswords, donne un nom (ex. « Site Ton Studio »)
   et clique sur **Créer**.
4. Copie le code de 16 lettres affiché (ex. `abcd efgh ijkl mnop`). Il ne s'affiche qu'une fois.

### Étape 4 bis — Brancher la newsletter sur Brevo
1. Dans Brevo : **Contacts → Listes → Créer une liste**, nomme-la « Newsletter site ».
   Note le **numéro (ID)** de la liste, affiché à côté de son nom (ex. `2`).
2. En haut à droite, clique sur ton nom → **SMTP & API** → onglet **Clés API** →
   **Générer une nouvelle clé API**. Copie-la (elle commence par `xkeysib-`).
3. **Important** : toujours via ton nom en haut à droite → **Sécurité → IP autorisées** →
   **Désactiver le blocage**. Sinon, au bout de 30 jours, Brevo bloque les inscriptions qui
   viennent des serveurs de Vercel (leurs adresses changent tout le temps).
4. Les inscrits arrivent automatiquement dans cette liste. Pour envoyer une newsletter :
   **Campagnes → Créer une campagne**, choisis la liste « Newsletter site ». Brevo ajoute
   lui-même le lien de désinscription obligatoire.

### Étape 5 — Publier sur Vercel
1. Sur https://vercel.com/new, à côté de ton dépôt `ton-studio`, clique sur **Import**.
2. Ouvre **Environment Variables** et ajoute ces lignes, une par une (Nom → Valeur) :

   | Nom | Valeur |
   |---|---|
   | `STRIPE_SECRET_KEY` | ta clé `sk_test_…` |
   | `GMAIL_USER` | l'adresse Gmail de la boutique |
   | `GMAIL_APP_PASSWORD` | le code de 16 lettres de l'étape 4 |
   | `BREVO_API_KEY` | ta clé Brevo `xkeysib-…` |
   | `BREVO_LIST_ID` | le numéro de ta liste Brevo (ex. `2`) |
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

### Variante — Héberger sur Netlify (gratuit, usage commercial autorisé)
Les étapes 1 à 4 sont identiques (GitHub, Stripe, Gmail). Remplace l'étape 5 par :
1. Crée un compte sur https://app.netlify.com/signup avec **« Sign up with GitHub »**.
2. **Add new project → Import an existing project → GitHub**, puis choisis le dépôt `ton-studio`.
3. Netlify reconnaît Next.js tout seul : ne touche pas aux réglages de build.
4. Dans **Environment variables**, ajoute les mêmes variables que pour Vercel
   (`STRIPE_SECRET_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `BREVO_API_KEY`, `BREVO_LIST_ID`),
   puis clique sur **Deploy**.
5. Une fois le site en ligne (adresse en `…netlify.app`), ajoute `NEXT_PUBLIC_SITE_URL` avec cette
   adresse dans **Site configuration → Environment variables**, puis relance un déploiement
   (**Deploys → Trigger deploy → Deploy site**).

Ensuite, tout fonctionne pareil : chaque modification sur GitHub met le site à jour automatiquement.
L'offre gratuite inclut 100 Go de bande passante par mois, largement assez pour une petite boutique.

---

## Mettre à jour le code du site sur GitHub (quand je t'envoie une nouvelle version)
1. Décompresse le nouveau zip.
2. Sur la page de ton dépôt GitHub : **Add file → Upload files**.
3. Glisse les mêmes éléments que la première fois (dossiers `app`, `components`, `data`, `lib`,
   `public` + `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `README.md`),
   **jamais** `node_modules`. Les fichiers qui portent le même nom sont remplacés.
4. **Commit changes** : Vercel reconstruit le site tout seul (environ 1 minute).

⚠️ Si tu as déjà modifié `data/products.ts` ou `data/site.ts` directement sur GitHub, ne renvoie pas
ces deux fichiers depuis le zip, sinon tes modifications seraient écrasées.

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
Vercel → ton projet → **Settings → Domains** (ou Netlify → **Domain management**) → ajoute le domaine
et suis les instructions.
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
