import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
