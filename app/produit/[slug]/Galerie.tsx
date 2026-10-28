"use client";

import Image from "next/image";
import { useState } from "react";

export function Galerie({ images, nom, epuise, nouveau }: { images: string[]; nom: string; epuise?: boolean; nouveau?: boolean }) {
  const [i, setI] = useState(0);
  return (
    <div style={{ position: "relative" }}>
      {epuise ? (
        <span className="sticker sticker--noir" style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>Épuisé</span>
      ) : nouveau ? (
        <span className="sticker" style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>Nouveau</span>
      ) : null}
      <div className="boite fiche__img">
        {images[i] ? (
          <Image src={images[i]} alt={nom} fill sizes="(max-width: 860px) 100vw, 55vw" priority />
        ) : (
          <span className="vide-img">Photo à venir</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="fiche__mini">
          {images.map((src, k) => (
            <button key={src} aria-pressed={k === i} aria-label={`Photo ${k + 1}`} onClick={() => setI(k)}>
              <Image src={src} alt="" width={80} height={80} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
