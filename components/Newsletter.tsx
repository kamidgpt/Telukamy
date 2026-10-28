"use client";

import { useState } from "react";

export function Newsletter() {
  const [etat, setEtat] = useState<"" | "envoi" | "ok" | "erreur">("");
  const [message, setMessage] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    setEtat("envoi");
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", email }),
    }).catch(() => null);
    const json = await r?.json().catch(() => ({}));
    if (r?.ok) {
      setEtat("ok");
      setMessage("C’est noté, à très vite dans ta boîte mail ✦");
      form.reset();
    } else {
      setEtat("erreur");
      // affiche la vraie raison (ex. : formulaire pas encore branché à Resend)
      setMessage(json?.erreur || "Oups, l’inscription n’a pas marché. Réessaie un peu plus tard.");
    }
  }

  return (
    <>
      <form className="news" onSubmit={envoyer}>
        <label htmlFor="news-email" className="sr-only">Ton email</label>
        <input id="news-email" name="email" type="email" required placeholder="ton@email.fr" autoComplete="email" />
        <button type="submit" disabled={etat === "envoi"}>{etat === "envoi" ? "…" : "OK !"}</button>
      </form>
      <p className="news-msg" role="status" style={{ color: etat === "ok" ? "var(--vert)" : etat === "erreur" ? "var(--rose)" : undefined }}>
        {message}
      </p>
    </>
  );
}
