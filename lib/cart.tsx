"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { produits, type Produit } from "@/data/products";
import { QTE_MAX } from "./constantes";

export { QTE_MAX };

type Ligne = { slug: string; qte: number };
type LignePanier = Ligne & { produit: Produit };

type Panier = {
  lignes: LignePanier[];
  nbArticles: number;
  sousTotal: number;
  pret: boolean;
  ajouter: (slug: string, qte?: number) => void;
  changerQte: (slug: string, qte: number) => void;
  retirer: (slug: string) => void;
  vider: () => void;
};

const CLE = "ton-studio-panier";
const Ctx = createContext<Panier | null>(null);

export function PanierProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Ligne[]>([]);
  const [pret, setPret] = useState(false);

  // Lecture du panier sauvegardé dans le navigateur
  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) setItems(JSON.parse(brut));
    } catch {}
    setPret(true);
  }, []);

  useEffect(() => {
    if (!pret) return;
    try {
      localStorage.setItem(CLE, JSON.stringify(items));
    } catch {}
  }, [items, pret]);

  const valeur = useMemo<Panier>(() => {
    // on ignore les produits supprimés du catalogue ou épuisés entre-temps
    const lignes = items
      .map((l) => ({ ...l, produit: produits.find((p) => p.slug === l.slug)! }))
      .filter((l) => l.produit && !l.produit.epuise);
    return {
      lignes,
      pret,
      nbArticles: lignes.reduce((s, l) => s + l.qte, 0),
      sousTotal: lignes.reduce((s, l) => s + l.qte * l.produit.prix, 0),
      ajouter: (slug, qte = 1) =>
        setItems((prev) => {
          const ex = prev.find((l) => l.slug === slug);
          if (ex) return prev.map((l) => (l.slug === slug ? { ...l, qte: Math.min(QTE_MAX, l.qte + qte) } : l));
          return [...prev, { slug, qte }];
        }),
      changerQte: (slug, qte) =>
        setItems((prev) =>
          qte <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qte: Math.min(QTE_MAX, qte) } : l)),
        ),
      retirer: (slug) => setItems((prev) => prev.filter((l) => l.slug !== slug)),
      vider: () => setItems([]),
    };
  }, [items, pret]);

  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}

export function usePanier() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePanier doit être utilisé dans <PanierProvider>");
  return c;
}
