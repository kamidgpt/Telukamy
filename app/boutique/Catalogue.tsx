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
  const cat = (params.get("categorie") as Categorie | null) ?? null;
  const tri: Tri = (params.get("tri") as Tri) in tris ? (params.get("tri") as Tri) : "nouveautes";
  const q = params.get("q") ?? "";
  const nouveau = params.get("nouveau") === "1"; // filtre « Nouveautés » : uniquement les produits nouveau: true

  function maj(cle: string | string[], valeur: string | null) {
    const p = new URLSearchParams(params.toString());
    for (const c of [cle].flat()) {
      if (valeur) p.set(c, valeur);
      else p.delete(c);
    }
    router.replace(`/boutique${p.size ? `?${p}` : ""}`, { scroll: false });
  }

  const liste = useMemo(() => {
    let l = produits.filter((p) => (!cat || p.categorie === cat) && (!nouveau || p.nouveau));
    if (q) l = l.filter((p) => norm(`${p.nom} ${p.description} ${p.categorie}`).includes(norm(q)));
    l = [...l].sort((a, b) => {
      if (tri === "prix-croissant") return a.prix - b.prix;
      if (tri === "prix-decroissant") return b.prix - a.prix;
      return b.ajouteLe.localeCompare(a.ajouteLe);
    });
    // les produits épuisés passent en fin de liste
    return l.sort((a, b) => Number(!!a.epuise) - Number(!!b.epuise));
  }, [cat, tri, q, nouveau]);

  return (
    <div className="wrap">
      <div className="outils">
        <div className="puces" role="group" aria-label="Filtrer par catégorie">
          <button className="puce" aria-pressed={!cat && !nouveau} onClick={() => maj(["categorie", "nouveau"], null)}>Tout</button>
          <button className="puce" aria-pressed={nouveau} onClick={() => maj("nouveau", nouveau ? null : "1")}>✦ Nouveautés</button>
          {categories.map((c) => (
            <button key={c.id} className="puce" aria-pressed={cat === c.id} onClick={() => maj("categorie", c.id)}>
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
