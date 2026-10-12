import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import MotionGlobale from "@/components/MotionGlobale";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "FORGE Afrika — L'Entreprise Mère de l'Écosystème Panafricain",
  description:
    "FORGE Afrika est la maison mère qui gouverne 10 filiales technologiques africaines — retail, agriculture, industrie, finance et commerce.",
  keywords: ["FORGE Afrika", "Afrique", "holding", "industrie", "agriculture", "technologie"],
  openGraph: {
    title: "FORGE Afrika — QG du Groupe",
    description: "Le centre de commande de toutes les filiales FORGE Afrika",
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
        {/* 53 blocs de la page d'accueil sont rendus avec `opacity:0` en style
            en ligne : c'est framer-motion qui les révèle à l'entrée dans le
            viewport. Sans JavaScript — et sur un Android d'entrée de gamme en
            2G, « sans » veut aussi dire « pas encore » — la page reste navy et
            vide. Le contenu ne doit jamais dépendre d'une animation : règle 5
            du playbook 05. Ce filet ne coûte rien à ceux qui ont du JS. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionGlobale>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionGlobale>
      </body>
    </html>
  );
}
