import { Fragment } from "react";
import { site } from "@/data/site";
import { Separateur } from "./Separateur";

export function Bandeau() {
  // Les ✦ du texte sont remplacés par une étoile dessinée, centrée sur le texte
  const morceaux = site.bandeau.split("✦").map((m) => m.trim()).filter(Boolean);
  const ligne = (
    <>
      {morceaux.map((m, i) => (
        <Fragment key={i}>
          {m}
          <Separateur />
        </Fragment>
      ))}
    </>
  );
  // Le texte est répété pour un défilement sans coupure
  return (
    <div className="bandeau">
      <div className="bandeau__piste">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} aria-hidden={i > 0} style={{ display: "inline-flex", alignItems: "center" }}>
            {ligne}
          </span>
        ))}
      </div>
    </div>
  );
}
