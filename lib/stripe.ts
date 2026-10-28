import Stripe from "stripe";

// La clé secrète est lue dans les variables d'environnement (jamais dans le code !)
export function getStripe() {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return null;
  return new Stripe(cle);
}
