import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { trouverProduit } from "@/data/products";
import { livraison } from "@/data/site";
import { QTE_MAX } from "@/lib/constantes";

// Crée une session de paiement Stripe à partir du panier.
// IMPORTANT : les prix sont relus ici, côté serveur, depuis data/products.ts.
// Le navigateur n'envoie que des identifiants + quantités : impossible de tricher sur le prix.
export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { erreur: "Le paiement n’est pas encore configuré (clé Stripe manquante)." },
      { status: 503 },
    );
  }

  let corps: { lignes?: { slug: string; qte: number }[] };
  try {
    corps = await req.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const lignes = Array.isArray(corps.lignes) ? corps.lignes.slice(0, 50) : [];
  if (!lignes.length) return NextResponse.json({ erreur: "Ton panier est vide." }, { status: 400 });

  const origine = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let sousTotal = 0;

  for (const l of lignes) {
    const p = trouverProduit(String(l.slug));
    const qte = Math.floor(Number(l.qte));
    if (!p || !Number.isFinite(qte) || qte < 1 || qte > QTE_MAX) {
      return NextResponse.json({ erreur: "Un article du panier n’est plus disponible." }, { status: 400 });
    }
    if (p.epuise) {
      return NextResponse.json({ erreur: `« ${p.nom} » vient d’être épuisé, retire-le du panier.` }, { status: 409 });
    }
    sousTotal += p.prix * qte;
    items.push({
      quantity: qte,
      price_data: {
        currency: "eur",
        unit_amount: p.prix,
        product_data: {
          name: p.nom,
          description: p.format,
          // Stripe n'accepte que des images en https publiques
          images: origine.startsWith("https://") ? p.images.slice(0, 1).map((i) => origine + i) : [],
          metadata: { slug: p.slug },
        },
      },
    });
  }

  const offerte = sousTotal >= livraison.seuilGratuit;
  const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = livraison.options.map((o) => ({
    shipping_rate_data: {
      type: "fixed_amount",
      display_name: offerte ? `${o.nom} — offerte` : o.nom,
      fixed_amount: { amount: offerte ? 0 : o.prix, currency: "eur" },
      delivery_estimate: {
        minimum: { unit: "business_day", value: o.delaiMin },
        maximum: { unit: "business_day", value: o.delaiMax },
      },
      metadata: { transporteur: o.id },
    },
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      line_items: items,
      shipping_address_collection: { allowed_countries: [...livraison.pays] },
      shipping_options,
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true, // codes promo créés dans ton tableau de bord Stripe
      billing_address_collection: "auto",
      success_url: `${origine}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origine}/panier`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Erreur Stripe :", e);
    return NextResponse.json({ erreur: "Le paiement n’a pas pu démarrer. Réessaie dans un instant." }, { status: 502 });
  }
}
