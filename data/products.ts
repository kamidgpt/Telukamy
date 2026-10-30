// ─────────────────────────────────────────────────────────────
//  TES PRODUITS
//
//  Pour AJOUTER un produit : copie un bloc { ... }, colle-le à la suite,
//  et change les infos. Le « slug » doit être unique, en minuscules,
//  sans accent ni espace (il sert d'adresse : /produit/mon-slug).
//
//  Prix en CENTIMES : 2500 = 25,00 €  /  350 = 3,50 €
//
//  Photos : dépose-les dans le dossier  public/produits/
//  puis écris leur chemin, ex. "/produits/ma-photo.jpg".
//  Plusieurs photos : sépare-les par des virgules, la 1re est la photo principale :
//     images: ["/produits/a.jpg", "/produits/b.jpg", "/produits/c.jpg"],
//  (la 2e photo s'affiche au survol dans la boutique, toutes sont visibles sur la fiche produit)
//  Laisse  images: []  si tu n'as pas encore de photo.
//
//  Produit épuisé : mets  epuise: true
//  Badge « NOUVEAU » : mets  nouveau: true
// ─────────────────────────────────────────────────────────────

export type Categorie = "prints" | "stickers" | "cartes" | "packs";

export type Produit = {
  slug: string;
  nom: string;
  categorie: Categorie;
  prix: number; // en centimes
  format: string;
  description: string;
  details?: string[];
  images: string[];
  nouveau?: boolean;
  epuise?: boolean;
  ajouteLe: string; // AAAA-MM-JJ, sert au tri « Nouveautés »
};

export const categories: { id: Categorie; label: string }[] = [
  { id: "prints", label: "Prints" },
  { id: "stickers", label: "Stickers" },
  { id: "cartes", label: "Cartes" },
  { id: "packs", label: "Packs" },
];

export const produits: Produit[] = [
  {
    slug: "print-spirale",
    nom: "Print Spirale",
    categorie: "prints",
    prix: 2500,
    format: "Format A4",
    description:
      "Trois copains perdus dans une spirale rose et noire. Impression haute définition sur papier 250 g mat.",
    details: ["Format A4 (21 × 29,7 cm)", "Papier 250 g mat", "Cadre non inclus", "Signé à la main"],
    images: ["/produits/print-spirale.jpg", "/produits/print-spirale-detail.jpg"],
    nouveau: true,
    ajouteLe: "2026-10-20",
  },
  {
    slug: "stickers-coeurs",
    nom: "Stickers Cœurs",
    categorie: "stickers",
    prix: 800,
    format: "Lot de 4",
    description:
      "Quatre stickers cœur vichy violet, contours vert néon. Vinyle résistant à l’eau, parfait pour ordi, gourde ou carnet.",
    details: ["4 stickers ≈ 7 cm", "Vinyle mat waterproof", "Livrés dans leur pochette XOXO"],
    images: ["/produits/stickers-coeurs.jpg", "/produits/stickers-coeurs-detail.jpg"],
    nouveau: true,
    ajouteLe: "2026-10-18",
  },
  {
    slug: "print-neon",
    nom: "Print Néon",
    categorie: "prints",
    prix: 2500,
    format: "Format A4",
    description: "Description du print : l’histoire du dessin, les couleurs, l’ambiance.",
    details: ["Format A4 (21 × 29,7 cm)", "Papier 250 g mat"],
    images: ["/produits/print-neon.jpg"],
    ajouteLe: "2026-10-01",
  },
  {
    slug: "stickers-holo",
    nom: "Stickers Holo",
    categorie: "stickers",
    prix: 800,
    format: "Planche A6",
    description: "Planche de stickers holographiques qui changent de couleur à la lumière.",
    images: [],
    ajouteLe: "2026-09-20",
  },
  {
    slug: "carte-postale",
    nom: "Carte postale",
    categorie: "cartes",
    prix: 350,
    format: "Format A6",
    description: "Carte postale illustrée, dos blanc pour écrire un petit mot.",
    images: [],
    ajouteLe: "2026-09-10",
  },
  {
    slug: "pack-5-cartes",
    nom: "Pack 5 cartes",
    categorie: "packs",
    prix: 1200,
    format: "5 × A6",
    description: "Cinq cartes postales assorties, à prix doux.",
    images: [],
    epuise: true,
    ajouteLe: "2026-08-30",
  },
];

export function trouverProduit(slug: string) {
  return produits.find((p) => p.slug === slug);
}
