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

function Loupe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function Entete() {
  const chemin = usePathname();
  const router = useRouter();
  const { nbArticles, pret } = usePanier();
  const [menu, setMenu] = useState(false);
  const [recherche, setRecherche] = useState(false);
  const champ = useRef<HTMLInputElement>(null);
  const zone = useRef<HTMLFormElement>(null);

  useEffect(() => { setMenu(false); setRecherche(false); }, [chemin]);
  useEffect(() => { if (recherche) champ.current?.focus(); }, [recherche]);

  // Ferme la recherche si on clique ailleurs alors que le champ est vide
  useEffect(() => {
    if (!recherche) return;
    const clic = (e: MouseEvent) => {
      if (zone.current && !zone.current.contains(e.target as Node) && !champ.current?.value) setRecherche(false);
    };
    document.addEventListener("mousedown", clic);
    return () => document.removeEventListener("mousedown", clic);
  }, [recherche]);

  return (
    <header className={`entete ${recherche ? "recherche-ouverte" : ""}`}>
      <Bandeau />
      <div className="wrap entete__in">
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true"><path d="M1 2h20M1 9h20M1 16h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
        </button>
        <Link href="/" className="logo">
          <img src="/logo.svg" alt="" style={{ height: 32, width: "auto" }} />
          {site.nom}
        </Link>
        <nav className={`nav ${menu ? "ouvert" : ""}`} aria-label="Navigation principale">
          {liens.map((l) => (
            <Link key={l.label} href={l.href} aria-current={chemin === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>

        {/* Recherche : la loupe s'ouvre en petit champ directement dans le header */}
        <form
          ref={zone}
          role="search"
          className={`recherche ${recherche ? "ouverte" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (!recherche) return setRecherche(true);
            const q = champ.current?.value.trim() ?? "";
            if (!q) return setRecherche(false);
            router.push(`/boutique?q=${encodeURIComponent(q)}`);
            if (champ.current) champ.current.value = "";
            setRecherche(false);
          }}
        >
          <label htmlFor="q" className="sr-only">Rechercher un produit</label>
          <input
            ref={champ}
            id="q"
            type="search"
            placeholder="Rechercher…"
            tabIndex={recherche ? 0 : -1}
            onKeyDown={(e) => { if (e.key === "Escape") setRecherche(false); }}
          />
          <button type="submit" aria-label={recherche ? "Lancer la recherche" : "Ouvrir la recherche"} aria-expanded={recherche}>
            <Loupe />
          </button>
        </form>

        <Link href="/panier" className="pastille-panier" aria-label={`Panier, ${nbArticles} article${nbArticles > 1 ? "s" : ""}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.5 12h-11zM9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /></svg>
          ({pret ? nbArticles : 0})
        </Link>
      </div>
    </header>
  );
}
