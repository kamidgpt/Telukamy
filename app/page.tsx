import Image from "next/image";
import Link from "next/link";
import { produits } from "@/data/products";
import { site } from "@/data/site";
import { CarteProduit } from "@/components/CarteProduit";
import { Etincelles } from "@/components/Etincelle";

export default function Accueil() {
  // Produits marqués nouveau: true (les plus récents d'abord)
  const nouveautes = produits
    .filter((p) => p.nouveau && !p.epuise)
    .sort((a, b) => b.ajouteLe.localeCompare(a.ajouteLe))
    .slice(0, 4);

  return (
    <>
      <section className="heros heros--rose">
        <div className="wrap deux-col" style={{ paddingBlock: "clamp(40px, 6vw, 88px)" }}>
          <div style={{ position: "relative" }}>
            <h1 className="titre" style={{ fontSize: "clamp(56px, 7.6vw, 116px)", lineHeight: 1.02 }}>
              Adorables.<br />Attention,<br />ça mord.
            </h1>
            <p style={{ fontSize: 20, fontWeight: 500, maxWidth: 460, margin: "32px 0 32px" }}>{site.slogan}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/boutique" className="btn btn--vert">Voir la boutique</Link>
              <Link href="/a-propos" className="btn btn--blanc">Qui suis-je ?</Link>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="boite penche-d" style={{ aspectRatio: "932 / 1400", maxHeight: 620, marginInline: "auto", overflow: "hidden", position: "relative" }}>
              <Image src="/produits/print-spirale.jpg" alt="Print Spirale encadré" fill sizes="(max-width: 860px) 100vw, 45vw" priority />
            </div>
            <span className="sticker" style={{ position: "absolute", top: 18, left: 0, fontSize: 26 }}>Nouveau !</span>
            <div style={{ position: "absolute", right: -10, bottom: -10 }}><Etincelles grande="var(--vert)" /></div>
          </div>
        </div>
      </section>

      {nouveautes.length > 0 && (
      <section className="wrap" style={{ paddingTop: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
          <h2 className="titre" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>Nouveautés</h2>
          <Link href="/boutique?nouveau=1" className="btn btn--petit btn--blanc">Tout voir →</Link>
        </div>
        <div className="grille">
          {nouveautes.map((p) => <CarteProduit key={p.slug} produit={p} />)}
        </div>
      </section>
      )}

      <section className="section section--noire">
        <div className="wrap deux-col">
          <div className="boite penche" style={{ position: "relative", aspectRatio: "3500 / 2300", overflow: "hidden", borderColor: "var(--blanc)", boxShadow: "8px 8px 0 var(--vert)" }}>
            <Image src="/produits/stickers-coeurs-detail.jpg" alt="Stickers cœurs dans leurs pochettes XOXO" fill sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
          <div>
            <h2 className="titre" style={{ color: "var(--rose)", fontSize: "clamp(40px, 5vw, 72px)" }}>Emballé avec amour</h2>
            <p style={{ fontSize: 19 }}>
              Chaque commande part dans sa pochette, avec un petit sticker XOXO glissé dedans. Expédition sous 48 h,
              livraison offerte dès 60 €.
            </p>
            <Link href="/livraison-faq" className="btn btn--vert" style={{ marginTop: 16 }}>Infos livraison</Link>
          </div>
        </div>
      </section>
    </>
  );
}
