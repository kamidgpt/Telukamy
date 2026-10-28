import type { Metadata } from "next";
import { Heros } from "@/components/Heros";
import { site } from "@/data/site";
import { FormulaireContact } from "./FormulaireContact";

export const metadata: Metadata = { title: "Contact" };

export default function PageContact() {
  return (
    <>
      <Heros titre="Contact" couleur="vert" />
      <div className="wrap grille-form">
        <FormulaireContact />
        <aside className="boite boite--noire" style={{ padding: "28px 30px" }}>
          <h2 className="titre" style={{ color: "var(--rose)", fontSize: 36, marginBottom: 16 }}>Autres moyens</h2>
          <p style={{ fontWeight: 700, fontSize: 19, margin: "0 0 8px" }}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ fontWeight: 700, fontSize: 19, margin: "0 0 8px" }}>
            Instagram <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">{site.instagram.pseudo}</a>
          </p>
          <p style={{ fontWeight: 700, fontSize: 19, margin: 0, color: "var(--vert)" }}>Réponse sous 48 h</p>
        </aside>
      </div>
    </>
  );
}
