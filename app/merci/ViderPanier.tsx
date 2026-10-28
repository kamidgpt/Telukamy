"use client";

import { useEffect, useRef } from "react";
import { usePanier } from "@/lib/cart";

// Vide le panier une seule fois quand le paiement est confirmé
export function ViderPanier() {
  const { vider, pret } = usePanier();
  const fait = useRef(false);
  useEffect(() => {
    if (pret && !fait.current) {
      fait.current = true;
      vider();
    }
  }, [pret, vider]);
  return null;
}
