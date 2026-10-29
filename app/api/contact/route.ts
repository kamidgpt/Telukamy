import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

// Envoie les messages du formulaire de contact
// dans ta boîte Gmail, gratuitement, via ton propre compte Gmail.
// Variables à renseigner dans Vercel : GMAIL_USER et GMAIL_APP_PASSWORD
// (mot de passe d'application à 16 caractères, voir le README).

export const runtime = "nodejs";

const echapper = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const emailValide = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 200;

export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  // Piège à robots : ce champ est invisible pour les humains
  if (d.site_web) return NextResponse.json({ ok: true });

  const type = d.type === "newsletter" ? "newsletter" : "contact";
  const email = String(d.email ?? "").trim();
  const nom = String(d.nom ?? "").trim().slice(0, 120);
  const sujet = String(d.sujet ?? "").trim().slice(0, 160);
  const message = String(d.message ?? "").trim().slice(0, 5000);

  if (!emailValide(email)) return NextResponse.json({ erreur: "Ton email n’a pas l’air valide." }, { status: 400 });
  if (type === "contact" && (!nom || message.length < 5)) {
    return NextResponse.json({ erreur: "Merci de remplir ton nom et ton message." }, { status: 400 });
  }

  const gmail = process.env.GMAIL_USER;
  const motDePasse = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""); // Google l'affiche avec des espaces
  if (!gmail || !motDePasse) {
    return NextResponse.json(
      { erreur: `Le formulaire n’est pas encore branché. Écris-moi directement à ${site.email}.` },
      { status: 503 },
    );
  }

  const objet =
    type === "newsletter" ? `✦ Nouvelle inscription newsletter : ${email}` : `✦ Message de ${nom}${sujet ? ` — ${sujet}` : ""}`;
  const html =
    type === "newsletter"
      ? `<p><strong>${echapper(email)}</strong> veut recevoir tes nouvelles.</p>`
      : `<p><strong>De :</strong> ${echapper(nom)} &lt;${echapper(email)}&gt;</p>
         <p><strong>Sujet :</strong> ${echapper(sujet || "—")}</p>
         <p style="white-space:pre-wrap">${echapper(message)}</p>`;

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user: gmail, pass: motDePasse } });
    await transport.sendMail({
      from: `${site.nom} <${gmail}>`,
      to: process.env.CONTACT_EMAIL || gmail, // par défaut : ta propre boîte Gmail
      replyTo: type === "contact" ? `${nom} <${email}>` : email, // « Répondre » écrit directement à la personne
      subject: objet,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur envoi Gmail :", e);
    return NextResponse.json({ erreur: `L’envoi a échoué. Écris-moi directement à ${site.email}.` }, { status: 502 });
  }
}
