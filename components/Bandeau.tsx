import { site } from "@/data/site";

export function Bandeau() {
  // Le texte est répété pour un défilement sans coupure
  const textes = Array.from({ length: 6 }, (_, i) => <span key={i} aria-hidden={i > 0}>{site.bandeau}  ✦</span>);
  return (
    <div className="bandeau">
      <div className="bandeau__piste">{textes}</div>
    </div>
  );
}
