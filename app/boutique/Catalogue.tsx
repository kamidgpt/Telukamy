"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { categories, produits, type Categorie } from "@/data/products";
import { CarteProduit } from "@/components/CarteProduit";

const tris = {
  nouveautes: "Plus récents",
  "prix-croissant": "Prix croissant",
  "prix-decroissant": "Prix décroissant",
} as const;
type Tri = keyof typeof tris;

// Enlève accents et majuscules pour la recherche
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Catalogue() {
  const params = useSearchParams();
  const router = useRouter();
  // Un seul filtre actif à la fois : Tout, Nouveautés ou une catégorie
  const filtre: "tout" | "nouveau" | Categorie =
    params.get("nouveau") === "1" ? "nouveau" : ((params.get("categorie") as Categorie | null) ?? "tout");
  const tri: Tri = (params.get("tri") as Tri) in tris ? (params.get("tri") as Tri) : "nouveautes";
  const q = params.get("q") ?? "";

  function choisirFiltre(f: typeof filtre) {
    const p = new URLSearchParams(params.toString());
    p.delete("nouveau");
    p.delete("categorie");
    if (f === "nouveau") p.set("nouveau", "1");
    else if (f !== "tout") p.set("categorie", f);
    router.replace(`/boutique${p.size ? `?${p}` : ""}`, { scroll: false });
  }

  function maj(cle: string | string[], valeur: string | null) {
    const p = new URLSearchParams(params.toString());
    for (const c of [cle].flat()) {
      if (valeur) p.set(c, valeur);
      else p.delete(c);
    }
    router.replace(`/boutique${p.size ? `?${p}` : ""}`, { scroll: false });
  }

  const liste = useMemo(() => {
    let l = produits.filter((p) => filtre === "tout" || (filtre === "nouveau" ? p.nouveau : p.categorie === filtre));
    if (q) l = l.filter((p) => norm(`${p.nom} ${p.description} ${p.categorie}`).includes(norm(q)));
    l = [...l].sort((a, b) => {
      if (tri === "prix-croissant") return a.prix - b.prix;
      if (tri === "prix-decroissant") return b.prix - a.prix;
      return b.ajouteLe.localeCompare(a.ajouteLe);
    });
    // les produits épuisés passent en fin de liste
    return l.sort((a, b) => Number(!!a.epuise) - Number(!!b.epuise));
  }, [filtre, tri, q]);

  return (
    <div className="wrap">
      <div className="outils">
        <div className="puces" role="group" aria-label="Filtrer par catégorie">
          <button className="puce" aria-pressed={filtre === "tout"} onClick={() => choisirFiltre("tout")}>Tout</button>
          <button className="puce" aria-pressed={filtre === "nouveau"} onClick={() => choisirFiltre("nouveau")}>✦ Nouveautés</button>
          {categories.map((c) => (
            <button key={c.id} className="puce" aria-pressed={filtre === c.id} onClick={() => choisirFiltre(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="tri">
          Trier :
          <select value={tri} onChange={(e) => maj("tri", e.target.value === "nouveautes" ? null : e.target.value)}>
            {Object.entries(tris).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>

      {q && (
        <p style={{ marginTop: 24 }}>
          Résultats pour <strong>« {q} »</strong> —{" "}
          <button className="retirer" onClick={() => maj("q", null)}>effacer la recherche</button>
        </p>
      )}

      {liste.length ? (
        <div className="grille">
          {liste.map((p, i) => <CarteProduit key={p.slug} produit={p} prioritaire={i < 4} />)}
        </div>
      ) : (
        <p className="placeholder" style={{ minHeight: 320 }}>Rien par ici… pour l’instant !</p>
      )}
    </div>
  );
}
