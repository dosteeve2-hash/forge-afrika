import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORGE Afrika — Écosystème Industriel Panafricain",
  description:
    "Bâtir le premier conglomérat industriel panafricain. 9 produits, 4 secteurs, 3 pays.",
  keywords: ["FORGE Afrika", "Afrique", "industrie", "agriculture", "technologie"],
  openGraph: {
    title: "FORGE Afrika HQ",
    description: "Le centre de commande de l'écosystème FORGE Afrika",
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
