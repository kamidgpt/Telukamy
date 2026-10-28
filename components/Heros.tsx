import { Etincelles } from "./Etincelle";

type Couleur = "rose" | "vert" | "violet" | "lilas" | "noir";

// Grand bandeau de couleur avec le titre de la page
export function Heros({
  titre,
  couleur = "rose",
  chapo,
  etincelle,
}: {
  titre: string;
  couleur?: Couleur;
  chapo?: string;
  etincelle?: string;
}) {
  const grande = etincelle ?? (couleur === "vert" ? "var(--rose)" : couleur === "violet" ? "var(--rose)" : couleur === "lilas" ? "var(--rose)" : "var(--vert)");
  return (
    <section className={`heros heros--${couleur}`}>
      <div className="wrap heros__in">
        <div>
          <h1 className="titre">{titre}</h1>
          {chapo && <p className="chapo">{chapo}</p>}
        </div>
        <Etincelles grande={grande} />
      </div>
    </section>
  );
}
