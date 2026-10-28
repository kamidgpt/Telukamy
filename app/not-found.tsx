import Link from "next/link";
import { Heros } from "@/components/Heros";

export default function Introuvable() {
  return (
    <>
      <Heros titre="Oups !" couleur="noir" etincelle="var(--rose)" />
      <section className="section">
        <div className="wrap">
          <p style={{ fontSize: 22 }}>Cette page s’est perdue dans la spirale.</p>
          <Link href="/boutique" className="btn" style={{ marginTop: 16 }}>Retour à la boutique</Link>
        </div>
      </section>
    </>
  );
}
