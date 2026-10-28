"use client";

import { useState } from "react";

export function FormulaireContact() {
  const [etat, setEtat] = useState<"" | "envoi" | "ok">("");
  const [erreur, setErreur] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEtat("envoi");
    setErreur("");
    const donnees = Object.fromEntries(new FormData(form));
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", ...donnees }),
    }).catch(() => null);
    const json = await r?.json().catch(() => ({}));
    if (r?.ok) {
      setEtat("ok");
      form.reset();
    } else {
      setEtat("");
      setErreur(json?.erreur || "L’envoi a échoué, réessaie dans un instant.");
    }
  }

  if (etat === "ok") {
    return (
      <div className="boite boite--rose placeholder" style={{ minHeight: 320, fontSize: 30 }}>
        Message bien reçu ✦<br />Je te réponds vite !
      </div>
    );
  }

  return (
    <form onSubmit={envoyer}>
      <div>
        <label className="etiquette" htmlFor="nom">Nom</label>
        <input className="champ" id="nom" name="nom" required autoComplete="name" />
      </div>
      <div>
        <label className="etiquette" htmlFor="email">Email</label>
        <input className="champ" id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="etiquette" htmlFor="sujet">Sujet</label>
        <input className="champ" id="sujet" name="sujet" placeholder="Commande perso, question, pro…" />
      </div>
      <div>
        <label className="etiquette" htmlFor="message">Message</label>
        <textarea className="champ" id="message" name="message" required minLength={5} />
      </div>
      {/* champ piège anti-spam, invisible */}
      <input type="text" name="site_web" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
      <div>
        <button className="btn" type="submit" disabled={etat === "envoi"}>
          {etat === "envoi" ? "Envoi…" : "Envoyer"}
        </button>
      </div>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
    </form>
  );
}
