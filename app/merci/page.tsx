import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { Heros } from "@/components/Heros";
import { prix } from "@/lib/format";
import { ViderPanier } from "./ViderPanier";

export const metadata: Metadata = { title: "Merci !", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function PageMerci({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let prenom = "";
  let email = "";
  let total: number | null = null;
  let paye = false;

  const stripe = getStripe();
  if (stripe && session_id?.startsWith("cs_")) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      paye = s.payment_status === "paid";
      prenom = (s.customer_details?.name ?? "").split(" ")[0];
      email = s.customer_details?.email ?? "";
      total = s.amount_total;
    } catch {}
  }

  return (
    <>
      {paye && <ViderPanier />}
      <Heros titre={paye ? `Merci${prenom ? ` ${prenom}` : ""} !` : "Merci !"} couleur="vert" />
      <section className="section">
        <div className="wrap deux-col">
          <div>
            <h2 className="titre">Ta commande est validée</h2>
            <p style={{ fontSize: 19 }}>
              {paye
                ? <>Le paiement{total !== null ? <> de <strong>{prix(total)}</strong></> : null} est bien passé. Un reçu part vers <strong>{email || "ta boîte mail"}</strong>.</>
                : "Si ton paiement est validé, tu vas recevoir un reçu par email dans quelques minutes."}
            </p>
            <p>Je prépare ton colis avec soin et je l’expédie sous 48 h ouvrées. Une question ? Écris-moi via la page contact.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/boutique" className="btn">Continuer mes achats</Link>
              <Link href="/contact" className="btn btn--blanc">Me contacter</Link>
            </div>
          </div>
          <div className="boite boite--rose placeholder penche-d" style={{ minHeight: 280, fontSize: 40 }}>XOXO ✦</div>
        </div>
      </section>
    </>
  );
}
