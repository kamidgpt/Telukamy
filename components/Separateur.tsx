// Petite étoile ✦ dessinée, centrée verticalement sur le texte qui l'entoure
export function Separateur({ taille = "0.7em" }: { taille?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      style={{ width: taille, height: taille, display: "inline-block", verticalAlign: "middle", margin: "0 0.45em", flex: "none" }}
    >
      <path d="M10 0Q10 10 20 10Q10 10 10 20Q10 10 0 10Q10 10 10 0Z" fill="currentColor" />
    </svg>
  );
}
