import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { produits, trouverProduit, categories } from "@/data/products";
import { prix } from "@/lib/format";
import { CarteProduit } from "@/components/CarteProduit";
import { Separateur } from "@/components/Separateur";
import { Galerie } from "./Galerie";
import { AjouterAuPanier } from "./AjouterAuPanier";

export function generateStaticParams() {
  return produits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = trouverProduit((await params).slug);
  if (!p) return {};
  return { title: p.nom, description: p.description, openGraph: { images: p.images.slice(0, 1) } };
}

export default async function PageProduit({ params }: { params: Promise<{ slug: string }> }) {
  const produit = trouverProduit((await params).slug);
  if (!produit) notFound();
  const cat = categories.find((c) => c.id === produit.categorie);
  const autres = produits.filter((p) => p.slug !== produit.slug && !p.epuise).slice(0, 4);

  return (
    <>
      <div className="wrap fil">
        <Link href="/boutique">Boutique</Link>
        <Separateur />
        <Link href={`/boutique?categorie=${produit.categorie}`}>{cat?.label}</Link>
      </div>
      <div className="wrap fiche">
        <Galerie images={produit.images} nom={produit.nom} epuise={produit.epuise} nouveau={produit.nouveau} />
        <div>
          <h1 className="titre">{produit.nom}</h1>
          <div className="prix-grand">{prix(produit.prix)}</div>
          <p style={{ fontSize: 19 }}>{produit.description}</p>
          <AjouterAuPanier slug={produit.slug} epuise={produit.epuise} />
          {produit.details?.length ? (
            <div className="boite boite--lilas" style={{ padding: "18px 22px" }}>
              <h2 className="titre" style={{ fontSize: 24, marginBottom: 6 }}>Détails</h2>
              <ul style={{ margin: 0 }}>{produit.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ) : null}
          <p style={{ color: "var(--gris)", fontSize: 15, marginTop: 22 }}>
            Expédié sous 48 h <Separateur /> Livraison offerte dès 60 € <Separateur /> <Link href="/livraison-faq">Toutes les infos livraison</Link>
          </p>
        </div>
      </div>
      {autres.length > 0 && (
        <section className="section" style={{ background: "var(--lilas)", borderTop: "var(--trait)" }}>
          <div className="wrap">
            <h2 className="titre">Tu aimeras aussi</h2>
            <div className="grille" style={{ paddingBottom: 0 }}>
              {autres.map((p) => <CarteProduit key={p.slug} produit={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
