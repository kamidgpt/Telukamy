import type { Metadata } from "next";
import { Heros } from "@/components/Heros";
import { boutiquesPartenaires, evenements } from "@/data/site";

export const metadata: Metadata = { title: "Où me trouver" };

export default function PageOuMeTrouver() {
  return (
    <>
      <Heros titre="Où me trouver" couleur="rose" />
      <section className="section">
        <div className="wrap deux-col" style={{ alignItems: "start" }}>
          <div>
            <h2 className="titre">Prochains événements</h2>
            {evenements.map((e) => (
              <div key={e.nom} className="boite evt">
                <span className="mois">{e.mois}</span>
                <div>
                  <h3>{e.nom}</h3>
                  <p>{e.lieu} · {e.dates}</p>
                </div>
                {e.lien ? (
                  <a className="btn btn--petit" href={e.lien} target="_blank" rel="noopener noreferrer">Infos</a>
                ) : (
                  <span className="btn btn--petit" aria-hidden="true">Bientôt</span>
                )}
              </div>
            ))}
          </div>
          {/* Remplace par une carte ou une photo : <img src="/carte.jpg" alt="…" /> */}
          <div className="boite boite--lilas placeholder penche-d" style={{ minHeight: 340, marginTop: 60 }}>Carte</div>
        </div>
      </section>

      <section className="section section--noire">
        <div className="wrap deux-col">
          <div>
            <h2 className="titre" style={{ color: "var(--rose)" }}>Mon stand</h2>
            <p>Décris ton stand : la table, l’affichage, l’ambiance. Montre aux gens à quoi s’attendre.</p>
          </div>
          <div className="boite placeholder penche" style={{ background: "var(--vert)", color: "var(--noir)", minHeight: 320, borderColor: "var(--blanc)", boxShadow: "8px 8px 0 var(--blanc)" }}>
            Photo du stand
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="titre">Boutiques partenaires</h2>
          <div className="partenaires">
            {boutiquesPartenaires.map((b) => (
              <div key={b.nom} className="boite">
                <h3>{b.lien ? <a href={b.lien} target="_blank" rel="noopener noreferrer">{b.nom}</a> : b.nom}</h3>
                <p style={{ margin: 0 }}>{b.adresse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
