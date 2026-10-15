import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "FORGE Afrika — Logiciels pour les filières africaines",
  description:
    "FORGE Afrika développe des outils logiciels pour l'agriculture, l'élevage, la transformation, la comptabilité et le commerce en Afrique de l'Ouest. Projet en phase pilote, partenaires pilotes recherchés.",
  keywords: ["FORGE Afrika", "Afrique", "industrie", "agriculture", "technologie"],
  openGraph: {
    title: "FORGE Afrika — Logiciels pour les filières africaines",
    description: "Des outils pour coopératives, éleveurs et PME de transformation. Projet en phase pilote.",
    type: "website",
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: '/android-chrome-192x192.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
