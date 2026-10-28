import Link from "next/link";
import Image from "next/image";
import type { Produit } from "@/data/products";
import { prix } from "@/lib/format";

export function CarteProduit({ produit, prioritaire }: { produit: Produit; prioritaire?: boolean }) {
  const [photo, photoSurvol] = produit.images;
  const tailles = "(max-width: 760px) 50vw, 25vw";
  return (
    <Link href={`/produit/${produit.slug}`} className={`carte ${produit.epuise ? "carte--epuise" : ""}`}>
      {produit.epuise ? (
        <span className="sticker sticker--noir">Épuisé</span>
      ) : produit.nouveau ? (
        <span className="sticker">Nouveau</span>
      ) : null}
      <div className="boite carte__img">
        {photo ? (
          <>
            <Image src={photo} alt={produit.nom} fill sizes={tailles} priority={prioritaire} />
            {/* 2e photo : apparaît au survol de la souris */}
            {photoSurvol && <Image src={photoSurvol} alt="" fill sizes={tailles} className="survol" />}
          </>
        ) : (
          <span className="vide-img">Produit</span>
        )}
      </div>
      <h3 className="carte__nom">{produit.nom}</h3>
      <div className="carte__prix">{prix(produit.prix)}</div>
    </Link>
  );
}
