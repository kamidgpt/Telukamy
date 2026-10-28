import type { Metadata } from "next";
import "@fontsource/anton";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/800.css";
import "@fontsource/permanent-marker";
import "./globals.css";
import { PanierProvider } from "@/lib/cart";
import { Entete } from "@/components/Entete";
import { PiedDePage } from "@/components/PiedDePage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: `${site.nom} — ${site.slogan}`, template: `%s · ${site.nom}` },
  description: site.slogan,
  openGraph: { siteName: site.nom, locale: "fr_FR", type: "website", images: ["/produits/print-spirale.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <PanierProvider>
          <Entete />
          <main>{children}</main>
          <PiedDePage />
        </PanierProvider>
      </body>
    </html>
  );
}
