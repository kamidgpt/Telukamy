import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Inscription newsletter : ajoute l'email dans ta liste de contacts Brevo (gratuit).
// Variables à renseigner dans Vercel : BREVO_API_KEY et BREVO_LIST_ID.
// Si Brevo n'est pas encore configuré mais que Gmail l'est, l'inscription t'est envoyée par email.

export const runtime = "nodejs";

const emailValide = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 200;

export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }
  const email = String(d.email ?? "").trim().toLowerCase();
  if (!emailValide(email)) return NextResponse.json({ erreur: "Ton email n’a pas l’air valide." }, { status: 400 });

  const cle = process.env.BREVO_API_KEY;
  const liste = Number(process.env.BREVO_LIST_ID);

  // 1) Brevo
  if (cle && liste) {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": cle, "Content-Type": "application/json", Accept: "application/json" },
      // updateEnabled : si la personne est déjà inscrite, pas d'erreur
      body: JSON.stringify({ email, listIds: [liste], updateEnabled: true }),
    }).catch(() => null);
    if (r && (r.status === 201 || r.status === 204)) return NextResponse.json({ ok: true });
    console.error("Erreur Brevo :", r?.status, await r?.text().catch(() => ""));
    return NextResponse.json({ erreur: "L’inscription a échoué. Réessaie un peu plus tard." }, { status: 502 });
  }

  // 2) Solution de secours : notification dans ta boîte Gmail
  const gmail = process.env.GMAIL_USER;
  const motDePasse = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (gmail && motDePasse) {
    try {
      await nodemailer
        .createTransport({ service: "gmail", auth: { user: gmail, pass: motDePasse } })
        .sendMail({ from: gmail, to: gmail, subject: `✦ Nouvelle inscription newsletter : ${email}`, text: `${email} veut recevoir tes nouvelles.` });
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error("Erreur envoi Gmail :", e);
    }
  }

  return NextResponse.json({ erreur: "La newsletter n’est pas encore branchée. Reviens très vite !" }, { status: 503 });
}
