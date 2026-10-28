import { NextResponse } from "next/server";
import { site } from "@/data/site";

// Envoie les messages du formulaire de contact (et les inscriptions newsletter)
// dans ta boîte mail, via le service gratuit Resend (resend.com).
// Variables à renseigner dans Vercel : RESEND_API_KEY et CONTACT_EMAIL.

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

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL || site.email;
  if (!cle) {
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

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || `${site.nom} <onboarding@resend.dev>`,
      to: [destinataire],
      reply_to: email,
      subject: objet,
      html,
    }),
  }).catch(() => null);

  if (!r?.ok) {
    console.error("Erreur Resend :", r?.status, await r?.text().catch(() => ""));
    return NextResponse.json({ erreur: `L’envoi a échoué. Écris-moi directement à ${site.email}.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
