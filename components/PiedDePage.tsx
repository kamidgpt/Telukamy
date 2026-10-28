import Link from "next/link";
import { site } from "@/data/site";
import { Newsletter } from "./Newsletter";

export function PiedDePage() {
  return (
    <footer className="pied">
      <div className="wrap">
        <div className="pied__haut">
          <div>
            <h2 className="titre">On reste en contact ?</h2>
            <Newsletter />
          </div>
          <div>
            <h3>Suivre</h3>
            <ul>
              <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href={site.pinterest} target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            </ul>
          </div>
          <div>
            <h3>Infos</h3>
            <ul>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/livraison-faq">Livraison &amp; FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3>Légal</h3>
            <ul>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/cgv">CGV</Link></li>
              <li><Link href="/confidentialite">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p className="pied__marque" aria-hidden="true">{site.nom}</p>
        <div className="pied__bas">
          <span>Paiement sécurisé par Stripe · Carte, Apple Pay, Google Pay</span>
          <span>© {new Date().getFullYear()} {site.nom}</span>
        </div>
      </div>
    </footer>
  );
}
