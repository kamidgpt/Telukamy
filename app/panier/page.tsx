"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePanier, QTE_MAX } from "@/lib/cart";
import { livraison } from "@/data/site";
import { prix } from "@/lib/format";

export default function PagePanier() {
  const { lignes, sousTotal, changerQte, retirer, pret } = usePanier();
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const reste = Math.max(0, livraison.seuilGratuit - sousTotal);
  const fraisMin = reste === 0 ? 0 : Math.min(...livraison.options.map((o) => o.prix));

  async function commander() {
    setChargement(true);
    setErreur("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lignes: lignes.map((l) => ({ slug: l.slug, qte: l.qte })) }),
      });
      const data = await r.json();
      if (!r.ok || !data.url) throw new Error(data.erreur || "Erreur inconnue");
      window.location.href = data.url; // direction la page de paiement sécurisée Stripe
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Le paiement n’a pas pu démarrer.");
      setChargement(false);
    }
  }

  return (
    <>
      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 28 }}>
        <h1 className="titre" style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>Ton panier</h1>
      </div>

      {!pret ? (
        <div className="wrap" style={{ minHeight: 300 }} />
      ) : lignes.length === 0 ? (
        <div className="wrap" style={{ paddingBottom: 96 }}>
          <div className="boite boite--lilas placeholder" style={{ minHeight: 260, gap: 20 }}>
            <span>Ton panier est tout vide…</span>
            <Link href="/boutique" className="btn">Aller à la boutique</Link>
          </div>
        </div>
      ) : (
        <div className="wrap panier">
          <div>
            <div className="boite boite--rose progression">
              <p>{reste > 0 ? `Plus que ${prix(reste)} pour la livraison offerte` : "Livraison offerte débloquée ✦"}</p>
              <div className="barre" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.min(1, sousTotal / livraison.seuilGratuit) * 100)}>
                <div style={{ width: `${Math.min(100, (sousTotal / livraison.seuilGratuit) * 100)}%` }} />
              </div>
            </div>

            {lignes.map(({ slug, qte, produit }) => (
              <div key={slug} className="boite ligne">
                <Link href={`/produit/${slug}`} className="ligne__img">
                  {produit.images[0] ? (
                    <Image src={produit.images[0]} alt={produit.nom} width={112} height={112} />
                  ) : (
                    <span className="vide-img" style={{ fontSize: 16 }}>Img</span>
                  )}
                </Link>
                <div>
                  <h3><Link href={`/produit/${slug}`}>{produit.nom}</Link></h3>
                  <p className="format">{produit.format}</p>
                  <div className="qte">
                    <button onClick={() => changerQte(slug, qte - 1)} aria-label={`Retirer un ${produit.nom}`}>−</button>
                    <span>{qte}</span>
                    <button onClick={() => changerQte(slug, qte + 1)} disabled={qte >= QTE_MAX} aria-label={`Ajouter un ${produit.nom}`}>+</button>
                  </div>
                </div>
                <div className="ligne__droite">
                  <span className="ligne__prix">{prix(produit.prix * qte)}</span>
                  <button className="retirer" onClick={() => retirer(slug)} aria-label={`Retirer ${produit.nom} du panier`} title="Retirer du panier">
                    {/* icône poubelle */}
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
                      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="boite boite--noire recap">
            <h2 className="titre">Récapitulatif</h2>
            <dl>
              <dt>Sous-total</dt><dd>{prix(sousTotal)}</dd>
              <dt>Livraison</dt><dd>{fraisMin === 0 ? "Offerte" : `dès ${prix(fraisMin)}`}</dd>
              <dt>Code promo</dt><dd>à l’étape suivante</dd>
            </dl>
            <div className="total"><span>Total</span><span>{prix(sousTotal + fraisMin)}</span></div>
            <button className="btn btn--vert btn--large" onClick={commander} disabled={chargement}>
              {chargement ? "Un instant…" : "Commander"}
            </button>
            {erreur && <p className="erreur" role="alert">{erreur}</p>}
            <small>Paiement 100 % sécurisé par Stripe · CB, Apple Pay, Google Pay</small>
          </aside>
        </div>
      )}
    </>
  );
}
