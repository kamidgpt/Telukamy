import type { Metadata } from "next";
import { Suspense } from "react";
import { Heros } from "@/components/Heros";
import { Catalogue } from "./Catalogue";

export const metadata: Metadata = { title: "Boutique" };

export default function PageBoutique() {
  return (
    <>
      <Heros titre="Boutique" couleur="rose" />
      <Suspense>
        <Catalogue />
      </Suspense>
    </>
  );
}
