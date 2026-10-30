import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { trouverProduit } from "@/data/products";

// « Me prévenir du retour » sur un produit épuisé :
// t'envoie un email (via ton Gmail) avec l'adresse de la personne et le produit demandé.
// Quand le produit revient, tu lui réponds directement depuis Gmail.

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
  const produit = trouverProduit(String(d.slug ?? ""));
  if (!emailValide(email)) return NextResponse.json({ erreur: "Ton email n’a pas l’air valide." }, { status: 400 });
  if (!produit) return NextResponse.json({ erreur: "Produit introuvable." }, { status: 400 });

  const gmail = process.env.GMAIL_USER;
  const motDePasse = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmail || !motDePasse) {
    return NextResponse.json({ erreur: "Cette fonction n’est pas encore branchée. Reviens très vite !" }, { status: 503 });
  }

  try {
    await nodemailer
      .createTransport({ service: "gmail", auth: { user: gmail, pass: motDePasse } })
      .sendMail({
        from: gmail,
        to: process.env.CONTACT_EMAIL || gmail,
        replyTo: email,
        subject: `✦ Retour en stock demandé : ${produit.nom}`,
        text: `${email} veut être prévenu·e du retour de « ${produit.nom} ».\nRéponds simplement à cet email quand il est de nouveau disponible.`,
      });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur envoi Gmail :", e);
    return NextResponse.json({ erreur: "L’envoi a échoué. Réessaie un peu plus tard." }, { status: 502 });
  }
}
