"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { usePanier } from "@/lib/cart";
import { Etincelle } from "./Etincelle";
import { Bandeau } from "./Bandeau";

const liens = [
  { href: "/boutique", label: "Boutique" },
  { href: "/boutique?nouveau=1", label: "Nouveautés" },
  { href: "/ou-me-trouver", label: "Où me trouver" },
  { href: "/a-propos", label: "À propos" },
];

export function Entete() {
  const chemin = usePathname();
  const router = useRouter();
  const { nbArticles, pret } = usePanier();
  const [menu, setMenu] = useState(false);
  const [recherche, setRecherche] = useState(false);
  const champ = useRef<HTMLInputElement>(null);

  useEffect(() => { setMenu(false); setRecherche(false); }, [chemin]);
  useEffect(() => { if (recherche) champ.current?.focus(); }, [recherche]);

  return (
    <header className="entete">
      <Bandeau />
      <div className="wrap entete__in">
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true"><path d="M1 2h20M1 9h20M1 16h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
        </button>
        <Link href="/" className="logo">
          <Etincelle couleur="var(--rose)" />
          {site.nom}
        </Link>
        <nav className={`nav ${menu ? "ouvert" : ""}`} aria-label="Navigation principale">
          {liens.map((l) => (
            <Link key={l.label} href={l.href} aria-current={chemin === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
          <button className="lien" onClick={() => setRecherche((r) => !r)} aria-expanded={recherche}>Recherche</button>
        </nav>
        <Link href="/panier" className="pastille-panier" aria-label={`Panier, ${nbArticles} article${nbArticles > 1 ? "s" : ""}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.5 12h-11zM9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /></svg>
          ({pret ? nbArticles : 0})
        </Link>
      </div>
      {recherche && (
        <div className="recherche-bar">
          <form
            className="wrap"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = champ.current?.value.trim() ?? "";
              router.push(q ? `/boutique?q=${encodeURIComponent(q)}` : "/boutique");
            }}
          >
            <label htmlFor="q" className="sr-only">Rechercher un produit</label>
            <input ref={champ} id="q" className="champ" placeholder="Print, stickers, carte…" />
            <button className="btn btn--petit" type="submit">Chercher</button>
          </form>
        </div>
      )}
    </header>
  );
}
