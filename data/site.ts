// ─────────────────────────────────────────────────────────────
//  RÉGLAGES GÉNÉRAUX DE LA BOUTIQUE
//  Modifie les textes entre guillemets, enregistre, et c'est en ligne
//  au prochain déploiement.
// ─────────────────────────────────────────────────────────────

export const site = {
  nom: "Ton Studio",
  slogan: "Illustrations, prints et stickers faits main.",
  prenom: "[Prénom]",
  email: "contact@tonstudio.fr",
  instagram: { pseudo: "@ton_insta", url: "https://instagram.com/ton_insta" },
  tiktok: "https://tiktok.com/@ton_insta",
  pinterest: "https://pinterest.com/ton_insta",

  // Texte qui défile dans le bandeau rose tout en haut
  bandeau: "LIVRAISON OFFERTE DÈS 60 €  ✦  ENVOI SOUS 48 H  ✦  FAIT MAIN EN FRANCE",
};

// Livraison — montants en CENTIMES (490 = 4,90 €)
export const livraison = {
  seuilGratuit: 6000, // livraison offerte à partir de 60,00 €
  pays: ["FR", "BE", "LU", "CH", "MC"] as const, // pays où tu livres
  options: [
    { id: "colissimo", nom: "Colissimo suivi", prix: 490, delaiMin: 2, delaiMax: 4 },
    { id: "mondial-relay", nom: "Mondial Relay (point relais)", prix: 350, delaiMin: 3, delaiMax: 6 },
  ],
};

// Page « Où me trouver »
export const evenements = [
  { mois: "DÉC", nom: "Marché de Noël", lieu: "Bordeaux", dates: "13 – 15 décembre", lien: "" },
  { mois: "JAN", nom: "Salon Créateurs", lieu: "Paris", dates: "24 – 26 janvier", lien: "" },
  { mois: "FÉV", nom: "Marché d’hiver", lieu: "Lyon", dates: "8 – 9 février", lien: "" },
];

export const boutiquesPartenaires = [
  { nom: "Boutique 1", adresse: "Adresse, Ville", lien: "" },
  { nom: "Boutique 2", adresse: "Adresse, Ville", lien: "" },
  { nom: "Boutique 3", adresse: "Adresse, Ville", lien: "" },
];

// Questions de la page « Livraison & FAQ »
export const faq = [
  {
    q: "Quels sont les délais de livraison ?",
    r: "Expédition sous 48 h ouvrées. Compte 2 à 4 jours avec Colissimo, 3 à 6 jours avec Mondial Relay.",
  },
  {
    q: "Combien coûte l’envoi ?",
    r: "4,90 € en Colissimo suivi, 3,50 € en Mondial Relay. La livraison est offerte dès 60 € d’achat.",
  },
  {
    q: "Comment retourner un article ?",
    r: "Tu as 14 jours après réception pour changer d’avis. Écris-moi via la page Contact avec ton numéro de commande et je t’explique la marche à suivre.",
  },
  {
    q: "Commande personnalisée ?",
    r: "Avec plaisir ! Décris ton idée via la page Contact (format, couleurs, délai) et je te réponds avec un devis.",
  },
  {
    q: "Comment entretenir mes prints ?",
    r: "À l’abri du soleil direct et de l’humidité. Un cadre avec verre anti-UV les gardera éclatants des années.",
  },
  {
    q: "Vendez-vous en gros ?",
    r: "Oui, pour les boutiques et concept stores. Écris-moi via la page Contact pour recevoir le catalogue pro.",
  },
];

// Questions de la page « À propos »
export const questionsAPropos = [
  { q: "Pourquoi ce nom ?", r: "Réponse en quelques lignes, avec ta voix." },
  { q: "Comment tu crées ?", r: "Réponse en quelques lignes, avec ta voix." },
  { q: "Ce que tu veux transmettre ?", r: "Réponse en quelques lignes, avec ta voix." },
];
