import type { Metadata } from "next";
import { Heros } from "@/components/Heros";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Mentions légales" };

// Les passages surlignés [entre crochets] sont à compléter avec tes informations.
const C = ({ children }: { children: React.ReactNode }) => <span className="a-completer">{children}</span>;

export default function PageMentions() {
  return (
    <>
      <Heros titre="Mentions légales" couleur="lilas" />
      <section className="section">
        <div className="wrap">
          <div className="prose">
          <h2 className="titre">Éditeur du site</h2>
          <p>
            Le site {site.nom} est édité par <C>[Prénom Nom]</C>, entrepreneur individuel (<C>[micro-entreprise]</C>),
            immatriculé sous le numéro SIRET <C>[000 000 000 00000]</C>.<br />
            Adresse : <C>[adresse postale]</C><br />
            Email : <a href={`mailto:${site.email}`}>{site.email}</a><br />
            Directrice de la publication : <C>[Prénom Nom]</C><br />
            <C>[Si tu es en franchise de TVA : « TVA non applicable, article 293 B du CGI »]</C>
          </p>

          <h2 className="titre">Hébergeur</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com
          </p>

          <h2 className="titre">Propriété intellectuelle</h2>
          <p>
            L’ensemble des illustrations, photos et textes de ce site sont la propriété exclusive de <C>[Prénom Nom]</C>.
            Toute reproduction, même partielle, est interdite sans autorisation écrite.
          </p>

          <h2 className="titre">Paiement</h2>
          <p>
            Les paiements sont traités par Stripe Payments Europe Ltd. Aucune donnée bancaire ne transite ni n’est
            stockée sur ce site.
          </p>
          </div>
        </div>
      </section>
    </>
  );
}
