import type { Metadata } from "next";
import Link from "next/link";
import { Heros } from "@/components/Heros";
import { faq } from "@/data/site";

export const metadata: Metadata = { title: "Livraison & FAQ" };

export default function PageFAQ() {
  return (
    <>
      <Heros titre="Livraison & FAQ" couleur="violet" />
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 1100 }}>
          <div className="accordeon">
            {faq.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <div>{item.r}</div>
              </details>
            ))}
          </div>
          <p style={{ marginTop: 40, fontSize: 19 }}>
            Pas trouvé ta réponse ? <Link href="/contact"><strong>Écris-moi</strong></Link>, je réponds sous 48 h.
          </p>
          </div>
        </div>
      </section>
    </>
  );
}
