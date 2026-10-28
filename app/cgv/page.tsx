import type { Metadata } from "next";
import Link from "next/link";
import { Heros } from "@/components/Heros";
import { livraison, site } from "@/data/site";
import { prix } from "@/lib/format";

export const metadata: Metadata = { title: "Conditions générales de vente" };

const C = ({ children }: { children: React.ReactNode }) => <span className="a-completer">{children}</span>;

// Modèle de CGV pour une petite boutique en ligne française.
// Relis-le et adapte-le à ta situation (idéalement avec un pro du droit).
export default function PageCGV() {
  return (
    <>
      <Heros titre="CGV" couleur="lilas" chapo="Conditions générales de vente" />
      <section className="section">
        <div className="wrap">
          <div className="prose">
          <h2 className="titre">1. Vendeur</h2>
          <p>
            Les présentes conditions s’appliquent aux ventes réalisées sur le site {site.nom}, exploité par{" "}
            <C>[Prénom Nom]</C>, SIRET <C>[numéro]</C>, <C>[adresse]</C>, {site.email}.
          </p>

          <h2 className="titre">2. Produits</h2>
          <p>
            Les produits (illustrations imprimées, stickers, cartes) sont décrits au mieux sur leur fiche. Les couleurs
            peuvent légèrement varier selon les écrans. Les produits sont proposés dans la limite des stocks disponibles.
          </p>

          <h2 className="titre">3. Prix</h2>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises <C>[ou : TVA non applicable, art. 293 B du CGI]</C>,
            hors frais de livraison. Les frais de livraison sont indiqués avant la validation de la commande.
          </p>

          <h2 className="titre">4. Commande et paiement</h2>
          <p>
            La commande est validée après paiement par carte bancaire, Apple Pay ou Google Pay via la plateforme
            sécurisée Stripe. Un email de confirmation est envoyé à l’adresse indiquée.
          </p>

          <h2 className="titre">5. Livraison</h2>
          <p>
            Les commandes sont expédiées sous 48 h ouvrées vers : France, Belgique, Luxembourg, Suisse et Monaco.
            {livraison.options.map((o) => ` ${o.nom} : ${prix(o.prix)} (${o.delaiMin} à ${o.delaiMax} jours ouvrés).`)}
            {" "}Livraison offerte dès {prix(livraison.seuilGratuit)} d’achat. En cas de colis abîmé ou perdu, contacte-moi
            rapidement à {site.email}.
          </p>

          <h2 className="titre">6. Droit de rétractation</h2>
          <p>
            Conformément à l’article L221-18 du Code de la consommation, tu disposes de 14 jours à compter de la
            réception pour exercer ton droit de rétractation, sans avoir à te justifier. Préviens-moi par email avant
            de renvoyer le produit, dans son état d’origine. Les frais de retour sont à ta charge. Le remboursement
            intervient sous 14 jours après réception du retour, par le même moyen de paiement.
          </p>
          <p>
            Ce droit ne s’applique pas aux produits personnalisés ou réalisés sur mesure (article L221-28).
          </p>

          <h2 className="titre">7. Garanties légales</h2>
          <p>
            Les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants du Code de la
            consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
          </p>

          <h2 className="titre">8. Médiation et litiges</h2>
          <p>
            En cas de litige, contacte-moi d’abord pour trouver une solution amiable. Tu peux ensuite recourir
            gratuitement au médiateur de la consommation : <C>[nom et site du médiateur auquel tu adhères]</C>. Les
            présentes CGV sont soumises au droit français.
          </p>

          <p style={{ marginTop: 36 }}>
            Voir aussi : <Link href="/mentions-legales">Mentions légales</Link> · <Link href="/confidentialite">Confidentialité</Link>
          </p>
          </div>
        </div>
      </section>
    </>
  );
}
