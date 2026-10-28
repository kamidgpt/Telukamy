// Étoile à 4 branches, comme sur les maquettes
export function Etincelle({ couleur = "var(--vert)", className }: { couleur?: string; className?: string }) {
  return (
    <svg viewBox="0 0 104 104" className={className} aria-hidden="true">
      <path
        d="M52 2Q52 52 102 52Q52 52 52 102Q52 52 2 52Q52 52 52 2Z"
        fill={couleur}
        stroke="var(--noir)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Etincelles({ grande = "var(--vert)", petite = "var(--blanc)" }: { grande?: string; petite?: string }) {
  return (
    <svg viewBox="0 0 150 180" className="etincelles" aria-hidden="true">
      <path d="M100 4Q100 54 150 54Q100 54 100 104Q100 54 50 54Q100 54 100 4Z" fill={grande} stroke="var(--noir)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 118Q30 144 56 144Q30 144 30 170Q30 144 4 144Q30 144 30 118Z" fill={petite} stroke="var(--noir)" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
