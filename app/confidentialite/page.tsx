import type { Metadata } from "next";
import { Heros } from "@/components/Heros";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Confidentialité" };

const C = ({ children }: { children: React.ReactNode }) => <span className="a-completer">{children}</span>;

export default function PageConfidentialite() {
  return (
    <>
      <Heros titre="Confidentialité" couleur="lilas" />
      <section className="section">
        <div className="wrap">
          <div className="prose">
          <h2 className="titre">Qui s’occupe de tes données ?</h2>
          <p>
            <C>[Prénom Nom]</C>, éditrice du site {site.nom}, joignable à {site.email}.
          </p>

          <h2 className="titre">Quelles données et pourquoi ?</h2>
          <ul>
            <li><strong>Commande</strong> : nom, email, téléphone, adresse de livraison — pour préparer et expédier ta commande. Conservées le temps légal de conservation des pièces comptables (10 ans).</li>
            <li><strong>Paiement</strong> : géré entièrement par Stripe. Je n’ai jamais accès à ton numéro de carte.</li>
            <li><strong>Formulaire de contact</strong> : nom, email, message — pour te répondre. Conservés 3 ans maximum.</li>
            <li><strong>Newsletter</strong> : email — pour t’envoyer des nouvelles. Désinscription possible à tout moment.</li>
          </ul>

          <h2 className="titre">Prestataires</h2>
          <p>
            Vercel (hébergement du site), Stripe (paiement), Resend (envoi des emails du formulaire). Ces services
            peuvent traiter des données hors de l’Union européenne, dans le cadre de garanties prévues par le RGPD.
          </p>

          <h2 className="titre">Cookies</h2>
          <p>
            Ce site n’utilise pas de cookies publicitaires ni de mesure d’audience. Ton panier est simplement mémorisé
            dans ton navigateur pour ne pas le perdre.
          </p>

          <h2 className="titre">Tes droits</h2>
          <p>
            Tu peux demander l’accès, la rectification ou la suppression de tes données à {site.email}. Tu peux aussi
            saisir la CNIL (cnil.fr).
          </p>
          </div>
        </div>
      </section>
    </>
  );
}
