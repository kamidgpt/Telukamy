"use client";

import Link from "next/link";
import { useState } from "react";
import { usePanier, QTE_MAX } from "@/lib/cart";

export function AjouterAuPanier({ slug, epuise }: { slug: string; epuise?: boolean }) {
  const { ajouter } = usePanier();
  const [qte, setQte] = useState(1);
  const [ajoute, setAjoute] = useState(false);

  if (epuise) return <AlerteRetour slug={slug} />;

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

// Produit épuisé : on demande juste l'email pour prévenir du retour en stock
function AlerteRetour({ slug }: { slug: string }) {
  const [etat, setEtat] = useState<"" | "envoi" | "ok" | "erreur">("");
  const [message, setMessage] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEtat("envoi");
    const r = await fetch("/api/alerte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: new FormData(form).get("email"), slug }),
    }).catch(() => null);
    const json = await r?.json().catch(() => ({}));
    if (r?.ok) {
      setEtat("ok");
      setMessage("C’est noté ! Tu seras prévenu·e dès son retour ✦");
      form.reset();
    } else {
      setEtat("erreur");
      setMessage(json?.erreur || "Oups, ça n’a pas marché. Réessaie un peu plus tard.");
    }
  }

  return (
    <div style={{ margin: "28px 0" }}>
      <button className="btn btn--noir" disabled>Épuisé</button>
      <p style={{ fontWeight: 600, margin: "20px 0 10px" }}>Me prévenir de son retour :</p>
      <form className="news" onSubmit={envoyer} style={{ borderColor: "var(--noir)" }}>
        <label htmlFor="alerte-email" className="sr-only">Ton email</label>
        <input id="alerte-email" name="email" type="email" required placeholder="ton@email.fr" autoComplete="email" />
        <button type="submit" disabled={etat === "envoi"}>{etat === "envoi" ? "…" : "Prévenez-moi"}</button>
      </form>
      <p role="status" style={{ marginTop: 10, fontSize: 15, color: etat === "erreur" ? "var(--rose-fonce)" : undefined }}>{message}</p>
    </div>
  );
}
