"use client";

import Link from "next/link";
import { useState } from "react";
import { usePanier, QTE_MAX } from "@/lib/cart";

export function AjouterAuPanier({ slug, epuise }: { slug: string; epuise?: boolean }) {
  const { ajouter } = usePanier();
  const [qte, setQte] = useState(1);
  const [ajoute, setAjoute] = useState(false);

  if (epuise) {
    return (
      <div className="achat">
        <button className="btn btn--noir" disabled>Épuisé</button>
        <Link href="/contact" className="retirer">Me prévenir du retour</Link>
      </div>
    );
  }

  return (
    <>
      <div className="achat">
        <div className="qte" aria-label="Quantité">
          <button onClick={() => setQte((q) => Math.max(1, q - 1))} aria-label="Moins">−</button>
          <span aria-live="polite">{qte}</span>
          <button onClick={() => setQte((q) => Math.min(QTE_MAX, q + 1))} aria-label="Plus">+</button>
        </div>
        <button
          className="btn"
          onClick={() => {
            ajouter(slug, qte);
            setAjoute(true);
          }}
        >
          Ajouter au panier
        </button>
      </div>
      {ajoute && (
        <p className="ok" role="status" style={{ marginBottom: 24 }}>
          Ajouté ! <Link href="/panier">Voir mon panier →</Link>
        </p>
      )}
    </>
  );
}
