import type { Metadata } from "next";
import { Heros } from "@/components/Heros";
import { questionsAPropos, site } from "@/data/site";

export const metadata: Metadata = { title: "À propos" };

export default function PageAPropos() {
  return (
    <>
      <Heros titre="Salut !" couleur="vert" />
      <div className="wrap" style={{ paddingTop: 36 }}>
        <p style={{ fontFamily: "var(--titre)", fontSize: "clamp(22px, 2.4vw, 30px)", margin: 0 }}>
          Je suis {site.prenom}, illustratrice, et voici pourquoi je dessine.
        </p>
      </div>
      <section className="section">
        <div className="wrap deux-col">
          {/* Remplace ce bloc par ta photo : <img src="/portrait.jpg" alt="…" /> */}
          <div className="boite boite--rose placeholder penche" style={{ aspectRatio: "1 / 0.95" }}>Portrait atelier</div>
          <div>
            <h2 className="titre">Mon histoire</h2>
            <p>
              Quelques lignes sur ton parcours, tes inspirations et ton processus de création, de l’idée à
              l’impression. Parle de ce qui te rend différente.
            </p>
            <div className="tuiles">
              <div className="boite tuile"><strong>FAIT MAIN</strong>Dessiné, imprimé et découpé chez moi</div>
              <div className="boite tuile"><strong>100 % ORIGINAL</strong>Mes persos, zéro copie</div>
              <div className="boite tuile"><strong>ENVOI SOIGNÉ</strong>Un petit cadeau glissé dans chaque colis</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--noire">
        <div className="wrap">
          <h2 className="titre" style={{ color: "var(--rose)" }}>Questions / réponses</h2>
          <div className="qr">
            {questionsAPropos.map((x) => (
              <div key={x.q}>
                <h3>{x.q}</h3>
                <p>{x.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
